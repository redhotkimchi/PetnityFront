import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams(); // URL에서 ID를 추출
  const [post, setPost] = useState(null); // 게시글 데이터를 저장할 상태 변수
  const [comments, setComments] = useState([]); // 댓글 데이터를 저장할 상태 변수
  const [newComment, setNewComment] = useState(''); // 새 댓글 상태 변수
  const [password, setPassword] = useState(''); // 비밀번호 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태 변수
  const [error, setError] = useState(null); // 에러 상태를 저장할 상태 변수

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8080/v1/posts/${id}`);
        setPost(postResponse.data.post);

        const commentsResponse = await axios.get(`http://localhost:8080/v1/comments/${id}`);
        setComments(commentsResponse.data.comments);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentData = {
        comment: {
          message: newComment, // message 필드로 수정
        },
        password: password,
      };

      // 댓글을 추가하는 POST 요청을 보냅니다.
      await axios.post(`http://localhost:8080/v1/comments/${id}`, commentData);
      setNewComment('');
      setPassword('');

      // 댓글 목록을 다시 가져옵니다.
      const commentsResponse = await axios.get(`http://localhost:8080/v1/comments/${id}`);
      setComments(commentsResponse.data.comments);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>Nickname:</strong> {post.nickname}</p>
      <p><strong>Dog Name:</strong> {post.dogName}</p>
      <p><strong>Dog Age:</strong> {post.dogAge} years old</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Message:</strong> {post.message}</p>
      <p class="text-3xl font-bold underline"><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}</p>

      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.message}
              {/* 댓글 메시지를 표시하는 부분 */}
            </li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            required
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            required
          />
          <br />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
