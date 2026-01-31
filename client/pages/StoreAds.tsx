import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import StoreAdsSidebar from "../components/StoreAdsSidebar";
import { Button } from "../components/ui/Button";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

export default function StoreAds() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Store Ads');
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleCreateCampaign = () => {
    setIsMartyMinimized(false);
    // Marty panel will handle the campaign creation flow
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <StoreAdsSidebar
        activeMenuItem={activeMenuItem}
        onMenuItemClick={handleMenuItemClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[54px] border-b border-[#E3E4E5] flex items-center justify-between px-6 bg-white">
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
                <span className="text-[#2E2F32]">Store Ads</span>
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
                            navigate('/sponsored-search');
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
                          className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Shop Builder' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-[#E3E4E5]'} hover:border-[#0053E2] transition-colors min-h-[100px]`}
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
                          className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Store Ads' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-[#E3E4E5]'} hover:border-[#0053E2] transition-colors min-h-[100px]`}
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
                          className={`flex flex-col items-center justify-center p-3 rounded border ${selectedMediaSolution === 'Unified Reports' ? 'border-[#0053E2] bg-[#E9F1FE]' : 'border-[#E3E4E5]'} hover:border-[#0053E2] transition-colors min-h-[100px] col-span-2`}
                        >
                          <div className="w-12 h-12 mb-2">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="7" y="7" width="34" height="34" rx="3" fill="#001E60"/>
                              <path d="M12 24.9267V34.5C12 35.0523 12.4477 35.5 13 35.5H35C35.5523 35.5 36 35.0523 36 34.5V16.5113C36 16.1902 35.8458 15.8886 35.5855 15.7006L32.1375 13.2104C31.7634 12.9403 31.253 12.9612 30.9022 13.261L22.8004 20.1874C22.5693 20.385 22.2609 20.4667 21.9624 20.4095L17.7246 19.5972C17.4064 19.5362 17.0784 19.6332 16.8445 19.8574L12.3081 24.2047C12.1113 24.3934 12 24.6541 12 24.9267Z" fill="white"/>
                            </svg>
                          </div>
                          <span className="text-xs text-[#2E2F32] text-center">Unified Reports</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Bell className="w-5 h-5 text-[#74767C] cursor-pointer" />
            <HelpCircle className="w-5 h-5 text-[#74767C] cursor-pointer" />
            <User className="w-5 h-5 text-[#74767C] cursor-pointer" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#EDF4FA]">
          {/* Hero Section */}
          <div className="bg-[#EDF4FA] px-8 py-16">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-[#2E2F32] mb-4">
                Reach more customers with Store Ads
              </h1>
              <p className="text-xl text-[#2E2F32] mb-8">
                Show off your brand with digital ads across 4,700 stores.
              </p>
              <Button
                variant="primary"
                size="large"
                onClick={handleCreateCampaign}
              >
                Create campaign
              </Button>
            </div>
          </div>

          {/* Feature Cards Section */}
          <div className="bg-white px-8 py-12">
            <div className="max-w-6xl mx-auto">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Your products, seen by millions */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M21 8C21 5.79086 22.7909 4 25 4H39C41.2091 4 43 5.79086 43 8V33C43 35.2091 41.2091 37 39 37H25C22.7909 37 21 35.2091 21 33V8Z" fill="#0071DC"/>
                        <circle cx="32" cy="21" r="2" fill="white"/>
                        <circle cx="32" cy="28" r="2" fill="white"/>
                        <rect x="5" y="22" width="12" height="19" rx="2" fill="#FFC220"/>
                        <path d="M11 30C11 29.4477 11.4477 29 12 29C12.5523 29 13 29.4477 13 30V35C13 35.5523 12.5523 36 12 36C11.4477 36 11 35.5523 11 35V30Z" fill="#2E2F32"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        Your products, seen by millions
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Don't miss billions of online traffic. Multiply your growth with online advertising.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Start advertising
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 2: Brand experiences */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="12" y="16" width="24" height="24" rx="2" fill="#FFC220"/>
                        <path d="M24 8L30 14H18L24 8Z" fill="#0071DC"/>
                        <circle cx="18" cy="24" r="2" fill="#0071DC"/>
                        <rect x="22" y="22" width="8" height="4" rx="1" fill="#0071DC"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        Brand experiences, built your way
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Create immersive pages that tell your story, reach more customers.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Create your shop
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 3: Walmart Luminate */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="28" width="6" height="12" rx="1" fill="#7B61FF"/>
                        <rect x="17" y="20" width="6" height="20" rx="1" fill="#0071DC"/>
                        <rect x="26" y="12" width="6" height="28" rx="1" fill="#FFC220"/>
                        <rect x="35" y="16" width="6" height="24" rx="1" fill="#2ED47A"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[#2E2F32]">
                          Walmart Luminate
                        </h3>
                        <span className="bg-[#2ED47A] text-white text-xs font-bold px-2 py-0.5 rounded">
                          New
                        </span>
                      </div>
                      <p className="text-sm text-[#74767C] mb-3">
                        Gain deeper insights and opportunities that help optimizing your Store Ads campaigns.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Discover more
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 4: Helpful how-to's */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="10" y="8" width="28" height="32" rx="2" fill="#FFE5B4"/>
                        <rect x="14" y="14" width="20" height="2" rx="1" fill="#0071DC"/>
                        <rect x="14" y="20" width="16" height="2" rx="1" fill="#0071DC"/>
                        <rect x="14" y="26" width="18" height="2" rx="1" fill="#0071DC"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        Helpful how-to's
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Don't miss billions of online traffic. Multiply your growth with online advertising.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Get guidance
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 5: On-demand instruction */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="12" width="32" height="24" rx="2" fill="#FFE5B4"/>
                        <path d="M8 12C8 10.8954 8.89543 10 10 10H38C39.1046 10 40 10.8954 40 12V16H8V12Z" fill="#FFC220"/>
                        <rect x="12" y="20" width="24" height="12" rx="1" fill="white"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        On-demand instruction
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Access our Seller Academy on Youtube for video walkthroughs.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Subscribe
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 6: What makes an eye-catching video */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="14" width="32" height="20" rx="2" fill="#2E2F32"/>
                        <path d="M20 20L28 24L20 28V20Z" fill="#FFC220"/>
                        <rect x="10" y="36" width="4" height="4" rx="1" fill="#0071DC"/>
                        <rect x="16" y="36" width="4" height="4" rx="1" fill="#0071DC"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        What makes an eye-catching video
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-[#E3E4E5]">
                <p className="text-xs text-[#74767C] text-center">
                  © 2000–2023 Wal-Mart Stores, Inc. All Rights reserved. <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="hover:underline">Privacy</a> and <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="hover:underline">Terms</a>
                </p>
              </div>
            </div>
          </div>
        </main>
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
