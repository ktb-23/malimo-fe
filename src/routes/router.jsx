import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginMainForm from '../containers/LoginMainForm';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';
import MainForm from '../containers/MainForm';
import MyForm from '../containers/MyForm';
import Loading from '../containers/Loading';

const AppRouter = () => {
  // const isAuthenticated = false; // 예시: 실제로는 상태 관리 로직이 필요합니다.

  return (
    <Routes>
      <Route path="/" element={<LoginMainForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/main" element={<MainForm />} />
      <Route path="/myform" element={<MyForm />} />
      <Route path="/loading" element={<Loading />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
