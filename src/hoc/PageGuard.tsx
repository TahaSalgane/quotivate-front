import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore, { StoreStateInterface } from 'store/userStore';

type Props = {
    guarded?: boolean;
    isAdmin?: boolean;
    children: React.ReactNode | React.FC | any;
};

const PageGuard: React.FC<Props> = ({ guarded, isAdmin, children }: Props) => {
    const user = useUserStore((state: StoreStateInterface) => state.user);
    const canAccess = !guarded || (guarded && user && (!isAdmin || (isAdmin && user.isAdmin === true)));
    return canAccess ? children : <Navigate to="/" />;
};

PageGuard.defaultProps = {
    guarded: false,
    isAdmin: false,
};

export default PageGuard;
