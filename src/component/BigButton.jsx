import React from 'react';
import PropTypes from 'prop-types';

const BigButton = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 bg-blue text-white text-lg font-semibold rounded-full hover:bg-blue transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

BigButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default BigButton;
