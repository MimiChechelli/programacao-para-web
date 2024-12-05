import React, { useState } from 'react';
import CreatePost from './components/createpost';
import Post from './components/post';
import Profile from './components/profile';
import './styles.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([
        { id: 1, name: 'User1', followers: [], following: [] },
        { id: 2, name: 'User2', followers: [], following: [] }
    ]);
    const [currentUser, setCurrentUser] = useState(users[0]);
    const [viewingProfile, setViewingProfile] = useState(null);

    const handleCreatePost = (post) => {
        setPosts([...posts, { ...post, id: posts.length + 1, userId: currentUser.id, comments: [] }]);
    };

    const handleLikePost = (postId) => {
        console.log(`Liked post with id: ${postId}`);
    };

    const handleCommentPost = (postId) => {
        const comment = prompt('Enter your comment:');
        setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
        ));
    };

    const handleViewProfile = (userId) => {
        const user = users.find(user => user.id === userId);
        setViewingProfile(user);
    };

    const handleFollowUser = (userId) => {
        setUsers(users.map(user => {
        if (user.id === currentUser.id) {
            const isFollowing = user.following.includes(userId);
            return {
            ...user,
            following: isFollowing ? user.following.filter(id => id !== userId) : [...user.following, userId]
            };
        } else if (user.id === userId) {
            const isFollower = user.followers.includes(currentUser.id);
            return {
            ...user,
            followers: isFollower ? user.followers.filter(id => id !== currentUser.id) : [...user.followers, currentUser.id]
            };
        }
        return user;
        }));
    };

    return (
        <div className="container">
        <header>
            <h1>Medium web</h1>
            <nav>
            <a href="login.html">Login</a>
            <a href="signup.html">Signup</a>
            </nav>
        </header>
        <main>
            {viewingProfile ? (
            <Profile
                user={viewingProfile}
                posts={posts.filter(post => post.userId === viewingProfile.id)}
                onLike={handleLikePost}
                onComment={handleCommentPost}
                onFollow={handleFollowUser}
                isFollowing={currentUser.following.includes(viewingProfile.id)}
            />
            ) : (
            <>
                <CreatePost onCreate={handleCreatePost} />
                <section className="posts">
                <h2>Posts</h2>
                {posts.map(post => (
                    <Post
                    key={post.id}
                    post={post}
                    onLike={handleLikePost}
                    onComment={handleCommentPost}
                    />
                ))}
                </section>
                <section className="users">
                <h2>Users</h2>
                {users.map(user => (
                    <div key={user.id} className="user" onClick={() => handleViewProfile(user.id)}>
                    {user.name}
                    </div>
                ))}
                </section>
            </>
            )}
        </main>
        </div>
    );
};

export default App;