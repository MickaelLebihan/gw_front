import React from 'react'
import UserMenu from './UserMenu'

import {getFavorites, handleFavorites} from '../../utils/favorites'
import { useQuery, useQueryClient, useMutation } from 'react-query';

export default function Favorites() {

  const queryClient = useQueryClient();

  const fetchFavorites = async () => {
    return getFavorites();
  };

  const removeFavoriteMutation = useMutation((gameId) => {
    return handleFavorites(gameId, "remove");
  }, {
    onSuccess: () => {
      queryClient.refetchQueries('favorites'); // Rafraîchir uniquement la requête 'favorites'
    },
  });

  const { isLoading, data, isError, error } = useQuery('favorites', () => fetchFavorites());

  const localRemoveFromFavorites = (gameId) => {
    removeFavoriteMutation.mutate(gameId);
  };

  if (isLoading) {
    return <h2>En cours de chargement</h2>;
  }

  if (isError) {
    return <p>Erreur lors du chargement de la liste</p>;
  }

  const favoritesElements = data.map((favorite) => (
    // <div className="fav" key={favorite.id}>
    <tr key={favorite.id}>
      <td>{favorite.title}</td>
      <td><button onClick={() => localRemoveFromFavorites(favorite.id)}>x</button></td>
    </tr>
  ));

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <UserMenu />
      <div className="content">
        <div className="favorites">
          <h2>Favoris</h2>
          <div className="favoritesGames">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
            {favoritesElements}
              </tbody>
            </table>
            {/* {favoritesElements} */}
          </div>
        </div>
      </div>
    </div>
  );
}
