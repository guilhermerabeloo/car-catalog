import axios from 'axios';

export const carCatalogApi = axios.create({
    baseURL: 'https://car-catalog-api.vercel.app/',
})