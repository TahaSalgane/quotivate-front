import httpService from 'services/httpService';
import { PERSIST_KEY } from 'store/userStore';

const endPoint = `${process.env.REACT_APP_API_URL}/auth`;

export const registerUser = (values: any) => httpService.post(`${endPoint}/register`, values);
export const loginUser = (values: any) => httpService.post(`${endPoint}/login`, values);

export const logout = (): void => {
    localStorage.removeItem(PERSIST_KEY);
};
