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

  const formatDate = () => {
    const date = new Date();
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const weekday = days[date.getDay()];

    return `${month} ${day}일 ${weekday}`;
  };

  return (
    <div className="bg-gray-100 rounded-3xl shadow-md p-6 max-w-md mx-auto font-noto-sans-kr">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">{formatDate()} - 나의 하루 기억하기</h3>
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
