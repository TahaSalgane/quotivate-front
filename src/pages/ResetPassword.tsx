import React, { useEffect } from 'react';
import { Col, Button, Row, Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordFormValues } from 'types/interfaces/formValidate.interface';
import { getResetPassword, resetPassword } from 'services/passwordService';
import useUserStore, { StoreStateInterface } from 'store/userStore';
import { resetPasswordSchema } from 'utils/YupValidation';
const ResetPaasword: React.FC = () => {
    const navigation = useNavigate();
    const isResetPassword = useUserStore((state: StoreStateInterface) => state.isResetPassword);

    const { userId, token } = useParams();
    useEffect(() => {
        const getresetPass = async () => {
            try {
                const { data } = await getResetPassword(userId, token);
                if (data.realData === 'invalid link') {
                    useUserStore.getState().setIsEmailnotVerified(); // update the store
                } else {
                    useUserStore.getState().setIsEmailVerified();
                }
            } catch (excep: any) {
                toast.error(excep.message, { autoClose: 3000 });
            }
        };
        getresetPass();
    }, []);
    const submitForm = async (values: resetPasswordFormValues) => {
        try {
            console.log(userId);
            const { data } = await resetPassword(values.password, userId, token);
            toast.success(data.realData, { autoClose: 1000 });
            navigation('/login');
        } catch (excep: any) {
            toast.error(excep.message, { autoClose: 3000 });
            console.log(excep);
        }
        // console.log(values, process.env.REACT_APP_API_URL);
    };

    return (
        <>
            {!isResetPassword ? (
                <h1 style={{ marginTop: '150px', height: '400px' }} className="text-center text-white">
                    Not Found
                </h1>
            ) : (
                <Formik
                    validationSchema={resetPasswordSchema}
                    onSubmit={submitForm}
                    initialValues={{
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
                                                <h2 className="fw-bold mb-2 text-center text-uppercase">
                                                    Reset Password
                                                </h2>
                                                <div className="mb-3">
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
                                                            isInvalid={
                                                                !!errors.confirmpassword && touched.confirmpassword
                                                            }
                                                            onBlur={handleBlur}
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {touched.confirmpassword && errors.confirmpassword ? (
                                                                <div className="text-danger">
                                                                    {errors.confirmpassword}
                                                                </div>
                                                            ) : null}
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <div className="d-grid">
                                                        <Button type="submit">Submit form</Button>
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
            )}
        </>
    );
};
export default ResetPaasword;
