import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/auth`;

export const registerUser = (values: any) => httpService.post(`${endPoint}/register`, values);
