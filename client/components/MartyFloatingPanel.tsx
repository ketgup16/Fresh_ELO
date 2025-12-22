import { useState } from "react";
import { FileText, Maximize2, Minus } from "lucide-react";

export default function MartyFloatingPanel() {
  const [isMinimized, setIsMinimized] = useState(false);

  // Minimized "Ask Marty" button
  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsMinimized(false)}
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

  // Full Panel
  return (
    <div className="fixed bottom-0 right-4 z-50 w-[425px] h-[652px] rounded-t-xl border border-[#E3E4E5] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] bg-white flex flex-col">
      {/* Navbar */}
      <div className="flex w-full h-[60px] px-4 py-3 justify-between items-center rounded-t-2xl border-b border-[#E3E4E5] bg-white flex-shrink-0">
        <div className="flex h-9 items-center gap-1.5">
          {/* Marty Orb */}
          <div className="flex w-6 h-6 justify-center items-center rounded-full bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_marty_panel)">
                <rect width="24" height="24" rx="12" fill="white"/>
                <circle cx="12" cy="12" r="9.5" fill="url(#gradient_marty_panel)"/>
              </g>
              <defs>
                <linearGradient id="gradient_marty_panel" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#993EF4"/>
                  <stop offset="50%" stopColor="#4DBDF5"/>
                  <stop offset="100%" stopColor="#00D0CD"/>
                </linearGradient>
                <clipPath id="clip0_marty_panel">
                  <rect width="24" height="24" rx="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          
          <div className="flex justify-center items-center gap-2.5 px-1.5 pb-0.5">
            <div className="text-[#2E2F32] font-bold text-lg leading-6">Marty</div>
          </div>
          
          {/* Beta Tag */}
          <div className="flex px-2 py-1 items-start gap-1 rounded border border-[#515357] bg-white">
            <div className="text-[#515357] text-xs leading-4">Beta</div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          <button className="w-6 h-6 flex justify-center items-center relative">
            <FileText className="w-6 h-6" />
            <div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#EA1100] border-[1.5px] border-white"></div>
          </button>
          <button className="w-6 h-6 flex justify-center items-center">
            <Maximize2 className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsMinimized(true)}
            className="w-6 h-6 flex justify-center items-center hover:bg-gray-100 rounded transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="flex flex-col gap-4">
          {/* System Message */}
          <div className="text-[#2E2F32] text-sm leading-5">
            I have added your selections and <span className="font-bold">your campaign is ready to launch.</span> You can still take a moment to review your campaign and make and final changes. When you're ready, click the <span className="font-bold">"Launch campaign"</span> button in the top-right corner.
          </div>

          {/* Prompt Suggestions */}
          <div className="flex flex-col gap-2">
            <button className="flex max-w-full px-4 py-2 justify-center items-center text-center gap-2 rounded-full border border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
              <div className="text-[#2E2F32] text-sm font-bold leading-5">What can Marty help me do on this page?</div>
            </button>
            <button className="flex max-w-full px-4 py-2 justify-center items-center text-center gap-2 rounded-full border border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
              <div className="text-[#2E2F32] text-sm font-bold leading-5">How do I set up a Sponsored Products campaign?</div>
            </button>
            <button className="flex max-w-full px-4 py-2 justify-center items-center text-center gap-2 rounded-full border border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
              <div className="text-[#2E2F32] text-sm font-bold leading-5">Which items do you recommend I advertise?</div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 px-4 py-4 border-t border-[#E3E4E5] bg-white">
        <div className="flex max-w-full px-4 py-3 items-end gap-6 rounded-lg border border-[#BABBBE] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
          <div className="flex-1 text-[#74767C] text-sm leading-5">How can I help?</div>
          <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-[#E3E4E5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3L8 13" stroke="#BABBBE" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 8L8 3L13 8" stroke="#BABBBE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="text-[#74767C] text-center text-xs leading-4">
          I'm powered by AI and can make mistakes. Don't share sensitive info. <span className="underline cursor-pointer">Disclaimer</span>
        </div>
      </div>
    </div>
  );
}
