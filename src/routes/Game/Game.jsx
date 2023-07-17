import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

import AddBudget from './AddBudget/AddBudget'

import './game.scss'

const apiURL = process.env.REACT_APP_API_URL;
// axios.get(`${apiURL}/api/game/${id}`)

export default function Index() {

    const {data: user} = useQuery('user')

    const [budgetDisplay, setBudgetDisplay] = useState(false)

    const {id} = useParams();
    const {isLoading, data/*, isError, error*/} = useQuery('game', () => { return axios.get(`${apiURL}/api/game/${id}`)})

    function handleBudgetFormDisplay(){
        setBudgetDisplay(!budgetDisplay)
    }
    
    
    if (isLoading) {
        return <h2>En cours de chargement</h2>
    } else {
        
        const {id, title, description, budgets} = data.data

        let budgetsElement = null

        // console.log(user?.roles[0])
        switch (user?.roles[0]){

            case "ADMIN":
                break
            case "PRODUCER":
                const {budgets} = data.data

                const lastBudget = budgets[budgets.length-1]


                budgetsElement =
                <>
                    <div className='budget'>
                        <h4>last budget</h4>
                        <p>{lastBudget.endDate}</p>
                        <p>{lastBudget.amount}</p>
                        <p>{lastBudget.message}</p>
                    </div>
                    <button onClick={handleBudgetFormDisplay}>modifier le budget</button>
                    {budgetDisplay ? <AddBudget game= {data.data} /> : null}
                </>

                break

            case "COMMUNITY_MANAGER":
                break
            default :
                break
        }


        if(user){
            var actionGameButton = user.roles.includes("ADMIN") && <>
                <Link to={'/game/edit/'+id} >éditer le jeu</Link>
                <Link to={'/game/delete/'+id} >supprimer le jeu</Link>
            </>
        }

        return ( 
            <div className='game'>
                {actionGameButton}
                <h3>{title}</h3>
                <p>{description}</p>

                {budgets ? budgetsElement : null}
                
            </div>
           )
    }

    // if (isError) {
    //     return <h2>{error.message}</h2>
    // }

  
}
