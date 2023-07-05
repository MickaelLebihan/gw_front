import { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import qs from 'qs'

import SearchForm from '../../components/SearchForm/SearchForm'
import Game from './Catalog-Game/Catalog-Game';
import {getFavorites, handleFavorites} from '../../utils/favorites'

import './catalog.scss';


const apiURL = process.env.REACT_APP_API_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const Index = () => {

  var isAdmin = false
  // var isStaff = false

  const { data: user } = useQuery('user');
  const [searchData, setSearchData] = useState()

  const fetchFavorites = async () => {
    console.log("recheche favoris...")
    if (user && !user.roles.includes("ADMIN")) {
      
      return getFavorites();
    }
  };

  const queryClient = useQueryClient();

  const fetchGameData = async (searchParams) => {
    // searchParams = {
    //   title:"suikoden",
    //   genres:[2],
    //   platforms:[3],
    //   devStatus: 2
    // }
    console.log(searchParams)
    const data = axios.get(`${apiURL}/api/games`, {
      params: searchParams,
      paramsSerializer: params => {
      return qs.stringify(params)
    }
  });
    return data
  }
  
  const { isLoading: isLoadingGames, data: games, isError: isErrorGames, error: errorGames } = useQuery('games', fetchGameData(searchData));

  const { isLoading: isLoadingFavorites, data: favorites, isError: isErrorFavorites, error: errorFavorites } = useQuery('favorites', () =>{
    if(user && !user.roles.includes("ADMIN"))
      return fetchFavorites();
  })


  const handleFavoriteMutation = useMutation((gameId, action) => {
    return handleFavorites(gameId, action);
  }, {
    onSuccess: () => {
      queryClient.refetchQueries('favorites'); // Rafraîchir uniquement la requête 'favorites'
    },
  });


  if (user) {
    // isStaff = user.roles.includes('ADMIN') || user.roles.includes('CM') || user.roles.includes('PRODUCER') ? true : false;
    isAdmin = user.roles.includes('ADMIN') ;
  }

  
  if (isLoadingGames || isLoadingFavorites) {
    return <h2>En cours de chargement</h2>;
  }

  if (isErrorGames || isErrorFavorites) {
    return <h2>{errorGames.message || errorFavorites.message}</h2>;
  }

  const gameIdsInFavorites = favorites?.map((favorite) => favorite.id) || [];

  function handleChange(data){
    // console.log("truc",data)
    setSearchData(data)
  }
  

  return (
    <div className="catalog">
      {isAdmin && <Link to={'/game/add'}>ajouter un jeu</Link>}

      <h2>Catalogue</h2>

      

      <SearchForm onChange={handleChange}/>

      <div className="games-row">

        {/* {console.log(games.data)} */}

        {Array.isArray(games.data) ? games.data.map((game) => {
          // const isFavorite = gameIdsInFavorites.includes(game.id);

              return <Game
                      {...game}
                      isUser={user}
                      isAdmin={isAdmin}
                      isFavorite={gameIdsInFavorites.includes(game.id)}
                      handleFavoriteAction={(id, action) => handleFavoriteMutation.mutate(id, action)}
                      key={nanoid()} />;
          }) : null
        }

      </div>
    </div>
  );
};

export default Index;
