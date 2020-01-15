import React, { useState, useEffect } from 'react';
import { useLazyLoadQuery, useRelayEnvironment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { commitMutation, ConnectionHandler } from 'relay-runtime';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

const addDevMutation = graphql`
  mutation AppAddDevMutation (
    $githubUsername: String!
    $technologies: [String]!
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

function App() {
  const [githubUsername, setGithubUsername] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const environment = useRelayEnvironment();
  const { devs } = useLazyLoadQuery(
    graphql`
      query AppQuery {
        devs {
          id
          name
          technologies
          bio
          githubUsername
          avatarUrl
        }
      }
    `,
  );

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

  const handleAddDev = (e) => {
    e.preventDefault();

    commitMutation(environment, {
      mutation: addDevMutation,
      variables: {
        githubUsername,
        technologies: technologies.split(',').map((t) => t.trim()),
        latitude,
        longitude,
      },
      onCompleted: () => {
        setGithubUsername('');
        setTechnologies('');
      },
      onError: (err) => console.error(err),
      updater: (store) => {
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
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
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
      </aside>
      <main>
        <ul>
          {devs && devs.map((dev) => (
            <li className="dev-item" key={dev.id}>
              <header>
                <img src={dev.avatarUrl} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{(dev.technologies || []).join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.githubUsername}`} target="_blank" rel="noopener noreferrer">Acessar perfil github</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
