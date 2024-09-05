import React, { useState } from 'react';

const InputDiary = () => {
  const [diaryEntry, setDiaryEntry] = useState('');

  const handleInputChange = (e) => {
    setDiaryEntry(e.target.value);
  };

  const handleSave = () => {
    console.log('일기 저장:', diaryEntry);
    alert('일기가 저장되었습니다!');
    setDiaryEntry('');
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-md mx-auto font-noto-sans-kr">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">나의 하루 기억하기</h2>
        <button
          onClick={handleSave}
          className="bg-skyblue text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
        >
          저장
        </button>
      </div>
      <textarea
        value={diaryEntry}
        onChange={handleInputChange}
        placeholder="오늘 하루는 어떠셨나요? 여기에 적어주세요..."
        className="w-full h-40 p-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
      />
    </div>
  );
};

export default InputDiary;
