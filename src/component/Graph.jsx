import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from '../util/dayjs';

const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const Graph = ({ analicticData }) => {
  const [animate, setAnimate] = useState(false);
  const { total_scores } = analicticData;

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!total_scores || total_scores.every((score) => score === null || isNaN(score))) {
    return <div className="text-center">데이터가 없습니다.</div>;
  }

  const maxScore = 5;

  // Convert all values to numbers and filter out invalid values
  const validScores = total_scores
    .map((score) => parseFloat(score)) // Convert to number
    .filter((score) => !isNaN(score)); // Remove NaN values

  const averageScore =
    validScores.length !== 0 ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length : 0;

  const getBarColor = (index) => {
    return index === Number(dayjs().format('d')) ? 'bg-blue' : 'bg-skyblue';
  };

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
          <div className="flex items-end space-x-2 h-32">
            {total_scores
              .map((item) => (item === null ? 0 : parseFloat(item))) // Convert to number
              .map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="h-28 w-full bg-white rounded-t-lg relative overflow-visible">
                    <div
                      className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out ${
                        animate ? '' : 'h-0'
                      } ${getBarColor(index)}`}
                      style={{ height: animate ? `${(item / maxScore) * 100}%` : '0%' }}
                    ></div>
                    <div
                      className={`absolute w-full text-center text-xs text-black font-bold transition-all duration-1000 ease-out`}
                      style={{
                        bottom: animate ? `calc(${(item / maxScore) * 100}% + 4px)` : '0%',
                        opacity: animate ? 1 : 0,
                      }}
                    >
                      {formatScore(item)}
                    </div>
                  </div>
                  <span className="text-xs mt-1">{daysOfWeek[index]}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Graph.propTypes = {
  analicticData: PropTypes.object.isRequired,
};

export default Graph;
