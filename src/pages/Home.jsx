import React from 'react';
import { Navigate } from 'react-router-dom';

// Keep for backwards-compat: /home redirects to /
export default function Home() {
  return <Navigate to="/" replace />;
}
