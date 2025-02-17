import React, { useState, useEffect } from 'react';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // 초기 데이터 (예시)
    setPosts([
      { id: 1, title: 'First Post', content: 'Hello World!' },
      { id: 2, title: 'Second Post', content: 'This is a board post.' },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: posts.length + 1,
      title: `Post ${posts.length + 1}`,
      content: newPost,
    };
    setPosts([...posts, post]);
    setNewPost('');
  };

  return (
    <div>
      <h2>Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea 
            value={newPost} 
            onChange={(e) => setNewPost(e.target.value)} 
            placeholder="Write your post here..." 
            required 
            style={{ width: '100%', height: '100px' }}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
