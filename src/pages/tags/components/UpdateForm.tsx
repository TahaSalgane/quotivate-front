import React from 'react';
import { Formik } from 'formik';
import { Col, Button, Row, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { updateTag } from 'services/tagsService';
import TagInterface from 'types/interfaces/tag.interface';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
});
type Props = {
    setShowUpdateModal: (state: boolean) => void;
    tags: TagInterface[];
    settags: (data: TagInterface[]) => void;
    currentCategory: TagInterface;
};
const UpdateForm: React.FC<Props> = ({ setShowUpdateModal, tags, settags, currentCategory }: Props) => {
    const submitForm = async (values: TagInterface) => {
        await updateTag(values);
        const index = tags.findIndex((tag: TagInterface) => tag._id.toString() === values._id.toString());
        const listUpdate = [...tags];
        listUpdate[index] = values;
        settags(listUpdate);
        setShowUpdateModal(false);
        toast.success('The tag has been updated successfully', { autoClose: 2000 });
    };
    return (
        <Formik
            validationSchema={schema}
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
