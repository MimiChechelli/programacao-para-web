import React from 'react';

const Post = ({ post, onLike, onComment }) => {
    return (
        <div className="post">
        <p>{post.content}</p>
        <div className="post-actions">
            <button onClick={() => onLike(post.id)}>Like</button>
            <button onClick={() => onComment(post.id)}>Comment</button>
        </div>
        <div className="comments">
            <h4>Comments</h4>
            {post.comments.map((comment, index) => (
            <div className="comment" key={index}>
                <p>{comment}</p>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Post;