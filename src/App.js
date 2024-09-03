// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/postUpdate" element={<PostUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
