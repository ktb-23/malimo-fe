import React, { useState, useEffect } from 'react';

const Graph = () => {
  const [animate, setAnimate] = useState(false);

  // Original data
  const originalData = [
    { day: '월', score: 3 },
    { day: '화', score: 4 },
    { day: '수', score: 3.5 },
    { day: '목', score: 5 },
    { day: '금', score: 4.5 },
    { day: '토', score: 3 },
    { day: '일', score: 4 },
  ];

  // Get current day of the week as an index starting from Monday (0) to Sunday (6)
  const getTodayIndex = () => {
    const today = new Date();
    const day = today.getDay();
    // Map Sunday (0) to last in the custom index where Monday is first (0)
    return day === 0 ? 6 : day - 1;
  };

  // Rearrange the data so the today’s index day is last
  const reorderData = (data, todayIndex) => {
    return data.slice(todayIndex + 1).concat(data.slice(0, todayIndex + 1));
  };

  const todayIndex = getTodayIndex();
  const data = reorderData(originalData, todayIndex);

  const maxScore = 5;
  const averageScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Determine bar color based on whether the day is today
  const getBarColor = (index) => {
    return index === data.length - 1 ? 'bg-blue' : 'bg-skyblue';
  };

  // Format score to show one decimal place only if necessary
  const formatScore = (score) => {
    return score % 1 === 0 ? score.toString() : score.toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto font-noto-sans-kr">
      <h2 className="text-left text-xl font-bold text-black mb-4">감정 변화 통계</h2>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center justify-center w-20">
          <span className="text-3xl text-blue font-bold">{averageScore.toFixed(1)}</span>
          <span className="text-xs mt-1 text-black text-center">최근 7일 평균</span>
        </div>

        <div className="flex-1">
          <div className="flex items-end space-x-2">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <span className="text-xs mb-1 text-black font-bold">{formatScore(item.score)}</span>
                <div className="h-24 w-full bg-white rounded-t-lg relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out ${
                      animate ? '' : 'h-0'
                    } ${getBarColor(index)}`}
                    style={{ height: animate ? `${(item.score / maxScore) * 100}%` : '0%' }}
                  ></div>
                </div>
                <span className="text-xs mt-1">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
