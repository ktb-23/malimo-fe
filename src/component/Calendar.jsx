import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDiaryMothMetaData } from '../api/getDiaryMothMetaData';
import dayjs from '../util/dayjs';

const Calendar = ({ onDateChange, selectedDate }) => {
  const [monthMetaData, setMonthMetaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonthData(selectedDate);
  }, [selectedDate]);

  const fetchMonthData = async (date) => {
    const year = dayjs(date).year();
    const month = dayjs(date).month();
    console.log(year, month);
    setLoading(true);
    setError(null);

    try {
      // 한 달의 모든 날짜에 대해 일기 데이터를 가져옵니다.
      const {data} = await getDiaryMothMetaData(year, month);
      data.dates.forEach(item => setMonthMetaData((prevData) => ({...prevData, [item]: true})));
    } catch (err) {
      console.error('Failed to fetch month data:', err);
      setError('월간 데이터를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const daysInMonth = (date) => {
    return dayjs(date).daysInMonth();
  };

  const firstDayOfMonth = (date) => {
    return dayjs(date).startOf('month').format('d');
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(selectedDate);
    const firstDay = firstDayOfMonth(selectedDate);
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
      const currentDay = dayjs(selectedDate).date(i).format('YYYY-MM-DD')
      const isSelected = currentDay === selectedDate;
      const dayOfWeek = dayjs(currentDay).format('d');
      const hasDiaryEntry = monthMetaData[currentDay];

      let dayColor = '';
      if (dayOfWeek === 0) dayColor = 'text-red';
      else if (dayOfWeek === 6) dayColor = 'text-blue';
      else dayColor = 'text-gray-700';

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => onDateChange(currentDay)}
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
          onClick={() => onDateChange(dayjs(selectedDate).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'))}
          className="text-gray-300 hover:text-black"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-black">
          {dayjs(selectedDate).year()}년 {monthNames[dayjs(selectedDate).month()]}
        </h2>
        <button
          onClick={() => onDateChange(dayjs(selectedDate).add(1, 'month').startOf('month').format('YYYY-MM-DD'))}
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
  selectedDate: PropTypes.string,
};

Calendar.defaultProps = {
  initialDate: new Date(),
};

export default Calendar;
