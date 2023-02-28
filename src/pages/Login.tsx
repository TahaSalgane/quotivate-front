import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div className="reglogbackground">
            <Container>
                <Row className="vh-100 d-flex justify-content-center pt-3">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-2 border-primary"></div>
                        <Card className="shadow px-4 bg-transparent text-white">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">Sign In</h2>
                                    <div className="mb-3">
                                        <Form>
                                            <p className="mb-0 text-center">
                                                Not registered yet?
                                                <Link
                                                    to="/Register"
                                                    className="text-primary fw-bold d-inline-block ms-1"
                                                >
                                                    Sign Up ?
                                                </Link>
                                            </p>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Log in
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0 text-center">
                                                Forgot
                                                <Link
                                                    to="/forgotpassword"
                                                    className="text-primary fw-bold d-inline-block ms-1"
                                                >
                                                    Password ?
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Login;
