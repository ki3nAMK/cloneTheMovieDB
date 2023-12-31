import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './component/header/header';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Find/Home';
import store from './app/store' ;
import { Provider } from 'react-redux' ;
import Poster from './component/poster/Poster';
import HomeNF from './component/Home/HomeNF';
import Login from './component/login/login';
import Test from './component/test/test';
import Profile from './Profile/Profile';
import MyList from './Profile/content/MyList';
import Parentcomponent from './test/parentcomponent';

const router = createBrowserRouter([{
    path: "/" ,
    element: <Header /> ,
    children: [{
      path: "/find" ,
      element: <Home />
    },{
      path:"/" ,
      element: <Poster /> ,
    }],
  },{
    path: "/netflixAlike",
    element:<HomeNF />
  },{
    path: "/login" ,
    element: <Login /> 
  },{
    path: "/test  " ,
    element:<Test /> ,
  },{
    path: "/profile" ,
    element: <Profile /> ,
    children : [{
      path: "/profile/mylist" ,
      element: <MyList/> ,
    }]
  },{
    path: "/test" ,
    element: <Parentcomponent/> ,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>    
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
