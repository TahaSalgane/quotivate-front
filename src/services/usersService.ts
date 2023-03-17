import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/users`;

export const getAllUsers = () => httpService.get(`${endPoint}`);
export const disactiveUser = (id: string) => httpService.put(`${endPoint}/dis/${id}`);
export const activeUser = (id: string) => httpService.put(`${endPoint}/active/${id}`);
export const banUser = (id: string) => httpService.put(`${endPoint}/blockUser/${id}`);
