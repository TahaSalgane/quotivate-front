import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/password`;

export const forgotPassword = (email: string) => httpService.post(`${endPoint}/reset-password-link`, { email });
export const getResetPassword = (userId: any, token: any) =>
    httpService.get(`${endPoint}/reset-password/${userId}/${token}`);
export const resetPassword = (newPassword: string, userId: any, token: any) =>
    httpService.post(`${endPoint}/reset-password/${userId}/${token}`, { password: newPassword });
