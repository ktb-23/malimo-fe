import React from 'react';
import { useNavigate } from 'react-router-dom';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import OR from '../image/OR.svg';

const LoginMainForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
    navigate('/login');
  };

  const handleSignup = () => {
    console.log('회원가입 버튼이 클릭되었습니다.');
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
          <BigButton onClick={handleLogin}>로그인</BigButton>
          <img src={OR} alt="OR" />
          <div className="mt-4">
            <BigButton onClick={handleSignup}>회원가입</BigButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMainForm;
