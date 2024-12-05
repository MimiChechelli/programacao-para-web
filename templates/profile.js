import React from 'react';
import Post from './post';

const Profile = ({ user, posts, onLike, onComment, onFollow, isFollowing }) => {
    return (
        <div className="profile">
            <h2>{user.name}'s Profile</h2>
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>
            <button onClick={() => onFollow(user.id)}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
            <section className="posts">
                <h3>Posts</h3>
                {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    onLike={onLike}
                    onComment={onComment}
                />
                ))}
            </section>
        </div>
    );
};

export default Profile;