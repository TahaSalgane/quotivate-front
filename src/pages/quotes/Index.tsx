import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Collapse, Form, Row, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import { AxiosResponse } from 'axios';
import { quoteSchema } from 'utils/YupValidation';
import { toast } from 'react-toastify';

import CustomModal from 'components/ui/costumeModal';
import BreadCrumbs from 'components/ui/breadCrumbs';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import QuoteInterface from 'types/interfaces/quote.interface';
import TagInterface from 'types/interfaces/tag.interface';
import { HttpResponse } from 'types';
import { createQuote, deleteQuote, getQuotes } from 'services/quotesService';
import { getTags } from 'services/tagsService';
import UpdateForm from 'pages/quotes/compontents/UpdateForm';
import { QuoteFormValues } from 'types/interfaces/formValidate.interface';
import { Typeahead } from 'react-bootstrap-typeahead';

import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Quotes: React.FC = () => {
    const [tags, setTags] = useState<TagInterface[]>([]);
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [currentQuote, setCurrentQuote] = useState<QuoteInterface | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const ref = useRef(null);
    const [selectedTags, setSelectedTags] = useState<any>([]);

    const openDeleteModal = (quote: QuoteInterface) => {
        setCurrentQuote(quote);
        setShowModal(true);
    };
    const openUpdateModal = (quote: QuoteInterface) => {
        setCurrentQuote(quote);
        setShowUpdateModal(true);
    };
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getQuotes(1);
                setQuotes(data.realData);
                console.log(data.realData);
            } catch (error) {
                console.log(error);
            }
            try {
                const { data } = await getTags();
                setTags(data.realData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);

    const submitForm = async (values: QuoteFormValues, actions: any) => {
        try {
            setOpen(false);
            console.log('sss');
            const { data }: AxiosResponse<HttpResponse<QuoteInterface>> = await createQuote({
                ...values,
                tags: selectedTags,
            });
            console.log(data);
            setQuotes([...quotes, data.realData!]);
            setOpen(false);
            actions.resetForm({
                values: {
                    author: '',
                    tags: [],
                    content: '',
                },
            });
            toast.success('The tag has been updated successfully', { autoClose: 2000 });
        } catch (excep) {
            console.log(excep);
        }
    };
    const handleDelete = async (id: string) => {
        await deleteQuote(id);
        const newQuotes = quotes.filter((quote) => quote._id !== id);
        setQuotes(newQuotes);
        setShowModal(false);
    };
    const changing = (e: any) => {
        const data: any = [];
        e.map((option: any) => data.push(option._id));
        setSelectedTags(data);
        console.log(selectedTags);
    };
    return (
        <div className="">
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
                            text: 'Quotes',
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
                Add Quote
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Formik
                        validationSchema={quoteSchema}
                        onSubmit={submitForm}
                        initialValues={{
                            author: '',
                            tags: [],
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
                                                        Add Quote
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
                                                        <Typeahead
                                                            defaultSelected={tags.slice(0, 4)}
                                                            id="public-methods-example"
                                                            labelKey="name"
                                                            multiple
                                                            options={tags}
                                                            placeholder="Choose a tags ..."
                                                            ref={ref}
                                                            onChange={changing}
                                                        />
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
            <Table style={{ width: '80%' }} className="m-4 text-black" striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th className="text-center">Content</th>
                        <th className="text-center">author</th>
                        <th className="text-center">likes</th>
                        <th className="text-center">Comments</th>
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
                            <td style={{ width: '15%', textAlign: 'center' }}> {quote.author}</td>
                            <td style={{ width: '3%', textAlign: 'center' }}>{quote.likes?.length}</td>
                            <td style={{ width: '3%', textAlign: 'center' }}>{quote.likes?.length}</td>
                            <td style={{ width: '8%', textAlign: 'center' }}>
                                {quote.tags.map((d: any, index) => (
                                    <span key={index}>{d.name}, </span>
                                ))}
                            </td>
                            <td style={{ width: '2%' }}>
                                <FontAwesomeIcon
                                    onClick={() => openUpdateModal(quote)}
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
                            <td style={{ width: '2%' }}>
                                <FontAwesomeIcon
                                    onClick={() => openDeleteModal(quote)}
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
                handleAction={() => handleDelete(currentQuote?._id!)}
                title="Confirmation"
                btnText="Delete"
                variant="danger"
            >
                Are you sure you want to delete this Quote
            </CustomModal>
            <CustomModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} title="Update">
                <UpdateForm
                    setShowUpdateModal={setShowUpdateModal}
                    quotes={quotes}
                    setQuotes={setQuotes}
                    currentQuote={currentQuote!}
                    tags={tags}
                />
            </CustomModal>
        </div>
    );
};
export default Quotes;
