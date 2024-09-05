import React, { useState } from 'react';
import WebNav from './WebNav';
import BigButton from '../component/BigButton';
import Input from '../component/Input';

const MyForm = () => {
  const [nickname, setNickname] = useState('');
  // The email value can be hardcoded or fetched directly where necessary since there's no plan to change it in the form.
  const email = 'user@example.com'; // 예시 이메일, 실제로는 사용자의 실제 이메일로 초기화해야 합니다.
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 정보 수정 로직을 구현합니다.
    console.log('정보 수정:', { nickname, password, confirmPassword });
    // API 호출 등의 로직을 추가할 수 있습니다.
  };

  const handleNicknameChange = () => {
    // 닉네임 변경 로직을 구현합니다.
    console.log('닉네임 변경:', nickname);
    // API 호출 등의 로직을 추가할 수 있습니다.
  };

  return (
    <div className="flex h-screen w-screen">
      {/* WebNav */}
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      {/* My Information Form Area */}
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
        </div>
      </div>
    </div>
  );
};

export default MyForm;
