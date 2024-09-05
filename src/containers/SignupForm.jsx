import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';
import {
  validateNickname,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  checkDuplicateNickname,
} from '../config/validation';

const SignupForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};

    newErrors.nickname = validateNickname(nickname);
    newErrors.email = validateEmail(email);
    newErrors.password = validatePassword(password);
    newErrors.confirmPassword = validatePasswordConfirmation(password, confirmPassword);

    const duplicateNicknameError = await checkDuplicateNickname(nickname);
    if (duplicateNicknameError) {
      newErrors.nickname = duplicateNicknameError;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('회원가입 성공:', { nickname, email, password });
      // TODO: 회원가입 API 호출 및 성공 시 처리
      navigate('/login');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-screen">
      {/* WebNav */}
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      {/* Signup Form Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            만나서 반가워요. <br /> AI 기반 마음 일기 서비스 <br />
            <span className="text-blue">my little memory</span>입니다. <br /> 저와 함께 하루를 정리해봐요.
          </h2>
          <form onSubmit={handleSignup}>
            <Input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              name="nickname"
              required
              error={errors.nickname}
            />
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              error={errors.email}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
              error={errors.password}
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              required
              error={errors.confirmPassword}
            />
            <BigButton type="submit">회원가입</BigButton>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">이미 계정이 있으신가요?</span>{' '}
            <button
              type="button"
              onClick={handleLogin}
              className="text-blue-600 underline font-semibold hover:text-blue-800 focus:outline-none"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
