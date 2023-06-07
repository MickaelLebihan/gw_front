import React from 'react'
import axios from 'axios';
import { useQueryClient } from 'react-query'

import './index.scss'
import { Link } from 'react-router-dom'

const apiURL = process.env.REACT_APP_API_URL;
export default function Index(props) {
    
    const queryClient = useQueryClient()
    
    function loadUser(e){
        e.preventDefault()
        var user = {
           username: e.target.username.value,
           password: e.target.password.value,
        }
        axios.post(`${apiURL}/api/auth/login`, user)
        .then(response => {
            
            return localStorage.setItem("token", response.data)
        })
        .then(() => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            axios.get(`${apiURL}/api/auth/user`).then(response => {
                const user =  response.data.user
                const roles =  response.data.roles
                console.log(user)
                queryClient.setQueryData('user', user)
                queryClient.setQueryData('roles', roles)
            })
        })
    }


    function hideBox(){
        props.closeBtn()
    }

  return (
    <div className='loginBox'>

        <div className='closeBtn' onClick={() => hideBox()}><p>x</p></div>
        {/* <p>{"users"}</p> */}
        
        <form onSubmit={(e) => loadUser(e)}>

            <div className="inputGroup">
                <label htmlFor='username' >username</label>
                <input type='text' id='username' name='username' />
            </div>
            <div className="inputGroup">
                <label htmlFor='password' >mot de passe</label>
                <input type='password' id='password' name='password' />
            </div>

            <button>ok</button>

        </form>
        <Link to={"/user/register"}>S'inscrire</Link>
    </div>
  )
}
