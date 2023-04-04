import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { CommentInterface } from 'types/interfaces/comment.interface';
import { getAllComments } from 'services/commentsService';
import CustomModal from 'components/ui/costumeModal';
import { deleteComment } from 'services/commentsService';
import { toast } from 'react-toastify';
import BreadCrumbs from 'components/ui/breadCrumbs';
const Comments: React.FC = () => {
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [currentComment, setCurrentComment] = useState<CommentInterface | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getAllComments();
                setComments(data.realData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const openDeleteModal = (comment: CommentInterface) => {
        setCurrentComment(comment);
        setShowModal(true);
    };
    const handleDelete = async (id: string) => {
        await deleteComment(id);
        const Newatag = comments.filter((comment) => comment._id !== id);
        setComments(Newatag);

        setShowModal(false);
        toast.success('The tag has been removed successfully', { autoClose: 2000 });
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
                            text: 'Users',
                            active: true,
                        },
                    ]}
                />
            </div>
            <h2 className="m-5">All Users</h2>
            <Table className="w-75 m-4 text-black" striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th>comment user</th>
                        <th>content </th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment: CommentInterface, index) => (
                        <tr key={index}>
                            <td className="text-center w-25 ">{comment.username}</td>
                            <td className="text-center w-25 ">{comment.text}</td>

                            <td style={{ width: '14%' }}>
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() => {
                                        openDeleteModal(comment);
                                    }}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CustomModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAction={() => handleDelete(currentComment?._id!)}
                title="Confirmation"
                btnText="Delete"
                variant="danger"
            >
                Are you sure you want to delete this tag
            </CustomModal>
        </div>
    );
};
export default Comments;
