import React from 'react';
import PropTypes from 'prop-types';

const Navbttn = ({ isActive, icon, text, onClick }) => {
  return (
    <button
      className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-blue' : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-lg ${isActive ? 'bg-blue' : 'bg-white'}`}>{icon}</div>
      <span className={`ml-3 font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{text}</span>
    </button>
  );
};

Navbttn.propTypes = {
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Navbttn;
