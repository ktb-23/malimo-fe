import React from 'react';

const Advice = () => {
  const adviceData = {
    title: '오늘의 조언',
    content: '작은 일에도 감사하는 마음을 가지세요. 감사는 더 많은 행복을 가져다 줍니다.',
    recommendationTitle: '추천 콘텐츠',
    recommendationList: ['긍정적인 마인드셋 기르기', '매일 감사일기 쓰기', '주변 사람들에게 감사 표현하기'],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto font-noto-sans-kr">
      <h2 className="text-2xl font-bold text-blue mb-4 text-left">{adviceData.title}</h2>
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

export default Advice;
