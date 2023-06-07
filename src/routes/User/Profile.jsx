import React from 'react'
import { useQuery } from 'react-query'
import { Link} from 'react-router-dom';

import UserMenu from './UserMenu'

export default function Index() {
  const {data: user} = useQuery('user')

  // const userData = !isLoading ? data.data : null
  if (!user){
    // return redirect("/")
    return <p>l'utilisateur n'est pas chargé</p>
  }

  var gameMenu = null;
  if (user.roles.includes("ADMIN")){
    // return redirect("/")
    gameMenu = 
      <div className="gameMenu">
        <h3>menu jeu</h3>
        <Link className="btn" to={"/game/add"}>ajouter</Link>
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
