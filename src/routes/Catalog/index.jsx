import { useQuery } from 'react-query'
import { nanoid } from 'nanoid'
import axios from 'axios'

import Game from './Game/Game'

import './index.scss'
import { Link } from 'react-router-dom'


const apiURL = process.env.REACT_APP_API_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const Index = () => {
    
    const {data: user} = useQuery('user')

    const {isLoading, data, isError, error} = useQuery('games', () => { return axios.get(`${apiURL}/api/games`)})

    if (isLoading) {
        return <h2>En cours de chargement</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    var addGameButton = null

    if(user){
        addGameButton = user.roles.includes("ADMIN") && <Link to={'/game/add'} >ajouter un jeu</Link>
    }

  return (
    <div className='catalog'>
        {addGameButton}
        
        <h2>Catalogue</h2>
        <div className="games-row">
        {data?.data.map((game) => {
            return <Game {...game}  key={nanoid()}/>
        })}
    </div>
    </div>
  )
}

export default Index
