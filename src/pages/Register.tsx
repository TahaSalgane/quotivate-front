import React, { useState } from 'react';
import { Col, Button, Row, Card, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from 'services/authService';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    username: Yup.string().min(5, 'Must be 5 characters or more').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Must be 5 characters or more').required('required'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null as any], 'password not matched')
        .required('required'),
});
interface MyFormValues {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}

const Register: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigation = useNavigate();
    const submitForm = async (values: MyFormValues) => {
        try {
            const res = await registerUser(values);
            console.log(res);
            toast.success('Register has been successful !');
            navigation('/login');
        } catch (excep: any) {
            setErrorMessage(excep.message);
            toast.error(excep.message);
        }
        // console.log(values, process.env.REACT_APP_API_URL);
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={submitForm}
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmpassword: '',
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
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">Sign Up</h2>
                                        <div className="mb-3">
                                            <p className="mb-0  text-center">
                                                Already have an account ?
                                                <Link to="/login" className="text-primary fw-bold d-inline-block ms-1">
                                                    Sign In
                                                </Link>
                                            </p>
                                            <Form.Group className="mb-3" controlId="validationFormik01">
                                                <Form.Label>username</Form.Label>
                                                <Form.Control
                                                    type="name"
                                                    name="username"
                                                    placeholder="Enter Your username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    isValid={touched.username && !errors.username}
                                                    isInvalid={!!errors.username && touched.username}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Text className="text-danger">
                                                    {touched.username && errors.username ? (
                                                        <div className="text-danger">{errors.username}</div>
                                                    ) : null}
                                                    {errorMessage == 'username already exists' ? (
                                                        <div className="text-danger">{errorMessage}</div>
                                                    ) : null}
                                                </Form.Text>
                                            </Form.Group>
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
                                                    {errorMessage == 'email already exists' ? (
                                                        <div className="text-danger">{errorMessage}</div>
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
                                            <Form.Group className="mb-3" controlId="validationFormik04">
                                                <Form.Label>confirmpassword</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmpassword"
                                                    placeholder="Enter Your confirmpassword"
                                                    value={values.confirmpassword}
                                                    onChange={handleChange}
                                                    isValid={touched.confirmpassword && !errors.confirmpassword}
                                                    isInvalid={!!errors.confirmpassword && touched.confirmpassword}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Text className="text-danger">
                                                    {touched.confirmpassword && errors.confirmpassword ? (
                                                        <div className="text-danger">{errors.confirmpassword}</div>
                                                    ) : null}
                                                </Form.Text>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button type="submit">Submit form</Button>
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
                                {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
                            </Card>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
export default Register;
