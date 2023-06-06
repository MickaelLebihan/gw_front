import React from 'react'
// import LoginBox from './LoginBox'

import './index.scss'
import { Link, redirect } from 'react-router-dom'
import { useQuery } from 'react-query'

export default function Index() {

  const {data: user} = useQuery('user')

  const logout = () => {
    console.log("logout")
    return redirect("/")
  }

  const menu= (
    <div className='menu'>
      <ul>
        <li><Link className='btn' to={"/user/profil"} >profil</Link></li>
        <li><Link className='btn' to={"/user/favorites"} >favoris</Link></li>
        <li><Link className='btn' onClick={()=>logout()} /*to={"/logout"}*/ >log out</Link></li>
      </ul>
  </div>
  )

  return (
    <div className='mainMenu'>
        <nav className='mainNav'>
            <ul>
              {/* <BigButton to="/" text="accueil"/> */}
              {/* <BigButton to="/games" text="jeux"/> */}
              {/* {true && <BigButton to="/user/profil" text="mon compte"/>} */}
                <li><Link className='btn' to={"/"} >accueil</Link></li>
                <li><Link className='btn' to={"/games"} >jeux</Link></li>
            </ul>
            {/* <BigButton to="/" text="login"/> */}
        </nav>
        <div className="userMenu">

          {
            user ? 
              <>
                <Link className='btn menuBtn' to={"/user/profil"} >user menu</Link>
                {menu}
              </>
            :
              <Link className='btn loginBtn' to={"/login"}>log in</Link>
          }

          {/* {loginBoxDisplayed && <LoginBox closeBtn={showLoggInBox}/> } */}

        </div>
    </div>
  )
}
