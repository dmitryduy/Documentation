import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import NewPostPage from './pages/NewPostPage/NewPostPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';

export const routes = {
  common: [ {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    component: ArticlePage
  },
  {
    path: '/post/:title',
    component: ArticlePage
  }],
  private: [ {
    path: '/create-post',
    component: NewPostPage
  }, {
    path: '/edit-post/:title',
    component: EditPostPage
  }]
};