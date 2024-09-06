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

    // Add weekday headers
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach((day, index) => {
      days.push(
        <div
          key={`weekday-${index}`}
          className={`flex items-center justify-center text-sm font-medium
            ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue' : 'text-black'}`}
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
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayOfWeek = date.getDay();

      let dayColor = 'text-gray-300';
      if (dayOfWeek === 0) dayColor = 'text-red';
      if (dayOfWeek === 6) dayColor = 'text-blue';

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => setSelectedDate(date)}
          className={`flex items-center justify-center text-sm cursor-pointer relative
            ${isSelected ? 'font-semibold' : 'hover:bg-gray-100 active:bg-gray-200'} 
            ${dayColor} transition-colors duration-200`}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full">
            {i}
            {isSelected && (
              <div className="absolute inset-2 border-2 border-blue rounded-full pointer-events-none"></div>
            )}
          </div>
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

export default Calendar;
