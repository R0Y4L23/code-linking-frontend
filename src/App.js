import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Auth from "./pages/auth.js";
import Home from "./pages/home.js";
import Seller from "./pages/seller.js";
import Profile from "./pages/profile.js";
import Active from "./pages/active.js";
import Lobby from "./pages/lobby.js";
import Nominated from './pages/nominated.js';
import Sold from './pages/sold.js';
import MainScreen from './pages/mainScreen.js';

import AdminAuth from './pages/admin/auth.js';
import ProductsScreen from './pages/admin/productsScreen.js';
import Start from './pages/admin/start.js';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="home" element={<Home />} />

        <Route path="seller" element={<Seller />} />
        <Route path="profile" element={<Profile />} />
        <Route path="active" element={<Active />} />
        <Route path="lobby" element={<Lobby />} />
        <Route path="nominated" element={<Nominated />} />
        <Route path="sold" element={<Sold />} />
        <Route path="main" element={<MainScreen />} />

        <Route path="admin" element={<AdminAuth />} />
        <Route path="products" element={<ProductsScreen />} />
        <Route path="start" element={<Start />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App