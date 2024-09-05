import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayOfWeek = date.getDay();

      let dayColor = 'text-gray-300';
      if (dayOfWeek === 0) dayColor = 'text-red';
      if (dayOfWeek === 6) dayColor = 'text-blue';

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => setSelectedDate(date)}
          className={`h-8 w-8 flex items-center justify-center text-sm cursor-pointer relative
            ${isSelected ? 'font-semibold' : 'hover:bg-gray-100'} ${dayColor}`}
        >
          {i}
          {isSelected && (
            <div className="absolute inset-0 border-2 border-blue-500 rounded-full pointer-events-none"></div>
          )}
        </div>,
      );
    }

    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <div key={`week-${i / 7}`} className="grid grid-cols-7 gap-1 mb-2.5">
          {days.slice(i, i + 7)}
        </div>,
      );
    }

    return weeks;
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="bg-white rounded-lg aspect-square max-w-sm mx-auto font-ddin">
      <div className="flex justify-between items-center mb-4">
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
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium 
              ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-black'}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-3rem)] text-base">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
