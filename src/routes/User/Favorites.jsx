import React from 'react'
import UserMenu from './UserMenu'

export default function Favorites() {
  return (
    <div>
        <UserMenu />
        <div className="content">
          <div className="favorites">
            <h2>Favoris</h2>
            <div className="favoritesGames">
              <div className="fav"><h3>nom du jeu</h3>
              <p>texte du jeu</p></div>
              <div className="fav"><h3>nom du jeu</h3>
              <p>texte du jeu</p></div>
              <div className="fav"><h3>nom du jeu</h3>
              <p>texte du jeu</p></div>
              <div className="fav"><h3>nom du jeu</h3>
              <p>texte du jeu</p></div>
            </div>
          </div>
        </div>
    </div>
  )
}
