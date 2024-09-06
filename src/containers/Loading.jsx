import React from 'react';
import WebNav from './WebNav';
import Calendar from '../component/Calendar';
import InputDiary from '../component/InputDiary';
import Search from '../component/Search';
import Graph from '../component/Graph';
import LoadingImg from '../image/loadingimg.GIF';

const Loading = () => {
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
              <Calendar />
            </div>
          </div>

          {/* InputDiary */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">
              <InputDiary />
            </div>
          </div>

          {/* Graph */}
          <div className="flex justify-end items-start">
            <div className="w-full max-w-md">
              <Graph />
            </div>
          </div>
        </div>

        {/* Summary: right column, left-aligned */}
        <div className="flex justify-start items-center pl-4">
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="w-60 h-60 flex items-center justify-center">
              <img src={LoadingImg} alt="Loading" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold mt-4 text-center">로딩중. . .</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
