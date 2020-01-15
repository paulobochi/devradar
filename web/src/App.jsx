import React, { useState, useEffect } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App({ props }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { devs } = useLazyLoadQuery(
    graphql`
      query AppQuery {
        devs {
          id
          name
          technologies
          bio
          githubUsername
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

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">
              Usuário do Github
              <input name="github_username" id="github_username" required />
            </label>
          </div>

          <div className="input-block">
            <label htmlFor="technologies ">
              Tecnologias
              <input name="technologies" id="technologies" required />
            </label>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs && devs.map((dev) => (
            <li className="dev-item">
              <header>
                <img src="https://avatars0.githubusercontent.com/u/1917990?s=460&v=4" alt="Paulo Medeiros" />
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
