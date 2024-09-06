import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Calendar = ({ diaryData: propDiaryData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryData, setDiaryData] = useState({});

  // 샘플 데이터 생성
  const generateSampleData = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');

    return {
      [`${year}-${month}-05`]: { content: '오늘은 날씨가 좋았습니다.' },
      [`${year}-${month}-10`]: { content: '친구와 저녁을 먹었습니다.' },
      [`${year}-${month}-15`]: { content: '새로운 프로젝트를 시작했습니다.' },
      [`${year}-${month}-20`]: { content: '운동을 열심히 했습니다.' },
      [`${year}-${month}-25`]: { content: '좋은 책을 읽었습니다.' },
    };
  };

  useEffect(() => {
    const isPropDiaryDataEmpty =
      !propDiaryData || typeof propDiaryData !== 'object' || Object.keys(propDiaryData).length === 0;

    if (import.meta.env.MODE === 'development' && isPropDiaryDataEmpty) {
      setDiaryData(generateSampleData());
    } else {
      setDiaryData(propDiaryData || {});
    }
  }, [propDiaryData]);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const days = [];

    // Add weekday headers
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach((day, index) => {
      days.push(
        <div
          key={`weekday-${index}`}
          className={`flex items-center justify-center text-sm font-medium
            ${index === 0 ? 'text-red' : index === 6 ? 'text-blue' : 'text-black'}`}
        >
          {day}
        </div>,
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }
    // Add cells for each day of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayOfWeek = date.getDay();
      const hasDiaryEntry = diaryData[dateString];

      let dayColor = '';
      if (dayOfWeek === 0) dayColor = 'text-red';
      else if (dayOfWeek === 6) dayColor = 'text-blue';
      else dayColor = 'text-gray-300'; // 평일의 기본 색상

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => setSelectedDate(date)}
          className={`flex items-center justify-center text-sm cursor-pointer relative
            ${isSelected ? 'font-semibold' : 'hover:bg-gray-100 active:bg-gray-200'} 
            transition-colors duration-200`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full
            ${hasDiaryEntry ? 'bg-skyblue text-white' : dayColor}`}
          >
            {i}
          </div>
          {isSelected && <div className="absolute inset-2 border-2 border-blue rounded-full pointer-events-none"></div>}
        </div>,
      );
    }

    return <div className="grid grid-cols-7 gap-1 h-full">{days}</div>;
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <div className="bg-white rounded-lg aspect-square max-w-sm mx-auto font-ddin">
      <div className="flex justify-between items-center mb-4 p-4">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
          className="text-gray-300 hover:text-black"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-black">
          {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
          className="text-gray-300 hover:text-black"
        >
          &gt;
        </button>
      </div>
      <div className="px-4 pb-4 h-[calc(100%-4rem)]">{renderCalendar()}</div>
    </div>
  );
};

Calendar.propTypes = {
  diaryData: PropTypes.object,
};

Calendar.defaultProps = {
  diaryData: {},
};

export default Calendar;
