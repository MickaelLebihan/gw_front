import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

export default function index() {
  return (
    <>
        <nav>
            <ul>
                <li><Link to={"/"} >accueil</Link></li>
                <li><Link to={"/"} >jeux</Link></li>
                <li><Link to={"/"} >à propos</Link></li>
            </ul>
        </nav>
    </>
  )
}
