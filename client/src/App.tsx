import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  </Router>
);

export default App;