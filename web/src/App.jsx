import React, { useState, useEffect } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/1917990?s=460&v=4" alt="Paulo Medeiros" />
              <div className="user-info">
                <strong>Paulo Medeiros</strong>
                <span>ReactJS, Node.js, Ruby</span>
              </div>
            </header>
            <p>Software Enginner at Jusbrasil</p>
            <a href="https://github.com/paulobochi" target="_blank" rel="noopener noreferrer">Acessar perfil github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/1917990?s=460&v=4" alt="Paulo Medeiros" />
              <div className="user-info">
                <strong>Paulo Medeiros</strong>
                <span>ReactJS, Node.js, Ruby</span>
              </div>
            </header>
            <p>Software Enginner at Jusbrasil</p>
            <a href="https://github.com/paulobochi" target="_blank" rel="noopener noreferrer">Acessar perfil github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/1917990?s=460&v=4" alt="Paulo Medeiros" />
              <div className="user-info">
                <strong>Paulo Medeiros</strong>
                <span>ReactJS, Node.js, Ruby</span>
              </div>
            </header>
            <p>Software Enginner at Jusbrasil</p>
            <a href="https://github.com/paulobochi" target="_blank" rel="noopener noreferrer">Acessar perfil github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/1917990?s=460&v=4" alt="Paulo Medeiros" />
              <div className="user-info">
                <strong>Paulo Medeiros</strong>
                <span>ReactJS, Node.js, Ruby</span>
              </div>
            </header>
            <p>Software Enginner at Jusbrasil</p>
            <a href="https://github.com/paulobochi" target="_blank" rel="noopener noreferrer">Acessar perfil github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
