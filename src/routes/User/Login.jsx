import axios from 'axios'
import React from 'react'
import { useQueryClient } from 'react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom'

const apiURL = process.env.REACT_APP_API_URL;


export default function Index() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()


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
            axios.get(`${apiURL}/user`).then(response => {
                const user =  response.data
                console.log(user)
                queryClient.setQueryData('user', user)
                localStorage.setItem('user', JSON.stringify(user));
            })
        })
        .then(()=>{
            navigate("/")
        })
    }

  return (
    <>
    <h2>Se connecter</h2>
        <form onSubmit={(e) => loadUser(e)}>

            <div className="inputGroup">
                <label htmlFor='username' >username</label>
                <input type='text' id='username' name='username' />
            </div>
            <div className="inputGroup">
                <label htmlFor='password' >mot de passe</label>
                <input type='password' id='password' name='password' />
            </div>

            <button>se connecter</button>

        </form>
        <Link to={"/user/register"}>S'inscrire</Link>
    </>
    )
}
