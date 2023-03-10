import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/tags`;

export const getCategoris = () => httpService.get(`${endPoint}`);
export const createCategorie = (name: any) => httpService.post(`${endPoint}`, name);
export const updateCategorie = (data: any) => httpService.put(`${endPoint}/${data._id}`, data);
export const deleteCategorie = (id: string) => httpService.delete(`${endPoint}/${id}`);
