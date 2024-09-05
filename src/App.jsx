import './index.css';
import './App.css';
import React from 'react';
import Calendar from './component/Calendar';
import Advice from './component/Advice';
import InputDiary from './component/InputDiary';
import Graph from './component/Graph';
import Summary from './component/Summary';
import Search from './component/Search';

function App() {
  return (
    <div>
      <Calendar />
      <Advice />
      <InputDiary />
      <Graph />
      <Summary />
      <Search />
    </div>
  );
}

export default App;
