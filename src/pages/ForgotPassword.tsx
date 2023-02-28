import React from 'react';
import { Col, Button, Row, Card, Form } from 'react-bootstrap';
// import Index from 'components/core/Layout/Index';
const Forgotpassword = () => {
    return (
        <Row className="vh-100 d-flex justify-content-center mt-5">
            <Col md={8} lg={6} xs={12}>
                <div className="border border-2 border-primary"></div>
                <Card className="shadow px-4 bg-transparent text-white">
                    <Card.Body>
                        <div className="mb-3 mt-md-4">
                            <h2 className="fw-bold mb-2 text-center text-uppercase mt-5 ">Forgot Password</h2>
                            <div className="mb-3">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="text-center mt-4">Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" className="mt-3 mb-5">
                                            send verification code
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};
export default Forgotpassword;
