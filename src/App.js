import './App.css';
import Login from './Pages/Login';
import Users, { UserProvider } from './Pages/Users';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {

  const appRouter = createBrowserRouter([{
    path: '/',
    element: <Login />
  },
  {
    path: '/users',
    element: <Users />
  }])
  return (
    <div>
      <UserProvider>
        <RouterProvider router={appRouter} />
        <div className="App">
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
