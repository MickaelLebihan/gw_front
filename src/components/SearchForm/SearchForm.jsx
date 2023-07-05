import axios from 'axios';
import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';

import './searchForm.scss'

const apiURL = process.env.REACT_APP_API_URL;


export default function Index({onChange}) {

    const {isLoading, data } = useQuery(["gameAuxiliaryData"], () => GetData())

    const [selectGameEngine, setSelectGameEngine] = useState(false)
    const [selectDevStatus, setSelectDevStatus] = useState(false)
    
    var searchParams = {
        title: null,
        devstatus: null,
        genres: null,
        platforms: null
    }
    const [searchData, setSearchData] = useState({})

    useEffect(()=> {
        // if (searchData.title.length > 2)
            // filterResult(searchData)
            var data = searchData
        // console.log(searchData)
        updateData(data)
        return onChange(data)
    }, [searchData])

    
    
    /* génére le formulaire a partir des données de la BDD  */

    async function GetData(){

        const auxData = await Promise.all([
            axios.get(`${apiURL}/api/game_aux_data`).then(response => response.data),
        ])

        return auxData
    }
    
    if (isLoading){
        return <p>form loading</p>
    } else {
        var gameengines = data[0].gameengines
        var platforms = data[0].platforms
        var genres = data[0].genres
        var devstatuses = data[0].devstatuses

        devstatuses = devstatuses.map((devstatus) => {
            return <option
                    key={nanoid()}
                    value={devstatus.id}
                    selected={searchData?.devstatus == devstatus.id ? true : null }>
                {devstatus.name}
            </option>
        })
        gameengines = gameengines.map((gameengine) => {
            return <option
                    key={nanoid()}
                    value={gameengine.id}
                    selected={searchData?.gameEngine == gameengine.id ? true : null }>
                {gameengine.name}
            </option>
        })
        platforms = platforms.map((platform) => {
            return <option
                    key={nanoid()}
                    value={platform.id}
                    selected={searchData?.platforms?.includes(platform.id)? true : null }>
                {platform.name}
            </option>
        })
        genres = genres.map((genre) => {
            return <option
                    key={nanoid()}
                    value={genre.id}
                    selected={searchData?.genres?.includes(genre.id)? true : null }>
                {genre.name}
            </option>
        })
    }


    /* crée un objet avec les parametres séléctionné du formulaire */


    
    function setParameter(e){
        var data = searchData
        // console.log(searchData)
        // data.title = e.target.title.value
        
        // console.log(searchData)
        switch (e.target.name){
            case "gameEngine":
                data = {...data,  [e.target.name]: e.target.value }
                break
            case "platforms":
                var selectLength = e.target.options.length
                var options = e.target.options
                
                var selectedPlatforms = []
                
                for(var i=0; i<selectLength; i++){
                    var element = options[i]
                    element.selected && selectedPlatforms.push(parseInt(element.value))
                }

                if (selectedPlatforms.length === 0){
                    delete data.platforms
                    break
                }
                    data = {...data,  [e.target.name]: selectedPlatforms }
                break

            case "genres":
                var selectLength = e.target.options.length
                var options = e.target.options
                
                var selectedGenres = []
                
                for(var i=0; i<selectLength; i++){
                    var selectedElement = options[i]
                    selectedElement.selected && selectedGenres.push(parseInt(selectedElement.value))
                }

                if (selectedGenres.length === 0){
                    delete data.genres
                    break
                }

                data = {...data,  [e.target.name]: selectedGenres }
                break
            case "title":
                var title = e.target.value !== "" ? e.target.value : null 
                    if(title === null){
                        delete data.title
                        data = {...data}
                        break
                    }
                    data = {...data,  [e.target.name]: title }
                break
            case "devstatus":
                    data = {...data,  [e.target.name]: e.target.value }
                break
            default:
                break
        }

        updateData(data)
    }


    function testData(){
        console.log(searchData)
        writeParams(searchData)
        onChange(searchData)
    }

    // async function filterResult (params){
    //     console.log(params)
    //     return await axios.get(`${apiURL}/api/games`, { params }).then(response => {console.log(response.data)})
    // }

    function updateData(data){
        setSearchData(data)
    }

    function isChecked(name){
        switch (name) {
            case "gameengine":
                setSelectGameEngine(!selectGameEngine)
                console.log(selectGameEngine)
                var data = searchData

                    if (searchData){
                        if(!selectGameEngine === false){
                            delete data.gameEngine
                            break
                        }
                    }
                data.gameEngine = "1"
                updateData(data)
                break

            case "devstatus":
                setSelectDevStatus(!selectDevStatus)
                var data = searchData
                if (searchData){
                    if(!selectDevStatus === false){
                        delete data.devstatus
                        break
                    }
                }
                data.devstatus = "1"
                updateData(data)
                break

            default:
                
        }
        // console.log(searchData)
    }

    function writeParams(params){
        // var theString = "Votre recherche: les jeux"
        for (var param in params){
            if (Array.isArray(params[param])){
                var array = params[param]
                console.log("is array")
                for (var j in array){
                    console.log(j)
                }
            }
            console.log(param, params[param])
        }
    }
    

  return (
    <div className='searchForm'>
        <button onClick={()=>testData()}>test !</button>
        <form >
            <div className="formInput">
                <label htmlFor="title">titre</label>
                <input type="text" name="title" onChange={(e) => setParameter(e, "title")}/>
            </div>
            <div className="formInput">
                <label htmlFor="genres">genres</label>
                <select name="genres" id="genres"  onChange={(e) => setParameter(e, "genre")}  multiple>
                    {genres}
                </select>
            </div>
            <div className="formInput">
                <label htmlFor="platforms">supports</label>
                <select name="platforms" id="platforms"  onChange={(e) => setParameter(e, "genre")}  multiple>
                    {platforms}
                </select>
            </div>
            <div className="formInput">
                <div className="formLabel">
                    <label htmlFor="devstatus">devStatus</label>
                    <input type="checkbox" name="selectDevStatus" id="selectDevStatus" onChange={()=>isChecked("devstatus")} checked={selectDevStatus}/>
                </div>
                { selectDevStatus &&

                    <select name="devstatus" id="devstatus"  onChange={(e) => setParameter(e, "devStatus")} >
                        {devstatuses}
                    </select>
                }
            </div>
            <div className="formInput">
                <div className="formLabel">
                    <label htmlFor="gameEngine">game engines</label>
                    <input type="checkbox" name="selectGameEngine" id="selectGameEngine" onChange={()=>isChecked("gameengine")} checked={selectGameEngine}/>
                </div>
                { selectGameEngine &&
                    <select name="gameEngine" id="gameEngine"  onChange={(e) => setParameter(e, "gameEngine")} >
                        {gameengines}
                    </select>
                }
            </div>

        </form>
    </div>
  )
}
