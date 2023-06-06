import React from 'react'
import News from '../../components/News'
import './index.scss'
// import { useQueryClient } from 'react-query'

export default function Index() {
  // const queryClient = useQueryClient();
  //const games = useQuery("games")
  // const query = queryClient.getQueryData("games")
  return (
    <div className='home'>
      <News />
      <div className="content">
        <h3>contenu principal</h3>
        {/* <p>bienvenu {user.username}</p> */}
      </div>
    </div>
  )
}
