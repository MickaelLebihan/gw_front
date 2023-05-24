import React from 'react'
import { Link } from 'react-router-dom'


export default function Index() {
  return (
    <aside>
        <ul>
          <li><Link to={"/user/profil"}>profil</Link></li>
          <li><Link to={"/user/favorites"}>favoris</Link></li>
        </ul>
      </aside>
  )
}
