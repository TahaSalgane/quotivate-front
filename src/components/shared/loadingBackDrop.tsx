import React from 'react';

import useUserStore, { StoreStateInterface } from 'store/userStore';

import BackDropSpin from 'components/ui/backDropSpin';

const LoadingBackDropSpin: React.FC = () => {
    const loading = useUserStore((state: StoreStateInterface) => state.loading);
    return <>{!!loading && <BackDropSpin />}</>;
};

export default LoadingBackDropSpin;
