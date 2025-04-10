
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Just redirect to the Dashboard when opening the app
  return <Navigate to="/" replace />;
};

export default Index;
