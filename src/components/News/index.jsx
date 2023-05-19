import React, { useEffect, useState } from 'react'
import News from './News'
import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL;

export default function Index() {

    const [newsLoaded, setNewsLoaded] = useState(false)
    const [news, setNews] = useState([])

    function LoadNews(){
        axios.get(`${apiURL}/api/news`)
        .then(response => {
            setNewsLoaded(true)
            setNews(response.data)
        })
        .catch(e => 
            console.log(e.message))
    }

    useEffect(() => {
        LoadNews()
    }, [])

    var newsList = news.map((anews => {
        return <News {...anews}/>
    }))

  return (
    <div className="newses">
        <h2>news</h2>
        {newsLoaded ? newsList : <p>chargement des news</p>}
        
    </div>
  )
}
