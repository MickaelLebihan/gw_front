import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

import './game.scss'

const apiURL = process.env.REACT_APP_API_URL;
// axios.get(`${apiURL}/api/game/${id}`)

export default function Index() {

    const {data: user} = useQuery('user') 

    const {id} = useParams();
    const {isLoading, data/*, isError, error*/} = useQuery('game', () => { return axios.get(`${apiURL}/api/game/${id}`)})

    

    

    
    if (isLoading) {
        return <h2>En cours de chargement</h2>
    } else {
        const {id, title, description} = data.data
        if(user){
            var actionGameButton = user.roles.includes("ADMIN") && <>
                <Link to={'/game/edit/'+id} >éditer le jeu</Link>
                <Link to={'/game/delete/'+id} >supprimer le jeu</Link>
            </>
        }
        return ( 
            <div className='game'>
                {actionGameButton}
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
           )
    }

    // if (isError) {
    //     return <h2>{error.message}</h2>
    // }

  
}
