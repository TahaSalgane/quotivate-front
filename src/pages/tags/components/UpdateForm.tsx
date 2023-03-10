import React from 'react';
import { Formik } from 'formik';
import { Col, Button, Row, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { updateCategorie } from 'services/categoriesService';
import CategorieInterface from 'types/interfaces/categorie.interface';

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
});
type Props = {
    setShowUpdateModal: (state: boolean) => void;
    categories: CategorieInterface[];
    setCategories: (data: CategorieInterface[]) => void;
    currentCategory: CategorieInterface;
};
const UpdateForm: React.FC<Props> = ({ setShowUpdateModal, categories, setCategories, currentCategory }: Props) => {
    const submitForm = async (values: CategorieInterface) => {
        await updateCategorie(values);
        const index = categories.findIndex(
            (categorie: CategorieInterface) => categorie._id.toString() === values._id.toString(),
        );
        const listUpdate = [...categories];
        listUpdate[index] = values;
        setCategories(listUpdate);
        setShowUpdateModal(false);
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
                        <Button type="submit">Add categorie</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default UpdateForm;
