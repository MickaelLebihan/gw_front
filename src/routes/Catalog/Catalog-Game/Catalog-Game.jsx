import React, { useState } from 'react';
import './catalog-game.scss';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export default function Game({user, id, title, gameEngine, platforms, handleFavoriteAction, slug_Title}) {

  const [favoriteCount, setFavoriteCount] = useState(0)
  const [favoriteLoaded, setFavoriteLoaded] = useState(false)

  const platformsList = platforms.map((platform) => (
    <div className={`platform ${platform.name}`} key={nanoid()}>
      {platform.name}
    </div>
  ));

  var isAdmin = user?.roles.includes("ADMIN")
  
  
  isAdmin && axios.get(`${apiURL}/api/game/${slug_Title}/countFavorites`).then(response =>{
    setFavoriteLoaded(true)
    return setFavoriteCount(response.data)
  })
  
  
  // if(!isLoadingFavoritesCount)
  // console.log(favoriteCount.data)
  
  // var x = axios.get(`${apiURL}/api/game/${slug_Title}/countFavorites`).then(response => console.log(response.data))
  
  const addToFavorite = (id) => <div className='favButton' onClick={() => handleFavoriteAction({id, action:"add"})}><img src='/assets/nofavs.png' alt='not in favorites'/></div>
  
  const removeFromfavorite = (id) => <div className='favButton' onClick={() => handleFavoriteAction({id, action:"remove"})}><img src='/assets/favs.png' alt='in favorites'/></div>
  
  let favsCount =  !user || !isAdmin ? null : isAdmin && favoriteLoaded ? <p>favoris: {favoriteCount}</p> : <p>favoris: ...</p>


  let favs =  user?.roles.includes("USER")
              ?
                  user?.favoriteGames.includes(id)
                  ?
                  removeFromfavorite(id) : addToFavorite(id)
              : null
  
  return (
      <div className="game">
          {favsCount}
          <Link to={`/game/${slug_Title}`} className="game-link">
        <header>
          <h3>{title}</h3>
          <div className="info">
            {gameEngine && <span className="gameEngine">{gameEngine.name}</span>}
            <div className="platforms">{platformsList}</div>
          </div>
        </header>
    </Link>
          {favs}
      </div>
  );
}