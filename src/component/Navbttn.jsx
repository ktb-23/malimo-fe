import React from 'react';
import PropTypes from 'prop-types';

const Navbttn = ({ isActive, icon, text, onClick }) => {
  return (
    <button
      className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-gray-100' : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-lg ${isActive ? 'bg-blue' : 'bg-gray-200'}`}>
        {React.cloneElement(icon, {
          className: `w-6 h-6 ${
            isActive
              ? 'filter brightness-0 invert' // 흰색으로 변경
              : 'filter brightness-0 invert' // 검은색으로 변경
          }`,
        })}
      </div>
      <span className={`ml-3 font-medium ${isActive ? 'text-black' : 'text-gray-300'}`}>{text}</span>
    </button>
  );
};

Navbttn.propTypes = {
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Navbttn;
