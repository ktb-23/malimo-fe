import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
    // TODO: 실제 로그인 로직을 여기에 구현합니다.
    // 예: API 호출, 상태 업데이트 등

    // 로그인 성공 후 메인 페이지로 이동
    navigate('/main');
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
            <BigButton type="submit">로그인</BigButton>
          </form>
          <div>
            <br />
            <span className="text-gray-300">아직 계정이 없으신가요? </span>
            <button className="underline" onClick={handleSignup}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
