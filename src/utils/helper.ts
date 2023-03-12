import jwtDecode from 'jwt-decode';

import { UserAuthInterface } from 'types';
import { PERSIST_KEY } from 'store/userStore';

const getUser = (token?: string | null): UserAuthInterface | null => {
    try {
        const jwt: string | null = token ? token : localStorage.getItem(PERSIST_KEY);
        if (jwt !== null) {
            const userDecoded: UserAuthInterface = jwtDecode(jwt);
            return userDecoded;
        }
        return null;
    } catch (ex) {
        return null;
    }
};

export default getUser;
