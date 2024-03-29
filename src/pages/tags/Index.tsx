import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Card, Form, Collapse, Table } from 'react-bootstrap';

import { getTags, deleteTag, createTag } from 'services/tagsService';
import CustomModal from 'components/ui/costumeModal';

import { Formik } from 'formik';
import { AxiosResponse } from 'axios';
import { HttpResponse } from 'types';
import UpdateForm from 'pages/tags/components/UpdateForm';

import { toast } from 'react-toastify';
import { tagSchema } from 'utils/YupValidation';
import { TagFormValues } from 'types/interfaces/formValidate.interface';
import BreadCrumbs from 'components/ui/breadCrumbs';

import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TagsIndexPage: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentCategory, setcurrentCategory] = useState<TagFormValues | null>(null);
    const [tags, settags] = useState<TagFormValues[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const openDeleteModal = (category: TagFormValues) => {
        setcurrentCategory(category);
        setShowModal(true);
    };
    const openUpdateModal = (category: TagFormValues) => {
        setcurrentCategory(category);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getTags();
                settags(data.realData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const submitForm = async (values: TagFormValues, actions: any) => {
        try {
            const { data }: AxiosResponse<HttpResponse<TagFormValues>> = await createTag(values);
            settags([...tags, data.realData!]);
            setOpen(false);
            actions.resetForm({
                values: {
                    name: '',
                },
            });
            toast.success('Tag created successfully', { autoClose: 2000 });
        } catch (excep) {
            console.log(excep);
        }
    };
    const handleDelete = async (id: string) => {
        const sdd = await deleteTag(id);
        const Newatag = tags.filter((tag) => tag._id !== id);
        settags(Newatag);
        console.log(tags);
        console.log(id);
        console.log(sdd);
        setShowModal(false);
        toast.success('The tag has been removed successfully', { autoClose: 2000 });
    };

    return (
        <div>
            <div className="mt-4 mx-3">
                <BreadCrumbs
                    data={[
                        {
                            text: 'Home',
                            path: '/',
                        },
                        {
                            text: 'Dashboard',
                            path: '/admin/dashboard',
                        },
                        {
                            text: 'Tags',
                            active: true,
                        },
                    ]}
                />
            </div>
            <Button
                className="m-4"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Add tag
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Formik
                        validationSchema={tagSchema}
                        onSubmit={submitForm}
                        initialValues={{
                            name: '',
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row style={{ width: '90%' }} className="vh-75 d-flex justify-content-center pt-3">
                                    <Col md={8} lg={6} xs={12}>
                                        <div className=" border border-2 border-primary" style={{ width: '90%' }}></div>
                                        <Card
                                            className=" shadow px-4 text-white bg-transparent "
                                            style={{ paddingBottom: '70px', width: '90%' }}
                                        >
                                            <Card.Body>
                                                <div className="mb-3 mt-md-4">
                                                    <h2 className="fw-bold mb-2 text-center text-uppercase text-dark">
                                                        Add tag
                                                    </h2>

                                                    <div className="mb-3">
                                                        <Form.Group className="mb-3" controlId="validationFormik01">
                                                            <Form.Label>Username</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="name"
                                                                placeholder="Enter Your Cat"
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                isValid={touched.name && !errors.name}
                                                                isInvalid={!!errors.name}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.name}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <div className="d-grid pt-3">
                                                            <Button type="submit">Add tag</Button>
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
                </div>
            </Collapse>
            <h2 className="m-5">All Tags</h2>
            <Table
                style={{ width: '40%', marginLeft: '80px' }}
                className="text-black"
                striped
                bordered
                hover
                variant="white"
            >
                <thead>
                    <tr>
                        <th className="text-center">Content</th>
                        <th className="text-center " colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => (
                        <tr key={index}>
                            <td style={{ width: '10%' }} className="text-center">
                                {tag.name}
                            </td>
                            <td style={{ width: '1%' }}>
                                <FontAwesomeIcon
                                    onClick={() => openUpdateModal(tag)}
                                    style={{
                                        borderRadius: '15px',
                                        cursor: 'pointer',
                                        padding: '5px',
                                        color: 'white',
                                        background: 'rgb(23, 180, 23)',
                                        marginLeft: '20px',
                                    }}
                                    size="lg"
                                    className="me-1"
                                    icon={faPenToSquare}
                                />
                            </td>
                            <td style={{ width: '1%' }}>
                                <FontAwesomeIcon
                                    onClick={() => openDeleteModal(tag)}
                                    style={{
                                        borderRadius: '15px',
                                        cursor: 'pointer',
                                        padding: '5px',
                                        color: 'white',
                                        background: 'red',
                                        marginLeft: '20px',
                                    }}
                                    size="lg"
                                    className="me-1"
                                    icon={faTrash}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CustomModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAction={() => handleDelete(currentCategory?._id!)}
                title="Confirmation"
                btnText="Delete"
                variant="danger"
            >
                Are you sure you want to delete this tag
            </CustomModal>
            <CustomModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} title="Update">
                <UpdateForm
                    setShowUpdateModal={setShowUpdateModal}
                    tags={tags}
                    settags={settags}
                    currentCategory={currentCategory!}
                />
            </CustomModal>
        </div>
    );
};
export default TagsIndexPage;
