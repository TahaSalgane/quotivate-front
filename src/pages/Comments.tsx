import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { CommentInterface } from 'types/interfaces/comment.interface';
import { getAllComments } from 'services/commentsService';
import CustomModal from 'components/ui/costumeModal';
import { deleteComment } from 'services/commentsService';
import { toast } from 'react-toastify';
import BreadCrumbs from 'components/ui/breadCrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Comments: React.FC = () => {
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [currentComment, setCurrentComment] = useState<CommentInterface | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [filterValue, setFilterValue] = useState('');

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
        const newComments = comments.filter((comment) => comment._id !== id);
        setComments(newComments);

        setShowModal(false);
        toast.success('The tag has been removed successfully', { autoClose: 2000 });
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    };

    const filteredComments = comments.filter((comment) => comment.text.includes(filterValue));

    return (
        <div className="">
            <div className="mt-4 mx-3">
                <BreadCrumbs
                    data={[
                        { text: 'Home', path: '/' },
                        { text: 'Dashboard', path: '/admin/dashboard' },
                        { text: 'Users', active: true },
                    ]}
                />
            </div>
            <h2 className="m-5">All Users</h2>

            <Table
                style={{ width: '55%', marginLeft: '80px' }}
                className="text-black"
                striped
                bordered
                hover
                variant="white"
            >
                <thead>
                    <tr style={{ fontFamily: ' arial, verdana, sans-serif' }}>
                        <th style={{ paddingLeft: '3%' }}>Users</th>
                        <th style={{ paddingLeft: '5%' }}>
                            Comments{' '}
                            <input
                                type="text"
                                placeholder="Filter by content"
                                value={filterValue}
                                onChange={handleFilterChange}
                                style={{ marginLeft: '50px', width: '60%' }}
                            />{' '}
                        </th>
                        <th style={{ paddingLeft: '20px' }}>Action </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComments.map((comment: CommentInterface, index) => (
                        <tr key={index}>
                            <td style={{ width: '12%', paddingLeft: '50px' }}>{comment.username}</td>
                            <td className="text-center w-25 ">{comment.text}</td>

                            <td style={{ width: '2%' }}>
                                <FontAwesomeIcon
                                    onClick={() => openDeleteModal(comment)}
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
