import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Card, Form, Collapse, Table } from 'react-bootstrap';
import { getQuotes, createQuote } from 'services/quotesService';
import QuoteInterface from 'types/interfaces/quote.interface';
import { Formik } from 'formik';
import quoteinterface from 'types/interfaces/quote.interface';
import { AxiosResponse } from 'axios';
import { HttpResponse } from 'types';
import * as Yup from 'yup';
const schema = Yup.object().shape({
    author: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    string: Yup.string().required('Required'),
    // tags: Yup.array().of(Yup.string()).required(),
});
interface MyFormValues {
    author: string;
    content: string;
    tags: string;
}
const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getQuotes();
                setQuotes(data);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const submitForm = async (values: MyFormValues, actions: any) => {
        try {
            setOpen(false);
            const { data }: AxiosResponse<HttpResponse<quoteinterface>> = await createQuote(values);
            console.log(data);
            setQuotes([...quotes, data.realData!]);
            setOpen(false);
            actions.resetForm({
                values: {
                    author: '',
                    tags: '',
                    content: '',
                },
            });
        } catch (excep) {
            console.log(excep);
        }
        // console.log(values, process.env.REACT_APP_API_URL);
    };
    console.log(quotes);
    return (
        <div className="">
            <Button
                className="m-4"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Add Quote
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Formik
                        validationSchema={schema}
                        onSubmit={submitForm}
                        initialValues={{
                            author: '',
                            tags: '',
                            content: '',
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
                                                        Add Categorie
                                                    </h2>

                                                    <div className="mb-3">
                                                        <Form.Group className="mb-3" controlId="validationFormik01">
                                                            <Form.Label className="text-dark">author :</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="author"
                                                                placeholder="Enter name of Author"
                                                                value={values.author}
                                                                onChange={handleChange}
                                                                isValid={touched.author && !errors.author}
                                                                isInvalid={!!errors.author}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.author}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="validationFormik01">
                                                            <Form.Label className="text-dark">Tags :</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="tags"
                                                                placeholder="Enter Your Cat"
                                                                value={values.tags}
                                                                onChange={handleChange}
                                                                isValid={touched.tags && !errors.tags}
                                                                isInvalid={!!errors.tags}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.tags}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>{' '}
                                                        <Form.Group className="mb-3" controlId="validationFormik01">
                                                            <Form.Label className="text-dark">Content :</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                type="text"
                                                                name="content"
                                                                placeholder="Enter the Quote"
                                                                value={values.content}
                                                                onChange={handleChange}
                                                                isValid={touched.content && !errors.content}
                                                                isInvalid={!!errors.content}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.author}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <div className="d-grid pt-3">
                                                            <Button type="submit">Add Quotes</Button>
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
            <h2 className="m-5">All Quotes</h2>
            <Table style={{ width: '65%' }} className="m-4 text-black" striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th className="text-center">Content</th>
                        <th className="text-center">author</th>
                        <th className="text-center">likes</th>
                        <th className="text-center">Tags</th>
                        <th className="text-center " colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote, index) => (
                        <tr key={index}>
                            <td className="text-center w-25 ">{quote.content}</td>
                            <td className="text-center w-25 ">{quote.author}</td>
                            <td className="text-center w-25 ">{quote.likes.length}</td>
                            <td className="text-center w-25 ">
                                {quote.tags.map((d: any, index) => (
                                    <span key={index}>{d.name}, </span>
                                ))}
                            </td>
                            <td style={{ width: '14%' }}>
                                <button
                                    className="btn btn-warning w-100"
                                    onClick={() => {
                                        // openUpdateModal(categorie);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                            <td style={{ width: '14%' }}>
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() => {
                                        // openDeleteModal(categorie);
                                    }}
                                >
                                    delete
                                </button>
                                {/* <CustomModal
                                    show={showModal}
                                    handleClose={() => setShowModal(false)}
                                    handleAction={() => handleDelete(categorie._id)}
                                    title="Confirmation"
                                >
                                    Are you sure you want to delete this categorie ?{categorie._id}
                                </CustomModal> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
export default Quotes;
