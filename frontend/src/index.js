import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './app/store'
import { Provider } from 'react-redux'

// Routes
import { Login } from './routes/Login';
import { Home } from './routes/Home';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)