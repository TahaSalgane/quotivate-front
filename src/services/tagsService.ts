import httpService from 'services/httpService';

const endPoint = `${process.env.REACT_APP_API_URL}/tags`;

export const getTags = () => httpService.get(`${endPoint}`);
export const createTag = (name: any) => httpService.post(`${endPoint}`, name);
export const updateTag = (data: any) => httpService.put(`${endPoint}/${data._id}`, data);
export const deleteTag = (id: string) => httpService.delete(`${endPoint}/${id}`);
