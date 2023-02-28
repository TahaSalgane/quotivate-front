import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    return (
        <div className="reglogbackground">
            <div>
                <Container>
                    <Row className="vh-100 d-flex justify-content-center pt-3">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-2 border-primary"></div>
                            <Card className="shadow px-4 text-white bg-transparent">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">Sign Up</h2>
                                        <div className="mb-3">
                                            <Form>
                                                <p className="mb-0  text-center">
                                                    Already have an account ?
                                                    <Link
                                                        to="/login"
                                                        className="text-primary fw-bold d-inline-block ms-1"
                                                    >
                                                        Sign In
                                                    </Link>
                                                </p>
                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Name" />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">Email address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Create Account
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
        </div>
    );
};
export default Register;
