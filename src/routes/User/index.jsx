import React from 'react'
import { useQuery } from 'react-query'
import { redirect } from 'react-router-dom';

import UserMenu from './UserMenu'
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export default function Index() {
  const {data: user} = useQuery('user')
  const {data: roles} = useQuery('roles')
  
  // const {isLoading, data, isError, error} = useQuery('user', () => {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  //   return axios.get(`${apiURL}/api/auth/user`)
  // })

  

  // if (isLoading) {
  //     return <h2>En cours de chargement</h2>
  // }

  // if (isError) {
  //     return <h2>{error.message}</h2>
  // }

  // const userData = !isLoading ? data.data : null
  if (!user){
    // return redirect("/")
    return <p>l'utilisateur n'est pas chargé</p>
  }

  // if (!roles){
  //   // return redirect("/")
  //   return <p>l'utilisateur n'as pas de rôle</p>
  // }


  return (
    <div>
      <UserMenu />
      <div className="content">
        <div className="userInfo">
          <h2>Mes Informations</h2>
          <p>nom d'utilisateur: {user.userName}</p>
          <p>email: {user.email}</p>
        </div>
        
          {/* <p>role: {roles[0]}</p> */}
          <div className="gameMenu">
            <h3>menu jeu</h3>
            <div className="btn">ajouter</div>
            <div className="btn">éditer</div>
            <div className="btn">supprimer</div>
          </div>
      </div>
    </div>
  )
}
