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
        <h3>Développeurs de jeux et cultivateurs de  </h3>
        <p>
        GameSoft est une entreprise de jeux vidéo dédiée à la promotion de l'écologie. Nous souhaitons créer des jeux captivants qui sensibilisent les joueurs aux enjeux environnementaux et qui les encouragent à prendre des actions positives dans le monde réel.
        Ensemble, nous pouvons jouer pour préserver notre planète.
        </p>

        <div>
          <div className='border'><h2>Jouer</h2></div>
          <div><h2>Découvrir</h2></div>
          <div><h2>Participer</h2></div>
        </div>
        {/* <p>bienvenu {user.username}</p> */}
      </div>
    </div>
  )
}
