import React from 'react'
import News from '../../components/News'
import './index.scss'

export default function index() {
  return (
    <div className='home'>
      <News />
      <div className="content">
        <h3>contenu principal</h3>
      </div>
    </div>
  )
}
