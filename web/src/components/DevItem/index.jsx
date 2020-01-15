import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function DevItem({ dev }) {
  return (
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
  );
}

DevItem.propTypes = {
  dev: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    githubUsername: PropTypes.string,
    avatarUrl: PropTypes.string,
    technologies: PropTypes.array,
    bio: PropTypes.string,
  }).isRequired,
};

export default DevItem;
