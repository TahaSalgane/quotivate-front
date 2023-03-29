import React from 'react';
import { Formik } from 'formik';
import { Col, Button, Row, Form } from 'react-bootstrap';
// import { updateQuote } from 'services/CommentsService';
import { commentSchema } from 'utils/YupValidation';
import { CommentInterface } from 'types/interfaces/comment.interface';
import { updateComment } from 'services/commentsService';
type Props = {
    setShowUpdateModal: (state: boolean) => void;
    comments: CommentInterface[];
    setComments: (data: CommentInterface[]) => void;
    currentComment: CommentInterface;
};
const UpdateForm: React.FC<Props> = ({ setShowUpdateModal, comments, setComments, currentComment }: Props) => {
    const submitForm = async (values: CommentInterface | any) => {
        console.log(currentComment._id);
        const {
            data: { realData },
        } = await updateComment(currentComment._id, values);
        const index = comments.findIndex(
            (comment: CommentInterface | any) => comment._id.toString() === values._id.toString(),
        );
        const listUpdate = [...comments];
        listUpdate[index] = realData;
        setComments(listUpdate);
        setShowUpdateModal(false);
        console.log(comments);
    };
    return (
        <Formik
            validationSchema={commentSchema}
            onSubmit={submitForm}
            initialValues={{
                _id: currentComment._id,
                text: currentComment.text,
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row style={{ width: '90%' }} className="vh-75 d-flex justify-content-center pt-3">
                        <Col md={8} lg={6} xs={12}>
                            <Form.Group className="mb-3" controlId="validationFormik01">
                                <Form.Label>edit comment</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="text"
                                    placeholder="enter new Comment"
                                    value={values.text}
                                    onChange={handleChange}
                                    isValid={touched.text && !errors.text}
                                    isInvalid={!!errors.text}
                                />
                                <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
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
