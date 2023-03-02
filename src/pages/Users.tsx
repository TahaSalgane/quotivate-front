import React, { useState } from 'react';
import { Col, Button, Row, Card, Form, Collapse, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Users: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="">
            <Button
                className="m-4"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Add user
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Row className="mb-5 d-flex pt-3 w-75">
                        <Col md={8} lg={6} xs={12} style={{ marginLeft: '100px', marginBottom: '50px', width: '65%' }}>
                            <div className="border border-2 border-primary"></div>
                            <Card className="shadow px-4 text-black">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">Add user</h2>
                                        <div className="mb-3">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center fw-bold">Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Name" />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center fw-bold">
                                                        Email address
                                                    </Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" />
                                                </Form.Group>

                                                <Form.Group className="mb-3 fw-bold" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Create User
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3"></div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Collapse>
            <h2 className="m-5">All Users</h2>
            <Table className="w-75 m-4 text-black" striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nme</th>
                        <th>Email</th>
                        <th className="text-center" colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>azetat@gmail.com</td>
                        <td>
                            <Link className="btn btn-warning" to="update/1">
                                Update
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-danger" to="delete/1">
                                delete
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>azetat@gmail.com</td>
                        <td>
                            <Link className="btn btn-warning" to="update/2">
                                Update
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-danger" to="delete/2">
                                delete
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Skalo</td>
                        <td>azetat@gmail.com</td>
                        <td>
                            <Link className="btn btn-warning" to="update/3">
                                Update
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-danger" to="delete/3">
                                delete
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
export default Users;
