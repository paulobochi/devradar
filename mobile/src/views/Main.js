import React, { useEffect, useState } from 'react';
import {
  View, Image, Text, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

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

  useEffect(() => {
    async function loadInitialPosition() {
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
    }
    loadInitialPosition();
  }, []);
  return (
    <>
      <MapView style={styles.map} initialRegion={currentRegion}>
        <Marker coordinate={{ latitude: -25.5328261, longitude: -54.5131051 }}>
          <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/1917990?s=460&v=4' }}></Image>

          <Callout style={styles.callout} onPress={() => {
            navigation.navigate('Profile', { githubUsername: 'paulobochi' });
          }}>
            <Text style={styles.devName}>Paulo</Text>
            <Text style={styles.devBio}>Adoro tecnologias</Text>
            <Text style={styles.devTechs}>Ruby, Node, ReactJS, React Native, Docker</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

Main.propTypes = {
};

export default Main;
