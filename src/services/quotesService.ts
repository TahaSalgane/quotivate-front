import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/quotes`;

export const getQuotes = () => httpService.get(`${endPoint}`);
