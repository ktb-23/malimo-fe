// src/components/ConfirmModal.jsx

import React from 'react';
import PropTypes from 'prop-types';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-100 border-black text-black rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue text-white rounded hover:bg-red">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmModal;
