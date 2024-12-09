import { useEffect, useState } from 'react';
import { Api, Post } from '../../services';
import moment from 'moment';
import { ThumbsUp } from 'lucide-react';

export function FeedPage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const api = new Api();

  const handleLoadPosts = async () => {
    try {
      setLoading(true);
      const result = await api.getPosts();
      setPosts(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLike = async (post: Post) => {
    try {
      setLoading(true);
      await api.likePost(post.id);
      handleLoadPosts();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const findLike = (post: Post) => {
    const like = post.Likes.find(
      (like) => like.user_id === window.localStorage.getItem('user_id'),
    );

    if (like) {
      return true;
    }

    return false;
  };

  const handleNewPost = async () => {
    try {
      setLoading(true);
      await api.createPost(title, description, content);
      handleLoadPosts();
      setTitle('');
      setDescription('');
      setContent('');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadPosts();
  }, []);

  const Post = (post: Post) => (
    <div className="post" key={post.id}>
      <div className="header">
        <h1>{post.title}</h1>
        <p className="description">{post.description}</p>
      </div>
      <p className="content">{post.content}</p>
      <div className="author">
        <p>
          Escrito por {post.user.name} -{' '}
          {moment(post.created_at).format('DD/MM/YYYY')}
        </p>
        <div className="buttons">
          <button
            className={`icon ${findLike(post) ? 'active' : ''}`}
            onClick={() => handleLike(post)}
          >
            <ThumbsUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="feed">
      <div className="box">
        <div className="create-post">
          <h3>Nova publicação</h3>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <textarea
              placeholder="Escreva sua nova publicação"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="actions" onClick={handleNewPost}>
              <button disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>
        <div className="posts">{posts.map((post) => Post(post))}</div>
      </div>
    </div>
  );
}
