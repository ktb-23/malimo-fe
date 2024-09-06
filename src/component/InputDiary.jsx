import React, { useState, useEffect } from 'react';
import { changeDiary } from '../api/changeDiary';
import { searchDiary } from '../api/searchDiary';
import { writeDiary } from '../api/writeDiary';
import PropTypes from 'prop-types';
import dayjs from '../util/dayjs';

//TODO: 새롭게 일기 작성한 경우 월별 일기 목록을 다시 불러오는 함수 필요
const InputDiary = ({ initialContents = '', selectedDate }) => {
  const [diaryEntry, setDiaryEntry] = useState(initialContents);
  const [diaryId, setDiaryId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      const result = await searchDiary(selectedDate);
      if (result.success) {
        setDiaryEntry(result.data.contents || '');
        setDiaryId(result.data.diary_id)
        setIsEditMode(false);
      } else {
        setDiaryEntry('');
        setDiaryId(null)
        setIsEditMode(true);
      }
    };

    fetchDiary();
  }, [selectedDate]);

  const handleInputChange = (e) => {
    setDiaryEntry(e.target.value);
  };

  const handleSave = async () => {
    if (diaryEntry === initialContents) {
      return
    }
    if (diaryId) {
      // 수정 모드에서 저장
      const result = await changeDiary(diaryId, diaryEntry);
      if (result.success) {
        alert(result.message);
        setIsEditMode(false);
      } else {
        alert('일기 수정에 실패했습니다: ' + result.message);
      }
    } else {
      // 새로운 일기 저장
      const result = await writeDiary(selectedDate, diaryEntry);
      if (result.success) {
        alert(result.message.message);
        setIsEditMode(false);
      } else {
        alert('일기 저장에 실패했습니다: ' + result.error);
      }
    }
  };

  return (
    <div className="bg-gray-100 rounded-3xl shadow-md p-6 max-w-md mx-auto font-noto-sans-kr">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">{dayjs(selectedDate).format('M월 D일 dddd')} - 나의 하루 기억하기</h3>
        <button
          onClick={isEditMode ? handleSave : () => setIsEditMode(true)}
          className={"text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300" + (!isEditMode || diaryEntry !== initialContents ? ' bg-blue': ' bg-skyblue' )}
        >
          {isEditMode ? '저장' : '수정'}
        </button>
      </div>
      {isEditMode ? (
        <textarea
          value={diaryEntry}
          onChange={handleInputChange}
          placeholder="오늘 하루는 어떠셨나요? 여기에 적어주세요..."
          className="w-full bg-gray-100 h-40 p-2 border border-none rounded-md resize-none focus:outline-none "
        />
      ) : (
        <div className="bg-gray-100 rounded-md p-4 h-40 overflow-auto">{diaryEntry}</div>
      )}
    </div>
  );
};

InputDiary.propTypes = {
  diaryId: PropTypes.number,
  initialContents: PropTypes.string,
  selectedDate: PropTypes.string,
};

InputDiary.defaultProps = {
  initialContents: '',
};

export default InputDiary;
