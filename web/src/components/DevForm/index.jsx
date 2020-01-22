import React, { useState, useEffect } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useRelayEnvironment } from 'react-relay/hooks';
import { commitMutation } from 'relay-runtime';

import './styles.css';

const addDevMutation = graphql`
  mutation DevFormMutation (
    $githubUsername: String!
    $technologies: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    addDev(
      githubUsername: $githubUsername
      technologies: $technologies 
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
      technologies
      bio
      githubUsername
      avatarUrl
    }
  }
`;

function DevForm() {
  const [githubUsername, setGithubUsername] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const environment = useRelayEnvironment();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        setLatitude(lat);
        setLongitude(long);
      }, (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      },
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    commitMutation(environment, {
      mutation: addDevMutation,
      variables: {
        githubUsername,
        technologies,
        latitude,
        longitude,
      },
      onCompleted: () => {
        setGithubUsername('');
        setTechnologies('');
      },
      onError: (err) => console.error(err),
      updater: (store) => {
        console.log(store.getRootField('addDev'));
        const newDev = store.getRootField('addDev');
        const currentDevs = store.getRoot().getLinkedRecords('devs');
        const exists = currentDevs.filter((dev) => dev.getValue('id') === newDev.getValue('id')).length > 0;
        if (!exists) {
          currentDevs.push(newDev);
          store.getRoot().setLinkedRecords(currentDevs, 'devs');
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">
            Usuário do Github
          <input
            name="github_username"
            id="github_username"
            required
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
        </label>
      </div>

      <div className="input-block">
        <label htmlFor="technologies ">
            Tecnologias
          <input
            name="technologies"
            id="technologies"
            required
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
