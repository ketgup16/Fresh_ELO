import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MartyFloatingPanelProps {
  isMinimized?: boolean;
  onMinimizedChange?: (minimized: boolean) => void;
}

type ViewState = 'welcome' | 'thinking' | 'campaignForm' | 'campaignReady' | 'campaignScheduled';

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

  const handleLaunchCampaign = () => {
    setViewState('campaignScheduled');
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
            <div className="text-[#2E2F32] text-right text-base leading-6 whitespace-pre flex items-center">
              <span className="inline-block max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 font-normal overflow-hidden transition-all duration-200 ease-out">Have a question?  </span>
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
              <div className="text-[#2E2F32] font-bold text-lg leading-6">Dario Amodei</div>
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
                  onClick={handleLaunchCampaign}
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

      {viewState === 'campaignScheduled' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0">
          <div className="flex px-4 py-4 flex-col items-start gap-6 flex-1 self-stretch overflow-y-auto">
            {/* User Message */}
            <div className="flex w-full pl-20 flex-col items-end gap-1">
              <div className="flex max-w-[608px] px-4 py-2 flex-col items-start gap-2 rounded-lg bg-[#F1F1F2]">
                <div className="self-stretch text-[#2E2F32] text-sm leading-5">
                  Launch campaign
                </div>
              </div>
            </div>

            {/* Campaign Scheduled Success Content */}
            <div className="flex flex-col justify-center items-start gap-3 self-stretch">
              {/* Flag Icon */}
              <svg width="169" height="128" viewBox="0 0 169 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M92.6836 37.9863C92.6836 37.9863 111.078 42.4516 122.406 42.1449C135.168 41.7993 152.882 37.9863 152.882 37.9863L141.783 59.9654L161.159 80.073C161.159 80.073 143.445 83.886 130.684 84.2316C119.355 84.5383 100.961 80.073 100.961 80.073L92.6836 37.9863Z" fill="url(#paint0_linear_flag)"/>
                <path d="M29.0664 18.9955C29.0664 18.9955 50.8668 10.6244 65.4895 10.2304C81.9617 9.78659 106.769 18.9955 106.769 18.9955L117.453 73.0471C117.453 73.0471 92.6459 63.8381 76.1736 64.2819C61.5509 64.6759 39.7505 73.0471 39.7505 73.0471L29.0664 18.9955Z" fill="url(#paint1_linear_flag)"/>
                <path d="M88.4052 33.3566C89.6356 32.1228 89.6356 30.1226 88.4052 28.8889C87.1748 27.6551 85.1799 27.6551 83.9495 28.8889L68.3546 44.5258L62.9442 39.1007C61.7138 37.867 59.7189 37.867 58.4885 39.1007C57.2581 40.3345 57.2581 42.3347 58.4885 43.5684L68.3546 53.4612L88.4052 33.3566Z" fill="white"/>
                <path d="M30.6367 11.8164L52.24 128.001" stroke="#909196" strokeWidth="6.80019" strokeLinecap="round"/>
                <path d="M15.5958 72.0214C15.3244 71.6285 14.6784 71.812 14.6527 72.2892L14.5426 74.3521C14.5313 74.5656 14.3781 74.7513 14.1633 74.8124L12.0873 75.402C11.607 75.5384 11.5728 76.1804 12.0373 76.3389L14.0451 77.0243C14.2528 77.0952 14.3857 77.2877 14.3744 77.5011L14.2641 79.564C14.2386 80.0412 14.8635 80.2545 15.1761 79.8753L16.5272 78.2359C16.667 78.0663 16.9023 77.9995 17.1101 78.0703L19.1179 78.7557C19.5824 78.9142 20.0029 78.404 19.7316 78.0111L18.5588 76.3126C18.4375 76.1369 18.45 75.9031 18.5897 75.7335L19.9408 74.0941C20.2534 73.7149 19.8885 73.1863 19.4082 73.3227L17.3322 73.9123C17.1174 73.9733 16.8898 73.8957 16.7685 73.7199L15.5958 72.0214Z" fill="#002E99"/>
                <path d="M9.72167 15.7935C9.62803 15.1613 8.74491 14.998 8.43257 15.5552L7.08299 17.9639C6.94341 18.2131 6.65007 18.3451 6.35641 18.2908L3.51864 17.7661C2.86218 17.6448 2.44223 18.3945 2.90571 18.8602L4.90932 20.8735C5.1165 21.0818 5.16235 21.3915 5.02279 21.6407L3.67304 24.0494C3.36086 24.6066 3.98446 25.2332 4.5831 24.9639L7.17107 23.7994C7.43887 23.679 7.76048 23.7384 7.96783 23.9467L9.97144 25.9601C10.4349 26.4258 11.2404 26.0633 11.1469 25.4312L10.7427 22.6982C10.7009 22.4155 10.8539 22.1425 11.1216 22.022L13.7095 20.8576C14.3082 20.5883 14.1825 19.7377 13.526 19.6163L10.6883 19.0917C10.3946 19.0374 10.1675 18.8092 10.1257 18.5264L9.72167 15.7935Z" fill="#2EACEA"/>
                <ellipse cx="23.2256" cy="58.733" rx="2.01471" ry="2.02014" fill="#0053E2"/>
                <ellipse cx="166.983" cy="58.733" rx="2.01471" ry="2.02014" fill="#0053E2"/>
                <ellipse cx="128.44" cy="72.8612" rx="1.17836" ry="1.18154" fill="#0053E2"/>
                <ellipse cx="56.1666" cy="1.18154" rx="1.17836" ry="1.18154" fill="#0053E2"/>
                <ellipse cx="15.319" cy="91.7655" rx="1.17836" ry="1.18154" fill="#0053E2"/>
                <ellipse cx="116.659" cy="3.54482" rx="1.17836" ry="1.18154" fill="#0053E2"/>
                <ellipse cx="82.0924" cy="101.219" rx="1.17836" ry="1.18154" fill="#0053E2"/>
                <path d="M130.698 90.6255C130.605 89.9933 129.721 89.8301 129.409 90.3872L128.06 92.7959C127.92 93.0452 127.627 93.1771 127.333 93.1228L124.495 92.5982C123.839 92.4768 123.419 93.2265 123.882 93.6922L125.886 95.7055C126.093 95.9138 126.139 96.2236 125.999 96.4727L124.65 98.8814C124.337 99.4386 124.961 100.065 125.56 99.7959L128.148 98.6315C128.415 98.511 128.737 98.5705 128.944 98.7788L130.948 100.792C131.411 101.258 132.217 100.895 132.123 100.263L131.719 97.5302C131.677 97.2475 131.83 96.9745 132.098 96.8541L134.686 95.6896C135.285 95.4203 135.159 94.5697 134.503 94.4484L131.665 93.9237C131.371 93.8694 131.144 93.6413 131.102 93.3585L130.698 90.6255Z" fill="#002E99"/>
                <path d="M131.126 26.88C130.95 26.6233 130.529 26.7411 130.511 27.0521L130.434 28.3962C130.426 28.5353 130.325 28.656 130.185 28.6952L128.831 29.074C128.517 29.1616 128.493 29.5799 128.796 29.6845L130.102 30.1364C130.238 30.1832 130.324 30.309 130.316 30.448L130.238 31.7922C130.221 32.1031 130.627 32.2437 130.832 31.9974L131.717 30.9326C131.808 30.8224 131.962 30.7795 132.097 30.8262L133.404 31.2782C133.706 31.3827 133.982 31.0513 133.806 30.7945L133.046 29.6845C132.967 29.5696 132.976 29.4173 133.068 29.3071L133.952 28.2423C134.157 27.996 133.921 27.6505 133.607 27.7381L132.253 28.1169C132.113 28.1561 131.965 28.1049 131.886 27.99L131.126 26.88Z" fill="#2EACEA"/>
                <path d="M95.9899 2.68476C95.8988 2.38701 95.4614 2.37297 95.3514 2.66427L94.8765 3.9236C94.8274 4.05391 94.6957 4.13895 94.5502 4.13428L93.1448 4.08916C92.8196 4.07873 92.6719 4.47069 92.9291 4.66115L94.041 5.48459C94.156 5.56977 94.2006 5.71566 94.1515 5.84593L93.6765 7.10527C93.5666 7.39656 93.9127 7.65285 94.1815 7.47928L95.3437 6.72883C95.464 6.6512 95.6233 6.65631 95.7383 6.7415L96.8503 7.56494C97.1075 7.7554 97.4692 7.52183 97.3781 7.22409L96.9844 5.93687C96.9437 5.80372 96.9976 5.66098 97.1178 5.58335L98.28 4.83291C98.5488 4.65934 98.4263 4.2587 98.1012 4.24826L96.6957 4.20315C96.5503 4.19848 96.4242 4.10517 96.3835 3.97198L95.9899 2.68476Z" fill="#0053E2"/>
                <path d="M70.0641 16.8625C69.973 16.5647 69.5356 16.5507 69.4257 16.842L68.9507 18.1013C68.9016 18.2316 68.7699 18.3167 68.6245 18.312L67.219 18.2669C66.8938 18.2565 66.7461 18.6484 67.0033 18.8389L68.1152 19.6623C68.2302 19.7475 68.2748 19.8934 68.2257 20.0237L67.7507 21.283C67.6409 21.5743 67.9869 21.8306 68.2558 21.657L69.4179 20.9066C69.5382 20.8289 69.6975 20.834 69.8126 20.9192L70.9245 21.7427C71.1817 21.9331 71.5434 21.6996 71.4524 21.4018L71.0587 20.1146C71.018 19.9815 71.0718 19.8387 71.192 19.7611L72.3542 19.0106C72.623 18.8371 72.5005 18.4364 72.1754 18.426L70.7699 18.3809C70.6245 18.3762 70.4984 18.2829 70.4577 18.1497L70.0641 16.8625Z" fill="#0053E2"/>
                <path d="M111.779 59.2518C111.729 59.0891 111.49 59.0815 111.43 59.2406L111.17 59.9288C111.144 60 111.072 60.0465 110.992 60.0439L110.224 60.0193C110.046 60.0136 109.966 60.2278 110.106 60.3319L110.714 60.7818C110.777 60.8284 110.801 60.9081 110.774 60.9793L110.515 61.6675C110.455 61.8266 110.644 61.9667 110.791 61.8718L111.426 61.4618C111.491 61.4193 111.579 61.4221 111.641 61.4687L112.249 61.9187C112.39 62.0227 112.587 61.8951 112.537 61.7324L112.322 61.029C112.3 60.9562 112.33 60.8782 112.395 60.8358L113.03 60.4257C113.177 60.3309 113.11 60.1119 112.933 60.1062L112.165 60.0816C112.085 60.079 112.016 60.028 111.994 59.9553L111.779 59.2518Z" fill="#0053E2"/>
                <path d="M1.79841 64.7655C1.74861 64.6028 1.5096 64.5951 1.44952 64.7543L1.18999 65.4425C1.16316 65.5137 1.09117 65.5602 1.01169 65.5576L0.243655 65.533C0.0659854 65.5273 -0.0147639 65.7415 0.12579 65.8455L0.733413 66.2955C0.796246 66.3421 0.820638 66.4218 0.793803 66.493L0.534233 67.1811C0.474199 67.3403 0.663312 67.4804 0.810218 67.3855L1.4453 66.9754C1.51102 66.933 1.59806 66.9358 1.66094 66.9824L2.26856 67.4323C2.40912 67.5364 2.60678 67.4088 2.55702 67.2461L2.34188 66.5427C2.31964 66.4699 2.34907 66.3919 2.41474 66.3495L3.04982 65.9394C3.19673 65.8445 3.12981 65.6256 2.95214 65.6199L2.1841 65.5953C2.10462 65.5927 2.03575 65.5417 2.01351 65.4689L1.79841 64.7655Z" fill="#0053E2"/>
                <path d="M70.0641 90.1184C69.973 89.8206 69.5356 89.8066 69.4257 90.0979L68.9507 91.3572C68.9016 91.4875 68.7699 91.5725 68.6245 91.5679L67.219 91.5228C66.8938 91.5123 66.7461 91.9043 67.0033 92.0947L68.1152 92.9182C68.2302 93.0034 68.2748 93.1493 68.2257 93.2795L67.7507 94.5389C67.6409 94.8302 67.9869 95.0864 68.2558 94.9129L69.4179 94.1624C69.5382 94.0848 69.6975 94.0899 69.8126 94.1751L70.9245 94.9985C71.1817 95.189 71.5434 94.9554 71.4524 94.6577L71.0587 93.3705C71.018 93.2373 71.0718 93.0946 71.192 93.0169L72.3542 92.2665C72.623 92.0929 72.5005 91.6923 72.1754 91.6819L70.7699 91.6367C70.6245 91.6321 70.4984 91.5388 70.4577 91.4056L70.0641 90.1184Z" fill="#2EACEA"/>
                <defs>
                  <linearGradient id="paint0_linear_flag" x1="93.0641" y1="37.9863" x2="138.461" y2="102.496" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1" stopColor="#993EF4"/>
                    <stop offset="0.7" stopColor="#3F7FCF"/>
                    <stop offset="1" stopColor="#00AD9F"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_flag" x1="29.5575" y1="10.2148" x2="92.2133" y2="94.8279" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1" stopColor="#993EF4"/>
                    <stop offset="0.7" stopColor="#4DBDF5"/>
                    <stop offset="1" stopColor="#00D0CD"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Title and Message */}
              <div className="flex items-start self-stretch">
                <div className="flex-1 text-[#000] font-bold text-[32px] leading-10">
                  Campaign scheduled
                </div>
              </div>

              <div className="flex min-w-[393px] flex-col items-start gap-1 self-stretch bg-white">
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <div className="self-stretch text-[#2E2F32] text-sm leading-5">
                    <span className="font-extrabold">Free Rein Coffee Campaign Fall 2025</span> is scheduled to start Oct 1, 2025. You can make changes anytime before it goes live.
                  </div>
                </div>
              </div>
            </div>

            {/* View Campaign Button */}
            <div className="flex w-full flex-col items-start gap-2 bg-white">
              <button
                onClick={() => navigate('/all-campaigns')}
                className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#2E2F32] text-sm font-bold leading-5">View campaign</span>
              </button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex flex-col items-start gap-3 self-stretch border-t border-[#E3E4E5] bg-white">
              <div className="flex px-4 py-4 flex-col items-center gap-3 self-stretch bg-white">
              {/* Input Field */}
              <div className="flex max-w-[760px] max-h-44 px-4 py-3 items-end gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col justify-center flex-1 self-stretch text-[#74767C] text-sm leading-5">
                  How can I help?
                </div>
                <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-[#BABBBE]">
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
