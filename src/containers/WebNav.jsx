import React, { useState } from 'react';
import Navbttn from '../component/Navbttn';
import HomeIcon from '../image/Homeicon.svg';
import ListIcon from '../image/Listicon.svg';
import GraphIcon from '../image/Graphicon.svg';
import RecommendIcon from '../image/Recommendicon.svg';
import MyIcon from '../image/Myicon.svg';
import SettingIcon from '../image/Settingicon.svg';
import Bellicon from '../image/Bellicon.svg';
import Logo from '../image/Logo.svg';

const WebNav = () => {
  const [activeButton, setActiveButton] = useState('home');

  const navButtons = [
    { id: 'home', icon: <img src={HomeIcon} alt="Home" />, text: '메인페이지' },
    { id: 'list', icon: <img src={ListIcon} alt="List" />, text: '나의 기록들' },
    { id: 'graph', icon: <img src={GraphIcon} alt="Graph" />, text: '나의 통계' },
    { id: 'recommend', icon: <img src={RecommendIcon} alt="Recommend" />, text: '추천 콘텐츠' },
    { id: 'mypage', icon: <img src={MyIcon} alt="My" />, text: '내 정보' },
    { id: 'settings', icon: <img src={SettingIcon} alt="Settings" />, text: '환경설정' },
  ];

  return (
    <div className="fixed left-0 top-0 flex flex-col h-screen w-1/4 min-w-[300px] max-w-[300px] bg-gray-100 shadow-md overflow-y-auto text-[8px] sm:text-xs md:text-sm lg:text-base">
      <div className="p-2 sm:p-3 md:p-4">
        <img src={Logo} alt="Logo" className="w-full h-auto" />
      </div>
      <div className="my-2 sm:my-3 md:my-4 px-2 sm:px-3 md:px-4 py-1 sm:py-2 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#4E46DD]">세영님</h2>
        <p className="mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-gray-600">오늘도 고생하셨어요!</p>
        <div className="text-sm mt-4 sm:mt-6 md:mt-8 ">
          <Navbttn
            key="alert"
            isActive={activeButton === 'alert'}
            icon={<img src={Bellicon} alt="Bell" />}
            text={'알림'}
            onClick={() => setActiveButton('alert')}
          />
        </div>
      </div>
      <div className="text-sm flex-grow space-y-1 p-2 sm:p-3  md:p-4">
        {navButtons.map((button) => (
          <Navbttn
            key={button.id}
            isActive={activeButton === button.id}
            icon={button.icon}
            text={button.text}
            onClick={() => setActiveButton(button.id)}
          />
        ))}
      </div>
      <div className="mt-auto p-2 sm:p-3 md:p-4 border-t border-gray-200 text-gray-300 text-xs sm:text-sm">
        나의 작은 기억들, 마리모 <br /> V.1.0.0
      </div>
    </div>
  );
};

export default WebNav;
