import api from '../config/apiconfig';
import dayjs from '../util/dayjs';

export const searchDiary = async (date) => {
  try {
    const response = await api.get(`/api/v1/diary/${dayjs(date).format('YYYY.MM.DD')}`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization 헤더는 apiconfig에서 설정되어 있다고 가정합니다.
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('일기 조회 에러:', error);

    if (error.response) {
      // 서버가 응답을 반환한 경우
      if (error.response.status === 400) {
        return {
          success: false,
          error: '잘못된 요청입니다. 날짜 형식을 확인해주세요.',
        };
      } else if (error.response.status === 401) {
        return {
          success: false,
          error: '로그인이 필요한 서비스입니다.',
        };
      }
    }

    // 그 외의 에러
    return {
      success: false,
      error: '일기 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
};

export default searchDiary;
