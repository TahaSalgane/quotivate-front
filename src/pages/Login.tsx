import React from 'react';
import { Col, Button, Row, Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from 'services/authService';
import useUserStore, { StoreStateInterface, PERSIST_KEY } from 'store/userStore';
import getUser from 'utils/helper';
import { toast } from 'react-toastify';
import { loginSchema } from 'utils/YupValidation';
import { loginFormValues } from 'types/interfaces/formValidate.interface';

const Login: React.FC = () => {
    const navigation = useNavigate();

    const setUser = useUserStore((state: StoreStateInterface) => state.setUser);

    const submitForm = async (values: loginFormValues) => {
        try {
            const res = await loginUser(values);
            const token = res.data.realData;
            localStorage.setItem(PERSIST_KEY, token);
            const userDecoded = getUser(token);
            setUser(userDecoded!);
            navigation('/');
            toast.success('You has been login with successfully', { autoClose: 1000 });
        } catch (excep: any) {
            toast.error(excep.message, { autoClose: 3000 });
            console.log(excep);
        }
        // console.log(values, process.env.REACT_APP_API_URL);
    };

    return (
        <Formik
            validationSchema={loginSchema}
            onSubmit={submitForm}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, handleBlur }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="vh-100 d-flex justify-content-center pt-3">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-2 border-primary"></div>
                            <Card className="shadow px-4 text-white bg-transparent">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">Sign in</h2>
                                        <div className="mb-3">
                                            <p className="mb-0  text-center">
                                                not registered yet?
                                                <Link
                                                    to="/register"
                                                    className="text-primary fw-bold d-inline-block ms-1"
                                                >
                                                    Sign up ?
                                                </Link>
                                            </p>
                                            <Form.Group className="mb-3" controlId="validationFormik02">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Your email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    isInvalid={!!errors.email && touched.email}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Text className="text-danger">
                                                    {touched.email && errors.email ? (
                                                        <div className="text-danger">{errors.email}</div>
                                                    ) : null}
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="validationFormik03">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Your password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isValid={touched.password && !errors.password}
                                                    isInvalid={!!errors.password && touched.password}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Text className="text-danger">
                                                    {touched.password && errors.password ? (
                                                        <div className="text-danger">{errors.password}</div>
                                                    ) : null}
                                                </Form.Text>
                                            </Form.Group>

                                            <div className="d-grid">
                                                <Button type="submit">Login</Button>
                                            </div>
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
                </Form>
            )}
        </Formik>
    );
};
export default Login;
