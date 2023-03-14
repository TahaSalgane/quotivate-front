import React from 'react';
import { Formik } from 'formik';
import { Col, Button, Row, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { updateQuote } from 'services/quotesService';
import QuoteInterface from 'types/interfaces/quote.interface';
import TagInterface from 'types/interfaces/tag.interface';

const schema = Yup.object().shape({
    author: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    tags: Yup.array().of(Yup.string().required()).required(),
});
type Props = {
    setShowUpdateModal: (state: boolean) => void;
    tags: TagInterface[];
    quotes: QuoteInterface[];
    setQuotes: (data: QuoteInterface[]) => void;
    currentQuote: QuoteInterface;
};
const UpdateForm: React.FC<Props> = ({ setShowUpdateModal, quotes, setQuotes, currentQuote, tags }: Props) => {
    const submitForm = async (values: QuoteInterface) => {
        const {
            data: { realData },
        } = await updateQuote(values);
        const index = quotes.findIndex((tags: QuoteInterface) => tags._id.toString() === values._id.toString());
        const listUpdate = [...quotes];
        listUpdate[index] = realData;
        setQuotes(listUpdate);
        setShowUpdateModal(false);
    };
    return (
        <Formik
            validationSchema={schema}
            onSubmit={submitForm}
            initialValues={{
                _id: currentQuote._id,
                author: currentQuote.author,
                content: currentQuote.content,
                tags: (currentQuote.tags as TagInterface[]).map((d: TagInterface) => d._id.toString()),
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row style={{ width: '90%' }} className="vh-75 d-flex justify-content-center pt-3">
                        <Col md={8} lg={6} xs={12}>
                            <Form.Group className="mb-3" controlId="validationFormik01">
                                <Form.Label>author</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="author"
                                    placeholder="Enter Your Cat"
                                    value={values.author}
                                    onChange={handleChange}
                                    isValid={touched.author && !errors.author}
                                    isInvalid={!!errors.author}
                                />
                                <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationFormik01">
                                <Form.Label>content</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="content"
                                    placeholder="Enter Your Cat"
                                    value={values.content}
                                    onChange={handleChange}
                                    isValid={touched.content && !errors.content}
                                    isInvalid={!!errors.content}
                                />
                                <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationFormik01">
                                <Form.Label>tags</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="tags"
                                    placeholder="Enter Your Tags"
                                    className="control-select"
                                    value={values.tags as string[]}
                                    onChange={handleChange}
                                    isValid={touched.tags && !errors.tags}
                                    isInvalid={!!errors.tags}
                                    multiple
                                >
                                    <option>Select..</option>
                                    {tags.map((item: TagInterface) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{}</Form.Control.Feedback>
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
