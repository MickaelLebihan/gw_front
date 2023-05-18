import React from 'react'
import './game.scss'

export default function Game({title, description, gameEngine, platforms}) {
    var platformsList = platforms.map((platform)=>{
        return (<div className={"platform " + platform.name}>{platform.name}</div>)
    })
  return (
        <div className="game">
            <header>
                <h3>{title}</h3>
                <div className="info">
                    <span className='gameEngine'>{gameEngine.name}</span>
                    <div className="platforms">
                        {platformsList}
                    </div>
                </div>
            </header>
            <p>{description}</p>
        </div>
    )
}
