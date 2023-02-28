import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    guarded?: boolean;
    children: React.ReactNode | React.FC | any;
};

const PageGuard: React.FC<Props> = ({ guarded, children }: Props) => {
    const user = true;
    const canAccess = !guarded || (guarded && user);
    return canAccess ? children : <Navigate to="/" />;
};

PageGuard.defaultProps = {
    guarded: false,
};

export default PageGuard;
