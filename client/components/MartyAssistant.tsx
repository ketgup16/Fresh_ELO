import { FileText, Maximize2, Minus } from "lucide-react";

export default function MartyAssistant() {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-[425px] h-[652px] rounded-t-xl border border-[#E3E4E5] shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] bg-white">
      {/* Navbar */}
      <div className="flex w-full h-[60px] px-4 py-3 justify-between items-center rounded-t-2xl border-b border-[#E3E4E5] bg-white">
        <div className="flex h-9 items-center gap-1.5">
          {/* Marty Orb */}
          <div className="flex w-6 h-6 justify-center items-center rounded-full bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_marty)">
                <rect width="24" height="24" rx="12" fill="white"/>
                <path d="M-0.144531 11.9995C-0.144531 5.29252 5.29252 -0.144531 11.9995 -0.144531C18.7064 -0.144531 24.1435 5.29252 24.1435 11.9995C24.1435 18.7064 18.7064 24.1435 11.9995 24.1435C5.29252 24.1435 -0.144531 18.7064 -0.144531 11.9995Z" fill="url(#pattern0_marty)"/>
              </g>
              <defs>
                <pattern id="pattern0_marty" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <circle cx="0.5" cy="0.5" r="0.4" fill="#993EF4"/>
                </pattern>
                <clipPath id="clip0_marty">
                  <rect width="24" height="24" rx="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          
          <div className="flex justify-center items-center gap-2.5">
            <div className="text-[#2E2F32] font-bold text-xl leading-7">Marty</div>
          </div>
          
          {/* Beta Tag */}
          <div className="flex px-2 py-1 items-start gap-1 rounded border border-[#515357] bg-white">
            <div className="text-[#515357] text-xs leading-4">Beta</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          {/* Reports Icon with Notification */}
          <div className="relative flex w-6 h-6 justify-center items-center bg-white">
            <FileText className="w-6 h-6 text-[#2E2F32]" strokeWidth={1.5} />
            <div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#EA1100] border border-white" style={{ borderWidth: '1.5px' }}></div>
          </div>

          {/* Expand Icon */}
          <Maximize2 className="w-6 h-6 text-[#2E2F32]" strokeWidth={1.5} />

          {/* Minimize Icon */}
          <div className="flex w-6 h-6 justify-center items-center bg-white">
            <Minus className="w-6 h-6 text-[#2E2F32]" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Welcome Content */}
      <div className="flex flex-col items-start gap-6 px-4 pt-4 pb-0 bg-white h-[200px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          {/* Greeting */}
          <div className="self-stretch text-[32px] font-bold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-[#2E2F32] to-[#2E2F32]">
            <span className="text-[#2E2F32]">Hi, Gabriela</span>
          </div>
          
          {/* Description */}
          <div className="self-stretch text-[#2E2F32] text-sm leading-5">
            I'm your smart assistant, here to help you launch campaigns, get insights and find answers. What can I help you with today?
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="flex w-full flex-col items-start gap-2 bg-white">
          <button className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center gap-2 rounded-lg border border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
            <div className="text-[#2E2F32] text-sm font-bold leading-5">Create a campaign</div>
          </button>
          
          <button className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center gap-2 rounded-lg border border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
            <div className="text-[#2E2F32] text-sm font-bold leading-5">Help & FAQs</div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 flex w-full px-4 py-4 flex-col items-center gap-3 bg-white h-[116px]">
        {/* Input Container */}
        <div className="flex max-w-[760px] max-h-[176px] items-end gap-6 self-stretch rounded-lg border border-[#E3E4E5] shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] px-3 py-2">
          <div className="flex flex-col justify-center flex-1 self-stretch text-[#74767C] text-sm leading-5">
            <span>How can I help?</span>
          </div>
          
          {/* Send Button (disabled state) */}
          <div className="flex p-2 flex-col items-start rounded-full bg-[#E3E4E5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12L8 4M8 4L11 7M8 4L5 7" stroke="#C2C3C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="w-full text-[#74767C] text-center text-xs leading-4">
          <span>I'm powered by AI and can make mistakes. Don't share sensitive info. </span>
          <span className="underline cursor-pointer hover:no-underline">Disclaimer</span>
        </div>
      </div>
    </div>
  );
}
