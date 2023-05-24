import React from 'react'
import { useQuery } from 'react-query'
import { redirect } from 'react-router-dom';

import UserMenu from './UserMenu'
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export default function Index() {
  const {data: user} = useQuery('user')
  const {data: roles} = useQuery('roles')  

  // const userData = !isLoading ? data.data : null
  if (!user){
    // return redirect("/")
    return <p>l'utilisateur n'est pas chargé</p>
  }

  var gameMenu = null;
  if (user.roles.find(role => role=="ADMIN")){
    // return redirect("/")
    gameMenu = 
      <div className="gameMenu">
        <h3>menu jeu</h3>
        <div className="btn">ajouter</div>
        <div className="btn">éditer</div>
        <div className="btn">supprimer</div>
      </div>
    //return gameMenu
  }


  return (
    <div>
      <UserMenu />
      <div className="content">
        <div className="userInfo">
          <h2>Mes Informations</h2>
          <p>nom d'utilisateur: {user.userName}</p>
          <p>email: {user.email}</p>
        </div>
        
        <p>role: {user.roles}</p>
        {gameMenu}
      </div>
    </div>
  )
}
