import { createBrowserRouter } from 'react-router';
import App from '../App';
import { LoginPage } from '../pages/login/Login';
import { SignUpPage } from '../pages/signUp/signUp';
import { FeedPage } from '../pages/feed/feed';
import { DashboardPage } from '../pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        children: [
          {
            path: 'feed',
            element: <FeedPage />,
          },
        ],
      },
    ],
  },
]);
