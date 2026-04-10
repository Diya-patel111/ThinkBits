import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobMatching from './pages/JobMatching';

// Components
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute roles={['user', 'admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/job-matching' 
          element={
            <ProtectedRoute roles={['user', 'admin']}>
              <JobMatching />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
