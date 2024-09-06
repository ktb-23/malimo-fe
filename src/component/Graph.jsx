import React, { useState, useEffect } from 'react';

const Graph = () => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState([]);

  // Generate data for the last 7 days
  useEffect(() => {
    const generateData = () => {
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date;
      }).reverse();

      const newData = last7Days.map((date) => ({
        day: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        score: Math.random() * 2 + 3, // Random score between 3 and 5
        date: date,
      }));

      setData(newData);
    };

    generateData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const maxScore = 5;
  const averageScore = data.length > 0 ? data.reduce((sum, item) => sum + item.score, 0) / data.length : 0;

  // Determine bar color based on whether the day is today
  const getBarColor = (index) => {
    return index === data.length - 1 ? 'bg-blue' : 'bg-skyblue';
  };

  // Format score to show one decimal place only if necessary
  const formatScore = (score) => {
    return score % 1 === 0 ? score.toFixed(0) : score.toFixed(1);
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
