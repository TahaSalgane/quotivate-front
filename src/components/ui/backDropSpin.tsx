import React from 'react';
import styled from 'styled-components';

const Spin = styled.div`
    @-webkit-keyframes bd-spin {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes bd-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 9999;
    display: block;

    &::after {
        content: '';
        display: block;
        position: absolute;
        left: 48%;
        top: 40%;
        width: 40px;
        height: 40px;
        border-style: solid;
        border-color: black;
        border-top-color: transparent;
        border-width: 4px;
        border-radius: 50%;
        -webkit-animation: bd-spin 0.8s linear infinite;
        animation: bd-spin 0.8s linear infinite;
    }
`;

const BackDropSpin: React.FC = () => {
    return <Spin />;
};

export default BackDropSpin;
