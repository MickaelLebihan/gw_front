import axios from 'axios';

import {loadUser} from '../utils/user'



const apiURL = process.env.REACT_APP_API_URL;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export async function getFavorites() {
    try {
        const response = await axios.get(`${apiURL}/user/favorites`);
        return response.data;
    } catch (error) {
        console.error("Impossible de récupérer les favoris :", error);
        throw error;
    }
}

export async function handleFavorites(gameId, action, queryClient) {
    // action must be "add" or "remove"
    console.log(gameId, action)
    try {
        await axios.post(`${apiURL}/user/favorites/${action}`, { gameId });
        await loadUser(queryClient)
    } catch (error) {
        console.error("Impossible d'ajouter/supprimer le jeu au favoris : ", error);
        throw error;
    }
}