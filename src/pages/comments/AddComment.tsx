import React, { useState } from 'react';
import './AddComment.css';
import { toast } from 'react-toastify';
const AddComment = () => {
    const [text, setText] = useState('');

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        if (text.trim() === '') return toast.error('please write something');
        console.log({ text });
        setText('');
    };
    return (
        <form onSubmit={formSubmitHandler} className="add-comment">
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
    );
};

export default AddComment;
