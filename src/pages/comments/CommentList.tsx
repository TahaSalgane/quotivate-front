import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Avatar from './AvatarComment';
import CustomModal from 'components/ui/costumeModal';
import UpdateForm from './UpdateFormComment';
import { CommentInterface } from 'types/interfaces/comment.interface';
import Moment from 'react-moment';
import useUserStore, { StoreStateInterface } from 'store/userStore';

type Props = {
    comments: CommentInterface[] | any;
};
const CommentList: React.FC<Props> = ({ comments }: Props) => {
    const [commentsss, setCommentsss] = useState<CommentInterface[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentComment, setCurrentComment] = useState<any>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const user = useUserStore((state: StoreStateInterface) => state.user);

    const openDeleteModal = (comment: any) => {
        setCurrentComment(comment);
        setShowModal(true);
        console.log(commentsss);
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
    // const commentIds = comments ? Object.keys(comments) : [];
    const commentss = { text: 'k3ayza' };
    return (
        <div className="comment-list">
            <h4 className="comment-list-count"> Comments</h4>
            {/* {commentIds.map((commentId: string) => {
                const comment: CommentInterface = comments[commentId as any]; */}
            {comments.map((comment: any) => {
                return (
                    <div key={comment._id} className="comment-item">
                        <div className="comment-item-info">
                            <div className="comment-item-user-info">
                                <Avatar username="kira7" />
                                <span className="comment-item-username">{comment.username}</span>
                            </div>
                            <div className="comment-item-time">
                                <Moment fromNow ago>
                                    {comment.createdAt}
                                </Moment>{' '}
                                ago
                            </div>
                        </div>
                        <p className="comment-item-text">{comment.text}</p>
                        {user?._id === comment.user && (
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
                        )}
                        <hr />
                    </div>
                );
            })}
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
                    setComments={setCommentsss}
                    currentComment={currentComment}
                />
            </CustomModal>
        </div>
    );
};

export default CommentList;
