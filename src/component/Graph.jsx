import React from 'react';

const Graph = () => {
  // 예시 데이터
  const data = [
    { day: '월', score: 3 },
    { day: '화', score: 4 },
    { day: '수', score: 3.5 },
    { day: '목', score: 5 },
    { day: '금', score: 4.5 },
    { day: '토', score: 3 },
    { day: '일', score: 4 },
  ];

  const maxScore = 5;
  const averageScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto font-noto-sans-kr">
      <h2 className="text-left text-xl font-bold text-black mb-4">감정 변화 통계</h2>
      <div className="flex items-center space-x-4">
        {/* 평균 점수 */}
        <div className="flex flex-col items-center justify-center w-20">
          <span className="text-3xl text-blue font-bold">{averageScore.toFixed(1)}</span>
          <span className="text-xs mt-1 text-black text-center">최근 7일 평균</span>
        </div>

        {/* 그래프 */}
        <div className="flex-1">
          <div className="flex items-end space-x-2">
            {/* 일별 점수 */}
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="h-24 w-full bg-gray-100 rounded-t-lg relative">
                  <div
                    className="absolute bottom-0 w-full bg-gray-300 rounded-t-lg"
                    style={{ height: `${(item.score / maxScore) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-1">{item.day}</span>
                <span className="text-xs">{item.score.toFixed(1)}</span>
              </div>
            ))}
          </div>

          {/* Y축 레이블 */}
          <div className="flex justify-between mt-2">
            {[0, 1, 2, 3, 4, 5].map((score) => (
              <span key={score} className="text-xs">
                {score}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
