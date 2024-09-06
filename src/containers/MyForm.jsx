import React, { useState } from 'react';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';
import ConfirmModal from '../component/ConfirmModal';

const MyForm = () => {
  const [nickname, setNickname] = useState('');
  const email = 'user@example.com';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const confirmDeleteAccount = () => {
    console.log('회원 탈퇴 진행');
    // 여기에 실제 회원 탈퇴 로직을 구현합니다.
    setIsModalOpen(false);
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
      />
    </div>
  );
};

export default MyForm;
