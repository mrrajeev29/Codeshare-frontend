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
import Genai from './component/GenAi/Genai';
import {createBrowserRouter,Navigate,RouterProvider,} from "react-router-dom";
//import {Provider} from 'react-redux'
//import { store } from './redux/store';
import {Toaster} from "react-hot-toast"

const token=localStorage.getItem('userId');

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
    element:token?<Page/>:<Navigate replace to="/"/>
  },
  {
    path:"profile",
    element: token?<Profile/>: <Navigate replace to="/"/>
  },
  {
    path:"yourcode",
    element:token?<Code/> : <Navigate replace to="/"/>
  },
  {
    path:"addnew",
    element:token?<Addnew/> : <Navigate replace to="/"/>
  },
  {
    path:"showcode/:id",
    element:token?<Showcode/> : <Navigate replace to="/"/>
  },
  {
    path:"updatecode/:id",
    element:token?<Updatecode/> : <Navigate replace to="/"/>
  },
  {
    path:"AskCode",
    element:token?<Genai/> : <Navigate replace to="/"/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();