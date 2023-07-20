import axios from 'axios'
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import './addGame.scss'
import { Link } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

export default function Index() {

    // const {data: user} = useQuery('user')

    
    const [newEngine, setNewEngine] = useState(false)
    const [newPlatform, setNewPlatform] = useState(false)
    const [newGenre, setNewGenre] = useState(false)

    const [budget, setBudget] = useState(10000)
    
    const {isLoading, data } = useQuery(["gameAuxiliaryData"], () => GetData())
    

    function changeBudget(e){
        setBudget(e.target.value)
    }

    async function GetData(){

        const [gameengines, platforms, genres ] = await Promise.all([
            axios.get(`${apiURL}/api/gameengine`).then(response => response.data),
            axios.get(`${apiURL}/api/platforms`).then(response => response.data),
            axios.get(`${apiURL}/api/genres`).then(response => response.data)
        ])

        const otherDatas = {
            gameengines,
            platforms,
            genres
        }

        return otherDatas
    }

    

    var gameengines = null
    var platforms = null
    var genres = null

    if (isLoading){
        return <p>form loading</p>
    } else {
        gameengines = data.gameengines.map((gameengine) => {
            return <option key={nanoid()} value={gameengine.id}>{gameengine.name}</option>
        })
        platforms = data.platforms.map((platform) => {
            return <option key={nanoid()} value={platform.id}>{platform.name}</option>
        })
        genres = data.genres.map((genre) => {
            return <option key={nanoid()} value={genre.id}>{genre.name}</option>
        })
    }

    function getMultipleSelect(selectInput){
        var output = []
        for (var i=0; i<selectInput.options.length; i++){
            if(selectInput.options[i].selected)
            output.push(selectInput.options[i].value)
        }

        return output
    }

    const changeDisplay = (e, name) => {
        var value = e.target.checked
        switch (name){
            case "engine":
                setNewEngine(value)
                break
            case "platform":
                setNewPlatform(value)
                break
            case "genre":
                setNewGenre(value)
                break
            default:
                return null
        }
    }

    function sendData(e){
        e.preventDefault()
        const form = e.target
        
        var GameEngine = newEngine ? null : form.gameengines.value 
        var Genres = newGenre ? null : getMultipleSelect(form.genres) 
        var Platforms = newPlatform ? null : getMultipleSelect(form.platforms) 

        const game = {
            Title: form.title.value,
            Budget: form.budget.value,
            Description: form.description.value,
            MinPlayer: form.minPlayer.value,
            MaxPlayer: form.maxPlayer.value,
            GameEngine,
            Platforms,
            Genres,
            newEngineName: newEngine ? form.newEngineName.value : null,
            newPlatformName: newPlatform ? form.newPlatformName.value : null,
            newGenreName: newGenre ? form.newGenreName.value : null
        }

        console.log(game)

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        

        axios.post(`${apiURL}/api/game/add`, game,
        {headers: {
            "Access-Control-Allow-Origin": "*"
        }})
        .then(response => {
            console.log('Objet créé avec succès:', response.data);
          })
        .catch(error => {
        console.error('Erreur lors de la création de l\'objet:', error);
        });
    }
    
    return (
        <div className='addGameForm'>

            <Link to={'/user/profil'}>retour au dashboard</Link>

            <h2>Ajouter un jeu</h2>

            <form onSubmit={(e)=>sendData(e)}>

                <div className='simpleFormField'>
                    <label htmlFor="title">titre</label>
                    <input type="text" id='title' name='title'/>
                </div>

                <div className='simpleFormField'>
                    <label htmlFor="budget">budget</label>
                    <input type="number" id='budget' name='budget' min={0} step={1000} value={budget} onChange={(e) => changeBudget(e)}/>
                </div>

                <div className='simpleFormField'>
                    <label htmlFor="description">description</label>
                    <textarea type="text" id='description' name='description'/>
                </div>
                <div>
                    <h4>Nombre de joueur</h4>
                    <div>
                        <label htmlFor="minPlayer">min</label>
                        <input type="number" id='minPlayer' name='minPlayer' value={1}/>
                    </div>
                    <div>
                        <label htmlFor="maxPlayer">max</label>
                        <input type="number" id='maxPlayer' name='maxPlayer' value={1}/>
                    </div>
                </div>

                <div>
                    <h4>moteur de jeu</h4>

                    <label htmlFor="newEngine">nouveau moteur ?</label>
                    <input type="checkbox" id='newEngine' onClick={(e) => changeDisplay(e, "engine")}/>

                    { newEngine ?
                        <div className="addEngine">
                            <label htmlFor="newEngineName">nom du moteur</label>
                            <input type="text" id='newEngineName'/>
                        </div>
                    : 
                        <div className="selectEngine">
                            <select id='gameengines'>
                                {gameengines}
                            </select>
                        </div>
                    }
                </div>

                <div>
                    <h4>Plateforme(s)</h4>
                    <label htmlFor="newPlatform">nouvelle platforme ?</label>
                    <input type="checkbox" id='newPlatform' onClick={(e) => changeDisplay(e, "platform")}/>

                    { newPlatform ?
                        <div className="addPlatform">
                            <label htmlFor="newPlatformName">nom de la plateforme</label>
                            <input type="text" id='newPlatformName'/>
                        </div>
                    :
                        <div className="selectPlatform">
                            <select id='platforms' multiple>
                                {platforms}
                            </select>
                        </div>
                    }
                    
                </div>

                <div>
                    <h4>Genre(s)</h4>
                    <label htmlFor="newGenre">nouveau genre ?</label>
                    <input type="checkbox" id='newGenre' onClick={(e) => changeDisplay(e, "genre")}/>

                    { newGenre ?
                        <div className="addGenre">
                            <label htmlFor="newGenreName">nom du genre</label>
                            <input type="text" id='newGenreName'/>
                        </div>
                    :
                        <div>
                            <select id='genres' multiple>
                                {genres}
                            </select>
                        </div>
                    }
                </div>
                <button>ok</button>
            </form>
        </div>
  )
}
