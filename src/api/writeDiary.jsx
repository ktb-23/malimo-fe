// src/api/writeDiary.jsx
import api from '../config/apiconfig';

export const writeDiary = async (date, contents) => {
  try {
    const response = await api.post(
      '/api/v1/diary',
      { date, contents },
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
    return {
      success: false,
      error: error.response ? error.response.data.message : '일기 작성 중 오류가 발생했습니다.',
    };
  }
};

export default writeDiary;
