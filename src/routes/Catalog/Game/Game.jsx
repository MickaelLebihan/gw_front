import React from 'react';
import './game.scss';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

export default function Game({isUser, id, title, description, gameEngine, platforms, isFavorite, addAction, removeAction}) {
  const platformsList = platforms.map((platform) => (
    <div className={`platform ${platform.name}`} key={nanoid()}>
      {platform.name}
    </div>
  ));

  function localAddAction(id){
    addAction(id)
    return "add"
  }
  function localRemoveAction(id){
    removeAction(id)
    return "remove"
  }
  
  const addToFavorite = (id) => <button onClick={() => localAddAction(id)}><img src='/assets/nofavs.png'alt='not in favorites'/></button>
  const removeFromfavorite = (id) => <button onClick={() => localRemoveAction(id)}><img src='/assets/favs.png'alt='in favorites'/></button>

  return (
      <div className="game">
          {isUser ?
              isFavorite ? removeFromfavorite(id) : addToFavorite(id)
            :
            null
          }
          <Link to={`/game/${id}`} className="game-link">
        <header>
          <h3>{title}</h3>
          <div className="info">
            {gameEngine && <span className="gameEngine">{gameEngine.name}</span>}
            <div className="platforms">{platformsList}</div>
          </div>
        </header>
    </Link>
      </div>
  );
}