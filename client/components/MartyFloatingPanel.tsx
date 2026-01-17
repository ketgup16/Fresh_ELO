import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MartyFloatingPanelProps {
  isMinimized?: boolean;
  onMinimizedChange?: (minimized: boolean) => void;
}

type ViewState = 'welcome' | 'chat' | 'campaignSetup' | 'campaignForm' | 'campaignReady' | 'campaignScheduled';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isAction?: boolean;
}

export default function MartyFloatingPanel({
  isMinimized = false,
  onMinimizedChange
}: MartyFloatingPanelProps) {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [userMessage, setUserMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [campaignData, setCampaignData] = useState({
    campaignType: 'Sponsored Products Automatic',
    campaignName: 'Free Rein Coffee Campaign Fall 2025',
    startDate: '10/01/2025',
    dailyBudget: '50'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Campaign-related questions
    if (input.includes('campaign') && (input.includes('create') || input.includes('make') || input.includes('start'))) {
      return "I can help you create a campaign! I'll guide you through setting up a new campaign with the right targeting, budget, and items. Would you like to start creating a Sponsored Products or Display campaign?";
    }
    
    if (input.includes('budget')) {
      return "Campaign budgets are important for controlling your ad spend. I recommend starting with a daily budget of at least $50-100 for Display campaigns to gather enough data. You can adjust this at any time based on performance. Would you like help setting up a campaign with a specific budget?";
    }
    
    if (input.includes('targeting')) {
      return "There are several targeting strategies available:\n\n• **Contextual targeting** - Shows ads based on page content\n• **Behavioral targeting** - Targets based on user behavior\n• **Run of site** - Shows ads across all available placements\n\nEach has different performance characteristics. What type of campaign are you planning?";
    }
    
    if (input.includes('recommend') || input.includes('suggestion')) {
      return "Based on your account activity, I recommend:\n\n1. **Optimize high-performing campaigns** - I noticed 3 campaigns with 113%+ pacing that could use budget increases\n2. **Review paused campaigns** - You have 4 paused campaigns that might be ready to reactivate\n3. **Add negative keywords** - This could reduce wasted spend by 8-12%\n\nWhich would you like to explore first?";
    }
    
    if (input.includes('pacing') || input.includes('pace')) {
      return "Campaign pacing shows how quickly your budget is being spent. A pacing of 100% means you're on track. Above 100% means you're spending faster than planned, and below 100% means slower.\n\nGreen indicators (100-115%) are generally good. Orange (115%+) means you might exhaust your budget early. Would you like me to help adjust any campaign budgets?";
    }
    
    if (input.includes('impression')) {
      return "Impressions are the number of times your ad was displayed. Your campaigns are currently generating strong impression volume. To increase impressions, consider:\n\n• Increasing daily budget\n• Expanding targeting criteria\n• Adding more items to your campaigns\n• Using broader match types\n\nWhat would you like to focus on?";
    }
    
    if (input.includes('performance') || input.includes('metrics')) {
      return "I can show you key performance metrics! Your current overview:\n\n• **Total Impressions**: 156M+ across all active campaigns\n• **Average CTR**: Data shows strong engagement on contextual targeting\n• **Top Performers**: Campaigns with behavioral targeting are showing 10-15% better results\n\nWould you like a detailed breakdown of any specific campaign?";
    }
    
    if (input.includes('help') || input.includes('?')) {
      return "I'm here to help! I can assist with:\n\n• **Creating campaigns** - I'll guide you through the setup\n• **Optimizing performance** - Get recommendations for your active campaigns\n• **Understanding metrics** - Learn what your data means\n• **Managing budgets** - Adjust spending across campaigns\n• **Answering questions** - Ask me anything about Walmart advertising\n\nWhat would you like help with?";
    }
    
    if (input.includes('status') || input.includes('live') || input.includes('pause')) {
      return "Campaign statuses indicate their current state:\n\n• **Live** - Currently running and serving ads\n• **Scheduled** - Set to start on a future date\n• **Paused** - Temporarily stopped (you can resume anytime)\n• **Completed** - Reached end date or budget limit\n\nYou can change status anytime from the campaign manager. Need help with a specific campaign?";
    }
    
    if (input.includes('item') || input.includes('product')) {
      return "I can help you select the best items to advertise! I analyze:\n\n• Sales performance\n• Inventory levels\n• Competitive positioning\n• Seasonal trends\n\nFor best results, I recommend advertising items with high margins, good reviews, and strong conversion rates. Would you like me to suggest items for a new campaign?";
    }
    
    if (input.includes('report') || input.includes('analytics')) {
      return "I can help you access detailed reports and analytics. Available reports include:\n\n• Campaign performance over time\n• Item-level metrics\n• Audience insights\n• Budget utilization\n• Attribution analysis\n\nWhat specific metrics are you interested in tracking?";
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! I'm always here to help. Feel free to ask me anything about your campaigns, or I can help you create a new one whenever you're ready! 😊";
    }
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hi there! 👋 I'm Marty, your advertising assistant. I'm here to help you create campaigns, optimize performance, and answer any questions you have about Walmart advertising. What can I help you with today?";
    }

    // Birthday message (easter egg from original)
    if (input.includes('birthday')) {
      return "🎉 Happy Birthday! 🎂 While I can't help with party planning, I can definitely help make your campaigns more successful! Want to create a special promotional campaign to celebrate? 🎈";
    }
    
    // Default response
    return "That's a great question! While I'm still learning, I can help you with:\n\n• Creating and managing campaigns\n• Understanding your performance metrics\n• Optimizing your advertising strategy\n• Answering questions about Walmart advertising\n\nCould you rephrase your question or let me know which of these areas you'd like to explore?";
  };

  const simulateTyping = async (response: string): Promise<void> => {
    // Simulate realistic typing delay (50-150ms per character burst)
    const baseDelay = 800; // Initial delay
    const chunkSize = 15; // Characters per chunk
    const delayBetweenChunks = 50;
    
    await new Promise(resolve => setTimeout(resolve, baseDelay));
    
    const chunks = [];
    for (let i = 0; i < response.length; i += chunkSize) {
      chunks.push(response.slice(i, i + chunkSize));
    }
    
    let fullResponse = '';
    for (let i = 0; i < chunks.length; i++) {
      fullResponse += chunks[i];
      
      // Update the last message incrementally
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].role === 'assistant') {
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: fullResponse
          };
        }
        return newMessages;
      });
      
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenChunks));
      }
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage.trim(),
      timestamp: new Date()
    };
    
    // Add user message
    setMessages(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsTyping(true);
    
    // Switch to chat view if not already there
    if (viewState === 'welcome') {
      setViewState('chat');
    }
    
    // Check for special commands
    if (userMsg.content.toLowerCase().includes('create campaign') || 
        userMsg.content.toLowerCase().includes('create a campaign')) {
      setIsTyping(false);
      
      // Add response message
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great! Let me help you create a campaign. I'll guide you through the process...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMsg]);
      
      // Transition to campaign setup
      setTimeout(() => {
        setViewState('campaignSetup');
      }, 1000);
      return;
    }
    
    // Generate mock response
    const response = generateMockResponse(userMsg.content);
    
    // Create assistant message placeholder
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMsg]);
    
    // Simulate typing
    await simulateTyping(response);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    if (action === 'create') {
      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: 'Create campaign',
        timestamp: new Date()
      };
      setMessages([userMsg]);
      setViewState('chat');
      setIsTyping(true);
      
      // Show typing animation
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Add assistant response with options
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great! I'd love to help you create a campaign. To get started, what type of campaign would you like to create?",
        timestamp: new Date(),
        isAction: true
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      
      // Show campaign setup view
      setTimeout(() => {
        setViewState('campaignSetup');
      }, 800);
      
    } else if (action === 'help') {
      setUserMessage('Help & FAQs');
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  const handleCampaignTypeSelection = async (type: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    // Set campaign type
    setCampaignData(prev => ({ ...prev, campaignType: type }));
    
    // Show typing animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add assistant response
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Perfect! I'll help you set up a ${type} campaign. Let me gather some details...`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
    
    // Transition to form
    setTimeout(() => {
      setViewState('campaignForm');
    }, 800);
  };

  const handleBack = () => {
    if (viewState === 'campaignForm') {
      setViewState('campaignSetup');
    } else if (viewState === 'campaignSetup') {
      setViewState('chat');
    } else {
      setViewState('chat');
    }
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
        {(viewState === 'campaignForm' || viewState === 'campaignSetup') ? (
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
          <div className="flex h-9 items-center gap-1.5 bg-white">
            {/* Marty Orb - Original Gradient */}
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

            <div className="text-[#2E2F32] font-bold text-xl leading-[140%]">Marty</div>

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
              src="https://api.builder.io/api/v1/image/assets/TEMP/a366a3c1df1c4dccfcd08b05d2cff307b55586da?width=48"
              alt="Reports"
              className="w-6 h-6"
            />
            {/* Notification Dot */}
            <svg
              className="absolute -right-0.5 top-0.5"
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3.5" cy="3.5" r="4.25" fill="#EA1100" stroke="white" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Expand Icon */}
          <button className="flex w-6 h-6 justify-center items-center hover:bg-gray-100 rounded transition-colors">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/4b9543883bac0cc8b18c7c87ebc16153e09ba6ae?width=48"
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
              src="https://api.builder.io/api/v1/image/assets/TEMP/e7b3a2f3ac0042faea6b580042a0890da69e644e?width=48"
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
                onClick={() => handleQuickAction('create')}
                className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#2E2F32] text-sm font-bold leading-5">Create campaign</span>
              </button>
              <button
                onClick={() => handleQuickAction('help')}
                className="flex max-w-[318px] max-h-14 px-4 py-2 justify-center items-center content-center gap-2 flex-wrap rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#2E2F32] text-sm font-bold leading-5">Help & FAQs</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {viewState === 'chat' && (
        <div className="flex w-full flex-col flex-1 bg-white overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-start gap-4 h-full justify-center">
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
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[85%] px-4 py-2 flex-col items-start gap-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#F1F1F2]'
                          : 'bg-white border border-[#E3E4E5]'
                      }`}
                    >
                      <div className="text-[#2E2F32] text-sm leading-5 whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex w-full justify-start">
                    <div className="flex px-4 py-3 items-center gap-1.5 rounded-lg bg-white border border-[#E3E4E5]">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#993EF4] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-[#4DBDF5] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-[#00D0CD] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      )}

      {viewState === 'campaignSetup' && (
        <div className="flex w-full flex-col flex-1 bg-white overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[85%] px-4 py-2 flex-col items-start gap-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#F1F1F2]'
                        : 'bg-white border border-[#E3E4E5]'
                    }`}
                  >
                    <div className="text-[#2E2F32] text-sm leading-5 whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Campaign Type Options */}
              {!isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <button
                      onClick={() => handleCampaignTypeSelection('Sponsored Products Automatic')}
                      className="flex px-4 py-3 items-center gap-2 rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[#2E2F32] text-sm font-bold leading-5">Sponsored Products Automatic</span>
                    </button>
                    <button
                      onClick={() => handleCampaignTypeSelection('Sponsored Products Manual')}
                      className="flex px-4 py-3 items-center gap-2 rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[#2E2F32] text-sm font-bold leading-5">Sponsored Products Manual</span>
                    </button>
                    <button
                      onClick={() => handleCampaignTypeSelection('Display Campaign')}
                      className="flex px-4 py-3 items-center gap-2 rounded-lg border-2 border-[#2E2F32] bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[#2E2F32] text-sm font-bold leading-5">Display Campaign</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex px-4 py-3 items-center gap-1.5 rounded-lg bg-white border border-[#E3E4E5]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#993EF4] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#4DBDF5] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#00D0CD] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-white border-t border-[#E3E4E5]">
            {/* Input Field */}
            <div className="flex justify-start max-w-[760px] max-h-44 px-4 py-3 items-center gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help?"
                className="flex-1 text-[#2E2F32] text-sm leading-5 outline-none bg-transparent placeholder:text-[#74767C]"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userMessage.trim() || isTyping}
                className={`flex p-2 flex-col items-start rounded-full border border-transparent transition-colors ${
                  userMessage.trim() && !isTyping ? 'bg-[#0071DC] hover:bg-[#0060B8]' : 'bg-[#BABBBE]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3L8 13" stroke={userMessage.trim() && !isTyping ? "white" : "#74767C"} strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 8L8 3L13 8" stroke={userMessage.trim() && !isTyping ? "white" : "#74767C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="w-full text-[#74767C] text-center text-xs leading-4">
              I'm powered by AI and can make mistakes. Don't share sensitive info. <span className="underline cursor-pointer">Disclaimer</span>
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
              <div className="flex h-10 pl-3 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-white">
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
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-white">
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
              <div className="flex h-10 px-3 py-0 pr-1 items-center gap-3 self-stretch rounded-lg border border-[#909196] bg-white">
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
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-white">
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

            {/* Item List */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-[#2E2F32] text-xs font-bold leading-4">
                  Item list
                </div>
              </div>
              <div className="flex h-10 pl-3 pr-3 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-white">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <div className="w-full text-[#2E2F32] text-sm leading-5">
                    Top suggestions from your catalog
                  </div>
                </div>
                <button className="text-[#2E2F32] text-sm leading-5 underline hover:no-underline">
                  Edit
                </button>
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

      {/* Footer - Input for welcome and chat views */}
      {(viewState === 'welcome' || viewState === 'chat') && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-white border-t border-[#E3E4E5]">
          {/* Input Field */}
          <div className="flex justify-start max-w-[760px] max-h-44 px-4 py-3 items-center gap-6 self-stretch rounded-lg border border-[#E3E4E5] bg-white shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)]">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="How can I help?"
              className="flex-1 text-[#2E2F32] text-sm leading-5 outline-none bg-transparent placeholder:text-[#74767C]"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!userMessage.trim() || isTyping}
              className={`flex p-2 flex-col items-start rounded-full border border-transparent transition-colors ${
                userMessage.trim() && !isTyping ? 'bg-[#0071DC] hover:bg-[#0060B8]' : 'bg-[#BABBBE]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3L8 13" stroke={userMessage.trim() && !isTyping ? "white" : "#74767C"} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 8L8 3L13 8" stroke={userMessage.trim() && !isTyping ? "white" : "#74767C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
