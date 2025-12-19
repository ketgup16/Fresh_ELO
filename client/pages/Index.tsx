import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ChevronUp, Search, Settings, Download, Bell, HelpCircle, User, MoreHorizontal, Eye, Sliders, X, Home, Megaphone, Gauge, BarChart3, Briefcase, Video, CloudUpload, ArrowRight, ArrowLeft } from "lucide-react";
import SponsoredSearchDashboard from "../components/SponsoredSearchDashboard";

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
    pacing: { value: "123%", color: "text-[#995213]" },
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
    pacing: { value: "89%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-10",
    name: "Spring Sale 2024 Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$150,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,500,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-11",
    name: "Holiday Promotions Q4",
    type: "campaign",
    status: "Scheduled",
    recommendations: 3,
    totalBudget: "$300,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "5,000,000",
    pacing: { value: "98%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-12",
    name: "Back to School Campaign 2024",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$75,500.00",
    targetingStrategy: "Run of site",
    impressions: "1,800,000",
    pacing: { value: "110%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-13",
    name: "Summer Electronics Sale",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$220,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,200,000",
    pacing: { value: "103%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-14",
    name: "Home & Garden Spring Collection",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$95,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,500,000",
    pacing: { value: "107%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-15",
    name: "Fashion Week Exclusive Deals",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$50,000.00",
    targetingStrategy: "Run of site",
    impressions: "900,000",
    pacing: { value: "85%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-16",
    name: "Grocery Essentials Promotion",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$180,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,800,000",
    pacing: { value: "112%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-17",
    name: "Tech Gadgets Flash Sale",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$275,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "5,500,000",
    pacing: { value: "108%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-18",
    name: "Kids Toys & Games Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$120,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,100,000",
    pacing: { value: "101%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-19",
    name: "Fitness & Wellness January",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$65,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,200,000",
    pacing: { value: "115%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-20",
    name: "Pet Supplies Awareness Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$85,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,600,000",
    pacing: { value: "104%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-21",
    name: "Beauty & Cosmetics Spring Launch",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$110,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,300,000",
    pacing: { value: "106%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-22",
    name: "Outdoor & Camping Gear Summer",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$95,500.00",
    targetingStrategy: "Run of site",
    impressions: "1,700,000",
    pacing: { value: "99%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-23",
    name: "Kitchen Appliances Mega Sale",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$200,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "4,100,000",
    pacing: { value: "111%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-24",
    name: "Books & Media Fall Collection",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$45,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "800,000",
    pacing: { value: "97%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-25",
    name: "Baby Products Essentials",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$130,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,800,000",
    pacing: { value: "109%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-26",
    name: "Automotive Parts & Accessories",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$88,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,400,000",
    pacing: { value: "92%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-27",
    name: "Office Supplies Back to Work",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$72,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,100,000",
    pacing: { value: "103%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-28",
    name: "Sports Equipment Winter Sports",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$145,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,200,000",
    pacing: { value: "114%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-29",
    name: "Jewelry & Watches Valentine's",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$165,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,600,000",
    pacing: { value: "118%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-30",
    name: "Smart Home Devices Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$210,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "4,500,000",
    pacing: { value: "107%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-31",
    name: "Furniture Clearance Event",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$190,000.00",
    targetingStrategy: "Run of site",
    impressions: "3,900,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-32",
    name: "Bedding & Bath Refresh Sale",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$78,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,300,000",
    pacing: { value: "100%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-33",
    name: "Musical Instruments Promotion",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$55,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "900,000",
    pacing: { value: "96%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-34",
    name: "Gaming Consoles & Accessories",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$280,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "5,800,000",
    pacing: { value: "116%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-35",
    name: "Lighting & Decor Collection",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$92,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,800,000",
    pacing: { value: "102%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-36",
    name: "Party Supplies & Decorations",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$48,000.00",
    targetingStrategy: "Run of site",
    impressions: "750,000",
    pacing: { value: "94%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-37",
    name: "Tools & Hardware Spring",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$125,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,600,000",
    pacing: { value: "110%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-38",
    name: "Garden & Patio Seasonal",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$105,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,200,000",
    pacing: { value: "88%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-39",
    name: "Pharmacy & Health Care",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$155,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,300,000",
    pacing: { value: "108%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-40",
    name: "Watches & Accessories Luxury",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$225,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,700,000",
    pacing: { value: "112%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-41",
    name: "Shoes & Footwear Collection",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$175,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,700,000",
    pacing: { value: "106%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-42",
    name: "Handbags & Wallets Premium",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$135,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,900,000",
    pacing: { value: "101%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-43",
    name: "Wine & Spirits Collection",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$98,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,950,000",
    pacing: { value: "99%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-44",
    name: "Arts & Crafts Supplies",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$62,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,050,000",
    pacing: { value: "104%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-45",
    name: "Vitamins & Supplements Health",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$118,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,450,000",
    pacing: { value: "113%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-46",
    name: "Laptops & Computers Back to School",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$350,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "7,200,000",
    pacing: { value: "119%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-47",
    name: "Tablets & E-readers Sale",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$195,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,000,000",
    pacing: { value: "111%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-48",
    name: "Headphones & Audio Equipment",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$142,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,100,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-49",
    name: "Cameras & Photography Gear",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$168,000.00",
    targetingStrategy: "Run of site",
    impressions: "3,500,000",
    pacing: { value: "109%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-50",
    name: "Streaming Devices & Media Players",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$88,500.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,850,000",
    pacing: { value: "107%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-51",
    name: "Winter Clothing Collection",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$145,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,950,000",
    pacing: { value: "108%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-52",
    name: "Smart Watches & Wearables",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$185,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,800,000",
    pacing: { value: "111%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-53",
    name: "Kitchen Essentials Sale",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$92,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,750,000",
    pacing: { value: "98%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-54",
    name: "Board Games & Puzzles",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$58,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,100,000",
    pacing: { value: "104%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-55",
    name: "Outdoor Furniture Spring Sale",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$175,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,500,000",
    pacing: { value: "109%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-56",
    name: "Skincare & Beauty Products",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$128,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,650,000",
    pacing: { value: "112%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-57",
    name: "Bicycles & Cycling Gear",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$95,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,850,000",
    pacing: { value: "91%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-58",
    name: "Cleaning Supplies & Essentials",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$72,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,450,000",
    pacing: { value: "106%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-59",
    name: "Premium Coffee & Tea Collection",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$68,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,350,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-60",
    name: "Printer & Office Electronics",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$115,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,350,000",
    pacing: { value: "103%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-61",
    name: "Wireless Speakers & Audio",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$158,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,250,000",
    pacing: { value: "117%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-62",
    name: "Luxury Bedding Collection",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$138,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,850,000",
    pacing: { value: "110%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-63",
    name: "Power Tools Professional",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$195,000.00",
    targetingStrategy: "Run of site",
    impressions: "4,050,000",
    pacing: { value: "108%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-64",
    name: "Organic Foods & Snacks",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$105,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,150,000",
    pacing: { value: "107%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-65",
    name: "Luggage & Travel Accessories",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$88,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,750,000",
    pacing: { value: "100%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-66",
    name: "Smart Home Security Systems",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$225,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "4,650,000",
    pacing: { value: "114%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-67",
    name: "Outdoor Grills & BBQ",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$142,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,950,000",
    pacing: { value: "109%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-68",
    name: "Craft Beer & Brewing Kits",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$54,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,050,000",
    pacing: { value: "87%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-69",
    name: "Yoga & Meditation Essentials",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$78,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,550,000",
    pacing: { value: "106%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-70",
    name: "Desktop Computers & Monitors",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$285,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "5,950,000",
    pacing: { value: "111%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-71",
    name: "Camping Equipment & Tents",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$118,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,450,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-72",
    name: "Wall Art & Decorations",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$62,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,250,000",
    pacing: { value: "102%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-73",
    name: "Electric Scooters & Bikes",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$205,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,250,000",
    pacing: { value: "113%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-74",
    name: "Protein & Nutrition Supplements",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$138,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,850,000",
    pacing: { value: "116%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-75",
    name: "Swimming Pool Supplies",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$95,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,950,000",
    pacing: { value: "99%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-76",
    name: "Board Game Night Collection",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$48,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "950,000",
    pacing: { value: "104%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-77",
    name: "Hair Care & Styling Products",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$85,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,750,000",
    pacing: { value: "107%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-78",
    name: "Dog & Cat Food Premium",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$125,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,550,000",
    pacing: { value: "110%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-79",
    name: "Mattresses & Sleep Comfort",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$245,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "5,150,000",
    pacing: { value: "112%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-80",
    name: "Fishing Gear & Tackle",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$68,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,350,000",
    pacing: { value: "89%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-81",
    name: "Sunglasses & Eyewear",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$92,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,850,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-82",
    name: "Baby Monitors & Safety",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$108,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,250,000",
    pacing: { value: "108%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-83",
    name: "Cocktail & Bar Supplies",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$58,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,150,000",
    pacing: { value: "103%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-84",
    name: "Area Rugs & Floor Coverings",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$125,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,650,000",
    pacing: { value: "106%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-85",
    name: "Electric Guitars & Instruments",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$78,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,550,000",
    pacing: { value: "98%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-86",
    name: "Vacuum Cleaners & Floor Care",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$148,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,050,000",
    pacing: { value: "111%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-87",
    name: "Drone Photography & Video",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$195,000.00",
    targetingStrategy: "Run of site",
    impressions: "4,050,000",
    pacing: { value: "113%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-88",
    name: "Candles & Home Fragrance",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$52,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,050,000",
    pacing: { value: "104%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-89",
    name: "Running & Athletic Shoes",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$168,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,450,000",
    pacing: { value: "118%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-90",
    name: "Craft Supplies & DIY Kits",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$72,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,450,000",
    pacing: { value: "107%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-91",
    name: "Window Treatments & Blinds",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$88,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,750,000",
    pacing: { value: "105%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-92",
    name: "Bluetooth Speakers Portable",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$115,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,350,000",
    pacing: { value: "109%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-93",
    name: "Bird Watching Equipment",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$42,000.00",
    targetingStrategy: "Run of site",
    impressions: "850,000",
    pacing: { value: "86%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-94",
    name: "Kitchen Cutlery & Knives",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$68,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,350,000",
    pacing: { value: "106%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-95",
    name: "Artificial Christmas Trees",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$125,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,550,000",
    pacing: { value: "100%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-96",
    name: "Emergency Preparedness Kits",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$85,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,750,000",
    pacing: { value: "108%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-97",
    name: "Fashion Jewelry & Accessories",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$155,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,250,000",
    pacing: { value: "114%", color: "text-[#995213]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-98",
    name: "Water Filtration Systems",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$105,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,150,000",
    pacing: { value: "110%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-99",
    name: "Model Trains & Collectibles",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$48,000.00",
    targetingStrategy: "Run of site",
    impressions: "950,000",
    pacing: { value: "101%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  },
  {
    id: "10004-100",
    name: "Outdoor Hammocks & Swings",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$55,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,100,000",
    pacing: { value: "103%", color: "text-[#2A8703]" },
    expanded: false,
    children: []
  }
];

export default function Index() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedTab, setSelectedTab] = useState<"onsite" | "archive">("onsite");
  const [showPopover, setShowPopover] = useState(false);
  const [showRecommendationPopover, setShowRecommendationPopover] = useState<string | null>(null);
  const [popoverOpenAbove, setPopoverOpenAbove] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);
  const [panelOpening, setPanelOpening] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [keywordsExpanded, setKeywordsExpanded] = useState(false);
  const [showApplyAlert, setShowApplyAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const recPopoverRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 50;

  // Column widths state
  const [columnWidths, setColumnWidths] = useState({
    checkbox: 56,
    campaign: 280,
    status: 120,
    recommendations: 160,
    totalBudget: 130,
    targetingStrategy: 170,
    impressions: 130,
    pacing: 100,
    actions: 80
  });
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [tempStatusFilter, setTempStatusFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllFiltersPopover, setShowAllFiltersPopover] = useState(false);
  const [searchScope, setSearchScope] = useState<string>('Campaign name');
  const [showSearchScopeDropdown, setShowSearchScopeDropdown] = useState(false);
  const [showLiveFilterPopover, setShowLiveFilterPopover] = useState(false);
  const [livePacingFilter, setLivePacingFilter] = useState<string[]>([]);
  const [tempLivePacingFilter, setTempLivePacingFilter] = useState<string[]>([]);
  const [completedFilterSelected, setCompletedFilterSelected] = useState(false);
  const allFiltersPopoverRef = useRef<HTMLDivElement>(null);
  const liveFilterPopoverRef = useRef<HTMLDivElement>(null);
  const searchScopeDropdownRef = useRef<HTMLDivElement>(null);

  // Selected recommendations state
  const [selectedRecommendations, setSelectedRecommendations] = useState<{[key: string]: number}>({});

  // Selected rows state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Sidebar state
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('campaigns');
  const [expandedMenuGroups, setExpandedMenuGroups] = useState<string[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);

  // Media solutions dropdown state
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Display Advertising');

  const handleResizeStart = (e: React.MouseEvent, column: string, currentWidth: number) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(column);
    setStartX(e.clientX);
    setStartWidth(currentWidth);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedCampaigns = () => {
    // First filter by status
    let filtered = campaigns;
    if (statusFilter.length > 0) {
      filtered = campaigns.filter(campaign => statusFilter.includes(campaign.status));
    }

    // Then filter by Completed toggle
    if (completedFilterSelected) {
      filtered = filtered.filter(campaign => campaign.status === 'Completed');
    }

    // Then filter by live pacing (on track / at risk)
    if (livePacingFilter.length > 0) {
      filtered = filtered.filter(campaign => {
        if (!campaign.pacing) return false;
        const pacingColor = campaign.pacing.color;
        if (livePacingFilter.includes('on-track') && pacingColor === 'text-[#2A8703]') {
          return true;
        }
        if (livePacingFilter.includes('at-risk') && pacingColor === 'text-[#995213]') {
          return true;
        }
        return false;
      });
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Then sort if a column is selected
    let sorted = filtered;
    if (sortColumn) {
      sorted = [...filtered].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortColumn) {
          case 'campaign':
            aValue = a.name?.toLowerCase() || '';
            bValue = b.name?.toLowerCase() || '';
            break;
          case 'status':
            aValue = a.status?.toLowerCase() || '';
            bValue = b.status?.toLowerCase() || '';
            break;
          case 'recommendations':
            aValue = a.recommendations || 0;
            bValue = b.recommendations || 0;
            break;
          case 'totalBudget':
            aValue = parseFloat(a.totalBudget?.replace(/[$,]/g, '') || '0');
            bValue = parseFloat(b.totalBudget?.replace(/[$,]/g, '') || '0');
            break;
          case 'targetingStrategy':
            aValue = a.targetingStrategy?.toLowerCase() || '';
            bValue = b.targetingStrategy?.toLowerCase() || '';
            break;
          case 'impressions':
            aValue = parseFloat(a.impressions?.replace(/,/g, '') || '0');
            bValue = parseFloat(b.impressions?.replace(/,/g, '') || '0');
            break;
          case 'pacing':
            aValue = parseFloat(a.pacing?.value?.replace(/%/g, '') || '0');
            bValue = parseFloat(b.pacing?.value?.replace(/%/g, '') || '0');
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }

    return sorted;
  };

  const getPaginatedCampaigns = () => {
    const sorted = getSortedCampaigns();
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return sorted.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const sorted = getSortedCampaigns();
    return Math.ceil(sorted.length / resultsPerPage);
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageCampaigns = getPaginatedCampaigns();
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      // Add all current page campaign IDs to selected rows
      currentPageCampaigns.forEach(campaign => {
        newSelectedRows.add(campaign.id);
      });
    } else {
      // Remove all current page campaign IDs from selected rows
      currentPageCampaigns.forEach(campaign => {
        newSelectedRows.delete(campaign.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (campaignId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(campaignId);
    } else {
      newSelectedRows.delete(campaignId);
    }

    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = () => {
    const currentPageCampaigns = getPaginatedCampaigns();
    if (currentPageCampaigns.length === 0) return false;
    return currentPageCampaigns.every(campaign => selectedRows.has(campaign.id));
  };

  const isSomeSelected = () => {
    const currentPageCampaigns = getPaginatedCampaigns();
    if (currentPageCampaigns.length === 0) return false;
    const selectedCount = currentPageCampaigns.filter(campaign => selectedRows.has(campaign.id)).length;
    return selectedCount > 0 && selectedCount < currentPageCampaigns.length;
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="#0053E2"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="#BABBBE"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="#BABBBE"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="#0053E2"/>
        </svg>
      );
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingColumn) return;

      const diff = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + diff);

      setColumnWidths(prev => ({
        ...prev,
        [resizingColumn]: newWidth
      }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn, startX, startWidth]);

  // Sidebar resize effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingSidebar) return;

      const diff = e.clientX - sidebarResizeStartX;
      const newWidth = Math.max(240, Math.min(600, sidebarResizeStartWidth + diff));

      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    if (isResizingSidebar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, sidebarResizeStartX, sidebarResizeStartWidth]);

  // Reset to page 1 when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  // Set indeterminate state for select all checkbox
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = isSomeSelected();
    }
  }, [selectedRows]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
      if (recPopoverRef.current && !recPopoverRef.current.contains(event.target as Node)) {
        setShowRecommendationPopover(null);
      }
      if (liveFilterPopoverRef.current && !liveFilterPopoverRef.current.contains(event.target as Node)) {
        setShowLiveFilterPopover(false);
      }
      if (searchScopeDropdownRef.current && !searchScopeDropdownRef.current.contains(event.target as Node)) {
        setShowSearchScopeDropdown(false);
      }
    };

    if (showPopover || showRecommendationPopover || showLiveFilterPopover || showSearchScopeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover, showRecommendationPopover, showLiveFilterPopover, showSearchScopeDropdown]);

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
      setShowDetailView(false);
      setShowApplyAlert(false);
      setShowConfirmation(false);
    }, 300);
  };

  const showDetails = () => {
    setShowDetailView(true);
    setShowApplyAlert(false);
    setShowConfirmation(false);
  };

  const backToList = () => {
    setShowDetailView(false);
    setShowApplyAlert(false);
    setShowConfirmation(false);
  };

  const handleApplyClick = () => {
    if (showDetailView) {
      if (!showApplyAlert) {
        setShowApplyAlert(true);
      } else {
        setShowApplyAlert(false);
        setShowConfirmation(true);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id ? { ...c, expanded: !c.expanded } : c
    ));
  };

  const handleRecommendationClick = (e: React.MouseEvent, campaignId: string) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const popoverHeight = 400; // Approximate height of the popover

    // Open above if there's not enough space below
    const shouldOpenAbove = spaceBelow < popoverHeight;
    setPopoverOpenAbove(shouldOpenAbove);
    setShowRecommendationPopover(showRecommendationPopover === campaignId ? null : campaignId);
  };

  const handleDismissRecommendation = (campaignId: string, isChild: boolean = false) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId && !isChild) {
        // Remove campaign recommendation tag completely
        return { ...campaign, recommendations: 0 };
      } else if (campaign.children) {
        // Check if dismiss is for a child
        const updatedChildren = campaign.children.map(child =>
          child.id === campaignId ? { ...child, recommendations: 0 } : child
        );
        return { ...campaign, children: updatedChildren };
      }
      return campaign;
    }));
    setShowRecommendationPopover(null);
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

  const handleOpenAllFilters = () => {
    setTempStatusFilter([...statusFilter]);
    setTempLivePacingFilter([...livePacingFilter]);
    setShowAllFiltersPopover(true);
  };

  const handleToggleStatusFilter = (status: string) => {
    setTempStatusFilter(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const handleClearAllFilters = () => {
    setTempStatusFilter([]);
    setTempLivePacingFilter([]);
  };

  const handleApplyFilters = () => {
    setStatusFilter([...tempStatusFilter]);
    setLivePacingFilter([...tempLivePacingFilter]);
    setShowAllFiltersPopover(false);
  };

  const handleOpenLiveFilter = () => {
    setTempLivePacingFilter([...livePacingFilter]);
    setShowLiveFilterPopover(true);
  };

  const handleToggleLivePacingFilter = (option: string) => {
    setTempLivePacingFilter(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleClearLivePacingFilter = () => {
    setTempLivePacingFilter([]);
  };

  const handleApplyLivePacingFilter = () => {
    setLivePacingFilter([...tempLivePacingFilter]);
    setShowLiveFilterPopover(false);
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
          <div className="relative">
            <button
              onClick={() => setMediaSolutionsOpen(!mediaSolutionsOpen)}
              className="flex items-center gap-1 text-xs hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <span className="text-[#2E2F32]">Display</span>
              {mediaSolutionsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {mediaSolutionsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMediaSolutionsOpen(false)}
                />
                <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg border border-[#BABBBE] shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-extrabold text-[#2E2F32] mb-2">Media solutions</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Sponsored Search');
                          setMediaSolutionsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-[#E3E4E5] hover:border-[#0053E2] transition-colors min-h-[100px]"
                      >
                        <div className="w-12 h-12 mb-2 relative">
                          <div className="w-8 h-8 rounded bg-[#4DBDF5] absolute left-1 top-0" />
                          <div className="w-8 h-8 rounded bg-[#001E60] absolute left-0 top-1 flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <span className="text-xs text-[#2E2F32] text-center">Sponsored Search</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Display Advertising');
                          setMediaSolutionsOpen(false);
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Display Advertising' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-[#E3E4E5]'} hover:border-[#0053E2] transition-colors min-h-[100px]`}
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7" y="7" width="34" height="34" rx="3" fill="#001E60"/>
                            <path d="M12 18.9997C12 18.4474 12.4477 17.9997 13 17.9997H16V24.9997H13C12.4477 24.9997 12 24.552 12 23.9997V18.9997Z" fill="white"/>
                            <path d="M14 17.9997C14 17.4474 14.4477 16.9997 15 16.9997H21V25.9997H15C14.4477 25.9997 14 25.552 14 24.9997V17.9997Z" fill="#29B8FF"/>
                            <path d="M36.5 21.5C36.5 23.433 34.933 25 33 25C31.067 25 29.5 23.433 29.5 21.5C29.5 19.567 31.067 18 33 18C34.933 18 36.5 19.567 36.5 21.5Z" fill="#29B8FF"/>
                            <path d="M23 16.9998L33.1715 13.4621C33.8213 13.236 34.5 13.7185 34.5 14.4066V28.5936C34.5 29.2816 33.8214 29.7641 33.1716 29.5382L22.9937 25.9998L23 16.9998Z" fill="white"/>
                            <path d="M16.0001 25.9997H20.997L22.7383 32.9649C22.8697 33.4905 22.4721 33.9997 21.9303 33.9997H18.6503C18.2681 33.9997 17.935 33.7396 17.8423 33.3689L16.0001 25.9997Z" fill="white"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#2E2F32] text-center">Display Advertising</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Shop Builder');
                          setMediaSolutionsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-[#E3E4E5] hover:border-[#0053E2] transition-colors min-h-[100px]"
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20H38V39C38 40.6569 36.6569 42 35 42H13C11.3431 42 10 40.6569 10 39V20Z" fill="#001E60"/>
                            <path d="M23.8058 26.1225C23.8804 25.9592 24.1196 25.9592 24.1942 26.1225L25.913 29.8845C25.9438 29.952 26.0096 29.9983 26.0854 30.0059L30.3091 30.4273C30.4925 30.4456 30.5664 30.6659 30.4291 30.7852L27.2677 33.5316C27.211 33.5809 27.1859 33.6558 27.2019 33.728L28.0934 37.7504C28.1321 37.9251 27.9386 38.0613 27.7792 37.9716L24.1066 35.907C24.0407 35.87 23.9593 35.87 23.8934 35.907L20.2208 37.9716C20.0613 38.0613 19.8679 37.9251 19.9066 37.7505L20.7981 33.728C20.8141 33.6558 20.789 33.5809 20.7323 33.5316L17.5709 30.7852C17.4336 30.6659 17.5076 30.4456 17.6909 30.4273L21.9146 30.0059C21.9904 29.9983 22.0562 29.952 22.087 29.8845L23.8058 26.1225Z" fill="white"/>
                            <path d="M10 23.5C11.933 23.5 13.5 21.933 13.5 20H6.5C6.5 21.933 8.067 23.5 10 23.5Z" fill="#0053E2"/>
                            <path d="M17 23.5C18.933 23.5 20.5 21.933 20.5 20H13.5C13.5 21.933 15.067 23.5 17 23.5Z" fill="#29B8FF"/>
                            <path d="M24 23.5C25.933 23.5 27.5 21.933 27.5 20H20.5C20.5 21.933 22.067 23.5 24 23.5Z" fill="#0053E2"/>
                            <path d="M31 23.5C32.933 23.5 34.5 21.933 34.5 20H27.5C27.5 21.933 29.067 23.5 31 23.5Z" fill="#29B8FF"/>
                            <path d="M38 23.5C39.933 23.5 41.5 21.933 41.5 20H34.5C34.5 21.933 36.067 23.5 38 23.5Z" fill="#0053E2"/>
                            <path d="M10.7068 6.40864C10.9661 5.57107 11.7406 5 12.6174 5H35.3825C36.2593 5 37.0339 5.57106 37.2931 6.40863L41.5 20H6.5L10.7068 6.40864Z" fill="white"/>
                            <path d="M10.5724 6.4253C10.8262 5.57934 11.6048 5 12.4881 5H16L13.5 20H6.5L10.5724 6.4253Z" fill="#29B8FF"/>
                            <path d="M21.5 5H26.5L27.5 20H20.5L21.5 5Z" fill="#29B8FF"/>
                            <path d="M32 5H35.5119C36.3952 5 37.1738 5.57934 37.4276 6.4253L41.5 20H34.5L32 5Z" fill="#29B8FF"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#2E2F32] text-center">Shop Builder</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Store Ads');
                          setMediaSolutionsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-[#E3E4E5] hover:border-[#0053E2] transition-colors min-h-[100px]"
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 15C7 13.3431 8.34315 12 10 12H13.4585C14.1331 12 14.788 11.7726 15.3174 11.3546L22.7607 5.47838C23.4873 4.90474 24.5127 4.90474 25.2393 5.47839L32.6826 11.3546C33.212 11.7726 33.8669 12 34.5415 12H38C39.6569 12 41 13.3431 41 15V38C41 39.6569 39.6569 41 38 41H10C8.34315 41 7 39.6569 7 38V15Z" fill="#001E60"/>
                            <circle cx="24" cy="26" r="9" fill="white"/>
                            <path d="M21 22.1465V30.3535C21 30.745 21.4296 30.9846 21.7627 30.7789L28.4065 26.6754C28.7228 26.48 28.7228 26.02 28.4065 25.8246L21.7627 21.7211C21.4296 21.5154 21 21.755 21 22.1465Z" fill="#29B8FF"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#2E2F32] text-center">Store Ads</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMediaSolution('Unified Reports');
                          setMediaSolutionsOpen(false);
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded border border-[#E3E4E5] hover:border-[#0053E2] transition-colors min-h-[100px] col-span-2"
                      >
                        <div className="w-12 h-12 mb-2">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7" y="7" width="34" height="34" rx="3" fill="#001E60"/>
                            <path d="M12 24.9267V34.5C12 35.0523 12.4477 35.5 13 35.5H35C35.5523 35.5 36 35.0523 36 34.5V16.5113C36 16.1902 35.8458 15.8886 35.5855 15.7006L32.1375 13.2104C31.7634 12.9403 31.253 12.9612 30.9022 13.261L22.8004 20.1874C22.5693 20.385 22.2609 20.4667 21.9624 20.4095L17.7246 19.5972C17.4064 19.5362 17.0784 19.6332 16.8445 19.8574L12.3081 24.2047C12.1113 24.3934 12 24.6541 12 24.9267Z" fill="white"/>
                            <path d="M12 26.5936V34.5C12 35.0523 12.4477 35.5 13 35.5H35C35.5523 35.5 36 35.0523 36 34.5V20.6499C36 20.2547 35.7673 19.8966 35.4061 19.7361L32.0473 18.2432C31.7103 18.0935 31.3183 18.1413 31.0272 18.3677L22.9528 24.6478C22.6723 24.866 22.2973 24.9189 21.9674 24.787L17.937 23.1748C17.6602 23.0641 17.3485 23.0826 17.0868 23.2254L12.5211 25.7157C12.1999 25.891 12 26.2277 12 26.5936Z" fill="#4DBDF5"/>
                            <path d="M12 31.6876V35C12 35.5523 12.4477 36 13 36H35C35.5523 36 36 35.5523 36 35V29.5785C36 29.2206 35.8087 28.89 35.4985 28.7116L31.2914 26.2926C30.9773 26.1119 30.59 26.1154 30.2791 26.3016L22.8522 30.75C22.5887 30.9078 22.2673 30.9358 21.9804 30.8258L17.5753 29.1372C17.3449 29.0489 17.0899 29.0489 16.8595 29.1372L12.6421 30.7539C12.2553 30.9021 12 31.2734 12 31.6876Z" fill="#0053E2"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#2E2F32] text-center">Unified Reports</span>
                      </button>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#2E2F32] mb-2">Tools and help</h3>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setMediaSolutionsOpen(false)}
                        className="flex items-center gap-2 p-2 rounded border border-[#E3E4E5] hover:border-[#0053E2] transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#C3E7EF] flex items-center justify-center flex-shrink-0">
                          <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="10" rx="1" fill="#E3E4E5"/>
                            <rect x="0" y="1" width="15" height="3" fill="#171819"/>
                            <rect x="1" y="6" width="4" height="3" rx="0.5" fill="#90B5F9"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#2E2F32]">Billing Manager</span>
                      </button>

                      <button
                        onClick={() => setMediaSolutionsOpen(false)}
                        className="flex items-center gap-2 p-2 rounded border border-[#E3E4E5] hover:border-[#0053E2] transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#C3E7EF] flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#C3E7EF"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.1229 4.928C16.3784 5.47725 16.3422 6.14398 15.9698 6.67587C15.5829 7.2284 14.9352 7.48978 14.3095 7.41013L6.73269 14.9869C6.8077 15.5146 6.64226 16.0699 6.23637 16.4758C5.55121 17.1609 4.44036 17.1609 3.7552 16.4758C3.07005 15.7906 3.07005 14.6798 3.7552 13.9946C4.16103 13.5888 4.71622 13.4233 5.24383 13.4983L12.7995 5.94265C12.7313 5.50965 12.8242 5.05068 13.0954 4.66325C13.4679 4.1313 14.0821 3.86922 14.6857 3.92151L13.814 5.1664L15.2512 6.17272L16.1229 4.928Z" fill="#909196"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#2E2F32]">Associate tools</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
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

      <div className="flex h-[calc(100vh-54px)]">
        {/* Sidebar */}
        <aside className="border-r border-[#E3E4E5] bg-white flex flex-col justify-between py-1.5 h-auto self-stretch overflow-hidden relative" style={{ width: sidebarExpanded ? `${sidebarWidth}px` : '64px', transition: isResizingSidebar ? 'none' : 'width 300ms ease-in-out' }}>
          <div className="flex flex-col gap-0">
            {/* Dashboard */}
            <button
              onClick={() => setActiveMenuItem('dashboard')}
              className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem === 'dashboard' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Dashboard"
            >
              <Home className={`w-4 h-4 ${activeMenuItem === 'dashboard' ? 'text-[#0053E2] fill-[#0053E2]' : 'text-[#2E2F32]'}`} />
              {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem === 'dashboard' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Dashboard</span>}
            </button>

            {/* Campaigns group */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => {
                  if (sidebarExpanded) {
                    setExpandedMenuGroups(prev =>
                      prev.includes('campaigns')
                        ? prev.filter(g => g !== 'campaigns')
                        : [...prev, 'campaigns']
                    );
                  }
                  setActiveMenuItem('campaigns');
                }}
                className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem.startsWith('campaigns-') || activeMenuItem === 'campaigns' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Campaigns"
              >
                <Megaphone className={`w-4 h-4 ${activeMenuItem.startsWith('campaigns-') || activeMenuItem === 'campaigns' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
                {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem.startsWith('campaigns-') || activeMenuItem === 'campaigns' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Campaigns</span>}
              </button>
              {sidebarExpanded && expandedMenuGroups.includes('campaigns') && (
                <>
                  <button
                    onClick={() => setActiveMenuItem('campaigns-active')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'campaigns-active' ? '3' : '2.5'} fill={activeMenuItem === 'campaigns-active' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'campaigns-active' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'campaigns-active' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Active</span>
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('campaigns-draft')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'campaigns-draft' ? '3' : '2.5'} fill={activeMenuItem === 'campaigns-draft' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'campaigns-draft' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'campaigns-draft' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Draft</span>
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('campaigns-archived')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'campaigns-archived' ? '3' : '2.5'} fill={activeMenuItem === 'campaigns-archived' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'campaigns-archived' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'campaigns-archived' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Archived</span>
                  </button>
                </>
              )}
            </div>

            {/* Performance */}
            <button
              onClick={() => setActiveMenuItem('performance')}
              className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem === 'performance' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Performance"
            >
              <BarChart3 className={`w-4 h-4 ${activeMenuItem === 'performance' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
              {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem === 'performance' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Performance</span>}
            </button>

            {/* Reports group */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => {
                  if (sidebarExpanded) {
                    setExpandedMenuGroups(prev =>
                      prev.includes('reports')
                        ? prev.filter(g => g !== 'reports')
                        : [...prev, 'reports']
                    );
                  }
                  setActiveMenuItem('reports');
                }}
                className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem.startsWith('reports-') || activeMenuItem === 'reports' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Reports"
              >
                <BarChart3 className={`w-4 h-4 ${activeMenuItem.startsWith('reports-') || activeMenuItem === 'reports' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
                {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem.startsWith('reports-') || activeMenuItem === 'reports' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Reports</span>}
              </button>
              {sidebarExpanded && expandedMenuGroups.includes('reports') && (
                <>
                  <button
                    onClick={() => setActiveMenuItem('reports-advertiser')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'reports-advertiser' ? '3' : '2.5'} fill={activeMenuItem === 'reports-advertiser' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'reports-advertiser' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'reports-advertiser' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Advertiser</span>
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('reports-item-health')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'reports-item-health' ? '3' : '2.5'} fill={activeMenuItem === 'reports-item-health' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'reports-item-health' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'reports-item-health' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Item health</span>
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('reports-on-demand')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'reports-on-demand' ? '3' : '2.5'} fill={activeMenuItem === 'reports-on-demand' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'reports-on-demand' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'reports-on-demand' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>On-demand</span>
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('reports-custom')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'reports-custom' ? '3' : '2.5'} fill={activeMenuItem === 'reports-custom' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'reports-custom' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'reports-custom' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Custom</span>
                  </button>
                </>
              )}
            </div>

            {/* Tools group */}
            <div className="flex flex-col gap-0">
              <button
                onClick={() => {
                  if (sidebarExpanded) {
                    setExpandedMenuGroups(prev =>
                      prev.includes('tools')
                        ? prev.filter(g => g !== 'tools')
                        : [...prev, 'tools']
                    );
                  }
                  setActiveMenuItem('tools');
                }}
                className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem.startsWith('tools-') || activeMenuItem === 'tools' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Tools"
              >
                <Briefcase className={`w-4 h-4 ${activeMenuItem.startsWith('tools-') || activeMenuItem === 'tools' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
                {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem.startsWith('tools-') || activeMenuItem === 'tools' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Tools</span>}
              </button>
              {sidebarExpanded && expandedMenuGroups.includes('tools') && (
                <>
                  <button
                    onClick={() => setActiveMenuItem('tools-keywords-planner')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'tools-keywords-planner' ? '3' : '2.5'} fill={activeMenuItem === 'tools-keywords-planner' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'tools-keywords-planner' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'tools-keywords-planner' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Keywords planner</span>
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('tools-rules')}
                    className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-7 flex items-center justify-center">
                      <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                        <circle cx="20" cy="14" r={activeMenuItem === 'tools-rules' ? '3' : '2.5'} fill={activeMenuItem === 'tools-rules' ? '#0053E2' : 'none'} stroke={activeMenuItem === 'tools-rules' ? 'none' : '#2E2F32'} />
                      </svg>
                    </div>
                    <span className={`text-sm flex-1 truncate ${activeMenuItem === 'tools-rules' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Rules</span>
                  </button>
                </>
              )}
            </div>

            {/* Video manager */}
            <button
              onClick={() => setActiveMenuItem('video-manager')}
              className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem === 'video-manager' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Video manager"
            >
              <Video className={`w-4 h-4 ${activeMenuItem === 'video-manager' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
              {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem === 'video-manager' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Video manager</span>}
            </button>

            {/* Bulk operations */}
            <button
              onClick={() => setActiveMenuItem('bulk-operations')}
              className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeMenuItem === 'bulk-operations' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Bulk operations"
            >
              <CloudUpload className={`w-4 h-4 ${activeMenuItem === 'bulk-operations' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
              {sidebarExpanded && <span className={`text-sm truncate ${activeMenuItem === 'bulk-operations' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Bulk operations</span>}
            </button>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => {
              if (sidebarExpanded) {
                setSidebarExpanded(false);
              } else {
                setSidebarExpanded(true);
                if (sidebarWidth < 220) {
                  setSidebarWidth(220);
                }
              }
            }}
            className={`flex items-center ${sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded hover:bg-gray-100 transition-colors`}
            aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={sidebarExpanded}
          >
            {sidebarExpanded ? (
              <ArrowLeft className="w-4 h-4 text-[#2E2F32]" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#2E2F32]" />
            )}
            {sidebarExpanded && <span className="text-sm truncate text-[#2E2F32]">Lock</span>}
          </button>

          {/* Resize handle */}
          {sidebarExpanded && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] transition-colors bg-transparent"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizingSidebar(true);
                setSidebarResizeStartX(e.clientX);
                setSidebarResizeStartWidth(sidebarWidth);
              }}
              style={{ zIndex: 10 }}
            />
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-auto self-stretch flex flex-col">
          {/* Page Header */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[#2E2F32]">Display campaigns</h1>
              <button className="h-8 px-4 bg-[#0053E2] text-white text-sm font-bold rounded-full hover:bg-[#0046c7] transition-colors">
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
                      ? "font-bold text-[#2E2F32] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#0053E2] after:rounded-t"
                      : "font-normal text-[#2E2F32] hover:bg-gray-50"
                  }`}
                >
                  Onsite auction
                </button>
                <button
                  onClick={() => setSelectedTab("archive")}
                  className={`ml-6 px-0 py-3 text-sm relative ${
                    selectedTab === "archive"
                      ? "font-bold text-[#2E2F32] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#0053E2] after:rounded-t"
                      : "font-normal text-[#2E2F32] hover:bg-gray-50"
                  }`}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>

          {/* Data Table Container */}
          <div className="mx-3 mb-6 rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col flex-1">
            {/* Table Controls */}
            <div className="flex items-center justify-end gap-2 p-4 border-b border-[#E3E4E5] bg-white">
              {/* Search Bar */}
              <div className="flex items-center gap-2 flex-1 min-w-[360px] max-w-[600px] px-3 h-8 border border-[rgba(46,47,50,1)] rounded-full bg-white relative">
                <Search className="w-4 h-4 text-[#2E2F32]" />
                <span className="text-sm text-[#515357]">Search by</span>
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-sm font-bold text-[#2E2F32] hover:bg-gray-100 px-1 rounded"
                    onClick={() => setShowSearchScopeDropdown(!showSearchScopeDropdown)}
                  >
                    {searchScope}
                    {showSearchScopeDropdown ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Search Scope Dropdown */}
                  {showSearchScopeDropdown && (
                    <div
                      ref={searchScopeDropdownRef}
                      className="absolute left-0 top-full mt-1 w-[160px] bg-white rounded border border-[#D5D6D8] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 py-1"
                    >
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-[#2E2F32] hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setSearchScope('Campaign name');
                          setShowSearchScopeDropdown(false);
                        }}
                      >
                        Campaign name
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-[#2E2F32] hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setSearchScope('ID');
                          setShowSearchScopeDropdown(false);
                        }}
                      >
                        ID
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="flex-1 text-sm border-none outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-[#2E2F32]" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 relative">
                {/* All Filters Button */}
                <button
                  className={`flex items-center justify-center h-8 w-8 px-1.5 border rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0053E2] focus:ring-opacity-50 ${
                    showAllFiltersPopover
                      ? 'border-2 border-[#0053E2] bg-[#E9F1FE]'
                      : 'border-[rgba(46,47,50,1)] bg-white hover:bg-gray-50'
                  }`}
                  onClick={handleOpenAllFilters}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2" y1="5" x2="5.5" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="7.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <line x1="9.5" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="11" x2="9.5" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="11.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <line x1="13.5" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Live Filter Button with Popover */}
                <div className="relative">
                  <button
                    className={`flex items-center gap-1 h-8 pl-3 pr-2 border rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0053E2] focus:ring-opacity-50 ${
                      livePacingFilter.length > 0 || showLiveFilterPopover
                        ? 'border-2 border-[#0053E2] bg-[#E9F1FE]'
                        : 'border-[rgba(46,47,50,1)] bg-white hover:bg-gray-50'
                    }`}
                    onClick={handleOpenLiveFilter}
                  >
                    <span className="text-sm text-[#2E2F32]">Pace</span>
                    <span className="text-sm text-[#2E2F32]">({showLiveFilterPopover ? tempLivePacingFilter.length : livePacingFilter.length})</span>
                    {showLiveFilterPopover ? (
                      <ChevronUp className="w-4 h-4 text-[#2E2F32]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
                    )}
                  </button>

                  {/* Live Filter Popover */}
                  {showLiveFilterPopover && (
                    <div
                      ref={liveFilterPopoverRef}
                      className="absolute left-0 top-full mt-2 w-[220px] bg-white rounded border border-[#D5D6D8] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50"
                    >
                      {/* Nubbin (Arrow) */}
                      <div className="absolute -top-[9px] left-4 w-4 h-4 bg-white border-t border-l border-[#D5D6D8] transform rotate-45"></div>

                      {/* Header */}
                      <div className="flex items-center justify-between p-3 pb-2">
                        <h3 className="text-lg font-bold text-[#2E2F32]">Pace Options</h3>
                        <button
                          onClick={() => setShowLiveFilterPopover(false)}
                          className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-6 h-6 text-[#2E2F32]" />
                        </button>
                      </div>

                      {/* Checkbox Options */}
                      <div className="px-3 pb-2 space-y-2">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                            checked={tempLivePacingFilter.includes('on-track')}
                            onChange={() => handleToggleLivePacingFilter('on-track')}
                          />
                          <span className="text-sm text-[#2A8703]">On track</span>
                        </label>
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                            checked={tempLivePacingFilter.includes('at-risk')}
                            onChange={() => handleToggleLivePacingFilter('at-risk')}
                          />
                          <span className="text-sm text-[#995213]">At risk</span>
                        </label>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[#E3E4E5]"></div>

                      {/* Footer Buttons */}
                      <div className="flex items-center justify-end gap-4 p-2 pr-3">
                        <button
                          className="text-sm text-[#2E2F32] underline hover:no-underline"
                          onClick={handleClearLivePacingFilter}
                        >
                          Clear All
                        </button>
                        <button
                          className="px-4 h-8 text-sm font-bold text-white bg-[#0053E2] rounded-full hover:bg-[#0046c7] transition-colors"
                          onClick={handleApplyLivePacingFilter}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Completed Toggle Button */}
                <button
                  className={`flex items-center gap-1 h-8 px-3 border rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0053E2] focus:ring-opacity-50 ${
                    completedFilterSelected
                      ? 'border-2 border-[#0053E2] bg-[#E9F1FE]'
                      : 'border-[rgba(46,47,50,1)] bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setCompletedFilterSelected(!completedFilterSelected)}
                >
                  <span className="text-sm text-[#2E2F32]">Completed</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4 text-[#2E2F32]" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 text-[#2E2F32]" />
                </button>
              </div>

              {/* All Filters Panel */}
              {showAllFiltersPopover && (
                <>
                  {/* Scrim/Backdrop */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-[fadeIn_0.3s_ease-out]"
                    onClick={() => setShowAllFiltersPopover(false)}
                    style={{
                      animation: 'fadeIn 0.3s ease-out'
                    }}
                  ></div>

                  {/* Side Panel */}
                  <div
                    ref={allFiltersPopoverRef}
                    className="fixed right-0 top-0 h-full w-[320px] bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col transition-transform duration-300 ease-out"
                    style={{
                      animation: 'slideInRight 0.3s ease-out'
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-2 p-4">
                      <div className="flex-1">
                        <h3 className="text-[20px] font-bold text-[#2E2F32] leading-7">All Filters</h3>
                      </div>
                      <button
                        onClick={() => setShowAllFiltersPopover(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors -mt-1 -mr-1"
                      >
                        <X className="w-6 h-6 text-[#2E2F32]" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#E3E4E5]"></div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto self-stretch p-4">
                      <div className="mb-3">
                        <div className="space-y-3">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                              checked={tempStatusFilter.includes('Live')}
                              onChange={() => handleToggleStatusFilter('Live')}
                            />
                            <span className="text-sm text-[#2E2F32]">Live</span>
                          </label>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                              checked={tempStatusFilter.includes('Scheduled')}
                              onChange={() => handleToggleStatusFilter('Scheduled')}
                            />
                            <span className="text-sm text-[#2E2F32]">Scheduled</span>
                          </label>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                              checked={tempStatusFilter.includes('Paused')}
                              onChange={() => handleToggleStatusFilter('Paused')}
                            />
                            <span className="text-sm text-[#2E2F32]">Paused</span>
                          </label>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                              checked={tempStatusFilter.includes('Completed')}
                              onChange={() => handleToggleStatusFilter('Completed')}
                            />
                            <span className="text-sm text-[#2E2F32]">Complete</span>
                          </label>
                        </div>
                      </div>

                      {/* Pace Filter Section */}
                      <div className="mb-3 mt-6">
                        <div className="text-sm font-bold text-[#2E2F32] mb-3">Pace</div>
                        <div className="space-y-3">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                              checked={tempLivePacingFilter.includes('on-track')}
                              onChange={() => handleToggleLivePacingFilter('on-track')}
                            />
                            <span className="text-sm text-[#2A8703]">On track</span>
                          </label>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-6 h-6 mt-0.5 rounded border-2 border-[#909196] accent-black"
                              checked={tempLivePacingFilter.includes('at-risk')}
                              onChange={() => handleToggleLivePacingFilter('at-risk')}
                            />
                            <span className="text-sm text-[#995213]">At risk</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#E3E4E5]"></div>

                    {/* Footer */}
                    <div className="p-4">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          className="text-sm text-[#2E2F32] underline hover:no-underline"
                          onClick={handleClearAllFilters}
                        >
                          Clear All
                        </button>
                        <button
                          className="px-4 h-8 text-sm font-bold text-white bg-[#0053E2] rounded-full hover:bg-[#0046c7] transition-colors"
                          onClick={handleApplyFilters}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white flex-1">
              <table className="w-full text-sm relative" style={{ minWidth: '1218px' }}>
                <thead className="bg-[#F8F8F8] sticky top-0 z-20">
                  <tr>
                    <th className="p-2 text-left relative group sticky left-0 bg-[#F8F8F8] z-30 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.checkbox }}>
                      <input
                        ref={selectAllCheckboxRef}
                        type="checkbox"
                        className="w-5 h-5 rounded border-[#909196] accent-black"
                        checked={isAllSelected()}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'checkbox', columnWidths.checkbox)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.campaign }}>
                      <div
                        className="flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        onClick={() => handleSort('campaign')}
                      >
                        Campaign/Ad group/Creative
                        {renderSortIcon('campaign')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'campaign', columnWidths.campaign)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.status }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('status')}>
                        Status
                        {renderSortIcon('status')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'status', columnWidths.status)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.recommendations }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('recommendations')}>
                        Recommendations
                        {renderSortIcon('recommendations')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'recommendations', columnWidths.recommendations)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.totalBudget }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('totalBudget')}>
                        Total budget
                        {renderSortIcon('totalBudget')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'totalBudget', columnWidths.totalBudget)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.targetingStrategy }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('targetingStrategy')}>
                        Targeting Strategy
                        {renderSortIcon('targetingStrategy')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'targetingStrategy', columnWidths.targetingStrategy)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.impressions }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('impressions')}>
                        Impressions
                        {renderSortIcon('impressions')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'impressions', columnWidths.impressions)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: columnWidths.pacing }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('pacing')}>
                        Pacing
                        {renderSortIcon('pacing')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'pacing', columnWidths.pacing)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-[#2E2F32] relative group sticky right-0 bg-[#F8F8F8] z-30 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.actions }}>
                      <div className="whitespace-nowrap">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedCampaigns().map((campaign, idx) => (
                    <>
                      <tr key={campaign.id} className={`border-b border-[#E3E4E5] hover:bg-[#F0F5FF] group ${
                        searchQuery.trim() && (campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || campaign.id.toLowerCase().includes(searchQuery.toLowerCase()))
                          ? 'bg-[#FFF9E6]'
                          : ''
                      }`}>
                        <td className={`p-2 sticky left-0 group-hover:bg-[#F0F5FF] z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] ${
                          searchQuery.trim() && (campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || campaign.id.toLowerCase().includes(searchQuery.toLowerCase()))
                            ? 'bg-[#FFF9E6]'
                            : 'bg-white'
                        }`} style={{ width: columnWidths.checkbox }}>
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-[#909196] accent-black"
                            checked={selectedRows.has(campaign.id)}
                            onChange={(e) => handleSelectRow(campaign.id, e.target.checked)}
                          />
                        </td>
                        <td className="p-2" style={{ width: columnWidths.campaign }}>
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
                        <td className="p-2" style={{ width: columnWidths.status }}>
                          {getStatusBadge(campaign.status)}
                        </td>
                        <td className="p-2 text-[#2E2F32] relative" style={{ width: columnWidths.recommendations }}>
                          {campaign.recommendations > 0 ? (
                            <>
                              <button
                                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FDE7F3] text-[#8C1E64] text-xs font-normal rounded cursor-pointer hover:bg-[#FCD4EC] focus:bg-[#FCD4EC] focus:outline-none focus:ring-2 focus:ring-[#8C1E64] focus:ring-opacity-50 active:bg-[#FCBFE0] transition-all"
                                onClick={(e) => handleRecommendationClick(e, campaign.id)}
                              >
                                {campaign.recommendations} recommendation{campaign.recommendations === 1 ? '' : 's'}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.5 2.25L8.25 6L4.5 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>

                              {/* Recommendation Popover */}
                              {showRecommendationPopover === campaign.id && (
                                <div
                                  ref={recPopoverRef}
                                  className={`absolute left-0 w-[432px] bg-white rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 ${
                                    popoverOpenAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                                  }`}
                                >
                                  {/* Nubbin (Arrow) */}
                                  {popoverOpenAbove ? (
                                    <svg className="absolute -bottom-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M8 8L0 0H16L8 8Z" fill="white"/>
                                    </svg>
                                  ) : (
                                    <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                                    </svg>
                                  )}

                                  <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-1">
                                      <h3 className="text-lg font-bold text-[#2E2F32]">
                                        Recommendations
                                      </h3>
                                      <div className="flex items-center gap-1 px-2 py-1 bg-[#E9F1FE] rounded">
                                        <Eye className="w-4 h-4 text-[#002E99]" />
                                        <span className="text-xs text-[#002E99]">Awareness</span>
                                      </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-[#E3E4E5] my-4"></div>

                                    {/* Recommendations with radio buttons */}
                                    <div className="space-y-0">
                                      {Array.from({ length: campaign.recommendations }).map((_, recIdx) => {
                                        const recommendations = [
                                          { text: "Add 15 keywords", percent: "14k-16k", impact: "Potential increase in reach" },
                                          { text: "Increase budget by $5,000", percent: "18-22%", impact: "Potential increase in conversions" },
                                          { text: "Optimize ad schedule", percent: "12-16%", impact: "Potential cost savings" },
                                          { text: "Add negative keywords", percent: "8-12%", impact: "Reduction in wasted spend" },
                                          { text: "Expand audience targeting", percent: "15-20%", impact: "Potential increase in impressions" },
                                        ];
                                        const rec = recommendations[recIdx % recommendations.length];
                                        const isSelected = selectedRecommendations[campaign.id] === recIdx;

                                        return (
                                          <div key={recIdx}>
                                            <div className="flex items-start gap-3 py-2.5">
                                              {/* Radio button - only show if multiple recommendations */}
                                              {campaign.recommendations > 1 && (
                                                <button
                                                  onClick={() => setSelectedRecommendations({...selectedRecommendations, [campaign.id]: recIdx})}
                                                  className="mt-0.5"
                                                >
                                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                    isSelected
                                                      ? 'border-[#2E2F32] bg-[#2E2F32]'
                                                      : 'border-[#2E2F32] bg-white'
                                                  }`}>
                                                    {isSelected && (
                                                      <div className="w-2 h-2 rounded-full bg-white"></div>
                                                    )}
                                                  </div>
                                                </button>
                                              )}

                                              {/* Content */}
                                              <div className="flex-1">
                                                <p className="text-sm text-[#2E2F32] mb-1">{rec.text}</p>
                                                <div className="flex items-end gap-1 mb-2">
                                                  <span className="text-base font-bold text-[#2A8703]">{rec.percent}</span>
                                                  <span className="text-base font-bold text-[#2E2F32]">{rec.impact}</span>
                                                </div>

                                                {/* Action links */}
                                                <div className="flex items-center justify-end gap-4">
                                                  <button
                                                    className="text-sm text-[#2E2F32] underline hover:no-underline"
                                                    onClick={() => handleDismissRecommendation(campaign.id)}
                                                  >
                                                    Dismiss
                                                  </button>
                                                  <button
                                                    className="text-sm text-[#2E2F32] underline hover:no-underline"
                                                    onClick={() => openPanel(campaign)}
                                                  >
                                                    View details
                                                  </button>
                                                </div>
                                              </div>
                                            </div>

                                            {recIdx < campaign.recommendations - 1 && (
                                              <div className="h-px bg-[#E3E4E5]"></div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-[#E3E4E5] my-4"></div>

                                    {/* Apply button */}
                                    <div className="flex justify-end">
                                      <button
                                        className="px-4 h-8 text-sm font-bold text-[#2E2F32] bg-white border border-[#2E2F32] rounded-full hover:bg-gray-50"
                                        onClick={() => openPanel(campaign)}
                                      >
                                        Apply selected
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
                        <td className="p-2 text-[#2E2F32]" style={{ width: columnWidths.totalBudget }}>
                          {campaign.totalBudget || "-"}
                        </td>
                        <td className="p-2 text-[#2E2F32]" style={{ width: columnWidths.targetingStrategy }}>
                          {campaign.targetingStrategy || "-"}
                        </td>
                        <td className="p-2 text-[#2E2F32]" style={{ width: columnWidths.impressions }}>
                          {campaign.impressions || "-"}
                        </td>
                        <td className="p-2" style={{ width: columnWidths.pacing }}>
                          {campaign.pacing ? (
                            <span className={campaign.pacing.color}>{campaign.pacing.value}</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className={`p-2 sticky right-0 group-hover:bg-[#F0F5FF] z-10 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)] ${
                          searchQuery.trim() && (campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || campaign.id.toLowerCase().includes(searchQuery.toLowerCase()))
                            ? 'bg-[#FFF9E6]'
                            : 'bg-white'
                        }`} style={{ width: columnWidths.actions }}>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      {campaign.expanded && campaign.children?.map((child, childIdx) => (
                        <tr key={child.id} className="border-b border-[#E3E4E5] bg-white hover:bg-[#F0F5FF] group">
                          <td className="p-2 sticky left-0 bg-white group-hover:bg-[#F0F5FF] z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.checkbox }}></td>
                          <td className="p-2 pl-12" style={{ width: columnWidths.campaign }}>
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
                          <td className="p-2" style={{ width: columnWidths.status }}>{getStatusBadge(child.status)}</td>
                          <td className="p-2 text-[#2E2F32] relative" style={{ width: columnWidths.recommendations }}>
                            {child.recommendations > 0 ? (
                              <>
                                <button
                                  className="inline-flex items-center px-2 py-1 bg-[#FDE7F3] text-[#8C1E64] text-xs font-normal rounded cursor-pointer hover:bg-[#FCD4EC] focus:bg-[#FCD4EC] focus:outline-none focus:ring-2 focus:ring-[#8C1E64] focus:ring-opacity-50 active:bg-[#FCBFE0] transition-all"
                                  onClick={(e) => handleRecommendationClick(e, child.id)}
                                >
                                  {child.recommendations} recommendation{child.recommendations === 1 ? '' : 's'}
                                </button>

                                {/* Recommendation Popover */}
                                {showRecommendationPopover === child.id && (
                                  <div
                                    ref={recPopoverRef}
                                    className={`absolute left-0 w-[432px] bg-white rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 ${
                                      popoverOpenAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                                    }`}
                                  >
                                    {/* Nubbin (Arrow) */}
                                    {popoverOpenAbove ? (
                                      <svg className="absolute -bottom-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 8L0 0H16L8 8Z" fill="white"/>
                                      </svg>
                                    ) : (
                                      <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                                      </svg>
                                    )}

                                    <div className="p-4">
                                      {/* Header */}
                                      <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-lg font-bold text-[#2E2F32]">
                                          Recommendations
                                        </h3>
                                        <div className="flex items-center gap-1 px-2 py-1 bg-[#E9F1FE] rounded">
                                          <Eye className="w-4 h-4 text-[#002E99]" />
                                          <span className="text-xs text-[#002E99]">Awareness</span>
                                        </div>
                                      </div>

                                      {/* Divider */}
                                      <div className="h-px bg-[#E3E4E5] my-4"></div>

                                      {/* Recommendations with radio buttons */}
                                      <div className="space-y-0">
                                        {Array.from({ length: child.recommendations }).map((_, recIdx) => {
                                          const recommendations = [
                                            { text: "Add 15 keywords", percent: "14k-16k", impact: "Potential increase in reach" },
                                            { text: "Update video thumbnails", percent: "8-14%", impact: "Potential increase in CTR" },
                                            { text: "Refresh ad copy", percent: "6-10%", impact: "Potential increase in relevance" },
                                            { text: "Test new CTA buttons", percent: "10-15%", impact: "Potential increase in clicks" },
                                            { text: "Add captions to videos", percent: "5-8%", impact: "Potential increase in watch time" },
                                          ];
                                          const rec = recommendations[recIdx % recommendations.length];
                                          const isSelected = selectedRecommendations[child.id] === recIdx;

                                          return (
                                            <div key={recIdx}>
                                              <div className="flex items-start gap-3 py-2.5">
                                                {/* Radio button - only show if multiple recommendations */}
                                                {child.recommendations > 1 && (
                                                  <button
                                                    onClick={() => setSelectedRecommendations({...selectedRecommendations, [child.id]: recIdx})}
                                                    className="mt-0.5"
                                                  >
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                      isSelected
                                                        ? 'border-[#2E2F32] bg-[#2E2F32]'
                                                        : 'border-[#2E2F32] bg-white'
                                                    }`}>
                                                      {isSelected && (
                                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                                      )}
                                                    </div>
                                                  </button>
                                                )}

                                                {/* Content */}
                                                <div className="flex-1">
                                                  <p className="text-sm text-[#2E2F32] mb-1">{rec.text}</p>
                                                  <div className="flex items-end gap-1 mb-2">
                                                    <span className="text-base font-bold text-[#2A8703]">{rec.percent}</span>
                                                    <span className="text-base font-bold text-[#2E2F32]">{rec.impact}</span>
                                                  </div>

                                                  {/* Action links */}
                                                  <div className="flex items-center justify-end gap-4">
                                                    <button
                                                      className="text-sm text-[#2E2F32] underline hover:no-underline"
                                                      onClick={() => handleDismissRecommendation(child.id, true)}
                                                    >
                                                      Dismiss
                                                    </button>
                                                    <button
                                                      className="text-sm text-[#2E2F32] underline hover:no-underline"
                                                      onClick={() => openPanel(campaign)}
                                                    >
                                                      View details
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>

                                              {recIdx < child.recommendations - 1 && (
                                                <div className="h-px bg-[#E3E4E5]"></div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {/* Divider */}
                                      <div className="h-px bg-[#E3E4E5] my-4"></div>

                                      {/* Apply button */}
                                      <div className="flex justify-end">
                                        <button
                                          className="px-4 h-8 text-sm font-bold text-[#2E2F32] bg-white border border-[#2E2F32] rounded-full hover:bg-gray-50"
                                          onClick={() => openPanel(campaign)}
                                        >
                                          Apply selected
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
                          <td className="p-2 text-[#2E2F32]" style={{ width: columnWidths.totalBudget }}>{child.totalBudget || "-"}</td>
                          <td className="p-2 text-[#2E2F32]" style={{ width: columnWidths.targetingStrategy }}>{child.targetingStrategy || "-"}</td>
                          <td className="p-2 text-[#2E2F32]" style={{ width: columnWidths.impressions }}>{child.impressions || "-"}</td>
                          <td className="p-2" style={{ width: columnWidths.pacing }}>
                            {child.pacing ? (
                              <span className={child.pacing.color}>{child.pacing.value}</span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2 sticky right-0 bg-white group-hover:bg-[#F0F5FF] z-10 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.actions }}>
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
                <span>Results per page: {resultsPerPage}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2E2F32]">
                <button
                  className={`p-1 rounded ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  title="First page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.64645 7.64645C3.4662 7.82669 3.45234 8.1103 3.60485 8.30645L3.64645 8.35355L8.14645 12.8536C8.34171 13.0488 8.65829 13.0488 8.85355 12.8536C9.0338 12.6733 9.04766 12.3897 8.89515 12.1936L8.85355 12.1464L4.7075 8L8.85355 3.85355C9.0338 3.67331 9.04766 3.3897 8.89515 3.19355L8.85355 3.14645C8.67331 2.9662 8.3897 2.95234 8.19355 3.10485L8.14645 3.14645L3.64645 7.64645Z" fill={currentPage === 1 ? '#BABBBE' : '#2E2F32'}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 7.64645C6.9662 7.82669 6.95234 8.1103 7.10485 8.30645L7.14645 8.35355L11.6464 12.8536C11.8417 13.0488 12.1583 13.0488 12.3536 12.8536C12.5338 12.6733 12.5477 12.3897 12.3951 12.1936L12.3536 12.1464L8.2075 8L12.3536 3.85355C12.5338 3.67331 12.5477 3.3897 12.3951 3.19355L12.3536 3.14645C12.1733 2.9662 11.8897 2.95234 11.6936 3.10485L11.6464 3.14645L7.14645 7.64645Z" fill={currentPage === 1 ? '#BABBBE' : '#2E2F32'}/>
                  </svg>
                </button>
                <button
                  className={`p-1 rounded ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  title="Previous page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.39645 7.64645C5.2162 7.82669 5.20234 8.1103 5.35485 8.30645L5.39645 8.35355L9.89645 12.8536C10.0917 13.0488 10.4083 13.0488 10.6036 12.8536C10.7838 12.6733 10.7977 12.3897 10.6451 12.1936L10.6036 12.1464L6.4575 8L10.6036 3.85355C10.7838 3.67331 10.7977 3.3897 10.6451 3.19355L10.6036 3.14645C10.4233 2.9662 10.1397 2.95234 9.94355 3.10485L9.89645 3.14645L5.39645 7.64645Z" fill={currentPage === 1 ? '#BABBBE' : '#2E2F32'}/>
                  </svg>
                </button>
                <span>Page</span>
                <div className="w-7 h-6 flex items-center justify-center border border-[#74767C] rounded text-center">
                  {currentPage}
                </div>
                <span>of {getTotalPages()}</span>
                <button
                  className={`p-1 rounded ${currentPage >= getTotalPages() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={handleNextPage}
                  disabled={currentPage >= getTotalPages()}
                  title="Next page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6036 7.64645C10.7838 7.82669 10.7977 8.1103 10.6451 8.30645L10.6036 8.35355L6.10355 12.8536C5.90829 13.0488 5.59171 13.0488 5.39645 12.8536C5.2162 12.6733 5.20234 12.3897 5.35485 12.1936L5.39645 12.1464L9.5425 8L5.39645 3.85355C5.2162 3.67331 5.20234 3.3897 5.35485 3.19355L5.39645 3.14645C5.57669 2.9662 5.8603 2.95234 6.05645 3.10485L6.10355 3.14645L10.6036 7.64645Z" fill={currentPage >= getTotalPages() ? '#BABBBE' : '#2E2F32'}/>
                  </svg>
                </button>
                <button
                  className={`p-1 rounded ${currentPage >= getTotalPages() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={() => setCurrentPage(getTotalPages())}
                  disabled={currentPage >= getTotalPages()}
                  title="Last page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.85355 7.64645C9.0338 7.82669 9.04766 8.1103 8.89515 8.30645L8.85355 8.35355L4.35355 12.8536C4.15829 13.0488 3.84171 13.0488 3.64645 12.8536C3.4662 12.6733 3.45234 12.3897 3.60485 12.1936L3.64645 12.1464L7.7925 8L3.64645 3.85355C3.4662 3.67331 3.45234 3.3897 3.60485 3.19355L3.64645 3.14645C3.82669 2.9662 4.1103 2.95234 4.30645 3.10485L4.35355 3.14645L8.85355 7.64645Z" fill={currentPage >= getTotalPages() ? '#BABBBE' : '#2E2F32'}/>
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
            {showDetailView ? (
              <>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-5">
                  <button
                    onClick={backToList}
                    className="text-sm text-[#515357] underline hover:no-underline"
                  >
                    Recommendations
                  </button>
                  <span className="text-sm text-[#515357]">/</span>
                  <span className="text-sm text-[#2E2F32]">Recommendation details</span>
                </div>

                {/* Recommendation Detail */}
                <div className="flex flex-col gap-5">
                  {/* Impact Statement */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end gap-1">
                      <span className="text-base font-bold text-[#2A8703]">15k-18k</span>
                      <span className="text-base font-bold text-[#2E2F32]">Potential increase in reach</span>
                    </div>
                    <p className="text-base text-[#2E2F32]">by adding 15 keywords</p>
                  </div>

                  <div className="h-px bg-[#E3E4E5]"></div>

                  {/* Campaign Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[#2E2F32]">Campaign</span>
                    <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1">
                      H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839
                    </a>
                  </div>

                  {/* Ad Group Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[#2E2F32]">Ad group</span>
                    <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1">
                      Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio
                    </a>
                  </div>

                  {/* Recommended Keywords */}
                  <div className="border border-[#E3E4E5] rounded-lg">
                    <div className="p-4 border-b border-[#E3E4E5]">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-[#2E2F32]">Recommended keywords</span>
                        <p className={`text-sm text-[#515357] ${keywordsExpanded ? '' : 'line-clamp-4'}`}>
                          Coca-Cola freestyle machine, Coke vending machine, Coca-Cola sponsorship deals, Coke tasting event, Coca-Cola heritage tour, Coke glassware, Coca-Cola recipe pairing, Coke float dessert, Coca-Cola ice cream soda, Coke recipe hacks, Coca-Cola themed café, Coke and popcorn combo, Coca-Cola holiday truck tour, Coke art installation, Coca-Cola fan club, Coke TikTok challenge, Coca-Cola merch giveaway
                        </p>
                        <button
                          onClick={() => setKeywordsExpanded(!keywordsExpanded)}
                          className="text-sm text-[#2E2F32] underline hover:no-underline self-start"
                        >
                          {keywordsExpanded ? 'View less' : 'View more'}
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                      <span className="text-sm font-bold text-[#2E2F32]">Current</span>
                      <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
                    </div>
                  </div>

                  {/* Why we recommend this */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[#2E2F32]">Why we recommend this</span>
                    <p className="text-sm text-[#2E2F32]">
                      Based on your campaign performance, we've identified that adding keywords could significantly increase your reach. Similar campaigns saw an average 12% increase in impressions while maintaining conversion quality. This recommendation uses machine learning to find users with similar characteristics to your best-performing audience segments.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                      <input type="checkbox" onClick={showDetails} className="mt-0.5 w-5 h-5 rounded border-[#909196] accent-black cursor-pointer" />
                      <div className="flex-1">
                        <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1 block mb-4">
                          Coca Cola Summer Campaign
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
                          <button onClick={showDetails} className="text-sm text-[#2E2F32] underline hover:no-underline">
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
                    {/* Ad group 01 - single recommendation */}
                    <div className="p-4 border border-[#E3E4E5] rounded-lg bg-white">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" onClick={showDetails} className="mt-0.5 w-5 h-5 rounded border-[#909196] accent-black cursor-pointer" />
                        <div className="flex-1">
                          <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1 block mb-4">
                            Ad group 01 name goes here
                          </a>

                          <div className="mb-4">
                            <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                            <div className="flex items-end gap-1">
                              <span className="text-sm font-bold text-[#2A8703]">14-16%</span>
                              <span className="text-sm font-bold text-[#2E2F32]">Potential increase in reach</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-4">
                            <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                              Dismiss
                            </button>
                            <button onClick={showDetails} className="text-sm text-[#2E2F32] underline hover:no-underline">
                              View details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ad group 02 - multiple recommendations with radio buttons */}
                    <div className="p-4 border border-[#E3E4E5] rounded-lg bg-white">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" onClick={showDetails} className="mt-0.5 w-5 h-5 rounded border-[#909196] accent-black cursor-pointer" />
                        <div className="flex-1">
                          <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline line-clamp-1 block mb-4">
                            Ad group 02 name goes here
                          </a>

                          <div className="space-y-4">
                            {/* First recommendation option */}
                            <div>
                              <div className="flex items-start gap-3 mb-4">
                                <input type="radio" name="rec-adgroup-02" className="mt-0.5 w-5 h-5" />
                                <div className="flex-1">
                                  <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                                  <div className="flex items-end gap-1">
                                    <span className="text-sm font-bold text-[#2A8703]">14-16%</span>
                                    <span className="text-sm font-bold text-[#2E2F32]">Potential increase in reach</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                                  Dismiss
                                </button>
                                <button onClick={showDetails} className="text-sm text-[#2E2F32] underline hover:no-underline">
                                  View details
                                </button>
                              </div>
                            </div>

                            {/* Second recommendation option */}
                            <div>
                              <div className="flex items-start gap-3 mb-4">
                                <input type="radio" name="rec-adgroup-02" className="mt-0.5 w-5 h-5" />
                                <div className="flex-1">
                                  <p className="text-sm text-[#2E2F32] mb-2">Add 15 keywords</p>
                                  <div className="flex items-end gap-1">
                                    <span className="text-sm font-bold text-[#2A8703]">14-16%</span>
                                    <span className="text-sm font-bold text-[#2E2F32]">Potential increase in reach</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <button className="text-sm text-[#2E2F32] underline hover:no-underline">
                                  Dismiss
                                </button>
                                <button onClick={showDetails} className="text-sm text-[#2E2F32] underline hover:no-underline">
                                  View details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="h-px bg-[#E3E4E5]"></div>

          {/* Footer Actions */}
          <div className="p-6 flex flex-col gap-4">
            {showApplyAlert && showDetailView && (
              <div className="flex items-start gap-2 p-2 px-3 border border-[#FFC220] bg-[#FFF9E6] rounded">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M8.86602 2.5C8.48112 1.83333 7.51887 1.83333 7.13397 2.5L1.33974 12.5C0.954843 13.1667 1.43597 14 2.20577 14H13.7942C14.564 14 15.0451 13.1667 14.6603 12.5L8.86602 2.5Z" fill="#662B0D"/>
                  <path d="M8 5.5V9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11.5" r="0.75" fill="white"/>
                </svg>
                <p className="text-sm text-[#662B0D] flex-1">
                  Applying this recommendation will reconfigure your ad group and disable any other recommendations that affect the same ad group.
                </p>
              </div>
            )}
            <div className="flex items-center justify-end gap-4">
              {showConfirmation && showDetailView ? (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#2A8703"/>
                    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-bold text-[#2A8703]">Recommendation applied</span>
                </div>
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="h-8 px-4 bg-[#0053E2] text-white text-sm font-bold rounded-full hover:bg-[#0046c7] transition-colors"
                >
                  {showDetailView ? 'Apply recommendation' : 'Apply selected'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
