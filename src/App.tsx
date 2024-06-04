// ./src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Contact from './pages/Contacts';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Routes>
      <Route path='/'element={<MainPage />} />
      <Route path="/page2" element={<Contact />} />
    </Routes>
  );
};

export default App;
