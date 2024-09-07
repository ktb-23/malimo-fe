import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useValidation } from '../hooks/useValidation';
import { register } from '../api/register';
import WebNav from '../containers/WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';

const SignupForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const { errors, validate, resetErrors } = useValidation();

  const resetForm = () => {
    setNickname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    resetErrors();
    // resetDuplicateErrors();
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 클라이언트 측 유효성 검사
    const isNicknameValid = validate('nickname', nickname);
    const isEmailValid = validate('email', email);
    const isPasswordValid = validate('password', password);
    const isPasswordConfirmationValid = validate('confirmPassword', password, confirmPassword);

    if (!isNicknameValid || !isEmailValid || !isPasswordValid || !isPasswordConfirmationValid) {
      return;
    }

    // 모든 검증을 통과했다면 회원가입 API 호출
    const result = await register({ nickname, email, password });
    console.log(result);

    if (result.success) {
      console.log('회원가입 성공:', result.message);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } else {
      console.error('회원가입 실패:', result.message);
      alert(result.message); // 실패 메시지를 alert로 표시
      resetForm(); // 폼 초기화
    }
  };

  // 모든 에러 메시지를 합치고 첫 번째 에러 메시지만 선택
  const errorMessage = useMemo(() => {
    const allErrors = { ...errors };
    return Object.values(allErrors).find((error) => error !== '') || '';
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
          <form onSubmit={handleSignup}>
            <Input
              name="nickname"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errorMessage && <div className="text-red text-sm mb-4">{errorMessage}</div>}
            <BigButton type="submit" onClick={handleSignup}>
              회원가입
            </BigButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
