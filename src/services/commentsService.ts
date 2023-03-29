import httpService from 'services/httpService';
import { PERSIST_KEY } from 'store/userStore';

const token = localStorage.getItem(PERSIST_KEY);

const endPoint = `${process.env.REACT_APP_API_URL}/comment`;
export const createComment = (values: any) =>
    httpService.post(`${endPoint}`, values, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

export const deleteComment = (id: string) => httpService.delete(`${endPoint}/${id}`);
export const updateComment = (id: any, data: any) => httpService.put(`${endPoint}/${id}`, data);
export const getAllComments = () => httpService.get(`${endPoint}/`);
