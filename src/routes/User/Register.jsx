import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    function  register(e){
        e.preventDefault()
        var userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        console.log(userData)
    }
  return (
    <>
    <h2>S'inscrire</h2>

    <form onSubmit={(e)=> register(e)}>

        <div className="inputGroup">
            <label htmlFor='username' >username</label>
            <input type='text' id='username' name='username' />
        </div>
        <div className="inputGroup">
            <label htmlFor='password' >mot de passe</label>
            <input type='password' id='password' name='password' />
        </div>

        <button>créer le compte</button>
    </form>
        <Link to={"/user/login"}>Se connecter</Link>
</>
  )
}
