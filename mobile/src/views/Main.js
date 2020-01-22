import React, { useEffect, useState } from 'react';
import {
  View, Image, Text, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import {
  graphql, useRelayEnvironment, fetchQuery,
} from 'react-relay/hooks';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 5,
    },
    elevation: 2,
  },
  submitButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [technologies, setTechnologies] = useState('');
  const [devs, setDevs] = useState([]);
  const environment = useRelayEnvironment();
  const mainQuery = graphql`
    query MainQuery($technologies: String) {
      devs(technologies: $technologies ) {
        id
        name
        technologies
        bio
        githubUsername
        avatarUrl
        location {
          coordinates
        }
      }
    }
  `;

  const fetchDevs = () => {
    fetchQuery(
      environment,
      mainQuery,
      {
        technologies,
      },
    ).subscribe({
      complete: () => {
        disconnect();
        const { latitude, longitude } = currentRegion || {};
        connect(latitude, longitude, technologies);
      },
      next: (data) => setDevs(data.devs),
    });
  };

  const setInitialPosition = async () => {
    const { granted } = await requestPermissionsAsync();
    if (granted) {
      const { coords: { latitude, longitude } } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  };

  useEffect(() => {
    setInitialPosition();
    fetchDevs();
  }, []);

  useEffect(() => {
    subscribeToNewDevs((dev) => { alert(dev); });
  }, [devs]);

  return (
    <>
      <MapView style={styles.map} initialRegion={currentRegion}>
        {devs.map(({
          id, name, bio, technologies: techs, githubUsername, avatarUrl, location,
        }) => (
          <Marker
            key={id}
            coordinate={{
              latitude: location.coordinates[1],
              longitude: location.coordinates[0],
            }}
          >
            <Image style={styles.avatar} source={{ uri: avatarUrl }}></Image>

            <Callout style={styles.callout} onPress={() => {
              navigation.navigate('Profile', { githubUsername });
            }}>
              <Text style={styles.devName}>{name}</Text>
              <Text style={styles.devBio}>{bio}</Text>
              <Text style={styles.devTechs}>{(techs || []).join(', ')}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={technologies}
          onChangeText={setTechnologies}
        />
        <TouchableOpacity style={styles.submitButton} onPress={() => fetchDevs()}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

Main.propTypes = {
};

export default Main;
