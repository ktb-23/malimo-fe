import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginMainForm from '../containers/LoginMainForm';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';
import MainForm from '../containers/MainForm';

const AppRouter = () => {
  const isAuthenticated = false; // 예시: 실제로는 상태 관리 로직이 필요합니다.

  return (
    <Routes>
      <Route path="/" element={<LoginMainForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/main" element={isAuthenticated ? <MainForm /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
