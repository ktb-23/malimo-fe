import React from 'react';
import PropTypes from 'prop-types';

const Advice = ({ analicticData }) => {
  const { advice } = analicticData;

  if (!advice) return null;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto font-noto-sans-kr">
      <h2 className="text-2xl font-bold text-black mb-4 text-left">오늘의 조언</h2>
      <p className="text-black mb-6 text-center">{advice}</p>
    </div>
  );
};

Advice.propTypes = {
  analicticData: PropTypes.object.isRequired,
};

export default Advice;
