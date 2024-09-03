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
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PostDTO에 해당하는 객체 생성
    const postDTO = {
      title: title,
      nickname: nickname,
      dogName: dogName,
      dogAge: parseInt(dogAge, 10), // 나이는 정수로 변환
      location: location,
      message: message,
    };

    // CreatePostRequestDTO 형식에 맞게 데이터 준비
    const requestData = {
      post: postDTO,
      password: password,
    };

    try {
      // 게시물을 생성하는 POST 요청을 보냅니다.
      await axios.post('http://localhost:8080/v1/posts', requestData);
      // 성공 시, 목록 페이지로 리디렉션
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nickname:
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Dog Name:
            <input
              type="text"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Dog Age:
            <input
              type="number"
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
