import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Avatar from './AvatarComment';
import CustomModal from 'components/ui/costumeModal';
import UpdateForm from './UpdateFormComment';
import { CommentInterface } from 'types/interfaces/comment.interface';

const CommentList = () => {
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentComment, setCurrentComment] = useState<any>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const openDeleteModal = (comment: any) => {
        setCurrentComment(comment);
        setShowModal(true);
    };
    const handleDelete = async (id: string) => {
        console.log('deleted');
        console.log(id);
        // const newComments = comment.filter((quote) => quote._id !== id);
        // setQuotes(newQuotes);
        setShowModal(false);
    };
    const openUpdateModal = (comment: any) => {
        setCurrentComment(comment);
        setShowUpdateModal(true);
    };

    const commentss = { text: 'k3ayza' };
    return (
        <div className="comment-list">
            <h4 className="comment-list-count">2 Comments</h4>
            {[1, 2].map((comment) => (
                <div key={comment} className="comment-item">
                    <div className="comment-item-info">
                        <div className="comment-item-user-info">
                            <Avatar username="kira7" />
                            <span className="comment-item-username">kira7</span>
                        </div>
                        <div className="comment-item-time">4 hours ago</div>
                    </div>
                    <p className="comment-item-text">ana ma anach</p>
                    <div className="comment-item-icon-wrapper">
                        <FontAwesomeIcon
                            onClick={() => openUpdateModal(commentss)}
                            size="lg"
                            style={{ color: 'green' }}
                            className="me-1"
                            icon={faPenToSquare}
                        />

                        <FontAwesomeIcon
                            onClick={() => openDeleteModal('ss')}
                            style={{ color: 'red' }}
                            size="lg"
                            className="me-1"
                            icon={faTrash}
                        />
                    </div>
                    <hr />
                </div>
            ))}
            <CustomModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAction={() => handleDelete('1')}
                title="Confirmation"
                btnText="Delete"
                variant="danger"
            >
                Are you sure you want to delete this Quote
            </CustomModal>
            <CustomModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} title="Update">
                <UpdateForm
                    setShowUpdateModal={setShowUpdateModal}
                    comments={comments}
                    setComments={setComments}
                    currentComment={currentComment}
                />
            </CustomModal>
        </div>
    );
};

export default CommentList;
