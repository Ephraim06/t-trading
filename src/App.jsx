import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import './index.css';
import ProductPage from './ProductPage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import ForgotPassword from './ForgotPassword';
import AdminLogin from './AdminLogin';
import PasswordReset from './PasswordReset';
import AdminForgotPassword from './AdminForgotPassword';
import Industries from './Industries';
import ProductView from './ProductView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/industries' element={<Industries />} />
        <Route path='/about' element={<div>About Page</div>} />
        <Route path='/contact' element={<div>Contact Page</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/forgot-password' element={<AdminForgotPassword />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/product/:id' element={<ProductView />} />
        <Route path='/quote' element={<div>Quote Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
