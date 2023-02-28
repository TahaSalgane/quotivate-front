import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/core/Layout/Header';
import Sidebar from 'components/core/Layout/Sidebar';
import Footer from 'components/core/Layout/Footer';
import { Col, Row } from 'react-bootstrap';

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
                <Row>
                    <Col md="3" className="mx-0 px-0 col-md-3">
                        <Sidebar />
                    </Col>
                    <Col md="9" className="mx-0 px-0 col-md-3">
                        <Outlet />
                    </Col>
                </Row>
            ) : (
                <Outlet />
            )}
            <Footer />
        </div>
    );
};

Index.defaultProps = {
    isAdmin: true,
};

export default Index;
