import axios from 'axios'
import React, { useState } from 'react'

const apiURL = process.env.REACT_APP_API_URL;

export default function Add_Budget({game}) {

  function prependZero(number){
    return number < 10 ? '0'+number : number
  }

  function convertDate(date){
    return date.getFullYear()+'-'+ prependZero(date.getMonth()) +'-'+ prependZero(date.getDate())
  }
  
  const [formData, setFormData] = useState({
    // gameId: ,
    amount: game.amount,
    message: "",
    devStatus: "",
    releaseDate: convertDate(new Date())
  })
  
  function handleChange(e){
    let data = { ...formData, [e.target.id]: e.target.value}
    setFormData(data)
  }

  const options = async () => {

    const devStatuses = await axios.get(`${apiURL}/api/devStatus`)

    return devStatuses ? devStatuses.foreach((devStatus)=> <options value={devStatus.id}>{devStatus.name}</options>) : null
}

  async function handleSubmit(e){
    e.preventDefault()
    // console.log(formData)

    axios.post(`${apiURL}/api/game/${game.slug_Title}/addBudget`, formData)
  }

  return (
    <div>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <div className='simpleFormField'>
          <label htmlFor='amount'>montant</label>
          <input type='number' name='amount' id='amount' step={10000} value={formData.amount} onChange={handleChange}/>
        </div>

        <div className='simpleFormField'>
          <label htmlFor='devStatus'>état de developpement</label>
          <select name="devStatus" id="devStatus">
            {options()}
          </select>
        </div>

        <div className='simpleFormField'>
          <label htmlFor='message'>message</label>
          <textarea name="message" id="message" cols="30" rows="10" placeholder='Raison du changement du budget...'></textarea>
        </div>

        <div className='simpleFormField'>
          <label htmlFor='releaseDate'>date de sortie</label>
          <input type='date' name='releaseDate' id='releaseDate' value={formData.releaseDate} onChange={handleChange}/>
        </div>

        <button>valider</button>
      </form>
    </div>
  )
}
