import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/core/Layout/Header';
import Sidebar from 'components/core/Layout/Sidebar';
import Footer from 'components/core/Layout/Footer';
import { Container } from 'react-bootstrap';

const MyGridContainer = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    // grid-gap: 20px;

    .my-sidebar {
        height: 100vh;
        position: sticky;
        top: 2px;
    }

    .my-content {
        margin: 2px 0px 0px 2px;
        box-shadow: 1px 1px 5px black inset;
        width: 99%;
    }
`;

type Props = {
    isNotDark?: boolean;
    isAdmin?: boolean;
    layoutDesign?: string;
};

const Index: React.FC<Props> = ({ isNotDark, isAdmin, layoutDesign }: Props) => {
    return (
        <div className={layoutDesign}>
            <Header isNotDark={isNotDark} />
            {isAdmin ? (
                <MyGridContainer>
                    <div className="my-sidebar">
                        <Sidebar />
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
            <Footer />
        </div>
    );
};

Index.defaultProps = {
    isAdmin: true,
};

export default Index;
