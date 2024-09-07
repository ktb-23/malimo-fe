import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';
import { login } from '../api/login';
import { validateEmail, validatePassword, validateLoginCredentials, ERROR_MESSAGES } from '../config/validation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = useCallback((field, value, confirmValue) => {
    let error = '';
    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'loginCredentials':
        error = validateLoginCredentials(value, confirmValue);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  }, []);

  const setLoginError = useCallback((errorType) => {
    setErrors((prev) => ({ ...prev, login: ERROR_MESSAGES[errorType] || ERROR_MESSAGES.LOGIN_ERROR }));
  }, []);

  const resetErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    resetErrors();

    // 클라이언트 측 유효성 검사
    const isEmailValid = validate('email', email);
    const isPasswordValid = validate('password', password);
    const areCredentialsValid = validate('loginCredentials', email, password);

    if (!isEmailValid || !isPasswordValid || !areCredentialsValid) {
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        console.log('로그인 성공:', result.nickname);
        // TODO: 토큰을 저장하고 사용자 상태를 업데이트하는 로직을 여기에 추가
        navigate('/main');
        window.location.reload();
      } else {
        setLoginError(result.errorType);
      }
    } catch (error) {
      console.error('로그인 중 예기치 못한 오류 발생:', error);
      setLoginError('LOGIN_ERROR');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  // 모든 에러 메시지를 합치고 첫 번째 에러 메시지만 선택
  const errorMessage = useMemo(() => {
    return Object.values(errors).find((error) => error !== '') || '';
  }, [errors]);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>
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
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
            {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
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
