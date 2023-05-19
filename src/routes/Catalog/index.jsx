import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './index.scss'

import Game from './Game/Game';
import { nanoid } from 'nanoid';

const apiURL = process.env.REACT_APP_API_URL;



export default function Index() {

    const [gamesLoaded, setGamesLoaded] = useState(false)
    const [games, setGames] = useState([])

    var gamesList = games.map((game) => {
        return <Game {...game}  key={nanoid()}/>
    })

    function getAllGames() {
        axios.get(`${apiURL}/api/games`)
        .then(response => response.data)
        .then(data =>{
            setGamesLoaded(true)
            setGames(data)
            //console.log(data)
        })
        .catch((e) => {
            console.log(e.message)
        })
    }

    useEffect(() => {
        getAllGames()
    }, [])

  return (
    <div className='catalog'>
        <h2>Catalogue</h2>
        <div className="games-row">
            {gamesLoaded ? gamesList : <p>Les jeux sont en cours de chargement</p>}
        </div>
    </div>
  )
}
