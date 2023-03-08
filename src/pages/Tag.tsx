import React from 'react';
import { useParams } from 'react-router-dom';
type tagparams = {
    tag: string;
};
const Tag = () => {
    const { tag } = useParams<tagparams>();
    return <>{tag}</>;
};
export default Tag;
