import React from 'react'
// import LoginBox from './LoginBox'

import './index.scss'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

export default function Index() {

  const {data: user} = useQuery('user')

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // console.log("logout")
    window.location.href = '/';
  }

  const menu= (
    <div className='menu'>
      <ul>
        <li><Link className='btn' to={"/user/profil"} >profil</Link></li>
        {
        user && user.roles.includes("USER") &&
          (<li><Link className='btn' to={"/user/favorites"} >favoris</Link></li>)
        }
        <li><Link className='btn' onClick={logout} /*to={"/logout"}*/ >log out</Link></li>
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
              <Link className='btn loginBtn' to={"/user/login"}>log in</Link>
          }

          {/* {loginBoxDisplayed && <LoginBox closeBtn={showLoggInBox}/> } */}

        </div>
    </div>
  )
}
