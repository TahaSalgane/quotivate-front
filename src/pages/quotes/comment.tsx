import React, { useState } from 'react';

interface CommentProps {
    text: string;
}

const Comment: React.FC<CommentProps> = ({ text }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
};

interface CommentListProps {
    comments: CommentProps[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <Comment key={index} text={comment.text} />
            ))}
        </div>
    );
};

interface CommentFormProps {
    onSubmit: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label"></label>
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label">
                    Comment
                </label>
                <textarea
                    className="form-control"
                    id="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<CommentProps[]>([]);

    const handleCommentSubmit = (text: string) => {
        const newComment = { text };
        setComments([newComment, ...comments]);
    };

    return (
        <div>
            <h2>Comments</h2>
            <CommentForm onSubmit={handleCommentSubmit} />
            <CommentList comments={comments} />
        </div>
    );
};

export default CommentSection;
