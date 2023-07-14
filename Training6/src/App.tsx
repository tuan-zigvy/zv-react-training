import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './layout/Main';
import AuthRequire from './router/AuthRequire';
import Login from './page/Login';
import BlankLayout from './layout/BlankLayout';
import HomePage from './page/Home';
import Info from './page/Info';
import Users from './page/Users';
import TargetUser from './page/TargetUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRequire>
        <Main />
      </AuthRequire>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: '/info', element: <Info /> },
      {
        path: '/users',
        element: <Users />,
        children: [{ path: ':id', element: <TargetUser /> }],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: 'login', element: <Login /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
