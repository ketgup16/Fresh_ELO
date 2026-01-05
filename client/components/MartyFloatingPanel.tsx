import { useState } from "react";

interface MartyFloatingPanelProps {
  isMinimized?: boolean;
  onMinimizedChange?: (minimized: boolean) => void;
}

export default function MartyFloatingPanel({
  isMinimized = false,
  onMinimizedChange
}: MartyFloatingPanelProps) {
  const handleMinimize = () => {
    if (onMinimizedChange) {
      onMinimizedChange(true);
    }
  };

  const handleExpand = () => {
    if (onMinimizedChange) {
      onMinimizedChange(false);
    }
  };

  // Minimized "Ask Marty" button
  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleExpand}
          className="inline-flex p-0.5 justify-end items-center gap-2 rounded-full shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] relative overflow-hidden group"
        >
          {/* Gradient Border Background */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(134deg, #993EF4 10.5%, #4DBDF5 71.77%, #00D0CD 102.41%)'
            }}
          />
          
          {/* Content */}
          <div className="flex py-2 pl-2 pr-4 items-center gap-2 rounded-full bg-white relative z-10">
            {/* Marty Orb */}
            <div className="flex w-[38px] h-[38px] justify-center items-center rounded-full bg-white overflow-hidden flex-shrink-0">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_marty_orb)">
                  <rect width="38" height="38" rx="19" fill="white"/>
                  <circle cx="19" cy="19" r="14.5" fill="url(#gradient_marty_orb)"/>
                </g>
                <defs>
                  <linearGradient id="gradient_marty_orb" x1="4.5" y1="4.5" x2="33.5" y2="33.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#993EF4"/>
                    <stop offset="50%" stopColor="#4DBDF5"/>
                    <stop offset="100%" stopColor="#00D0CD"/>
                  </linearGradient>
                  <clipPath id="clip0_marty_orb">
                    <rect width="38" height="38" rx="19" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            
            {/* Text */}
            <div className="text-[#2E2F32] text-right font-bold text-base leading-6">
              Ask Marty
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Full Panel - New Figma Design
  return (
    <div className="fixed bottom-0 right-4 z-50 w-[425px] h-[752px] rounded-t-2xl shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] bg-white flex flex-col">
      {/* Navbar */}
      <div className="flex w-full h-14 px-4 py-3 justify-between items-center rounded-t-2xl border-b border-[#E3E4E5] bg-white flex-shrink-0">
        <div className="flex h-9 items-center gap-1.5 bg-white">
          {/* Marty Orb */}
          <div className="flex w-6 h-6 justify-center items-center rounded-full relative">
            <div className="absolute w-14 h-14 -left-4 -top-4">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="28" fill="url(#gradient_marty_glow)"/>
                <defs>
                  <linearGradient id="gradient_marty_glow" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#993EF4" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#4DBDF5" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#00D0CD" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <div className="flex px-1.5 pb-0.5 justify-center items-center gap-2.5">
            <div className="text-[#2E2F32] font-bold text-lg leading-6">Marty</div>
          </div>
          
          {/* Beta Tag */}
          <div className="flex px-2 py-1 items-start gap-1 rounded border border-[#515357] bg-white">
            <span className="text-[#515357] text-xs leading-4">Beta</span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          {/* Files Icon with Notification */}
          <button className="flex w-6 h-6 justify-center items-center gap-2.5 bg-white relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19.5V4C2 3.44772 2.44772 3 3 3H7.08579C7.351 3 7.60536 3.10536 7.79289 3.29289L10.2071 5.70711C10.3946 5.89464 10.649 6 10.9142 6H21.5C22.0523 6 22.5 6.44772 22.5 7V19.5C22.5 20.0523 22.0523 20.5 21.5 20.5H3C2.44772 20.5 2 20.0523 2 19.5Z" stroke="#2E2F32" strokeWidth="1.5"/>
              <path d="M2 9H22.5" stroke="#2E2F32" strokeWidth="1.5"/>
            </svg>
            <svg className="absolute -right-0.5 top-0.5" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="4.25" fill="#EA1100" stroke="white" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Expand Icon */}
          <button className="w-6 h-6 bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white"/>
              <path d="M14 4H20V10" stroke="#2E2F32" strokeWidth="1.5"/>
              <path d="M14 10L20 4" stroke="#2E2F32" strokeWidth="1.5"/>
              <path d="M10 20L4 20L4 14" stroke="#2E2F32" strokeWidth="1.5"/>
              <path d="M10 14L4 20" stroke="#2E2F32" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Minimize Icon */}
          <button
            onClick={handleMinimize}
            className="flex w-6 h-6 justify-center items-center bg-white hover:bg-gray-100 rounded transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="11" width="14" height="2" fill="#2E2F32"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex w-full max-w-[760px] px-4 py-4 flex-col items-end gap-6 flex-1 bg-white overflow-y-auto">
        <div className="flex flex-col items-start gap-6 self-stretch bg-white">
          {/* Welcome Section */}
          <div className="flex flex-col items-start gap-4 self-stretch bg-white">
            <h1 
              className="self-stretch font-bold text-2xl leading-8"
              style={{
                background: 'linear-gradient(134deg, #993EF4 10.5%, #3F7FCF 71.77%, #00AD9F 102.41%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Hi, Gabriela
            </h1>
            <p className="self-stretch text-[#2E2F32] text-sm leading-5">
              I'm your smart assistant, here to help you launch campaigns, get insights and find answers. What can I help you with today?
            </p>
          </div>

          {/* Prompt Suggestions */}
          <div className="flex w-full flex-col items-start gap-2 bg-white">
            <button className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
              <span className="text-[#2E2F32] text-sm font-bold leading-5">Create campaign</span>
            </button>
            <button className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
              <span className="text-[#2E2F32] text-sm font-bold leading-5">Help & FAQs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-white">
        {/* Input Field */}
        <div className="flex max-w-[760px] max-h-44 px-4 py-3 items-end gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
          <div className="flex flex-col justify-center flex-1 self-stretch text-[#2E2F32] text-sm leading-5">
            Lorem ipsum dolor sit amet?
          </div>
          <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-[#0071DC]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3L8 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 8L8 3L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="w-full text-[#74767C] text-center text-xs leading-4">
          I'm powered by AI and can make mistakes. Don't share sensitive info. <span className="underline cursor-pointer">Disclaimer</span>
        </div>
      </div>
    </div>
  );
}
