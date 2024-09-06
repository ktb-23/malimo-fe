import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteAccount } from '../api/delete'; // deleteAccount 함수 import

const ConfirmModal = ({ isOpen, onClose, message }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await deleteAccount();

      if (result.success) {
        // 성공 메시지 표시
        alert('회원 탈퇴가 완료되었습니다.');
        window.location.href = '/'; // 홈페이지로 리다이렉트
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('회원 탈퇴 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        {error && <p className="text-red mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-100 border-black text-black rounded hover:bg-gray-300"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red"
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmModal;
