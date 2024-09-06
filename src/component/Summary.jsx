import React, { useState, useEffect } from 'react';
import { searchAdvice } from '../api/searchAdvice';

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = yesterday.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식

      try {
        const result = await searchAdvice(formattedDate);
        if (result.success) {
          setSummaryData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!summaryData) {
    return <div className="text-center">데이터가 없습니다.</div>;
  }

  const { date, emotion, content } = summaryData;

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

export default Summary;
