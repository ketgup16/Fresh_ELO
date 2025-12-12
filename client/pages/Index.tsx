import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, Search, Settings, Download, Bell, HelpCircle, User, MoreHorizontal, Eye } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: "Live" | "Scheduled" | "Paused" | "Completed";
  recommendations: number;
  startDate?: string;
  endDate?: string;
  eCPM?: string;
  baseBid?: string;
  maxBid?: string;
  dailyBudget?: string;
  totalBudget?: string;
  targetingStrategy?: string;
  impressions?: string;
  pacing?: { value: string; color: string };
  children?: Campaign[];
  expanded?: boolean;
}

const mockCampaigns: Campaign[] = [
  {
    id: "10004",
    name: "Walmart|Display|Auction|Cross Device|very very very very long campaign name 01295938_FY27_",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$200,553.22",
    targetingStrategy: "Contextual targeting",
    impressions: "1,223,112",
    pacing: { value: "113%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-2",
    name: "H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$213,443.33",
    targetingStrategy: "Contextual targeting",
    impressions: "3,200,332",
    pacing: { value: "123%", color: "text-[#FFC220]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-3",
    name: "H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_508390",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$100,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,245,664",
    pacing: { value: "102%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-4",
    name: "Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    targetingStrategy: "Contextual targeting",
    expanded: false,
    children: [
      {
        id: "creative-1",
        name: "Creative 1 video",
        type: "creative",
        status: "Live",
        recommendations: 2
      },
      {
        id: "creative-2",
        name: "Creative 2 banner",
        type: "creative",
        status: "Live",
        recommendations: 2
      }
    ]
  },
  {
    id: "10004-5",
    name: "Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$45,000.32",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,443,412",
    pacing: { value: "109%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-6",
    name: "Campaign 100",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$9,009.24",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,334,221",
    pacing: { value: "102%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-7",
    name: "Campaign 100",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$3,009.34",
    targetingStrategy: "Run of site",
    impressions: "99,042",
    pacing: { value: "113%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-8",
    name: "Campaign 100",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$200,494.44",
    targetingStrategy: "22,000",
    impressions: "22,000",
    pacing: { value: "102%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-9",
    name: "Campaign 100",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$192,032.22",
    targetingStrategy: "3,412,009",
    impressions: "3,412,009",
    pacing: { value: "89%", color: "text-[#FFC220]" },
    expanded: false,
    children: []
  }
];

export default function Index() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedTab, setSelectedTab] = useState<"onsite" | "archive">("onsite");
  const [showPopover, setShowPopover] = useState(false);
  const [showRecommendationPopover, setShowRecommendationPopover] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);
  const [panelOpening, setPanelOpening] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const recPopoverRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
      if (recPopoverRef.current && !recPopoverRef.current.contains(event.target as Node)) {
        setShowRecommendationPopover(null);
      }
    };

    if (showPopover || showRecommendationPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover, showRecommendationPopover]);

  useEffect(() => {
    if (showPanel && !panelClosing) {
      setPanelOpening(true);
      const timer = setTimeout(() => {
        setPanelOpening(false);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [showPanel, panelClosing]);

  const openPanel = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
    setShowPanel(true);
    setPanelClosing(false);
    setPanelOpening(true);
    setShowRecommendationPopover(null);
  };

  const closePanel = () => {
    setPanelClosing(true);
    setTimeout(() => {
      setShowPanel(false);
      setPanelClosing(false);
      setSelectedCampaign(null);
    }, 300);
  };

  const toggleExpand = (id: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === id ? { ...c, expanded: !c.expanded } : c
    ));
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    const styles = {
      Live: "bg-[#EAF3E6] text-[#1D5F02]",
      Scheduled: "bg-[#E9F1FE] text-[#002E99]",
      Paused: "bg-[#EFEBF2] text-[#452358]",
      Completed: "bg-[#E3E4E5] text-[#515357]"
    };
    return (
      <span className={`inline-flex px-2 py-1 rounded-sm text-xs font-normal ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-[54px] border-b border-[#E3E4E5] flex items-center justify-between px-6">
        <div className="flex items-center gap-5">
          {/* App Switcher */}
          <button className="w-6 h-6 p-1 rounded-full hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="0" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="0" y="10" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="10" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="10" width="2" height="2" fill="#2E2F32"/>
            </svg>
          </button>
          
          {/* Logo */}
          <div className="h-[14px]">
            <svg width="241" height="14" viewBox="0 0 241 14" fill="none">
              <path d="M14.3131 0.262451L12.5653 9.03428L10.6022 0.262451H7.19181L5.22872 9.03428L3.48087 0.262451H0L2.83702 13.6607H6.88937L8.86916 4.76444L10.8508 13.6607H14.8141L17.6326 0.262451H14.3131Z" fill="#001F64"/>
              <path d="M21.8888 2.729C19.7291 2.729 18.2131 3.46076 17.6584 3.97894V6.83726C18.3003 6.26522 19.6567 5.42574 21.4417 5.42574C22.5475 5.42574 22.9594 5.73033 22.9594 6.35437C22.9594 6.89112 22.388 7.1047 20.7997 7.44458C18.3894 7.94418 16.9978 8.82081 16.9978 10.9102C16.9978 12.8399 18.2651 13.9654 20.1039 13.9654C21.6439 13.9654 22.5624 13.2504 23.0671 12.2902V13.6627H26.3865V7.08799C26.3865 4.06809 24.8168 2.729 21.8888 2.729ZM21.425 11.8036C20.6401 11.8036 20.2115 11.3207 20.2115 10.6595C20.2115 9.80144 20.8906 9.46342 21.746 9.15883C22.1931 8.99167 22.6384 8.81709 22.9409 8.5515V10.0336C22.9409 11.1591 22.3527 11.8017 21.4231 11.8017L21.425 11.8036Z" fill="#001F64"/>
              <path d="M31.0734 0.262451H27.6296V13.6607H31.0734V0.262451Z" fill="#001F64"/>
              <path d="M44.8985 2.76358C43.2267 2.76358 42.1469 3.76835 41.5828 5.10743C41.2803 3.67363 40.2728 2.76358 38.8664 2.76358C37.2725 2.76358 36.2335 3.69406 35.7065 5.00157V3.06817H32.3147V13.662H35.7585V7.78374C35.7585 6.33694 36.2409 5.51417 37.2762 5.51417C38.1149 5.51417 38.4007 6.08621 38.4007 6.97955V13.6601H41.8444V7.78188C41.8444 6.33508 42.3268 5.51232 43.3622 5.51232C44.2009 5.51232 44.4866 6.08435 44.4866 6.97769V13.6582H47.9304V6.4948C47.9304 4.26238 46.8765 2.76172 44.8967 2.76172L44.8985 2.76358Z" fill="#001F64"/>
              <path d="M53.5715 2.729C51.4117 2.729 49.8958 3.46076 49.341 3.97894V6.83726C49.983 6.26522 51.3393 5.42574 53.1243 5.42574C54.2301 5.42574 54.6421 5.73033 54.6421 6.35437C54.6421 6.89112 54.0706 7.1047 52.4823 7.44458C50.072 7.94418 48.6804 8.82081 48.6804 10.9102C48.6804 12.8399 49.9477 13.9654 51.7865 13.9654C53.3265 13.9654 54.245 13.2504 54.7497 12.2902V13.6627H58.0691V7.08799C58.0691 4.06809 56.4994 2.729 53.5715 2.729ZM53.1076 11.8036C52.3227 11.8036 51.8941 11.3207 51.8941 10.6595C51.8941 9.80144 52.5732 9.46342 53.4286 9.15883C53.8757 8.99167 54.3211 8.81709 54.6235 8.5515V10.0336C54.6235 11.1591 54.0353 11.8017 53.1057 11.8017L53.1076 11.8036Z" fill="#001F64"/>
              <path d="M62.6203 6.06081V3.06692H59.2471V13.6607H62.6908V9.15872C62.6908 7.08602 63.9767 6.53256 65.2068 6.53256C65.6169 6.53256 66.0103 6.58642 66.1884 6.64028V2.99634C64.2494 2.90348 63.0731 4.14227 62.6185 6.06081H62.6203Z" fill="#001F64"/>
              <path d="M72.7587 5.74587V3.06584H70.5636V1.01172H67.1199V10.1234C67.1199 12.6771 68.5653 13.8751 70.8679 13.8751C71.9385 13.8751 72.51 13.6615 72.7605 13.4999V10.8385C72.5638 10.9815 72.2428 11.0892 71.8328 11.0892C71.0646 11.1078 70.5655 10.7679 70.5655 9.64239V5.74772H72.7605L72.7587 5.74587Z" fill="#001F64"/>
              <path d="M89.2666 3.88538C88.5504 3.38392 87.4965 3.02547 86.3145 3.02547C84.2215 3.02547 82.4867 4.33298 82.4867 6.98143C82.4867 9.62988 84.151 10.9207 86.3145 10.9207C87.4055 10.9207 88.4261 10.6885 89.2666 10.1332V13.2478C88.5875 13.6601 87.5132 13.9461 86.1531 13.9461C82.021 13.9461 78.9075 11.3497 78.9075 6.98143C78.9075 2.61316 82.1119 0 86.1178 0C87.2441 0 88.5856 0.215442 89.2666 0.590608V3.88538Z" fill="#00C0FB"/>
              <path d="M89.9536 8.3078C89.9536 4.94245 92.2433 2.73975 95.4458 2.73975C98.6484 2.73975 100.919 4.94245 100.919 8.3078C100.919 11.6732 98.6113 13.8759 95.4458 13.8759C92.2804 13.8759 89.9536 11.6732 89.9536 8.3078ZM97.5907 8.3078C97.5907 6.57127 96.8207 5.37148 95.444 5.37148C94.0672 5.37148 93.2619 6.57127 93.2619 8.3078C93.2619 10.0443 94.0486 11.2441 95.444 11.2441C96.8393 11.2441 97.5907 10.0629 97.5907 8.3078Z" fill="#00C0FB"/>
              <path d="M105.126 13.6606H101.745V3.0612H105.09V5.29919C105.645 3.81339 106.808 2.73804 108.632 2.73804C110.761 2.73804 111.943 4.25913 111.943 6.62342V13.6587H108.562V7.17688C108.562 6.08481 108.15 5.45892 107.094 5.45892C105.914 5.45892 105.126 6.49712 105.126 8.28752V13.6587V13.6606Z" fill="#00C0FB"/>
              <path d="M116.396 13.6606H113.015V3.0612H116.36V5.29919C116.915 3.81339 118.078 2.73804 119.902 2.73804C122.031 2.73804 123.213 4.25913 123.213 6.62342V13.6587H119.832V7.17688C119.832 6.08481 119.42 5.45892 118.364 5.45892C117.184 5.45892 116.396 6.49712 116.396 8.28752V13.6587V13.6606Z" fill="#00C0FB"/>
              <path d="M130 14.0007C126.154 14.0007 123.918 11.8704 123.918 8.36021C123.918 4.85 126.226 2.71973 129.195 2.71973C132.163 2.71973 134.31 4.61784 134.024 9.18298H127.28C127.53 10.6874 128.478 11.3485 130.34 11.3485C131.646 11.3485 132.88 10.9548 133.524 10.4348V13.1389C133.076 13.5141 131.716 13.9988 130 13.9988V14.0007ZM127.3 7.23286H130.931C130.878 5.76563 130.252 5.15645 129.267 5.15645C128.211 5.15645 127.532 5.76563 127.298 7.23286H127.3Z" fill="#00C0FB"/>
              <path d="M143.335 6.30134C142.762 5.83517 141.94 5.42472 140.831 5.42472C139.309 5.42472 138.129 6.40907 138.129 8.36104C138.129 10.313 139.309 11.2621 140.831 11.2621C141.957 11.2621 142.762 10.9036 143.335 10.4746V13.2493C142.907 13.5354 141.94 13.9477 140.472 13.9477C137.27 13.9477 134.748 11.9251 134.748 8.36104C134.748 4.79697 137.27 2.77441 140.472 2.77441C141.994 2.77441 142.87 3.06043 143.335 3.2573V6.30134Z" fill="#00C0FB"/>
              <path d="M145.4 5.67658H144.094V3.95861C145.4 3.72646 146.365 2.83126 146.58 0.843994H148.781V3.06342H150.981V5.67658H148.781V9.6511C148.781 10.797 149.3 11.1369 150.068 11.1369C150.48 11.1369 150.785 11.0125 150.981 10.8862V13.4993C150.749 13.6609 150.176 13.8745 149.139 13.8745C146.849 13.8745 145.4 12.6747 145.4 10.1321V5.67472V5.67658Z" fill="#00C0FB"/>
              <path d="M164.717 0.818604H167.096L171.458 13.6615H169.816L168.601 10.0826H163.111L161.879 13.6615H160.374L164.719 0.818604H164.717ZM163.537 8.76395H168.172L165.862 2.03511L163.536 8.76395H163.537Z" fill="#002066"/>
              <path d="M179.875 6.1954V0.21875H181.448V13.6597H179.892V11.4849C179.242 12.9057 178.01 13.8473 176.368 13.8473C173.854 13.8473 172.212 11.7245 172.212 8.88099C172.212 6.03753 173.854 3.89798 176.42 3.89798C178.029 3.89798 179.242 4.77089 179.875 6.19169V6.1954ZM173.733 8.88285C173.733 11.0057 174.828 12.5639 176.795 12.5639C178.762 12.5639 179.96 11.0057 179.96 8.88285C179.96 6.76001 178.695 5.20177 176.795 5.20177C174.895 5.20177 173.733 6.77672 173.733 8.88285Z" fill="#002066"/>
              <path d="M196.862 3.21421C196.177 2.5976 195.118 2.03299 193.407 2.03299C190.893 2.03299 188.703 3.93297 188.703 7.27231C188.703 10.6117 190.824 12.4782 193.407 12.4782C194.947 12.4782 196.007 12.0678 196.862 11.3304V12.9054C196.213 13.3678 195.135 13.899 193.355 13.899C189.917 13.899 187.026 11.4511 187.026 7.27231C187.026 3.09349 189.986 0.628906 193.355 0.628906C195.168 0.628906 196.246 1.10808 196.862 1.55382V3.21421Z" fill="#002066"/>
              <path d="M203.449 13.867C200.558 13.867 198.402 12.1212 198.402 8.936C198.402 5.7508 200.438 3.90283 202.987 3.90283C205.537 3.90283 207.281 5.66723 207.025 9.21087H199.959C200.061 11.4024 201.464 12.5335 203.551 12.5335C204.8 12.5335 205.963 12.1565 206.665 11.5064V12.9272C206.219 13.3563 204.937 13.8689 203.449 13.8689V13.867ZM200.011 8.06309H205.52C205.503 6.12783 204.373 5.16948 203.022 5.16948C201.414 5.16948 200.269 6.11111 200.011 8.06309Z" fill="#002066"/>
              <path d="M210.634 13.661H209.077V4.12399H210.634V6.33227C211.164 4.92819 212.328 3.90112 214.072 3.90112C215.953 3.90112 217.219 5.06562 217.219 7.49677V13.661H215.679V7.68435C215.679 5.88653 214.823 5.23649 213.489 5.23649C211.881 5.23649 210.632 6.55514 210.632 8.98629V13.661H210.634Z" fill="#002066"/>
              <path d="M221.703 1.91411V4.12239H224.236V5.44104H221.703V10.7324C221.703 12.051 222.217 12.4968 223.157 12.4782C223.671 12.4782 224.065 12.324 224.236 12.2033V13.4867C224.048 13.6241 223.636 13.8117 222.849 13.8117C221.259 13.8117 220.129 12.9722 220.129 10.9515V5.43733H218.881V4.56442C220.129 4.37684 220.523 3.79366 220.71 1.9104H221.703V1.91411Z" fill="#002066"/>
              <path d="M230.565 13.867C227.674 13.867 225.518 12.1212 225.518 8.936C225.518 5.7508 227.553 3.90283 230.103 3.90283C232.652 3.90283 234.396 5.66723 234.14 9.21087H227.075C227.177 11.4024 228.579 12.5335 230.667 12.5335C231.915 12.5335 233.079 12.1565 233.78 11.5064V12.9272C233.335 13.3563 232.053 13.8689 230.565 13.8689V13.867ZM227.125 8.06309H232.634C232.617 6.12783 231.487 5.16948 230.136 5.16948C228.527 5.16948 227.383 6.11111 227.125 8.06309Z" fill="#002066"/>
              <path d="M237.749 13.6593H236.192V4.12228H237.732V6.50142C238.211 4.92647 239.391 4.00155 241 4.08699V5.73066C240.879 5.69723 240.64 5.66194 240.436 5.66194C239.118 5.66194 237.751 6.55157 237.751 8.86385V13.6574L237.749 13.6593Z" fill="#002066"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#2E2F32]">Display</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="w-px h-[22px] bg-gray-300"></div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#2E2F32]">Coca Cola</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="w-px h-[22px] bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <button className="relative p-1 rounded-full hover:bg-gray-100">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[52px] border-r border-[#E3E4E5] bg-white flex flex-col items-center py-1.5 gap-0">
          <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.24935 1.06655L8.32298 1.11831L14.823 6.61831C15.0338 6.79668 15.0601 7.11217 14.8817 7.32297C14.7231 7.51035 14.4563 7.55194 14.2509 7.4336L14.177 7.38169L14 7.231L14 14.5C14 14.7455 13.8231 14.9496 13.5899 14.9919L13.5 15H9.50001C9.25455 15 9.0504 14.8231 9.00807 14.5899L9.00001 14.5V12C9.00001 11.4477 8.55229 11 8.00001 11C7.48717 11 7.0645 11.386 7.00674 11.8834L7.00001 12V14.5C7.00001 14.7455 6.82314 14.9496 6.58989 14.9919L6.50001 15H2.50001C2.25455 15 2.0504 14.8231 2.00807 14.5899L2.00001 14.5L2 7.23L1.82298 7.38169C1.6356 7.54025 1.36551 7.53709 1.18252 7.38638L1.11832 7.32297C0.959765 7.13559 0.96292 6.8655 1.11363 6.68251L1.17704 6.61831L7.67704 1.11831C7.84016 0.980282 8.06964 0.963029 8.24935 1.06655ZM8.00001 2.154L2.98892 6.39477L3.00001 6.5V14H6.00001V12C6.00001 10.9456 6.81589 10.0818 7.85075 10.0055L8.00001 10C9.05437 10 9.91818 10.8159 9.99452 11.8507L10 12V14H13V6.5C13 6.4639 13.0038 6.4287 13.0111 6.39477L8.00001 2.154Z" fill="#2E2F32"/>
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-transparent">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5 1.85177C13.5 1.25526 12.9016 0.844293 12.3449 1.05843L6.40716 3.34216H4C2.34315 3.34216 1 4.68531 1 6.34216C1 7.93946 2.24832 9.2452 3.82259 9.337L4.01633 10.0766L4.98761 13.7015C5.23776 14.6351 6.19736 15.1891 7.13092 14.9389C8.06448 14.6888 8.6185 13.7292 8.36836 12.7956L7.56202 9.78634L12.3449 11.6259C12.9016 11.84 13.5 11.4291 13.5 10.8326V8.46414C14.3739 8.15526 15 7.32183 15 6.34217C15 5.36251 14.3739 4.52908 13.5 4.2202V1.85177ZM6.3906 9.34216H4.85769L4.98334 9.82182L5.95354 13.4427C6.06075 13.8428 6.472 14.0802 6.8721 13.973C7.2722 13.8658 7.50964 13.4546 7.40244 13.0545L6.44009 9.46297L6.3906 9.34216ZM4.5 4.34216H6V8.34216H4.5V4.34216ZM13.5 7.34226C13.8036 7.11421 14 6.75112 14 6.34217C14 5.93322 13.8036 5.57013 13.5 5.34208V7.34226ZM7 4.18556L12.5 2.07018V10.6141L7 8.49876V4.18556ZM3.5 4.40517C2.63739 4.62719 2 5.41024 2 6.34216C2 7.27408 2.63739 8.05713 3.5 8.27915V4.40517Z" fill="#0053E2"/>
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M2.5 2.5H13.5V4H2.5V2.5ZM2.5 6H13.5V7.5H2.5V6ZM2.5 9.5H13.5V11H2.5V9.5ZM2.5 13H13.5V14.5H2.5V13Z" fill="#2E2F32"/>
            </svg>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Page Header */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[#2E2F32]">Display campaigns</h1>
              <button
                onClick={() => openPanel(null)}
                className="h-8 px-4 bg-[#0053E2] text-white text-sm font-bold rounded-full hover:bg-[#0046c7] transition-colors"
              >
                Create campaign
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E3E4E5]">
              <div className="flex gap-0">
                <button
                  onClick={() => setSelectedTab("onsite")}
                  className={`px-0 py-3 text-sm relative ${
                    selectedTab === "onsite"
                      ? "font-bold text-[#0053E2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#0053E2] after:rounded-t"
                      : "font-normal text-black hover:bg-gray-50"
                  }`}
                >
                  Onsite auction
                </button>
                <button
                  onClick={() => setSelectedTab("archive")}
                  className={`ml-6 px-0 py-3 text-sm relative ${
                    selectedTab === "archive"
                      ? "font-bold text-[#0053E2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#0053E2] after:rounded-t"
                      : "font-normal text-black hover:bg-gray-50"
                  }`}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>

          {/* Data Table Container */}
          <div className="mx-6 rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden">
            {/* Table Controls */}
            <div className="flex items-center justify-end gap-4 p-4 border-b border-[#E3E4E5] bg-white">
              <div className="relative">
                <select className="w-[143px] h-10 px-3 pr-8 text-sm border border-[#909196] rounded appearance-none bg-white">
                  <option>All statuses</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>

              <div className="relative w-[354px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaign name/ID"
                  className="w-full h-10 pl-10 pr-4 text-sm border border-[#909196] rounded"
                />
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Download className="w-6 h-6" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8F8]">
                  <tr>
                    <th className="p-2 text-left w-12">
                      <input type="checkbox" className="w-5 h-5 rounded border-[#909196]" />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative min-w-[280px]">
                      <div
                        className="flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        onClick={() => setShowPopover(!showPopover)}
                      >
                        Campaign/Ad group/Creative
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>

                      {/* Popover */}
                      {showPopover && (
                        <div ref={popoverRef} className="absolute top-full left-0 mt-2 w-[432px] bg-white rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50">
                          {/* Nubbin (Arrow) */}
                          <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                          </svg>

                          <div className="p-4">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-bold text-[#2E2F32]">
                                Campaign recommendations
                              </h3>
                              <div className="flex items-center gap-1 px-2 py-1 bg-[#E9F1FE] rounded">
                                <Eye className="w-4 h-4 text-[#002E99]" />
                                <span className="text-xs text-[#002E99]">Awareness</span>
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-[#E3E4E5] mb-4"></div>

                            {/* Content */}
                            <div className="mb-4">
                              <div className="mb-3">
                                <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                                <div className="flex items-end gap-1">
                                  <span className="text-base font-bold text-[#2A8703]">14-16%</span>
                                  <span className="text-base font-bold text-[#2E2F32]">Potential increase in reach</span>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-4">
                              <button
                                className="text-sm text-[#2E2F32] underline hover:no-underline"
                                onClick={() => setShowPopover(false)}
                              >
                                Dismiss
                              </button>
                              <button className="px-4 h-8 text-sm font-bold text-[#2E2F32] bg-white border border-[#2E2F32] rounded-full hover:bg-gray-50">
                                View recommendations
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] min-w-[120px]">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        Status
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] min-w-[160px]">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        Recommendations
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] min-w-[130px]">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        Total budget
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] min-w-[170px]">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        Targeting Strategy
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] border-l border-[#BABBBE] min-w-[130px]">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        Impressions
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] min-w-[100px]">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        Pacing
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
                        </svg>
                      </div>
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] min-w-[100px]">
                      <div className="whitespace-nowrap">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, idx) => (
                    <>
                      <tr key={campaign.id} className="border-b border-[#E3E4E5] hover:bg-gray-50">
                        <td className="p-2">
                          <input type="checkbox" className="w-5 h-5 rounded border-[#909196]" />
                        </td>
                        <td className="p-2">
                          <div className="flex items-start gap-1">
                            {campaign.children && campaign.children.length > 0 && (
                              <button
                                onClick={() => toggleExpand(campaign.id)}
                                className="mt-0.5 flex-shrink-0"
                              >
                                {campaign.expanded ? (
                                  <ChevronDown className="w-6 h-6" />
                                ) : (
                                  <ChevronRight className="w-6 h-6" />
                                )}
                              </button>
                            )}
                            {!campaign.children && <div className="w-6"></div>}
                            <div className="flex-1">
                              <div className="text-[#2E2F32] underline hover:no-underline cursor-pointer">
                                {campaign.name}
                              </div>
                              {campaign.type === "campaign" && (
                                <div className="text-xs text-[#74767C] mt-0.5">
                                  ID: {campaign.id}
                                </div>
                              )}
                              {campaign.type === "creative" && campaign.targetingStrategy && (
                                <div className="text-xs text-[#74767C] mt-0.5">
                                  {campaign.targetingStrategy}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          {getStatusBadge(campaign.status)}
                        </td>
                        <td className="p-2 text-[#2E2F32] relative">
                          {campaign.recommendations > 0 ? (
                            <>
                              <button
                                className="text-[#2E2F32] hover:underline cursor-pointer"
                                onClick={() => setShowRecommendationPopover(showRecommendationPopover === campaign.id ? null : campaign.id)}
                              >
                                {campaign.recommendations}
                              </button>

                              {/* Recommendation Popover */}
                              {showRecommendationPopover === campaign.id && (
                                <div
                                  ref={recPopoverRef}
                                  className="absolute top-full left-0 mt-2 w-[432px] bg-white rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50"
                                >
                                  {/* Nubbin (Arrow) */}
                                  <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                                  </svg>

                                  <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                      <h3 className="text-lg font-bold text-[#2E2F32]">
                                        Campaign recommendations
                                      </h3>
                                      <div className="flex items-center gap-1 px-2 py-1 bg-[#E9F1FE] rounded">
                                        <Eye className="w-4 h-4 text-[#002E99]" />
                                        <span className="text-xs text-[#002E99]">Awareness</span>
                                      </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-[#E3E4E5] mb-4"></div>

                                    {/* Content */}
                                    <div className="mb-4">
                                      <div className="mb-3">
                                        <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                                        <div className="flex items-end gap-1">
                                          <span className="text-base font-bold text-[#2A8703]">14-16%</span>
                                          <span className="text-base font-bold text-[#2E2F32]">Potential increase in reach</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-end gap-4">
                                      <button
                                        className="text-sm text-[#2E2F32] underline hover:no-underline"
                                        onClick={() => setShowRecommendationPopover(null)}
                                      >
                                        Dismiss
                                      </button>
                                      <button
                                        className="px-4 h-8 text-sm font-bold text-[#2E2F32] bg-white border border-[#2E2F32] rounded-full hover:bg-gray-50"
                                        onClick={() => openPanel(campaign)}
                                      >
                                        View recommendations
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-2 text-[#2E2F32]">
                          {campaign.totalBudget || "-"}
                        </td>
                        <td className="p-2 text-[#2E2F32]">
                          {campaign.targetingStrategy || "-"}
                        </td>
                        <td className="p-2 text-[#2E2F32] border-l border-[#E3E4E5]">
                          {campaign.impressions || "-"}
                        </td>
                        <td className="p-2">
                          {campaign.pacing ? (
                            <span className={campaign.pacing.color}>{campaign.pacing.value}</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-2">
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      {campaign.expanded && campaign.children?.map((child) => (
                        <tr key={child.id} className="border-b border-[#E3E4E5] bg-white hover:bg-gray-50">
                          <td className="p-2"></td>
                          <td className="p-2 pl-12">
                            <div className="flex items-center gap-2">
                              {child.type === "creative" && child.name.includes("video") && (
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M3 5H10C10.5523 5 11 5.44772 11 6V7.12328V9.15348V10C11 10.5523 10.5523 11 10 11H3C2.44772 11 2 10.5523 2 10V6C2 5.44772 2.44772 5 3 5ZM12 9.87498V10C12 11.1046 11.1046 12 10 12H3C1.89543 12 1 11.1046 1 10V6C1 4.89543 1.89543 4 3 4H10C11.1046 4 12 4.89543 12 6V6.34998L14.2948 5.31732C14.6257 5.16842 15 5.41045 15 5.77328V10.2785C15 10.6276 14.6513 10.8692 14.3244 10.7466L12 9.87498ZM12 8.80698L14 9.55698V6.54657L12 7.44657V8.80698Z" fill="#2E2F32"/>
                                </svg>
                              )}
                              {child.type === "creative" && child.name.includes("banner") && (
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 7.99976C8 8.55204 7.55228 8.99976 7 8.99976C6.44772 8.99976 6 8.55204 6 7.99976C6 7.44747 6.44772 6.99976 7 6.99976C7.55228 6.99976 8 7.44747 8 7.99976Z" fill="#2E2F32"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M11.6742 1.74875L12.5453 4.99982H14.0001C14.5524 4.99982 15.0001 5.44753 15.0001 5.99982V13.9998C15.0001 14.5521 14.5524 14.9998 14.0001 14.9998H5.00012C4.44784 14.9998 4.00012 14.5521 4.00012 13.9998V13.061C3.59247 13.026 3.23153 12.7412 3.11952 12.3232L1.04897 4.59576C0.906029 4.0623 1.22261 3.51396 1.75608 3.37102L10.4494 1.04165C10.9829 0.898705 11.5312 1.21529 11.6742 1.74875ZM2.0149 4.33694L10.7082 2.00757L11.51 4.99982H5.00012C4.44784 4.99982 4.00012 5.44753 4.00012 5.99982V11.7459L2.0149 4.33694ZM14.0001 5.99982H5.00012L5.00012 11.2926L5.83985 10.4528C6.19174 10.1009 6.74884 10.0613 7.14696 10.3599L8.42909 11.3215L11.2718 8.0727C11.6527 7.63736 12.3225 7.61506 12.7315 8.0241L14.0001 9.29272V5.99982ZM14.0001 10.7069L12.0244 8.7312L9.18167 11.98C8.83721 12.3737 8.24756 12.4354 7.82909 12.1215L6.54696 11.1599L5.00012 12.7068V13.9998H14.0001V10.7069Z" fill="#2E2F32"/>
                                </svg>
                              )}
                              <span className="text-[#2E2F32] underline hover:no-underline cursor-pointer">
                                {child.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2">{getStatusBadge(child.status)}</td>
                          <td className="p-2 text-[#2E2F32] relative">
                            {child.recommendations > 0 ? (
                              <>
                                <button
                                  className="text-[#2E2F32] hover:underline cursor-pointer"
                                  onClick={() => setShowRecommendationPopover(showRecommendationPopover === child.id ? null : child.id)}
                                >
                                  {child.recommendations}
                                </button>

                                {/* Recommendation Popover */}
                                {showRecommendationPopover === child.id && (
                                  <div
                                    ref={recPopoverRef}
                                    className="absolute top-full left-0 mt-2 w-[432px] bg-white rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50"
                                  >
                                    {/* Nubbin (Arrow) */}
                                    <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                                    </svg>

                                    <div className="p-4">
                                      {/* Header */}
                                      <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-[#2E2F32]">
                                          Campaign recommendations
                                        </h3>
                                        <div className="flex items-center gap-1 px-2 py-1 bg-[#E9F1FE] rounded">
                                          <Eye className="w-4 h-4 text-[#002E99]" />
                                          <span className="text-xs text-[#002E99]">Awareness</span>
                                        </div>
                                      </div>

                                      {/* Divider */}
                                      <div className="h-px bg-[#E3E4E5] mb-4"></div>

                                      {/* Content */}
                                      <div className="mb-4">
                                        <div className="mb-3">
                                          <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                                          <div className="flex items-end gap-1">
                                            <span className="text-base font-bold text-[#2A8703]">14-16%</span>
                                            <span className="text-base font-bold text-[#2E2F32]">Potential increase in reach</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Actions */}
                                      <div className="flex items-center justify-end gap-4">
                                        <button
                                          className="text-sm text-[#2E2F32] underline hover:no-underline"
                                          onClick={() => setShowRecommendationPopover(null)}
                                        >
                                          Dismiss
                                        </button>
                                        <button
                                        className="px-4 h-8 text-sm font-bold text-[#2E2F32] bg-white border border-[#2E2F32] rounded-full hover:bg-gray-50"
                                        onClick={() => openPanel(campaign)}
                                      >
                                        View recommendations
                                      </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2 text-[#2E2F32]">{child.totalBudget || "-"}</td>
                          <td className="p-2 text-[#2E2F32]">{child.targetingStrategy || "-"}</td>
                          <td className="p-2 text-[#2E2F32] border-l border-[#E3E4E5]">{child.impressions || "-"}</td>
                          <td className="p-2">
                            {child.pacing ? (
                              <span className={child.pacing.color}>{child.pacing.value}</span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-[#E3E4E5] bg-white">
              <div className="flex items-center gap-2 text-sm text-[#2E2F32]">
                <span>Results per page: 50</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2E2F32]">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.64645 7.64645C3.4662 7.82669 3.45234 8.1103 3.60485 8.30645L3.64645 8.35355L8.14645 12.8536C8.34171 13.0488 8.65829 13.0488 8.85355 12.8536C9.0338 12.6733 9.04766 12.3897 8.89515 12.1936L8.85355 12.1464L4.7075 8L8.85355 3.85355C9.0338 3.67331 9.04766 3.3897 8.89515 3.19355L8.85355 3.14645C8.67331 2.9662 8.3897 2.95234 8.19355 3.10485L8.14645 3.14645L3.64645 7.64645Z" fill="#BABBBE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 7.64645C6.9662 7.82669 6.95234 8.1103 7.10485 8.30645L7.14645 8.35355L11.6464 12.8536C11.8417 13.0488 12.1583 13.0488 12.3536 12.8536C12.5338 12.6733 12.5477 12.3897 12.3951 12.1936L12.3536 12.1464L8.2075 8L12.3536 3.85355C12.5338 3.67331 12.5477 3.3897 12.3951 3.19355L12.3536 3.14645C12.1733 2.9662 11.8897 2.95234 11.6936 3.10485L11.6464 3.14645L7.14645 7.64645Z" fill="#BABBBE"/>
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.39645 7.64645C5.2162 7.82669 5.20234 8.1103 5.35485 8.30645L5.39645 8.35355L9.89645 12.8536C10.0917 13.0488 10.4083 13.0488 10.6036 12.8536C10.7838 12.6733 10.7977 12.3897 10.6451 12.1936L10.6036 12.1464L6.4575 8L10.6036 3.85355C10.7838 3.67331 10.7977 3.3897 10.6451 3.19355L10.6036 3.14645C10.4233 2.9662 10.1397 2.95234 9.94355 3.10485L9.89645 3.14645L5.39645 7.64645Z" fill="#BABBBE"/>
                  </svg>
                </button>
                <span>Page</span>
                <div className="w-7 h-6 flex items-center justify-center border border-[#74767C] rounded text-center">
                  1
                </div>
                <span>of 10</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6036 7.64645C10.7838 7.82669 10.7977 8.1103 10.6451 8.30645L10.6036 8.35355L6.10355 12.8536C5.90829 13.0488 5.59171 13.0488 5.39645 12.8536C5.2162 12.6733 5.20234 12.3897 5.35485 12.1936L5.39645 12.1464L9.5425 8L5.39645 3.85355C5.2162 3.67331 5.20234 3.3897 5.35485 3.19355L5.39645 3.14645C5.57669 2.9662 5.8603 2.95234 6.05645 3.10485L6.10355 3.14645L10.6036 7.64645Z" fill="#2E2F32"/>
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.85355 7.64645C9.0338 7.82669 9.04766 8.1103 8.89515 8.30645L8.85355 8.35355L4.35355 12.8536C4.15829 13.0488 3.84171 13.0488 3.64645 12.8536C3.4662 12.6733 3.45234 12.3897 3.60485 12.1936L3.64645 12.1464L7.7925 8L3.64645 3.85355C3.4662 3.67331 3.45234 3.3897 3.60485 3.19355L3.64645 3.14645C3.82669 2.9662 4.1103 2.95234 4.30645 3.10485L4.35355 3.14645L8.85355 7.64645Z" fill="#2E2F32"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.3536 7.64645C12.5338 7.82669 12.5477 8.1103 12.3951 8.30645L12.3536 8.35355L7.85355 12.8536C7.65829 13.0488 7.34171 13.0488 7.14645 12.8536C6.9662 12.6733 6.95234 12.3897 7.10485 12.1936L7.14645 12.1464L11.2925 8L7.14645 3.85355C6.9662 3.67331 6.95234 3.3897 7.10485 3.19355L7.14645 3.14645C7.32669 2.9662 7.6103 2.95234 7.80645 3.10485L7.85355 3.14645L12.3536 7.64645Z" fill="#2E2F32"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Scrim Overlay */}
      {showPanel && (
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            panelClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={closePanel}
        />
      )}

      {/* Recommendations Panel */}
      {showPanel && (
        <div
          ref={panelRef}
          className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col transition-transform duration-300 ${
            panelClosing || panelOpening ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <h2 className="text-xl font-bold text-[#2E2F32]">Recommendations</h2>
            <button
              onClick={closePanel}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
                  fill="#2E2F32"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#2E2F32"
                />
              </svg>
            </button>
          </div>

          <div className="h-px bg-[#E3E4E5]"></div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Campaign Info */}
            {selectedCampaign && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#2E2F32]">Campaign</span>
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#E9F1FE] rounded">
                    <Eye className="w-4 h-4 text-[#002E99]" />
                    <span className="text-xs text-[#002E99]">Awareness</span>
                  </div>
                </div>
                <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1">
                  {selectedCampaign.name}
                </a>
              </div>
            )}

            <div className="h-px bg-[#E3E4E5] mb-6"></div>

            {/* Campaign Level Recommendations */}
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-base font-bold text-[#2E2F32]">Campaign level recommendations</span>
                <span className="text-base text-[#2E2F32]">(1)</span>
              </div>

              <div className="p-4 border border-[#E3E4E5] rounded-lg bg-white">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-0.5 w-5 h-5 rounded border-[#909196]" />
                  <div className="flex-1">
                    <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1 block mb-4">
                      Campaign name goes here
                    </a>

                    <div className="mb-4">
                      <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                      <div className="flex items-end gap-1">
                        <span className="text-sm font-bold text-[#2A8703]">14-16%</span>
                        <span className="text-sm font-bold text-[#2E2F32]">Potential increase in reach</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-[#515357] mb-2">Affected ad groups</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs text-[#515357] bg-[#E3E4E5] rounded">Ad group name....</span>
                        <span className="px-2 py-1 text-xs text-[#515357] bg-[#E3E4E5] rounded">Ad group name....</span>
                        <span className="px-2 py-1 text-xs text-[#515357] bg-[#E3E4E5] rounded">Ad group name....</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                      <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                        Dismiss
                      </button>
                      <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#E3E4E5] mb-6"></div>

            {/* Ad Group Recommendations */}
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-base font-bold text-[#2E2F32]">Ad group recommendations</span>
                <span className="text-base text-[#2E2F32]">(3)</span>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 border border-[#E3E4E5] rounded-lg bg-white">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-0.5 w-5 h-5 rounded border-[#909196]" />
                      <div className="flex-1">
                        <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1 block mb-4">
                          Ad group 0{item} name goes here
                        </a>

                        <div className="mb-4">
                          <div className="flex items-start gap-3">
                            <input type="radio" name={`rec-${item}`} className="mt-0.5 w-5 h-5" />
                            <div className="flex-1">
                              <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                              <div className="flex items-end gap-1">
                                <span className="text-sm font-bold text-[#2A8703]">14-16%</span>
                                <span className="text-sm font-bold text-[#2E2F32]">Potential increase in reach</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                          <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                            Dismiss
                          </button>
                          <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                            View details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E3E4E5]"></div>

          {/* Footer Actions */}
          <div className="p-6 flex items-center justify-end gap-4">
            <button
              onClick={closePanel}
              className="text-sm text-[#2E2F32] underline hover:no-underline"
            >
              Close
            </button>
            <button className="h-8 px-4 bg-[#BABBBE] text-white text-sm font-bold rounded-full cursor-not-allowed">
              Apply selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
