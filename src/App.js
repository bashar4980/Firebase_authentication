import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Components/Form';
import LogIn from './Components/LogIn';


const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<SignUp></SignUp>
    },
    {
      path:'/signin',
      element:<LogIn></LogIn>
    }
  ])
  return (
    <div>
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
};

export default App;