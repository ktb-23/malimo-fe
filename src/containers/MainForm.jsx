import React from 'react';
import WebNav from './WebNav';
import Calendar from '../component/Calendar';
import InputDiary from '../component/InputDiary';
import Search from '../component/Search';
import Summary from '../component/Summary';
import Advice from '../component/Advice';
import Graph from '../component/Graph';

const MainForm = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* WebNav */}
      <div className="w-1/4 min-w-[300px] max-w-[300px]">
        <WebNav />
      </div>

      {/* Main content area */}
      <div className="flex-1 grid grid-cols-2 grid-rows-[1fr_1fr_1fr_1fr]">
        {/* Search: 2,3 */}
        <div className="col-span-2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Search />
          </div>
        </div>

        {/* Calendar: 5 */}
        <div className="col-span-1">
          <Calendar />
        </div>

        {/* Summary: 6 */}
        <div className="col-span-1">
          <Summary />
        </div>

        {/* InputDiary: 8 */}
        <div className="col-span-1">
          <InputDiary />
        </div>

        {/* Advice: 9,12 */}
        <div className="row-span-2 col-span-1">
          <Advice />
        </div>

        {/* Graph: 11 */}
        <div className="col-span-1">
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default MainForm;
