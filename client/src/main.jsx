import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Custom CSS
import './index.css'

// React components
import Root from './routes/Root.jsx';

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)