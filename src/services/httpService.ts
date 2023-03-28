import axios from 'axios';
import { toast } from 'react-toastify';

import EventBus from 'utils/eventBus';

import { PERSIST_KEY } from 'store/userStore';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const ResponseStatus = error.response ? error.response.status : -1;
        switch (true) {
            case ResponseStatus === 401:
                // toast.error('Unauthorized!');
                setTimeout(() => EventBus.dispatch('logout'), 1000);
                return Promise.reject();
                break;
            case ResponseStatus === 403:
                toast.error("You don't have permission to do this.. (Forbidden)!");
                break;
            case ResponseStatus === -1 || ResponseStatus === 402 || ResponseStatus > 404:
                toast.error('Unexpected error occurred!');
                break;
        }
        return Promise.reject(error.response.data);
    },
);
axios.interceptors.request.use(
    (config) => {
        if (config.headers.authorization !== false) {
            const token = localStorage.getItem(PERSIST_KEY);
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
                console.log(token);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
};
