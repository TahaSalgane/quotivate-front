import React from 'react';
import { Formik } from 'formik';
import { Col, Button, Row, Form } from 'react-bootstrap';
import { updateTag } from 'services/tagsService';
import { TagFormValues } from 'types/interfaces/formValidate.interface';
import { toast } from 'react-toastify';
import { tagSchema } from 'utils/YupValidation';

type Props = {
    setShowUpdateModal: (state: boolean) => void;
    tags: TagFormValues[];
    settags: (data: TagFormValues[]) => void;
    currentCategory: TagFormValues;
};
const UpdateForm: React.FC<Props> = ({ setShowUpdateModal, tags, settags, currentCategory }: Props) => {
    const submitForm = async (values: TagFormValues) => {
        await updateTag(values);
        const index = tags.findIndex((tag: TagFormValues) => tag._id!.toString() === values._id!.toString());
        const listUpdate = [...tags];
        listUpdate[index] = values;
        settags(listUpdate);
        setShowUpdateModal(false);
        toast.success('The tag has been updated successfully', { autoClose: 2000 });
    };
    return (
        <Formik
            validationSchema={tagSchema}
            onSubmit={submitForm}
            initialValues={{
                _id: currentCategory._id,
                name: currentCategory.name,
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row style={{ width: '90%' }} className="vh-75 d-flex justify-content-center pt-3">
                        <Col md={8} lg={6} xs={12}>
                            <Form.Group className="mb-3" controlId="validationFormik01">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Cat"
                                    value={values.name}
                                    onChange={handleChange}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-grid pt-3">
                        <Button type="submit">Update </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default UpdateForm;
