import CountBtn from '@/components/CountBtn';
import ReactSVG from '@/assets/react.svg';
import { Badge } from '@/components/ui/badge';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate';


function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/create" element={<PostCreate />} />
          <Route path="/posts/postUpdate" element={<PostUpdate />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
