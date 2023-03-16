import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/users`;

export const getAllUsers = () => httpService.get(`${endPoint}`);
