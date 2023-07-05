import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import {getFavorites, handleFavorites} from '../../utils/favorites'


import qs from 'qs'


import Game from './Catalog-Game/Catalog-Game';
import SearchForm from '../../components/SearchForm/SearchForm'


const apiURL = process.env.REACT_APP_API_URL;

export default function Catalog() {
    
    const [isLoading, setIsLoading] = useState(true)
    const [filtering, setFiltering] = useState(false)

    const [games, setGames] = useState({})
    const [searchData, setSearchData] = useState()

    const { data: user } = useQuery('user');
    // const { data: favorites } = useQuery('favorites');

    useEffect(() => {
        axios.get(`${apiURL}/api/games`, {
            params: searchData,
            paramsSerializer: params => {
                return qs.stringify(params)}}).then(response => {
                    setIsLoading(false)
                    setGames(response.data)
                })
        }, [searchData]
    )


    // affichage des jeux
    var gamesElement = <p>Jeux en cours de chargement</p>

    if (!isLoading){
        // console.log(favorites)
        if(games.length === 0){
            gamesElement = <p>votre recherche ne retourne pas de résultat</p>
        } else {
            gamesElement = games.map((game) => {
            return <Game
                        {...game}
                        user = {user}
                        key = {nanoid()}
                        handleFavoriteAction = {(data) => handleFavoriteMutation.mutate(data)}
                    />;
        })}
    }


    // affichage du formulaire de filtre de recherche
    var filterForm = <button onClick={() => setFiltering(!filtering)}>filtrer</button>

    if(!filtering){
        filterForm = <>
            <button onClick={()=>setFiltering(!filtering)}>masquer</button>
            <SearchForm onChange={handleChange}/>
        </>
    }

    const queryClient = useQueryClient();

    const handleFavoriteMutation = useMutation(({id, action}, queryClient) => {
        return handleFavorites(id, action, queryClient);
      }, {
        onSuccess: () => {
          queryClient.refetchQueries('favorites'); // Rafraîchir uniquement la requête 'favorites'
        },
      });

    function handleChange(data){
        setSearchData(data)
        }

    return (
        <div>
            <h2>Catalogue</h2>

            {filterForm}

            <div className="games-row">
                {gamesElement}
            </div>
        </div>
    )
}
