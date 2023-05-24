import React from 'react'
import { Link } from 'react-router-dom'


export default function index({text, to, action}) {
  return (
    <li><Link to={to}>{text}</Link></li>
  )
}
