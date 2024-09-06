import React, { useState, useEffect, useMemo } from 'react';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';
import ConfirmModal from '../component/ConfirmModal';
import { deleteAccount } from '../api/delete';
import { changeNickname } from '../api/changeNickname';
import { validateNickname, validatePassword, validatePasswordConfirmation } from '../config/validation';
import { useCheckDuplicate } from '../hooks/useCheckDuplicate';

const MyForm = () => {
  const [nickname, setNickname] = useState('');
  const [storedNickname, setStoredNickname] = useState('');
  const [email] = useState('user@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingNickname, setIsChangingNickname] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errors, setErrors] = useState({});
  const { duplicateErrors, checkDuplicateNickname } = useCheckDuplicate();

  useEffect(() => {
    const localNickname = localStorage.getItem('nickname');
    if (localNickname) {
      setStoredNickname(localNickname);
      setNickname(localNickname);
    }
  }, []);

  useEffect(() => {
    setErrors((prevErrors) => ({ ...prevErrors, ...duplicateErrors }));
  }, [duplicateErrors]);

  const validateForm = () => {
    const nicknameError = validateNickname(nickname);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordConfirmation(password, confirmPassword);

    setErrors({
      nickname: nicknameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return !nicknameError && !passwordError && !confirmPasswordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Implement the logic for updating user information here
    console.log('정보 수정:', { nickname, password, confirmPassword });
  };

  const handleNicknameChange = async () => {
    const nicknameError = validateNickname(nickname);
    if (nicknameError) {
      setErrors((prevErrors) => ({ ...prevErrors, nickname: nicknameError }));
      return;
    }

    setIsChangingNickname(true);
    setMessage('');
    setMessageType('');

    try {
      const isAvailable = await checkDuplicateNickname(nickname);
      if (!isAvailable) {
        setErrors((prevErrors) => ({ ...prevErrors, nickname: duplicateErrors.nickname }));
        return;
      }

      const result = await changeNickname(nickname);
      if (result.success) {
        setMessage('닉네임이 성공적으로 변경되었습니다.');
        setMessageType('success');
        setErrors((prevErrors) => ({ ...prevErrors, nickname: '' }));
        localStorage.setItem('nickname', nickname);
        setStoredNickname(nickname);
      } else {
        setMessage(result.error || '닉네임 변경에 실패했습니다.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('닉네임 변경 중 오류가 발생했습니다.');
      setMessageType('error');
    } finally {
      setIsChangingNickname(false);
    }
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAccount();
      if (result.success) {
        console.log('회원 탈퇴 완료');
        window.location.href = '/';
      } else {
        setMessage('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
      setMessageType('error');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  // 모든 에러 메시지를 합치고 첫 번째 에러 메시지만 선택
  const errorMessage = useMemo(() => {
    const allErrors = { ...errors, ...duplicateErrors };
    return Object.values(allErrors).find((error) => error !== '') || '';
  }, [errors, duplicateErrors]);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue">{storedNickname}님의 페이지</h2>
          {message && <p className={`mb-4 ${messageType === 'error' ? 'text-red' : 'text-green'}`}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <Input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                name="nickname"
                required
                className="pr-20"
              />
              <button
                type="button"
                onClick={handleNicknameChange}
                disabled={isChangingNickname}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue text-white text-sm rounded hover:bg-blue-dark disabled:bg-gray-400"
              >
                {isChangingNickname ? '변경 중...' : '변경'}
              </button>
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                readOnly
                name="email"
                required
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="비밀번호 변경"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
              />
            </div>
            {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
            <BigButton type="submit">정보 수정</BigButton>
          </form>
          <br />
          <button className="underline text-gray-300 hover:text-gray-300" onClick={handleDeleteAccount}>
            회원탈퇴
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteAccount}
        message="정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        isConfirmDisabled={isDeleting}
        confirmText={isDeleting ? '처리 중...' : '확인'}
      />
    </div>
  );
};

export default MyForm;
