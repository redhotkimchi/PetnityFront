import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link import 추가
const PostList = () => {
  const [posts, setPosts] = useState([]); // 게시글을 저장할 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태 변수
  const [error, setError] = useState(null); // 에러 상태를 저장할 상태 변수

  useEffect(() => {
    // 비동기 함수를 사용하여 axios로 GET 요청을 보냅니다.
    const fetchPosts = async () => {
      try {
        // URL을 올바르게 수정
        const response = await axios.get('http://localhost:8080/v1/posts'); // API 엔드포인트에 GET 요청
        setPosts(response.data.posts); // 응답 데이터에서 posts를 상태로 설정합니다.
        setLoading(false); // 로딩 상태를 false로 설정합니다.
      } catch (err) {
        setError(err.message); // 에러 메시지를 상태로 설정합니다.
        setLoading(false); // 로딩 상태를 false로 설정합니다.
      }
    };

    fetchPosts(); // 비동기 함수 호출
  }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 호출되도록 설정합니다.

  if (loading) return <p>Loading...</p>; // 로딩 중일 때 표시할 텍스트
  if (error) return <p>Error: {error}</p>; // 에러가 발생했을 때 표시할 텍스트

  return (
    <div>
      <h1>Post List</h1>
      <Link to="/posts/create">
        <button>Add New Post</button>
      </Link>
      <ul>
        {posts.map((post) => ( // 게시글 데이터를 순회하며 리스트 아이템으로 렌더링합니다.
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
