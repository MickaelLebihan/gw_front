import React from 'react'

export default function News({title, text}) {
  return (
    <div className="news">
        <h3>{title}</h3>
        <p>{text}</p>
    </div>
  )
}
