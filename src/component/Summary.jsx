import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ date, emotion, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto font-noto-sans-kr">
      <div className="text-left mb-4">
        <h2 className="text-lg font-semibold text-gray-600">어제, {date}의 기억</h2>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-3">({emotion})</h3>
        <p className="text-gray-700 whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

Summary.propTypes = {
  date: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Summary.defaultProps = {
  date: '날짜 정보 없음',
  emotion: '감정 정보 없음',
  content: '내용 없음',
};

const SummaryExample = () => {
  const exampleData = {
    date: '9월 2일 월요일',
    emotion: '내가 느낀 감정',
    content: '할 일이 너무 많았고,\n낯선 사람들을 많이 마주해 정신 없었지만,\n팀원들을 만나 반갑고 신났어요.',
  };

  return <Summary {...exampleData} />;
};

export default SummaryExample;
