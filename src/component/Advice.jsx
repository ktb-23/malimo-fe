import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchAdvice } from '../api/searchAdvice';

const Advice = ({ date }) => {
  const [adviceData, setAdviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      try {
        const result = await searchAdvice(date);
        if (result.success) {
          setAdviceData(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('조언을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching advice:', err);
      }
      setLoading(false);
    };

    if (date) {
      fetchAdvice();
    }
  }, [date]);

  if (loading) return <div className="text-center">조언을 불러오는 중...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!adviceData) return null;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto font-noto-sans-kr">
      <h2 className="text-2xl font-bold text-black mb-4 text-left">{adviceData.title || '오늘의 조언'}</h2>
      <p className="text-black mb-6 text-center">{adviceData.content}</p>
      {adviceData.recommendations && adviceData.recommendations.length > 0 && (
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            {adviceData.recommendationTitle || '추천 콘텐츠'}
          </h3>
          <ul className="list-disc list-inside text-black pl-4">
            {adviceData.recommendations.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Advice.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Advice;
