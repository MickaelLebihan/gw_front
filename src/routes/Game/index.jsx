import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

import './game.scss'

const apiURL = process.env.REACT_APP_API_URL;


export default function Index() {
    const {id} = useParams();
    const {isLoading, data, isError, error} = useQuery('game', () => { return axios.get(`${apiURL}/api/game/${id}`)})
    console.log(data)

    if (isLoading) {
        return <h2>En cours de chargement</h2>
    } else {
        const {title, description} = data.data
        return ( 
            <div className='game'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
           )
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

  
}
