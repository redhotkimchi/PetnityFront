// PostCreate.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 전환을 위한 훅

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/v1/posts', {
        title,
        nickname,
        dogName,
        dogAge,
        location,
        message,
      });
      navigate('/'); // 성공적으로 새 게시물을 추가한 후 게시물 목록으로 이동
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Nickname:
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </label>
        <br />
        <label>
          Dog Name:
          <input type="text" value={dogName} onChange={(e) => setDogName(e.target.value)} required />
        </label>
        <br />
        <label>
          Dog Age:
          <input type="number" value={dogAge} onChange={(e) => setDogAge(e.target.value)} required />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <br />
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
