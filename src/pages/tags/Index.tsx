import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Card, Form, Collapse, Table } from 'react-bootstrap';
import { getTags, deleteTag, createTag } from 'services/tagsService';
import CateogieInterface from 'types/interfaces/tag.interface';
import CustomModal from 'components/ui/costumeModal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import { HttpResponse } from 'types';
import UpdateForm from 'pages/tags/components/UpdateForm';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
});
interface MyFormValues {
    name: string;
}
const TagsIndexPage: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentCategory, setcurrentCategory] = useState<CateogieInterface | null>(null);
    const [tags, settags] = useState<CateogieInterface[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const openDeleteModal = (category: CateogieInterface) => {
        setcurrentCategory(category);
        setShowModal(true);
    };
    const openUpdateModal = (category: CateogieInterface) => {
        setcurrentCategory(category);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getTags();
                settags(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const submitForm = async (values: MyFormValues, actions: any) => {
        try {
            const { data }: AxiosResponse<HttpResponse<CateogieInterface>> = await createTag(values);
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
        // console.log(values, process.env.REACT_APP_API_URL);
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
        <div className="">
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
                        validationSchema={schema}
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
            <Table style={{ width: '65%' }} className="m-4 text-black" striped bordered hover variant="white">
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
                            <td className="text-center w-25 ">{tag.name}</td>
                            <td style={{ width: '14%' }}>
                                <button
                                    className="btn btn-warning w-100"
                                    onClick={() => {
                                        openUpdateModal(tag);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                            <td style={{ width: '14%' }}>
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() => {
                                        openDeleteModal(tag);
                                    }}
                                >
                                    delete
                                </button>
                                {/* <CustomModal
                                    show={showModal}
                                    handleClose={() => setShowModal(false)}
                                    handleAction={() => handleDelete(tag._id)}
                                    title="Confirmation"
                                >
                                    Are you sure you want to delete this tag ?{tag._id}
                                </CustomModal> */}
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
            <CustomModal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                // handleAction={() => handlupdate(currentCategory?._id!, 'sd')}
                title="Update"
            >
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
