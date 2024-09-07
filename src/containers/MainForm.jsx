import React, { useState, useEffect } from 'react';
import WebNav from './WebNav';
import Calendar from '../component/Calendar';
import InputDiary from '../component/InputDiary';
import Search from '../component/Search';
import Summary from '../component/Summary';
import Advice from '../component/Advice';
import Graph from '../component/Graph';
import dayjs from '../util/dayjs';
import { getDiaryMothMetaData } from '../api/getDiaryMothMetaData';
import { searchAdvice } from '../api/searchAdvice';

const MainForm = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY.MM.DD'));
  const [monthMetaData, setMonthMetaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analicticData, setAnalicticData] = useState({
    emotion_analysis: null,
    summary: null,
    advice: null,
    total_scores: null,
  });

  const fetchMonthData = async (date) => {
    const year = dayjs(date).year();
    const month = dayjs(date).month(); //NOTE: 1월 -> 0
    setLoading(true);
    setError(null);

    try {
      const { data } = await getDiaryMothMetaData(year, month + 1);
      data.dates.forEach((item) => setMonthMetaData((prevData) => ({ ...prevData, [item]: true })));
    } catch (err) {
      console.error('Failed to fetch month data:', err);
      setError('월간 데이터를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdvice = async (date) => {
    const result = await searchAdvice(date);
    if (result.success) {
      setAnalicticData(result.data);
    }
  };

  useEffect(() => {
    fetchMonthData(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    fetchAdvice(selectedDate);
  }, [selectedDate]);

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
              <Calendar
                loading={loading}
                error={error}
                monthMetaData={monthMetaData}
                onDateChange={handleDateChange}
                selectedDate={selectedDate}
              />
            </div>
          </div>

          {/* InputDiary */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">
              <InputDiary selectedDate={selectedDate} fetchMonthData={fetchMonthData} fetchAdvice={fetchAdvice} />
            </div>
          </div>

          {/* Graph */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">{<Graph analicticData={analicticData} />}</div>
          </div>
        </div>

        {/* Right column: Summary and Advice */}
        <div className="flex flex-col gap-4">
          {/* Summary */}
          <div className="flex justify-start items-start">
            <div className="w-full max-w-md">
              <Summary analicticData={analicticData} selectedDate={selectedDate} />
            </div>
          </div>

          {/* Advice */}
          <div className="flex justify-start items-start">
            <div className="w-full max-w-md">{<Advice analicticData={analicticData} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
