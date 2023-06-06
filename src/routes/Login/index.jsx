import axios from 'axios'
import React from 'react'
import { useQueryClient } from 'react-query';
import { Link, Navigate } from 'react-router-dom'

const apiURL = process.env.REACT_APP_API_URL;


export default function Index() {

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
            axios.get(`${apiURL}/user`).then(response => {
                const user =  response.data
                console.log(user)
                queryClient.setQueryData('user', user)
                localStorage.setItem('user', JSON.stringify(user));
            })
        })
        .then(()=>{
            Navigate("/")
        })
    }

  return (
    <>
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
        <Link to={""}>S'inscrire</Link>
    </>
    )
}
