import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import Page from './component/Pages/Page';
import Profile from './component/Profile/Profile';
import Code from './component/Code/Code';
import Addnew from './component/Addnew/Addnew';
import Showcode from './component/ShowCode/Showcode';
import Updatecode from './component/UpdateCode/Updatecode';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from './redux/store';
import {Toaster} from "react-hot-toast"
const router= createBrowserRouter([
  {
    path:"/",
    element:<Login/>,
  },
  {
    path :"signup",
    element: <Signup/>
  },
  {
    path: "page",
    element:<Page/>
  },
  {
    path:"profile",
    element:<Profile/>
  },
  {
    path:"yourcode",
    element:<Code/>
  },
  {
    path:"addnew",
    element:<Addnew/>
  },
  {
    path:"showcode/:id",
    element:<Showcode/>
  },
  {
    path:"updatecode/:id",
    element:<Updatecode/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();