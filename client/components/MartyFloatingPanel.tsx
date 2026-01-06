import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MartyFloatingPanelProps {
  isMinimized?: boolean;
  onMinimizedChange?: (minimized: boolean) => void;
}

type ViewState = 'welcome' | 'thinking' | 'campaignForm' | 'campaignReady';

export default function MartyFloatingPanel({
  isMinimized = false,
  onMinimizedChange
}: MartyFloatingPanelProps) {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [helpMessage, setHelpMessage] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');
  const [campaignData, setCampaignData] = useState({
    campaignType: 'Sponsored Products Automatic',
    campaignName: 'Free Rein Coffee Campaign Fall 2025',
    startDate: '10/01/2025',
    dailyBudget: ''
  });

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

  const handleCreateCampaign = () => {
    setViewState('thinking');
    setTimeout(() => {
      setViewState('campaignForm');
    }, 900);
  };

  const handleBack = () => {
    setViewState('welcome');
    setCampaignData({
      campaignType: 'Sponsored Products Automatic',
      campaignName: 'Free Rein Coffee Campaign Fall 2025',
      startDate: '10/01/2025',
      dailyBudget: ''
    });
  };

  const handleSaveAndReview = () => {
    setViewState('campaignReady');
    navigate('/campaign');
  };

  const isLaunchEnabled = campaignData.dailyBudget.trim() !== '';

  // Minimized "Ask Marty" button
  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-30">
        <button
          onClick={handleExpand}
          className="inline-flex p-0.5 justify-end items-center gap-2 rounded-full shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] relative overflow-hidden group transition-all duration-200 ease-out"
        >
          {/* Gradient Border Background */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(134deg, #993EF4 10.5%, #4DBDF5 71.77%, #00D0CD 102.41%)'
            }}
          />

          {/* Content */}
          <div className="flex py-2 pl-2 pr-4 items-center gap-2 rounded-full bg-white relative z-10 transition-all duration-200 ease-out">
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

            {/* Text - Changes on hover */}
            <div className="text-[#2E2F32] text-right text-base leading-6 whitespace-nowrap overflow-hidden transition-all duration-200 ease-out">
              <span className="hidden group-hover:inline font-normal">Have a question? </span>
              <span className="font-bold">Ask Marty</span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Full Panel - New Figma Design
  return (
    <div className="fixed bottom-0 right-4 z-30 w-[425px] h-[752px] rounded-t-2xl shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] bg-white flex flex-col border border-[#E3E4E5]">
      {/* Navbar */}
      <div className="flex w-full h-[60px] px-4 py-3 justify-between items-center rounded-t-2xl border-b border-[#E3E4E5] bg-white flex-shrink-0">
        {viewState === 'campaignForm' ? (
          <div className="flex h-9 items-center gap-3">
            <button onClick={handleBack} className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 5L5 12L12 19" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex pb-0.5 justify-center items-center">
              <div className="text-[#2E2F32] font-bold text-lg leading-6">Create campaign</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-white">
            {/* Marty Orb */}
            <div className="flex w-6 h-6 justify-center items-center rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_marty)">
                  <rect width="24" height="24" rx="12" fill="white"/>
                  <circle cx="12" cy="12" r="9.5" fill="url(#gradient_marty)"/>
                </g>
                <defs>
                  <linearGradient id="gradient_marty" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#993EF4"/>
                    <stop offset="50%" stopColor="#4DBDF5"/>
                    <stop offset="100%" stopColor="#00D0CD"/>
                  </linearGradient>
                  <clipPath id="clip0_marty">
                    <rect width="24" height="24" rx="12" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="flex pr-1.5 justify-center items-center">
              <div className="text-[#2E2F32] font-bold text-lg leading-6">Marty</div>
            </div>

            {/* Beta Tag */}
            <div className="flex px-2 py-1 items-start gap-1 rounded border border-[#515357] bg-white">
              <span className="text-[#515357] text-xs leading-4">Beta</span>
            </div>
          </div>
        )}

        <div className="flex justify-end items-center gap-4">
          {/* Reports Icon with Notification */}
          <button className="flex w-6 h-6 justify-center items-center relative hover:bg-gray-100 rounded transition-colors">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1835b749ef39843ef58643bf8eaf007c6cbe63ff?width=24"
              alt="Reports"
              className="w-6 h-6"
            />
          </button>

          {/* Expand Icon */}
          <button className="flex w-6 h-6 justify-center items-center hover:bg-gray-100 rounded transition-colors">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/4b9543883bac0cc8b18c7c87ebc16153e09ba6ae?width=24"
              alt="Expand"
              className="w-6 h-6"
            />
          </button>

          {/* Minimize Icon */}
          <button
            onClick={handleMinimize}
            className="flex w-6 h-6 justify-center items-center hover:bg-gray-100 rounded transition-colors"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/e7b3a2f3ac0042faea6b580042a0890da69e644e?width=24"
              alt="Minimize"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Content - Changes based on viewState */}
      {viewState === 'welcome' && (
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
              <button
                onClick={handleCreateCampaign}
                className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#2E2F32] text-sm font-bold leading-5">Create campaign</span>
              </button>
              <button
                onClick={() => setHelpMessage('happy birthday')}
                className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#2E2F32] text-sm font-bold leading-5">Help & FAQs</span>
              </button>
            </div>

            {/* Display help message */}
            {helpMessage && (
              <div className="flex w-full px-4 py-3 rounded-lg bg-[#F1F1F2]">
                <div className="text-[#2E2F32] text-sm leading-5">{helpMessage}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {viewState === 'thinking' && (
        <div className="flex w-full px-4 flex-col items-start gap-6 flex-1 bg-white overflow-y-auto">
          {/* User Message */}
          <div className="flex w-full pt-6 pl-20 flex-col items-end gap-1">
            <div className="flex max-w-[608px] px-4 py-2 flex-col items-start gap-2 rounded-lg bg-[#F1F1F2]">
              <div className="self-stretch text-[#2E2F32] text-sm leading-5">
                Create a campaign
              </div>
            </div>
          </div>

          {/* Thinking Animation */}
          <div className="flex w-full h-8 min-w-full px-0 py-1 items-center gap-1.5 bg-white">
            <div 
              className="text-sm leading-5"
              style={{
                background: 'linear-gradient(134deg, #993EF4 10.5%, #3F7FCF 71.77%, #00AD9F 102.41%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Thinking…
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignForm' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0 overflow-y-auto">
          <div className="flex px-4 py-4 flex-col items-center gap-4 flex-1 self-stretch">
            {/* Campaign Type */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-[#2E2F32] text-xs font-bold leading-4">
                  Campaign type
                </div>
              </div>
              <div className="flex h-10 pl-3 items-center gap-2 self-stretch rounded-lg border border-[#E3E4E5] bg-white">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <div className="w-full text-[#2E2F32] text-sm leading-5">
                    {campaignData.campaignType}
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Name */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-[#2E2F32] text-xs font-bold leading-4">
                  Campaign name
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#E3E4E5] bg-white">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.campaignName}
                    onChange={(e) => setCampaignData({...campaignData, campaignName: e.target.value})}
                    className="w-full text-[#2E2F32] text-sm leading-5 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="self-stretch text-[#2E2F32] text-xs font-bold leading-4">
                Start date (mm/dd/yyyy)
              </div>
              <div className="flex h-10 px-3 py-0 pr-1 items-center gap-3 self-stretch rounded-lg border border-[#E3E4E5] bg-white">
                <div className="flex-1 text-[#2E2F32] text-sm leading-5">
                  {campaignData.startDate}
                </div>
                <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-transparent">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="10" height="10" rx="1" stroke="#2E2F32" strokeWidth="1.5"/>
                    <path d="M3 6H13" stroke="#2E2F32" strokeWidth="1.5"/>
                    <path d="M5 2V4" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M11 2V4" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Daily Budget */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-[#2E2F32] text-xs font-bold leading-4">
                  Daily budget
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#E3E4E5] bg-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.75 1.75C8.75 1.33579 8.41421 1 8 1C7.58579 1 7.25 1.33579 7.25 1.75V2.25C6.14924 2.31595 5.24291 2.59963 4.58058 3.10296C3.86609 3.64503 3.5 4.41052 3.5 5.25C3.5 6.08948 3.86609 6.85497 4.58058 7.39704C5.24291 7.90037 6.14924 8.18405 7.25 8.25V11.75C6.69238 11.7149 6.21735 11.6125 5.84467 11.4528C5.46842 11.2915 5.25 11.1018 5.25 10.75C5.25 10.3358 4.91421 10 4.5 10C4.08579 10 3.75 10.3358 3.75 10.75C3.75 11.5895 4.11609 12.355 4.83058 12.897C5.49291 13.4004 6.39924 13.684 7.5 13.75V14.25C7.5 14.6642 7.83579 15 8.25 15C8.66421 15 9 14.6642 9 14.25V13.75C10.1008 13.684 11.0071 13.4004 11.6694 12.897C12.3839 12.355 12.75 11.5895 12.75 10.75C12.75 9.91052 12.3839 9.14503 11.6694 8.60296C11.0071 8.09963 10.1008 7.81595 9 7.75V4.25C9.55762 4.28514 10.0327 4.38754 10.4053 4.54721C10.7816 4.70848 11 4.89824 11 5.25C11 5.66421 11.3358 6 11.75 6C12.1642 6 12.5 5.66421 12.5 5.25C12.5 4.41052 12.1339 3.64503 11.4194 3.10296C10.7571 2.59963 9.85076 2.31595 8.75 2.25V1.75ZM7.25 6.75C6.30762 6.71486 5.71735 6.48754 5.33058 6.16046C5.00891 5.89503 5 5.62552 5 5.25C5 4.87448 5.00891 4.60497 5.33058 4.33954C5.71735 4.01246 6.30762 3.78514 7.25 3.75V6.75ZM8.75 9.25C9.69238 9.28514 10.2827 9.51246 10.6694 9.83954C10.9911 10.105 11 10.3745 11 10.75C11 11.1255 10.9911 11.395 10.6694 11.6605C10.2827 11.9875 9.69238 12.2149 8.75 12.25V9.25Z" fill="#74767C"/>
                </svg>
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.dailyBudget}
                    onChange={(e) => setCampaignData({...campaignData, dailyBudget: e.target.value})}
                    className="w-full text-[#2E2F32] text-sm leading-5 outline-none"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* Items Section */}
            <div className="flex flex-col items-start gap-4 self-stretch">
              <div className="flex flex-col justify-center items-start self-stretch">
                <div className="self-stretch text-[#2E2F32] text-xs font-bold leading-4">
                  Items
                </div>
                <div className="self-stretch text-[#74767C] text-sm leading-5">
                  Your recommended items
                </div>
              </div>

              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <div className="flex items-center gap-3 self-stretch">
                  <div className="flex h-[69px] p-2 flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border border-[#E3E4E5] bg-white">
                    <div className="flex h-[53px] justify-center items-center flex-shrink-0 self-stretch aspect-square">
                      <img className="w-[53px] h-[53px]" src="https://api.builder.io/api/v1/image/assets/TEMP/b6b4cdf9361b1ac23ec99887ba61e7a25ca3b0ca?width=106" alt="" />
                    </div>
                  </div>
                  <div className="flex h-[69px] p-2 flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border border-[#E3E4E5] bg-white">
                    <div className="flex h-[53px] justify-center items-center flex-shrink-0 self-stretch aspect-square">
                      <img className="w-[53px] h-[53px]" src="https://api.builder.io/api/v1/image/assets/TEMP/2a290bc40ba4ec7f8f862e2a3a3faad72e8d3d18?width=106" alt="" />
                    </div>
                  </div>
                  <div className="flex h-[69px] p-2 flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border border-[#E3E4E5] bg-white">
                    <div className="flex h-[53px] justify-center items-center flex-shrink-0 self-stretch aspect-square">
                      <img className="w-[53px] h-[53px]" src="https://api.builder.io/api/v1/image/assets/TEMP/4af3fdb6e6f24421ca5071fdbd5ba9c3bcc9bde3?width=106" alt="" />
                    </div>
                  </div>
                  <div className="flex h-[69px] p-2 flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border border-[#E3E4E5] bg-white">
                    <div className="flex h-[53px] justify-center items-center flex-shrink-0 self-stretch aspect-square">
                      <img className="w-[53px] h-[53px]" src="https://api.builder.io/api/v1/image/assets/TEMP/58079636d483927c7a6b8c0fd5f2a2c348acd83e?width=106" alt="" />
                    </div>
                  </div>
                  <div className="h-[69px] flex-1 aspect-square rounded-lg border border-[#E3E4E5] bg-white relative">
                    <div className="w-[53px] h-6 text-[#74767C] text-center font-bold text-base leading-6 absolute left-2 top-2.5">
                      +16
                    </div>
                    <button className="inline-flex h-8 justify-center items-center gap-2 absolute left-1.5 top-7 w-[60px]">
                      <div className="text-[#2E2F32] text-sm leading-5 underline">
                        View/edit
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Settings Accordion */}
            <div className="flex items-center gap-3 self-stretch bg-white">
              <div className="flex flex-col justify-center items-start gap-1 flex-1">
                <div className="flex items-center self-stretch">
                  <div className="text-[#2E2F32] font-bold text-base leading-6">
                    Additional settings
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex h-6 pt-2 justify-center items-center gap-2.5 self-stretch">
              <div className="flex-1 text-[#74767C] text-center text-xs leading-4">
                Click "Save and review" to view item list and all campaign creation options
              </div>
            </div>
            <div className="flex px-4 py-4 flex-col justify-center items-end gap-3 self-stretch border-t border-[#E3E4E5] bg-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSaveAndReview}
                  className="flex h-10 px-6 py-0 justify-center items-center gap-2 rounded-full border border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="text-[#2E2F32] font-bold text-base leading-6">
                    Save and review
                  </div>
                </button>
                <button 
                  disabled={!isLaunchEnabled}
                  className={`flex h-10 px-6 py-0 justify-center items-center gap-2 rounded-full ${
                    isLaunchEnabled 
                      ? 'bg-[#0071DC] hover:bg-[#0060B8]' 
                      : 'bg-[#E3E4E5]'
                  } transition-colors`}
                >
                  <div className={`font-bold text-base leading-6 ${
                    isLaunchEnabled ? 'text-white' : 'text-white'
                  }`}>
                    Launch campaign
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignReady' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0 overflow-y-auto">
          <div className="flex pb-80 flex-col items-center flex-1 self-stretch overflow-y-auto">
            <div className="flex w-full flex-col items-center gap-4">
              {/* System Message */}
              <div className="flex px-4 pt-4 flex-col items-start gap-6 self-stretch bg-white">
                <div className="flex w-full flex-col items-start gap-1 bg-white">
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="self-stretch text-[#2E2F32] text-sm leading-5">
                      I have added your selections and <span className="font-bold">your campaign is ready to launch.</span> You can still take a moment to review your campaign and make and final changes. When you're ready, click the<span className="font-bold"> "Launch campaign"</span> button in the top-right corner.
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Suggestions */}
              <div className="flex w-full flex-col items-start gap-2 bg-white px-4">
                <button className="flex max-w-[393px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-[#2E2F32] text-sm font-bold leading-5">What can Marty help me do on this page?</span>
                </button>
                <button className="flex max-w-[393px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-[#2E2F32] text-sm font-bold leading-5">How do I set up a Sponsored Products campaign?</span>
                </button>
                <button className="flex max-w-[393px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-[#2E2F32] text-sm font-bold leading-5">Which items do you recommend I advertise?</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch border-t border-[#E3E4E5] bg-white">
            <div className="flex px-4 py-4 flex-col items-center gap-3 self-stretch bg-white">
              {/* Input Field */}
              <div className="flex max-w-[760px] max-h-44 px-4 py-3 items-end gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col justify-center flex-1 self-stretch text-[#74767C] text-sm leading-5">
                  How can I help?
                </div>
                <button disabled className="flex p-2 flex-col items-start rounded-full border border-transparent bg-[#BABBBE]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="w-full text-[#74767C] text-center text-xs leading-4">
                I'm powered by AI and can make mistakes. Don't share sensitive info. <span className="underline cursor-pointer">Disclaimer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Only show on welcome view */}
      {viewState === 'welcome' && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-white">
          {/* Input Field */}
          <div className="flex justify-start max-w-[760px] max-h-44 px-4 py-3 items-center gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="How can I help?"
              className="flex-1 text-[#2E2F32] text-sm leading-5 outline-none bg-transparent placeholder:text-[#74767C]"
            />
            <button
              disabled={!userMessage.trim()}
              className={`flex p-2 flex-col items-start rounded-full border border-transparent ${
                userMessage.trim() ? 'bg-[#0071DC]' : 'bg-[#BABBBE]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3L8 13" stroke={userMessage.trim() ? "white" : "#74767C"} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 8L8 3L13 8" stroke={userMessage.trim() ? "white" : "#74767C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="w-full text-[#74767C] text-center text-xs leading-4">
            I'm powered by AI and can make mistakes. Don't share sensitive info. <span className="underline cursor-pointer">Disclaimer</span>
          </div>
        </div>
      )}

      {/* Footer for thinking state */}
      {viewState === 'thinking' && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-white">
          {/* Input Field */}
          <div className="flex max-w-[760px] max-h-44 px-4 py-3 items-end gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col justify-center flex-1 self-stretch text-[#74767C] text-sm leading-5">
              How can I help?
            </div>
            <button className="flex p-2 w-8 h-8 flex-col justify-center items-center rounded-full bg-[#E3E4E5]">
              <div className="flex w-[15px] h-[15px] p-[18px_16px] justify-center items-center gap-1 flex-shrink-0 aspect-square">
                <div className="flex w-[15px] h-[15px] justify-center items-center flex-shrink-0">
                  <div className="w-3 h-3 flex-shrink-0 rounded-[2px] bg-white"></div>
                </div>
              </div>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="w-full text-[#74767C] text-center text-xs leading-4">
            I'm powered by AI and can make mistakes. Don't share sensitive info. <span className="underline cursor-pointer">Disclaimer</span>
          </div>
        </div>
      )}
    </div>
  );
}
