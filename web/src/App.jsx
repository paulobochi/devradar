import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
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

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm />
      </aside>
      <main>
        <ul>
          {devs && devs.map((dev) => (
            <DevItem dev={dev} key={dev.id} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
