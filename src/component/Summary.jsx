import React from 'react';
import dayjs from '../util/dayjs';
import PropTypes from 'prop-types';

const Summary = ({ analicticData, selectedDate }) => {
  const { summary, emotion_analysis } = analicticData;

  if (!summary) {
    return <div className="text-center">데이터가 없습니다.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto font-noto-sans-kr">
      <div className="text-left mb-4">
        <h2 className="text-lg font-semibold text-gray-600">
          어제, {dayjs(selectedDate).format('M월 D일 dddd')}의 기억
        </h2>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-3">({emotion_analysis})</h3>
        <p className="text-gray-700 whitespace-pre-line">{summary}</p>
      </div>
    </div>
  );
};

Summary.propTypes = {
  analicticData: PropTypes.object.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default Summary;
