import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchAdvice } from '../api/searchAdvice';

const Advice = ({ date }) => {
  const [adviceData, setAdviceData] = useState({
    title: '오늘의 조언',
    content: '',
    recommendationTitle: '추천 콘텐츠',
    recommendationList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      const result = await searchAdvice(date);
      if (result.success) {
        setAdviceData((prevData) => ({
          ...prevData,
          content: result.data.content,
          recommendationList: ['긍정적인 마인드셋 기르기', '매일 감사일기 쓰기', '주변 사람들에게 감사 표현하기'],
        }));
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    if (date) {
      fetchAdvice();
    }
  }, [date]);

  if (loading) return <div className="text-center">조언을 불러오는 중...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto font-noto-sans-kr">
      <h2 className="text-2xl font-bold text-black mb-4 text-left">{adviceData.title}</h2>
      <p className="text-black mb-6 text-center">{adviceData.content}</p>
      <div className="text-left">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">{adviceData.recommendationTitle}</h3>
        <ul className="list-disc list-inside text-black pl-4">
          {adviceData.recommendationList.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Advice.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Advice;
