import React, { useState } from 'react';

const CreatePost = ({ onCreate }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ content });
        setTitle('');
        setContent('');
    };

    return (
        <div className="create-post">
        <h2>Create a Post</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            </div>
            <button type="submit">Post</button>
        </form>
        </div>
    );
};

export default CreatePost;