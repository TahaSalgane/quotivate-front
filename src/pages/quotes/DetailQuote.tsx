import BreadCrumbs from 'components/ui/breadCrumbs';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { getSingleQuote } from 'services/quotesService';

import { useParams } from 'react-router-dom';

const Tag = () => {
    const { id } = useParams();

    useEffect(() => {
        const loadData = async () => {
            console.log(id);
            console.log(getSingleQuote(id as any));
        };
        loadData();
    }, []);

    return (
        <Container>
            <BreadCrumbs
                data={[
                    {
                        text: 'Home',
                        active: true,
                    },
                ]}
            />
            <Row className="mt-5">
                <Col md={8}></Col>
                <Col md={4}>
                    <h3>tag:</h3>
                    <Row>fzf</Row>
                </Col>
            </Row>
        </Container>
    );
};
export default Tag;
