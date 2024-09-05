import React from 'react';
import WebNav from './WebNav';
import Calendar from '../component/Calendar';
import InputDiary from '../component/InputDiary';
import Search from '../component/Search';
import Graph from '../component/Graph';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* WebNav */}
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      {/* Main content area */}
      <div className="flex-1 grid grid-cols-2 grid-rows-[auto_1fr_1fr_1fr] gap-4 px-8">
        {/* Search: spans both columns */}
        <div className="col-span-2 flex items-center justify-center py-4">
          <div className="w-full max-w-2xl">
            <Search />
          </div>
        </div>

        {/* Calendar: left column, right-aligned */}
        <div className="flex justify-end items-center pr-4">
          <div className="w-full max-w-md">
            <Calendar />
          </div>
        </div>
        {/* InputDiary: left column, right-aligned */}
        <div className="flex justify-end items-center pr-4">
          <div className="w-full max-w-md">
            <InputDiary />
          </div>
        </div>

        {/* Graph: left column, right-aligned */}
        <div className="flex justify-end items-center pr-4">
          <div className="w-full max-w-md">
            <Graph />
          </div>
        </div>

        {/* Summary: right column, left-aligned */}
        <div className="flex justify-start items-center pl-4">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">로딩중입니다. . .</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
