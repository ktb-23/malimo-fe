import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // 여기에 검색 로직을 추가할 수 있습니다.
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="검색을 통해 과거의 기억들을 찾아보세요."
        className="w-full py-3 pl-4 pr-24 text-sm text-black bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-500"
      />
      <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue px-4 py-2 rounded-3xl hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue transition duration-300 ease-in-out flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white mr-1"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
