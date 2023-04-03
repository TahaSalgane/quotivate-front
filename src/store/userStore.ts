import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { UserAuthInterface } from 'types';

export const PERSIST_KEY = 'token';

export interface StoreStateInterface {
    user: UserAuthInterface | null;
    setUser: (data: UserAuthInterface) => void;
    clearUser: () => void;
    loading: boolean;
    setLoadingTrue: () => void;
    setLoadingFalse: () => void;
    isEmailVerified: boolean;
    setIsEmailVerified: () => void;
    setIsEmailnotVerified: () => void;
    isResetPassword: boolean;
    setIsResetPassword: () => void;
    setIsNotResetPassword: () => void;
}

const userStore = create<StoreStateInterface>()(
    persist(
        (set) => ({
            user: null,
            setUser: (data: UserAuthInterface) => set({ user: data }),
            clearUser: () => set({ user: null }),
            loading: false,
            setLoadingTrue: () => set({ loading: true }),
            setLoadingFalse: () => set({ loading: false }),
            isEmailVerified: false,
            setIsEmailVerified: () => set({ isEmailVerified: true }),
            setIsEmailnotVerified: () => set({ isEmailVerified: false }),
            isResetPassword: false,
            setIsResetPassword: () => set({ isEmailVerified: true }),
            setIsNotResetPassword: () => set({ isEmailVerified: false }),
        }),
        {
            name: 'zustore',
        },
    ),
);

const userStoreWithDevTools = create<StoreStateInterface>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (data: UserAuthInterface) => set({ user: data }),
                clearUser: () => set({ user: null }),
                loading: false,
                setLoadingTrue: () => set({ loading: true }),
                setLoadingFalse: () => set({ loading: false }),
                isEmailVerified: false,
                setIsEmailVerified: () => set({ isEmailVerified: true }),
                setIsEmailnotVerified: () => set({ isEmailVerified: false }),
                isResetPassword: false,
                setIsResetPassword: () => set({ isEmailVerified: true }),
                setIsNotResetPassword: () => set({ isEmailVerified: false }),
            }),
            {
                name: 'zustore',
            },
        ),
    ),
);

const useUserStore = process.env.REACT_APP_ENV_MODE === 'development' ? userStoreWithDevTools : userStore;

export default useUserStore;
