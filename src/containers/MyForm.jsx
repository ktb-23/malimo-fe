import React, { useState } from 'react';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';
import ConfirmModal from '../component/ConfirmModal';
import { deleteAccount } from '../api/delete';

const MyForm = () => {
  const [nickname, setNickname] = useState('');
  const email = 'user@example.com';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('정보 수정:', { nickname, password, confirmPassword });
  };

  const handleNicknameChange = () => {
    console.log('닉네임 변경:', nickname);
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
        // Redirect to home page or login page
        window.location.href = '/'; // 예시: 홈페이지로 리다이렉트
      } else {
        console.error('회원 탈퇴 실패:', result.error);
        alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue">세영님의 페이지</h2>
          <br />
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue text-white text-sm rounded hover:bg-blue-dark"
              >
                변경
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
            <Input
              type="password"
              placeholder="비밀번호 변경"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />
            <BigButton type="submit">정보 수정</BigButton>
          </form>
          <br />
          <button className="underline text-gray-300 hover:text-gray-400" onClick={handleDeleteAccount}>
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
