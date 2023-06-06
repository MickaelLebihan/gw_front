import axios from 'axios';

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

export async function addToFavorites(gameId) {
    try {
        const response = await axios.post(`${apiURL}/user/favorites/add`, { gameId });
        return response.data;
    } catch (error) {
        console.error("Impossible d'ajouter le jeu aux favoris :", error);
        throw error;
    }
}

export async function removeFromFavorites(gameId) {
    try {
        const response = await axios.post(`${apiURL}/user/favorites/remove`, { gameId });
        return response.data;
    } catch (error) {
        console.error("Impossible de supprimer le jeu des favoris :", error);
        throw error;
    }
}