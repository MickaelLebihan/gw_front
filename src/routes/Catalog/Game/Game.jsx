import React from 'react'
import './game.scss'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

export default function Game({id, title, description, gameEngine, platforms}) {
    var platformsList = platforms.map((platform)=>{
        return (<div className={"platform " + platform.name} key={nanoid()}>{platform.name}</div>)
    })
  return (
    <Link to={"/game/"+id}>
        <div className="game">
            <header>
                <h3>{title}</h3>
                <div className="info">
                    {gameEngine && <span className='gameEngine'>{gameEngine.name}</span>}
                    <div className="platforms">
                        {platformsList}
                    </div>
                </div>
            </header>
            <p>{description}</p>
        </div>
    </Link>
    )
}
