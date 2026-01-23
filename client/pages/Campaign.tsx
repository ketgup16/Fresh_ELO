import { useState } from "react";
import { ChevronDown, ChevronUp, Bell, HelpCircle, User, Search, ExternalLink } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import SponsoredSearchSidebar from "../components/SponsoredSearchSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "../components/ui/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Alert } from "../components/ui/Alert";
import SponsoredProductsCard from "../components/icons/SponsoredProductsCard";
import SponsoredBrandsCard from "../components/icons/SponsoredBrandsCard";
import SponsoredVideosCard from "../components/icons/SponsoredVideosCard";

export default function Campaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useLocalStorage('marty:minimized', false);
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Sponsored Search');
  const [openAlertPopover, setOpenAlertPopover] = useState<number | null>(null);

  // Extract campaign data from navigation state
  const campaignName = location.state?.campaignName || 'New Campaign';
  const campaignId = location.state?.campaignId || null;
  const isEditMode = !!location.state?.campaignName;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="h-[54px] border-b border-[#E3E4E5] flex items-center justify-between px-6">
        <div className="flex items-center gap-5">
          {/* App Switcher */}
          <Button variant="ghost" size="icon" className="w-6 h-6 p-1 rounded-full hover:bg-gray-100">
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
          </Button>

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
            <Button
              variant="ghost"
              onClick={() => setMediaSolutionsOpen(!mediaSolutionsOpen)}
              className="flex items-center gap-1 h-auto text-xs hover:bg-gray-100 px-2 py-1 rounded"
            >
              <span className="text-[#2E2F32]">{selectedMediaSolution === 'Display Advertising' ? 'Display' : selectedMediaSolution === 'Sponsored Search' ? 'Sponsored Search' : selectedMediaSolution === 'Shop Builder' ? 'Shop Builder' : selectedMediaSolution === 'Store Ads' ? 'Store Ads' : 'Unified Reports'}</span>
              {mediaSolutionsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

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
                        className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Sponsored Search' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-[#E3E4E5]'} hover:border-[#0053E2] transition-colors min-h-[100px]`}
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
                          navigate('/');
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
            <Button variant="ghost" size="icon" className="relative p-1 h-auto w-auto rounded-full hover:bg-gray-100">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="p-1 h-auto w-auto rounded hover:bg-gray-100">
              <HelpCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="p-1 h-auto w-auto rounded hover:bg-gray-100">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        <div className="flex-1 overflow-y-auto bg-[#F8F8F8]">
          {/* Page Header */}
          <div className="bg-white border-b border-[#E3E4E5] px-6 py-6">
          <div className="flex items-center gap-1 text-sm mb-2">
            <span
              className="text-[#2E2F32] underline cursor-pointer hover:no-underline"
              onClick={() => navigate('/all-campaigns')}
            >
              Campaigns
            </span>
            <span className="text-[#2E2F32]">/</span>
            <span className="text-[#2E2F32]">
              {isEditMode ? campaignName : 'Create Campaign'}
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-[#2E2F32]">
              {isEditMode ? campaignName : 'Campaign creation'}
            </h1>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="px-6 h-10 rounded-full border border-[#2E2F32] bg-white text-[#2E2F32] font-bold hover:bg-gray-50">
                Delete
              </Button>
              <Button variant="outline" className="px-6 h-10 rounded-full border border-[#2E2F32] bg-white text-[#2E2F32] font-bold hover:bg-gray-50">
                Save
              </Button>
              <Button variant="primary" className="text-base">
                Launch campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert - Only shown when editing existing campaign */}
        {isEditMode && (
          <div className="bg-white px-6 pb-4">
            <Alert
              variant="error"
              action={
                <a
                  href="#added-items-section"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById('added-items-section');
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  View details
                </a>
              }
            >
              Item health issues detected.
            </Alert>
          </div>
        )}

        {/* Campaign Form Content */}
        <div className={`px-6 py-6 space-y-6 ${!isMartyMinimized ? 'pr-[457px]' : ''}`}>
          {/* General Information Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#2E2F32] mb-4">General information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#2E2F32] mb-1">Campaign name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#909196] rounded bg-white text-[#2E2F32]"
                  defaultValue="Free Reign"
                />
                <div className="text-xs text-[#74767C] mt-1">0/240</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2E2F32] mb-1">Advertiser</label>
                <div className="text-sm text-[#2E2F32] mt-2">Walmart</div>
              </div>
            </div>
          </div>

          {/* Targeting Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#2E2F32] mb-6">Targeting</h2>
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#514E4E] mb-4">Select campaign type:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Button variant="outline" className="flex flex-col items-stretch gap-3 p-4 h-auto border-2 border-[#0071DC] rounded bg-white hover:bg-gray-50 text-left">
                  <div className="text-xs font-bold text-[#515357] leading-4">Sponsored Products</div>
                  <div className="text-sm text-[#515357] leading-5">Get your items included in relevant results when customers search Walmart's site and app.</div>
                  <div className="w-full mt-auto">
                    <SponsoredProductsCard />
                  </div>
                </Button>
                <Button variant="outline" className="flex flex-col items-stretch gap-3 p-4 h-auto border border-[#E3E4E5] rounded bg-white hover:border-[#0071DC] hover:bg-gray-50 text-left">
                  <div className="text-xs font-bold text-[#515357] leading-4">Sponsored Brands</div>
                  <div className="text-sm text-[#515357] leading-5">This premium ad sends your brand and products to the top of relevant results when customers search our site & app.</div>
                  <div className="w-full mt-auto">
                    <SponsoredBrandsCard />
                  </div>
                </Button>
                <Button variant="outline" className="flex flex-col items-stretch gap-3 p-4 h-auto border border-[#E3E4E5] rounded bg-white hover:border-[#0071DC] hover:bg-gray-50 text-left">
                  <div className="text-xs font-bold text-[#515357] leading-4">Sponsored Videos</div>
                  <div className="text-sm text-[#515357] leading-5">Have your ads show up in the premium video ad slot.</div>
                  <div className="w-full mt-auto">
                    <SponsoredVideosCard />
                  </div>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#514E4E] mb-4">Select targeting tactic:</h3>
              <div className="space-y-6">
                <div>
                  <label className="flex items-start cursor-pointer group">
                    <input type="radio" name="targeting" className="sr-only" defaultChecked />
                    <div className="relative flex items-center mt-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#2E2F32] bg-white flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#2E2F32]"></div>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-bold text-sm text-[#2E2F32] leading-5">Smart performance</div>
                      <div className="text-xs text-[#515357] leading-4 mt-2">
                        Launch a Sponsored Products campaign quickly and easily. Let Walmart's algorithm select relevant keywords for you. Then set cost-per-click bids for individual items or groups of items. Ads can serve in all Sponsored Products placements.
                      </div>
                    </div>
                  </label>
                </div>
                <div>
                  <label className="flex items-start cursor-pointer group">
                    <input type="radio" name="targeting" className="sr-only" />
                    <div className="relative flex items-center mt-0.5">
                      <div className="w-5 h-5 rounded-full border border-[#2E2F32] bg-white flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-transparent"></div>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm text-[#2E2F32] leading-5">Manual</div>
                      <div className="text-xs text-[#515357] leading-4 mt-2">
                        Launch a Sponsored Products or Sponsored Brands campaign with more control. Choose your own keywords and set cost-per-click bids for each. Ads can appear on search pages and item pages.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling & Budget Card */}
          <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="px-6 py-6">
              <h2 className="text-[20px] font-semibold text-[#2E2F32] leading-7">Scheduling & budget</h2>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-6">
                {/* Fields Row */}
                <div className="flex flex-wrap gap-6">
                  {/* Start Date Field */}
                  <div className="flex flex-col w-full md:w-[296px]">
                    <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Start date</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select a date"
                        className="w-full h-10 px-3 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.50018 4.51758H16.5002V1.51758H18.0002V4.51758H21.0002C21.8286 4.51758 22.5002 5.18915 22.5002 6.01758V10.5176H1.50018V6.01758C1.50018 5.18915 2.17176 4.51758 3.00018 4.51758H6.00018V1.51758H7.50018V4.51758ZM21.0002 6.01758H3.00018V9.01758H21.0002V6.01758Z" fill="black"/>
                          <path d="M1.5 20.2676V12.7676H3V20.2676C3 20.6818 3.33579 21.0176 3.75 21.0176H20.25C20.6642 21.0176 21 20.6818 21 20.2676V12.7676H22.5V20.2676C22.5 21.5102 21.4926 22.5176 20.25 22.5176H3.75C2.50736 22.5176 1.5 21.5102 1.5 20.2676Z" fill="black"/>
                          <path d="M18.0002 13.5176H13.5002V18.0176H18.0002V13.5176Z" fill="black"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Daily Budget Field */}
                  <div className="flex flex-col w-full md:w-[296px]">
                    <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Daily budget</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.68235 3.82195C9.41732 3.70103 9.13832 3.61385 8.85188 3.56235L8.74606 3.54332V2H7.24606V3.57348L7.14407 3.59503C6.90114 3.64637 6.66402 3.72251 6.43646 3.82232C5.98458 4.01688 5.591 4.3272 5.29678 4.72149C5.01596 5.11384 4.86799 5.58706 4.87601 6.06943L4.87611 6.07556C4.86744 6.35448 4.91812 6.63206 5.0251 6.88982C5.13203 7.1475 5.29246 7.37953 5.49588 7.57026L5.49856 7.5725C5.99054 7.98376 6.5736 8.2716 7.19923 8.41209L7.20292 8.41292L8.1972 8.66718L8.19856 8.6675C8.47801 8.7324 8.75096 8.82255 9.0141 8.93672L9.01605 8.9375C9.22299 9.01955 9.40907 9.14663 9.56078 9.3095L9.56645 9.31559C9.69526 9.47316 9.76565 9.67051 9.76606 9.8741L9.76606 9.8759C9.76319 10.1147 9.68181 10.3459 9.53449 10.5338L9.53266 10.5362C9.3725 10.731 9.16395 10.8804 8.92794 10.9693L8.92423 10.9707C8.3417 11.17 7.70942 11.1698 7.12695 10.9703L7.12517 10.9697C6.87513 10.88 6.65342 10.7254 6.48269 10.5219L6.47941 10.518C6.31298 10.3029 6.21673 10.0417 6.20356 9.77H4.64356C4.64253 10.3027 4.79859 10.8239 5.09228 11.2682L5.09356 11.27C5.38753 11.6822 5.79291 12.002 6.26215 12.192L6.26352 12.1925C6.54459 12.2987 6.83684 12.3722 7.13443 12.4118L7.24606 12.4266V14H8.74606V12.4415L8.85537 12.4249C9.18606 12.3749 9.50947 12.2843 9.81829 12.1551C10.2734 11.966 10.666 11.6518 10.95 11.2491L10.9511 11.2475C11.2149 10.8485 11.3509 10.3787 11.3411 9.90049L11.341 9.8945C11.3499 9.55372 11.2778 9.21487 11.1309 8.9071C10.9918 8.62072 10.7956 8.36583 10.5543 8.15815C10.3068 7.95197 10.0282 7.7845 9.72981 7.66298L9.72857 7.6625C9.41184 7.54123 9.08484 7.4487 8.75154 7.38603L8.74046 7.38394L8.00002 7.17584L7.99606 7.175C7.81554 7.13655 7.63836 7.0841 7.46601 7.01833L7.46357 7.0175C7.2961 6.96097 7.13554 6.88577 6.9849 6.79333L6.98217 6.79165C6.84469 6.70248 6.72754 6.58506 6.63856 6.4475C6.54725 6.30671 6.49788 6.14194 6.49605 5.9745C6.49238 5.7662 6.55709 5.56248 6.68021 5.39454L6.68682 5.38553C6.8381 5.21279 7.03027 5.08062 7.24541 5.00025C7.51442 4.89665 7.80139 4.84574 8.08943 4.85019L8.09356 4.85C8.49967 4.83135 8.797 4.8834 9.13646 5.10653L9.20575 5.15142C9.34682 5.25094 9.46455 5.37999 9.5509 5.5295C9.6377 5.67976 9.69065 5.84716 9.70606 6.02L11.2061 6.02C11.2023 5.5524 11.0556 5.09689 10.7859 4.71484C10.5076 4.32224 10.1266 4.01372 9.68477 3.82302L9.68235 3.82195Z" fill="black"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter budget"
                        className="w-full h-10 pl-11 pr-3 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                      />
                    </div>
                  </div>

                  {/* Help Text */}
                  <div className="flex gap-4 w-full md:w-[296px] items-start">
                    <div className="w-px h-full bg-[#E3E4E5] flex-shrink-0"></div>
                    <p className="text-sm text-[#515357] leading-5 flex-1">
                      If your campaign spends all of the daily budget, ads will stop serving. If there is budget remaining, it will roll over.
                    </p>
                  </div>
                </div>

                {/* Additional Settings Accordion */}
                <div className="flex justify-between items-center pt-4 border-t border-[#E3E4E5]">
                  <span className="text-sm font-semibold text-[#2E2F32] leading-5">Additional settings (optional)</span>
                  <Button variant="ghost" size="icon" className="p-0 h-6 w-6 hover:opacity-70">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.71967 8.09467C4.99003 7.82431 5.41546 7.80351 5.70967 8.03228L5.78033 8.09467L12 14.3137L18.2197 8.09467C18.49 7.82431 18.9155 7.80351 19.2097 8.03228L19.2803 8.09467C19.5507 8.36503 19.5715 8.79046 19.3427 9.08467L19.2803 9.15533L12.5303 15.9053C12.26 16.1757 11.8345 16.1965 11.5403 15.9677L11.4697 15.9053L4.71967 9.15533C4.42678 8.86244 4.42678 8.38756 4.71967 8.09467Z" fill="black"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Big Multiplier Card */}
          <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-6">
              <h2 className="text-[20px] font-semibold text-[#2E2F32] leading-7">Big Multiplier</h2>
              <Button variant="ghost" size="icon" className="p-0 h-6 w-6 hover:opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5652 6.99897L21 16.2124L19.8695 17.25L12 8.65402L4.13049 17.25L3 16.2124L11.4348 6.99897C11.58 6.84033 11.7851 6.75 12 6.75C12.2149 6.75 12.42 6.84033 12.5652 6.99897Z" fill="black"/>
                </svg>
              </Button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-4">
                {/* Fields Section */}
                <div className="flex flex-col gap-5 flex-1">
                  {/* Placement Row */}
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="text-sm font-semibold text-[#2E2F32] leading-5 w-full md:w-16 flex-shrink-0">Placement</span>
                    <div className="flex flex-wrap gap-4 flex-1">
                      {/* Buy-Box Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Buy-Box</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                        </div>
                      </div>

                      {/* Search Ingrid Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Search Ingrid</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Placement Row */}
                  <div className="flex flex-wrap gap-4 pl-0 md:pl-20">
                    {/* Home page Field */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Home page</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select a date"
                          className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                      </div>
                    </div>

                    {/* Stock up Field */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Stock up</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Select a date"
                          className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                      </div>
                    </div>
                  </div>

                  {/* Platform Row */}
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="text-sm font-semibold text-[#2E2F32] leading-5 w-full md:w-16 flex-shrink-0">Platform</span>
                    <div className="flex flex-wrap gap-4 flex-1">
                      {/* Desktop Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Desktop</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                        </div>
                      </div>

                      {/* App Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">App</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                        </div>
                      </div>

                      {/* Mobile Field */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Mobile</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Select a date"
                            className="w-full h-10 px-3 pr-8 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2E2F32] pointer-events-none">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Text Section */}
                <div className="flex gap-4 w-[180px] items-start flex-shrink-0">
                  <div className="w-px h-48 bg-[#E3E4E5] flex-shrink-0"></div>
                  <p className="text-sm text-[#515357] leading-5 flex-1">
                    Bid multipliers increase your bid by a preset percentage when your ads are eligible to serve in premium placements
                    <br /><br />
                    They help you compete for Buy-Box, Search Ingrid, Home Page, Stock Up on desktop, app and mobile web
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Create and manage ad groups Section */}
          <div className="flex flex-col gap-6 pt-4">
            {/* Title */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold text-[#2E2F32] leading-8">Create and manage ad groups</h2>
              <p className="text-sm text-[#515357] leading-5">
                An Ad group is a group of ads sharing the same set of keywords and products. Consider grouping products that fall within the same category and price point roange. You can edit your campaign after launch to create additional ad groups in campaign manager.
              </p>
            </div>

            {/* Manage ad groups Card */}
            <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] h-[290px] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-6">
                <h3 className="text-base font-semibold text-[#2E2F32] leading-6">Manage ad groups</h3>
                <Button variant="ghost" size="icon" className="p-0 h-6 w-6 hover:opacity-70">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.9053 11.4697C16.1757 11.74 16.1965 12.1655 15.9677 12.4597L15.9053 12.5303L9.15533 19.2803C8.86244 19.5732 8.38756 19.5732 8.09467 19.2803C7.82431 19.01 7.80351 18.5845 8.03228 18.2903L8.09467 18.2197L14.3137 12L8.09467 5.78033C7.82431 5.50997 7.80351 5.08454 8.03228 4.79033L8.09467 4.71967C8.36503 4.44931 8.79046 4.42851 9.08467 4.65728L9.15533 4.71967L15.9053 11.4697Z" fill="black"/>
                  </svg>
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 flex flex-col justify-between">
                <p className="text-sm text-[#2E2F32] leading-5">
                  Please setup a new adgroup below to add to this campaign.
                </p>

                {/* Divider and Button */}
                <div className="flex flex-col">
                  <div className="h-px bg-[#E3E4E5] mb-6"></div>
                  <div className="flex justify-end pb-6">
                    <Button className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-[#BABBBE] cursor-not-allowed" disabled>
                      <div className="w-3.5 h-3.5 bg-[#E3E4E5] rounded-sm"></div>
                      <span className="text-sm font-bold text-white leading-5">Create new ad group</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad group details Card */}
            <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              {/* Header */}
              <div className="px-6 py-6">
                <h3 className="text-[20px] font-semibold text-[#2E2F32] leading-7">Ad group details</h3>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#2E2F32] leading-4 mb-1">Ad group name</label>
                  <input
                    type="text"
                    placeholder="Enter ad group name"
                    className="w-full h-10 px-3 rounded border border-[#909196] bg-white text-sm text-[#74767C] placeholder:text-[#74767C] leading-5"
                  />
                  <div className="text-xs text-[#74767C] text-right leading-4">10/253</div>
                </div>
              </div>
            </div>

            {/* Item list Card */}
            <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] h-[628px] flex flex-col">
              {/* Header */}
              <div className="px-6 py-6 border-b border-[#E3E4E5]">
                <h3 className="text-lg font-semibold text-[#2E2F32] leading-[25px]">Item list</h3>
              </div>

              {/* Tag */}
              <div className="px-6 pt-3">
                <div className="inline-flex px-2 py-1 bg-[#E9F1FE] rounded-sm">
                  <span className="text-xs text-[#002E99] leading-4">Adgroup name: SpookySoaps</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 pb-6 overflow-hidden">
                <div className="border border-[#E3E4E5] rounded h-full flex">
                  {/* Left Panel - Suggested Items */}
                  <div className="flex-1 flex flex-col border-r border-[#E3E4E5]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-3 bg-[#F8F8F8] border-b border-[#E3E4E5]">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-[#2E2F32] leading-4">Suggested Items (50)</span>
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </div>
                    </div>

                    {/* Column Headers */}
                    <div className="flex items-center px-3 py-3 border-b border-[#E3E4E5] bg-white">
                      <span className="text-xs font-semibold text-[#2E2F32] leading-4 ml-2">Item Name</span>
                      <span className="text-xs font-semibold text-[#2E2F32] leading-4 ml-auto mr-12">Item Id</span>
                      <span className="text-[10px] font-semibold text-[#2E2F32] leading-3 flex items-center gap-0.5">
                        Sugg.Bid
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </span>
                      <span className="text-xs font-semibold text-[#2E2F32] leading-4 ml-4">Add</span>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto">
                      {['Clorox blue', 'Clorox liquid', 'Clorox gel', 'Clorox spray', 'Clorox laundry', 'Clorox mist', 'Clorox wands', 'Clorox 360', 'Clorox pen', 'Clorox aloe'].map((item, idx) => {
                        const ids = ['15242283', '18775208', '34571821', '15234651', '18754261', '15246821', '12352075', '17252975', '16251829', '15242283'];
                        const prices = ['$2.56', '$3.91', '$3.91', '$2.56', '$3.91', '$3.91', '$2.56', '$3.91', '$3.91', '$3.91'];
                        return (
                          <div key={idx} className="flex items-center px-3 py-2 border-b border-[#E3E4E5] hover:bg-gray-50">
                            <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
                            <span className="text-xs text-[#2E2F32] ml-3 flex-1">{item}</span>
                            <span className="text-xs text-[#2E2F32] w-16 text-right">{ids[idx]}</span>
                            <span className="text-xs text-[#2E2F32] w-12 text-right">{prices[idx]}</span>
                            <button className="text-xs text-[#2E2F32] underline ml-4 hover:no-underline">Add</button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Panel - Added Items */}
                  <div id="added-items-section" className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#F8F8F8] border-b border-[#E3E4E5]">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-[#2E2F32] leading-4">Added Items (3/200)</span>
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </div>
                    </div>

                    {/* Column Headers */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E3E4E5] bg-white">
                      <div className="w-4"></div>
                      <span className="text-xs font-semibold text-[#2E2F32] leading-tight flex-1">Item Name</span>
                      <span className="text-xs font-semibold text-[#2E2F32] leading-4 w-16 text-right">Item Id</span>
                      <span className="text-[10px] font-semibold text-[#2E2F32] leading-3 flex items-center gap-0.5 w-16">
                        Sugg.Bid
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </span>
                      <span className="text-xs font-semibold text-[#2E2F32] leading-4 flex items-center gap-1 w-14">
                        Bid
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.55515 6.20147H7.6181V10.1875H6.55515V6.20147Z" fill="black"/>
                          <path d="M7.08594 5.58141C7.52622 5.58141 7.88315 5.22449 7.88315 4.7842C7.88315 4.34391 7.52622 3.98699 7.08594 3.98699C6.64565 3.98699 6.28872 4.34391 6.28872 4.7842C6.28872 5.22449 6.64565 5.58141 7.08594 5.58141Z" fill="black"/>
                          <path d="M7.08628 13.2878C10.5107 13.2878 13.2868 10.5117 13.2868 7.08726C13.2868 3.66279 10.5107 0.886719 7.08628 0.886719C3.66182 0.886719 0.885742 3.66279 0.885742 7.08726C0.885742 10.5117 3.66182 13.2878 7.08628 13.2878ZM7.08628 12.402C4.15103 12.402 1.77153 10.0225 1.77153 7.08726C1.77153 4.152 4.15103 1.77251 7.08628 1.77251C10.0215 1.77251 12.401 4.152 12.401 7.08726C12.401 10.0225 10.0215 12.402 7.08628 12.402Z" fill="black"/>
                        </svg>
                      </span>
                      <span className="text-xs font-semibold text-[#2E2F32] leading-4 w-12">Status</span>
                    </div>

                    {/* Added Items List */}
                    <div className="flex-1 overflow-y-auto">
                      {['Clorox wipes', 'Clorox tilex', 'Clorox tabs'].map((item, idx) => {
                        const ids = ['13246752', '18972432', '18265631'];
                        const showAlert = idx < 2; // Show alert for first two items

                        // Different alert messages for each item
                        const alertMessages = [
                          "The OLQ score of this item dropped over 10% because of low stock availability and poor content quality. This may negatively affect the ROAS of your campaign.",
                          "This item was recently disabled in SpookySoaps ad group and is no longer getting promoted. This may negatively affect your campaign performance."
                        ];

                        return (
                          <div key={idx} className="flex items-center gap-3 px-4 py-2 border-b border-[#E3E4E5]">
                            <input type="checkbox" className="w-4 h-4 rounded border border-black" />
                            <div className="flex items-start gap-2 flex-1">
                              <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
                              <div className="flex items-center gap-1">
                                <div className="text-xs text-[#2E2F32] leading-tight">{item}</div>
                                {showAlert && (
                                  <Popover open={openAlertPopover === idx} onOpenChange={(open) => setOpenAlertPopover(open ? idx : null)}>
                                    <PopoverTrigger asChild>
                                      <button className="flex-shrink-0 hover:opacity-80 transition-opacity">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 1.2002C3.79675 1.2002 1.2002 3.79675 1.2002 7C1.2002 10.2033 3.79675 12.7998 7 12.7998C10.2033 12.7998 12.7998 10.2033 12.7998 7C12.7998 3.79675 10.2033 1.2002 7 1.2002ZM7 9.89844C7.33224 9.89844 7.60156 10.1678 7.60156 10.5C7.60156 10.8322 7.33224 11.1016 7 11.1016C6.66776 11.1016 6.39844 10.8322 6.39844 10.5C6.39844 10.1678 6.66776 9.89844 7 9.89844ZM7 2.90039C7.2981 2.90039 7.54514 3.11744 7.5918 3.40234L7.59961 3.5V8.64062C7.59961 8.972 7.33137 9.24023 7 9.24023C6.70187 9.24023 6.45483 9.02322 6.4082 8.73828L6.40039 8.64062V3.5C6.40039 3.16863 6.66863 2.90039 7 2.90039Z" fill="#9B1419"/>
                                        </svg>
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-[421px] p-4 bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] border border-[#E3E4E5] rounded"
                                      align="start"
                                      side="bottom"
                                      sideOffset={8}
                                    >
                                      <div className="flex flex-col gap-3">
                                        <p className="text-sm text-[#2E2F32] leading-5">
                                          {alertMessages[idx]}
                                        </p>
                                        <div className="flex flex-col gap-2">
                                          <div className="h-px bg-[#E3E4E5]"></div>
                                          <div className="flex items-center justify-end gap-4">
                                            <a
                                              href="/reports/item-health"
                                              className="text-sm text-[#2E2F32] underline hover:no-underline cursor-pointer"
                                            >
                                              View item health page
                                            </a>
                                            <button className="flex items-center gap-2 h-8 px-3 rounded-full border border-[#2E2F32] bg-white text-sm font-bold text-[#2E2F32] hover:bg-gray-50 transition-colors">
                                              Take action
                                              <ExternalLink className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-[#2E2F32] w-16 text-right">{ids[idx]}</span>
                            <span className="text-xs text-[#2E2F32] w-16 text-right">$3.91</span>
                            <div className="w-14">
                              <div className="relative h-[18px] w-14">
                                <input
                                  type="text"
                                  defaultValue="3.91"
                                  className="w-full h-full pl-2 pr-1 text-xs border border-[#C7C8CB] rounded bg-white"
                                />
                                <span className="absolute left-1 top-0.5 text-xs text-[#515357]">$</span>
                              </div>
                            </div>
                            <div className="w-12">
                              <div className="w-10 h-4 bg-[#0053E2] rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-[14px] h-[12px] bg-white rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && (
        <MartyFloatingPanel
          isMinimized={isMartyMinimized}
          onMinimizedChange={setIsMartyMinimized}
        />
      )}
    </div>
  );
}
