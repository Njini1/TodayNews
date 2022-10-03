import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import MyPage from './pages/MyPage';
import TNewsListPage from './pages/TNewsListPage';
import ShortNewsPage from './pages/ShortNewsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TNewsListPage />} />
      <Route path="/today-news">
        <Route index element={<TNewsListPage />} />
        <Route path=":newsId" element={<ShortNewsPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/my/:username" element={<MyPage />} />

      <Route path="/scrap-news" element={<PostListPage />} />
      <Route path="/:userId/:postId" element={<PostPage />} />

      <Route path="/s-news" element={<PostListPage />} />
    </Routes>
  );
};
export default App;
