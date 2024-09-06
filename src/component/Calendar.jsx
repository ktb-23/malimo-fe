import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchDiary } from '../api/searchDiary';

const Calendar = ({ onDateChange, initialDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [diaryData, setDiaryData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonthData(currentDate);
  }, [currentDate]);

  const fetchMonthData = async (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    setLoading(true);
    setError(null);

    try {
      // 한 달의 모든 날짜에 대해 일기 데이터를 가져옵니다.
      const monthData = {};
      const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${month}-${day.toString().padStart(2, '0')}`;
        const result = await searchDiary(dateString);
        if (result.success) {
          monthData[dateString] = result.data;
        }
      }

      setDiaryData(monthData);
    } catch (err) {
      console.error('Failed to fetch month data:', err);
      setError('월간 데이터를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setLoading(true);
    setError(null);

    const formattedDate = date.toISOString().split('T')[0];
    try {
      const result = await searchDiary(formattedDate);
      if (result.success) {
        onDateChange(date, result.data);
        setDiaryData((prevData) => ({
          ...prevData,
          [formattedDate]: result.data,
        }));
      } else {
        setError(result.error);
        onDateChange(date, null);
      }
    } catch (err) {
      console.error('Failed to fetch diary:', err);
      setError('일기를 가져오는데 실패했습니다.');
      onDateChange(date, null);
    } finally {
      setLoading(false);
    }
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const days = [];

    // Weekday headers
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

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    // Cells for each day of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayOfWeek = date.getDay();
      const hasDiaryEntry = diaryData[dateString];

      let dayColor = '';
      if (dayOfWeek === 0) dayColor = 'text-red';
      else if (dayOfWeek === 6) dayColor = 'text-blue';
      else dayColor = 'text-gray-700';

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => handleDateSelect(date)}
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
      {loading && <div className="text-center">로딩 중...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="px-4 pb-4 h-[calc(100%-4rem)]">{renderCalendar()}</div>
    </div>
  );
};

Calendar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  initialDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  initialDate: new Date(),
};

export default Calendar;
