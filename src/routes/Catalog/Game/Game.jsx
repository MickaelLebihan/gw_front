import React, { useState } from 'react';
import './game.scss';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export default function Game({isUser, isAdmin, id, title, gameEngine, platforms, isFavorite, addAction, removeAction, slug_Title, budget}) {
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

  const [favoriteCount, setFavoriteCount] = useState(0)
  const [favoriteLoaded, setFavoriteLoaded] = useState(false)

  isAdmin && axios.get(`${apiURL}/api/game/${slug_Title}/countFavorites`).then(response =>{
    setFavoriteLoaded(true)
    return setFavoriteCount(response.data)
  })

  // if(!isLoadingFavoritesCount)
    // console.log(favoriteCount.data)

  // var x = axios.get(`${apiURL}/api/game/${slug_Title}/countFavorites`).then(response => console.log(response.data))
  
  const addToFavorite = () => <button onClick={() => localAddAction(id)}><img src='/assets/nofavs.png' alt='not in favorites'/></button>
  const removeFromfavorite = () => <button onClick={() => localRemoveAction(id)}><img src='/assets/favs.png' alt='in favorites'/></button>
  return (
      <div className="game">
          {isUser && isUser.roles[0] === "USER" ?
              isFavorite ? removeFromfavorite(id) : addToFavorite(id)
            :
            null
          }

          
          { !isUser || !isAdmin ? null : isAdmin && favoriteLoaded ? <p>favoris: {favoriteCount}</p> : <p>favoris: ...</p>}
          <Link to={`/game/${slug_Title}`} className="game-link">
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