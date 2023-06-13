import axios from 'axios';
import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';

const apiURL = process.env.REACT_APP_API_URL;


export default function Index({result}) {

    const {isLoading, data } = useQuery(["gameAuxiliaryData"], () => GetData())
    
    const [searchData, setSearchData] = useState(searchParams)
    

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
                    selected={searchData?.devStatus === devstatus.id ? true : null }>
                {devstatus.name}
            </option>
        })
        gameengines = gameengines.map((gameengine) => {
            return <option
                    key={nanoid()}
                    value={gameengine.id}
                    selected={searchData?.gameengines === gameengine.id ? true : null }>
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


    var searchParams = {
        title: null,
        devStatus: null,
        genres: null,
        platforms: null
    }

    
    function setParameter(e){
        var data = searchData
        console.log(searchData)
        // data.title = e.target.title.value
        
        // console.log(searchData)
        switch (e.target.name)
        {
            case "gameEngines":
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

                data = {...data,  [e.target.name]: selectedGenres }
                break
            case "title":
                var title = e.target.value !== "" ? e.target.value : null 
                data = {...data,  [e.target.name]: title }
                break
            case "devStatus":
                data = {...data,  [e.target.name]: e.target.value }
                break
            default:
                break
        }

        setSearchData(data)
    }

    function testData(){
        result(searchData)
        // console.log(searchData)
    }

    async function filterResult (params){
        console.log(params)
        return await axios.get(`${apiURL}/api/games`, { params }).then(response => {console.log(response.data)})
    }
    
    useEffect(()=> {
        // if (searchData.title.length > 2)
            // filterResult(searchData)
            console.log(searchData)
            result(searchData)
    }, [searchData])

  return (
    <>
        <button onClick={()=>testData()}>test !</button>
        <form onChange={(e) => setParameter(e)}>
            <div className="formInput">
                <label htmlFor="title">titre</label>
                <input type="text" name="title" /*onChange={(e) => setParameter(e, "title")}*//>
            </div>
            <div className="formInput">
                <label htmlFor="genres">genres</label>
                <select name="genres" id="genres" /* onChange={(e) => setParameter(e, "genre")} */ multiple>
                    {genres}
                </select>
            </div>
            <div className="formInput">
                <label htmlFor="platforms">supports</label>
                <select name="platforms" id="platforms" /* onChange={(e) => setParameter(e, "genre")} */ multiple>
                    {platforms}
                </select>
            </div>
            <div className="formInput">
                <label htmlFor="devStatus">devStatus</label>
                <select name="devStatus" id="devStatus" /* onChange={(e) => setParameter(e, "devStatus")} */>
                    {devstatuses}
                </select>
            </div>
            <div className="formInput">
                <label htmlFor="gameEngines">game engines</label>
                <select name="gameEngines" id="gameEngines" /* onChange={(e) => setParameter(e, "devStatus")} */>
                    {gameengines}
                </select>
            </div>

        </form>
    </>
  )
}
