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
