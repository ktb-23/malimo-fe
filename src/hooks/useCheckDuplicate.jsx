// src/hooks/useCheckDuplicate.jsx

import { useState } from 'react';
import api from '../config/apiconfig';

export const useCheckDuplicate = () => {
  const [duplicateErrors, setDuplicateErrors] = useState({});

  const checkDuplicateEmail = async (email) => {
    try {
      const response = await api.checkEmail(email);
      const error = response.isDuplicate ? '이미 사용 중인 이메일 주소입니다.' : '';
      setDuplicateErrors((prev) => ({ ...prev, email: error }));
      return !response.isDuplicate;
    } catch (error) {
      console.error('이메일 중복 체크 중 오류 발생:', error);
      setDuplicateErrors((prev) => ({
        ...prev,
        email: '이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.',
      }));
      return false;
    }
  };

  const checkDuplicateNickname = async (nickname) => {
    try {
      const response = await api.checkNickname(nickname);
      const error = response.isDuplicate ? '이미 사용 중인 닉네임입니다.' : '';
      setDuplicateErrors((prev) => ({ ...prev, nickname: error }));
      return !response.isDuplicate;
    } catch (error) {
      console.error('닉네임 중복 체크 중 오류 발생:', error);
      setDuplicateErrors((prev) => ({
        ...prev,
        nickname: '이미 사용중인 닉네임입니다.',
      }));
      return false;
    }
  };

  return { duplicateErrors, checkDuplicateNickname, checkDuplicateEmail };
};
