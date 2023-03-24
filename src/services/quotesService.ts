import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/quotes`;

export const getQuotes = (skip: number) => httpService.get(`${endPoint}?page=${skip}`);
export const getQuotesByTag = (skip: number, tag: any) => httpService.get(`${endPoint}?page=${skip}&tag=${tag}`);
export const getLatestQuotes = (skip: number) => httpService.get(`${endPoint}/latest?page=${skip}`);
export const getSingleQuote = (id: number) => httpService.get(`${endPoint}/=${id}`);
export const createQuote = (data: any) => httpService.post(`${endPoint}`, data);
export const deleteQuote = (id: string) => httpService.delete(`${endPoint}/${id}`);
export const updateQuote = (data: any) => httpService.put(`${endPoint}/${data._id}`, data);
export const toggleLike = (id: string) => httpService.put(`${endPoint}/like/${id}`);
