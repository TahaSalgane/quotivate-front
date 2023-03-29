import React, { useState } from 'react';
import './AddComment.css';
import { toast } from 'react-toastify';
import { createComment } from 'services/commentsService';
import { useNavigate } from 'react-router-dom';
import { CommentInterface } from 'types/interfaces/comment.interface';

type Props = {
    quoteId: string;
    onCommentAdded: (comment: CommentInterface) => void;
};
const AddComment: React.FC<Props> = ({ quoteId, onCommentAdded }: Props) => {
    const [text, setText] = useState('');
    const navigation = useNavigate();

    const formSubmitHandler = async (id: string, e: any) => {
        e.preventDefault();
        if (text.trim() === '') return toast.error('please write something');
        console.log(id);
        console.log(quoteId);
        try {
            const {
                data: { realData },
            } = await createComment({ text, quoteId: id });
            onCommentAdded(realData);
            // const index = quotes.findIndex((item: QuoteInterface) => item._id.toString() === id.toString());
            // const listUpdate = [...quotes];
            // listUpdate[index] = realData;
            // setQuotes(listUpdate);
        } catch (Exception) {
            navigation('/login');
            toast.error('Please Log in');
        }
        setText('');
        console.log(text);
    };
    return (
        <>
            <form onSubmit={(e: any) => formSubmitHandler(quoteId, e)} className="add-comment">
                <input
                    type="text"
                    placeholder="Add a comment"
                    className="add-comment-input"
                    onChange={(e: any) => {
                        setText(e.target.value);
                    }}
                />
                <button type="submit" className="add-comment-btn">
                    comment
                </button>
            </form>
        </>
    );
};

export default AddComment;
