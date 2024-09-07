// src/api/writeDiary.jsx
import api from '../config/apiconfig';
import dayjs from '../util/dayjs';

export const writeDiary = async (date, contents) => {
  try {
    const response = await api.post(
      '/api/v1/diary',
      { date: dayjs(date).format('YYYY.MM.DD'), contents },
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization 헤더는 api 인스턴스에서 자동으로 추가됩니다.
        },
      },
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error('일기 작성 중 오류 발생:', error);
    let errorMessage = '일기 작성 중 오류가 발생했습니다.';
    if (error.response) {
      console.error('Error response:', error.response);
      errorMessage = `서버 오류: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      console.error('Error request:', error.request);
      errorMessage = '서버에 연결할 수 없습니다.';
    } else {
      console.error('Error message:', error.message);
      errorMessage = `오류: ${error.message}`;
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export default writeDiary;
