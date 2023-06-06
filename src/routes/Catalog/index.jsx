import { nanoid } from 'nanoid';
import axios from 'axios';

import Game from './Game/Game';

import './index.scss';
import { Link } from 'react-router-dom';

import {getFavorites, addToFavorites, removeFromFavorites} from '../../utils/favorites'
import { useQuery, useQueryClient, useMutation } from 'react-query';

const apiURL = process.env.REACT_APP_API_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const Index = () => {

  var isAdmin = false

  const { data: user } = useQuery('user');

  const fetchFavorites = async () => {
    if (user) {
      return getFavorites();
    }
  };

  const queryClient = useQueryClient();
  
  const { isLoading: isLoadingGames, data: games, isError: isErrorGames, error: errorGames } = useQuery('games', () => {
    return axios.get(`${apiURL}/api/games`);
  });

  const { isLoading: isLoadingFavorites, data: favorites, isError: isErrorFavorites, error: errorFavorites } = useQuery('favorites', () =>{
    if(user)
      return fetchFavorites();
  })


  const addFavoriteMutation = useMutation((gameId) => {
    return addToFavorites(gameId);
  }, {
    onSuccess: () => {
      queryClient.refetchQueries('favorites'); // Rafraîchir uniquement la requête 'favorites'
    },
  });

  const removeFavoriteMutation = useMutation((gameId) => {
    return removeFromFavorites(gameId);
  }, {
    onSuccess: () => {
      queryClient.refetchQueries('favorites'); // Rafraîchir uniquement la requête 'favorites'
    },
  });

  const localAddToFavorites = (gameId) => {
    addFavoriteMutation.mutate(gameId);
  };

  const localRemoveFromFavorites = (gameId) => {
    removeFavoriteMutation.mutate(gameId);
  };

  if (user) {
    isAdmin = user.roles.includes('ADMIN') ;
  }

  
  if (isLoadingGames || isLoadingFavorites) {
    return <h2>En cours de chargement</h2>;
  }

  if (isErrorGames || isErrorFavorites) {
    return <h2>{errorGames.message || errorFavorites.message}</h2>;
  }

  const gameIdsInFavorites = favorites?.map((favorite) => favorite.id) || [];
  

  return (
    <div className="catalog">
      {isAdmin && <Link to={'/game/add'}>ajouter un jeu</Link>}

      <h2>Catalogue</h2>
      <div className="games-row">
        {games?.data.map((game) => {
          // const isFavorite = gameIdsInFavorites.includes(game.id);

          return <Game {...game} isUser={user} isFavorite={gameIdsInFavorites.includes(game.id)} removeAction={(id) => localRemoveFromFavorites(id)} addAction={(id) => localAddToFavorites(id)} key={nanoid()} />;
        })}
      </div>
    </div>
  );
};

export default Index;
