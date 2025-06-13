import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ReservationPage from './Reserve/ReservationPage';
import TableView from './Table/TableView';
import BookPage from './Book/BookPage';
import SignupPage from './Signup/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/table" element={<TableView />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
