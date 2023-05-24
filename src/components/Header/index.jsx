import React from 'react'
import MainMenu from '../MainMenu'
import LoginBox from '../MainMenu/LoginBox'
import { Link } from 'react-router-dom'
import './index.scss'

export default function index() {
  return (
    <header>
        <div className="inner">
            <Link to={"/"}><img className='logo' src="/assets/gamesoft_150.png" alt="" /></Link>
            <MainMenu />
        </div>
    </header>
  )
}
