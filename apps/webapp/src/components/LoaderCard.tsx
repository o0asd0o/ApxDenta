import React, { type CSSProperties } from 'react';

const LoadingCard: React.FC = () => {
  return (
    <div
      style={{ '--bg-color': 'transparent' } as CSSProperties}
      className="bg-[var(--bg-color)] py-4 px-8 rounded-[1.25rem]"
    >
      <div className="flex h-10 box-content p-[10px] text-[25px] font-medium text-[#7c7c7c] rounded-lg">
        <p>loading</p>
        <div className="overflow-hidden relative">
          <span className="word">buttons</span>
          <span className="word">tables</span>
          <span className="word">forms</span>
          <span className="word">cards</span>
          <span className="word">buttons</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
