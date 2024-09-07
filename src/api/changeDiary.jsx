import api from '../config/apiconfig';

export const changeDiary = async (diaryId, contents) => {
  try {
    const response = await api.put(`/api/v1/diary/${diaryId}`, {
      contents: contents,
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error('일기 수정 에러:', error);
    return {
      success: false,
      message: error.response ? error.response.data.message : '네트워크 오류가 발생했습니다.',
    };
  }
};

export default changeDiary;
