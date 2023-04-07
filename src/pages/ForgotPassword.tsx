import React from 'react';
import { Col, Button, Row, Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { forgotSchema } from 'utils/YupValidation';
import { forgotFormValues } from 'types/interfaces/formValidate.interface';
import { forgotPassword } from 'services/passwordService';

const Forgotpassword: React.FC = () => {
    const submitForm = async (values: forgotFormValues) => {
        try {
            const { data } = await forgotPassword(values.email);
            toast.success(data.realData, { autoClose: 3000 });
        } catch (excep: any) {
            toast.error(excep.message, { autoClose: 3000 });
        }
        // console.log(values, process.env.REACT_APP_API_URL);
    };
    return (
        <Formik
            validationSchema={forgotSchema}
            onSubmit={submitForm}
            initialValues={{
                email: '',
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
                                        <h2 className="fw-bold mb-2 text-center text-uppercase">Forgot Password</h2>
                                        <div className="mb-3">
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
                                            <div className="d-grid">
                                                <Button type="submit">Reset Password</Button>
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
export default Forgotpassword;
