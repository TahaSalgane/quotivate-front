import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faQuoteLeftAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <Container fluid className="mt-5">
                <Row>
                    <Col lg="4" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <FontAwesomeIcon className="text-secondary fa-4x me-1" icon={faUsers} />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h2 className="card-category">Users</h2>
                                        <Card.Title as="h4">120</Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/users" className="btn btn-dark w-100">
                                    See all Users
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="4" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FontAwesomeIcon className="text-dark fa-4x me-1" icon={faQuoteLeftAlt} />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h3 className="card-category">Quotes</h3>
                                        <Card.Title as="h4">5</Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/quotes" className="btn btn-dark w-100">
                                    See all Users
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="4" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FontAwesomeIcon className="text-success  fa-4x me-1" icon={faTags} />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h4 className="card-category">tags</h4>
                                        <Card.Title as="h4">5</Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/tags" className="btn btn-dark w-100">
                                    See all tags
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
                ;
            </Container>
        </>
    );
};

export default Dashboard;
