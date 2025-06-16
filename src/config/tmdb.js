import axios from 'axios';
import { config } from './index.js';

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${config.tmdbAccessToken}`,
        accept: 'application/json',
    },
});

export default tmdb;
