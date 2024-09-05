import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';
import { validateEmail, validateLogin } from '../config/validation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    newErrors.email = validateEmail(email);
    if (newErrors.email === '') {
      const loginError = await validateLogin(email, password);
      if (loginError) {
        newErrors.login = loginError;
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('로그인 성공:', { email });
      // TODO: 로그인 성공 처리 (예: 토큰 저장, 상태 업데이트)
      navigate('/main');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex h-screen w-screen">
      {/* WebNav */}
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      {/* Login Form Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            만나서 반가워요. <br /> AI 기반 마음 일기 서비스 <br />
            <span className="text-blue">my little memory</span>입니다. <br /> 저와 함께 하루를 정리해봐요.
          </h2>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              error={errors.email}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
            {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
            <BigButton type="submit">로그인</BigButton>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">아직 계정이 없으신가요? </span>
            <button
              onClick={handleSignup}
              className="text-blue-600 underline font-semibold hover:text-blue-800 focus:outline-none"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
