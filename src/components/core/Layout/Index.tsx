import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/core/Layout/Header';
import Sidebar from 'components/core/Layout/Sidebar';
import Footer from 'components/core/Layout/Footer';
import { Container } from 'react-bootstrap';

import useUserStore, { StoreStateInterface } from 'store/userStore';

const MyGridContainer = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    // grid-gap: 20px;

    .my-sidebar {
        height: 100vh;
        position: sticky;
        top: 40px;
    }

    .my-content {
        margin: 2px 0px 0px 2px;
        box-shadow: 1px 1px 5px black inset;
        width: 99%;
    }
`;

type Props = {
    isNotDark?: boolean;
    layoutDesign?: string;
    userlogOut: () => void;
};

const Index: React.FC<Props> = ({ isNotDark, layoutDesign, userlogOut }: Props) => {
    const user = useUserStore((state: StoreStateInterface) => state.user);
    return (
        <div className={layoutDesign}>
            <div style={{ position: 'sticky', top: '0', zIndex: '999' }}>
                <Header isNotDark={isNotDark} userlogOut={userlogOut} />
            </div>
            {user?.isAdmin ? (
                <MyGridContainer>
                    <div className="my-sidebar">
                        <Sidebar userlogOut={userlogOut} />
                    </div>
                    <div className="my-content">
                        <Container fluid className="unContainer">
                            <Outlet />
                        </Container>
                    </div>
                </MyGridContainer>
            ) : (
                <Container fluid className="unContainer">
                    <Outlet />
                </Container>
            )}
            <div className="page-footer pt-4">
                <Footer />
            </div>
        </div>
    );
};
export default Index;
