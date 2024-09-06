import React, { useState } from 'react';
import WebNav from './WebNav';
import Calendar from '../component/Calendar';
import InputDiary from '../component/InputDiary';
import Search from '../component/Search';
import Summary from '../component/Summary';
import Advice from '../component/Advice';
import Graph from '../component/Graph';
import dayjs from '../util/dayjs';

const MainForm = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* WebNav */}
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      {/* Main content area */}
      <div className="flex-1 grid grid-cols-2 grid-rows-[auto_1fr_1fr] gap-4 px-8">
        {/* Search: spans both columns */}
        <div className="col-span-2 flex items-center justify-center py-4">
          <div className="w-full max-w-2xl">
            <Search />
          </div>
        </div>

        {/* Left column: Calendar and InputDiary */}
        <div className="flex flex-col gap-4">
          {/* Calendar */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">
              <Calendar onDateChange={handleDateChange} selectedDate={selectedDate} />
            </div>
          </div>

          {/* InputDiary */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">
              <InputDiary selectedDate={selectedDate} />
            </div>
          </div>

          {/* Graph */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">
              <Graph />
            </div>
          </div>
        </div>

        {/* Right column: Summary and Advice */}
        <div className="flex flex-col gap-4">
          {/* Summary */}
          <div className="flex justify-start items-start">
            <div className="w-full max-w-md">
              {/* <Summary /> */}
            </div>
          </div>

          {/* Advice */}
          <div className="flex justify-start items-start">
            <div className="w-full max-w-md">
              {/* <Advice /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
