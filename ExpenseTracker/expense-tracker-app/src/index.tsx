import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Home from './components/home';
import Expense from './components/add-expense';

import './utils/add-expense.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/AddExpense" element={<Expense onTrue={true} />} />
    </Routes>
  </BrowserRouter>

);

