import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Megaphone, ChartColumn, Briefcase, Video, CloudUpload } from 'lucide-react';
import Reports from './icons/Reports';

const ArrowRightLineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5 14.5C5 14.7761 4.77614 15 4.5 15C4.22386 15 4 14.7761 4 14.5V1.5C4 1.22386 4.22386 1 4.5 1C4.77614 1 5 1.22386 5 1.5V7.5H10.293L7.64645 4.85355L7.58859 4.78431C7.4536 4.58944 7.47288 4.32001 7.64645 4.14645C7.82001 3.97288 8.08944 3.9536 8.28431 4.08859L8.35355 4.14645L11.8824 7.67786L11.9333 7.75024L11.9624 7.8094L11.9834 7.87186L11.9948 7.92772L12 8L11.9937 8.07862L11.9834 8.12815L11.9622 8.19104L11.9228 8.26701L11.8654 8.34129L8.35355 11.8536L8.28431 11.9114C8.1138 12.0295 7.8862 12.0295 7.71569 11.9114L7.64645 11.8536L7.58859 11.7843C7.47047 11.6138 7.47047 11.3862 7.58859 11.2157L7.64645 11.1464L10.291 8.5H5V14.5Z" fill="#2E2F32"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11 1.5C11 1.22386 11.2239 1 11.5 1C11.7761 1 12 1.22386 12 1.5V14.5C12 14.7761 11.7761 15 11.5 15C11.2239 15 11 14.7761 11 14.5V8.5H5.707L8.35355 11.1464L8.41141 11.2157C8.5464 11.4106 8.52712 11.68 8.35355 11.8536C8.17999 12.0271 7.91056 12.0464 7.71569 11.9114L7.64645 11.8536L4.11765 8.32214L4.06671 8.24976L4.03764 8.1906L4.01661 8.12814L4.00518 8.07228L4 8L4.00626 7.92138L4.01661 7.87185L4.03777 7.80896L4.07724 7.73299L4.13465 7.65871L7.64645 4.14645L7.71569 4.08859C7.8862 3.97047 8.1138 3.97047 8.28431 4.08859L8.35355 4.14645L8.41141 4.21569C8.52953 4.3862 8.52953 4.6138 8.41141 4.78431L8.35355 4.85355L5.709 7.5H11V1.5Z" fill="#2E2F32"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DisplayAdvertisingSidebarProps {
  activeMenuItem: string;
  onMenuItemClick: (itemId: string) => void;
}

export default function DisplayAdvertisingSidebar({
  activeMenuItem,
  onMenuItemClick,
}: DisplayAdvertisingSidebarProps) {
  const navigate = useNavigate();

  // Sidebar state management
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);
  const [campaignsExpanded, setCampaignsExpanded] = useState(true);
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(false);

  // Sidebar is expanded if either locked or hovered
  const sidebarExpanded = sidebarLocked || sidebarHovered;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: Home },
    {
      id: 'campaigns',
      label: 'Campaigns',
      Icon: Megaphone,
      submenuItems: [
        { id: 'campaigns-active', label: 'Active' },
        { id: 'campaigns-draft', label: 'Draft' },
        { id: 'campaigns-archived', label: 'Archived' },
      ]
    },
    { id: 'performance', label: 'Performance', Icon: ChartColumn },
    { id: 'reports', label: 'Reports', Icon: ChartColumn },
    { id: 'tools', label: 'Tools', Icon: Briefcase },
    { id: 'video-manager', label: 'Video manager', Icon: Video },
    { id: 'bulk-operations', label: 'Bulk operations', Icon: CloudUpload },
  ];

  // Handle resize functionality
  useEffect(() => {
    if (!isResizingSidebar) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - sidebarResizeStartX;
      const newWidth = Math.max(64, Math.min(400, sidebarResizeStartWidth + delta));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, sidebarResizeStartX, sidebarResizeStartWidth]);

  const handleToggle = () => {
    if (sidebarLocked) {
      setSidebarLocked(false);
    } else {
      setSidebarLocked(true);
      if (sidebarWidth < 220) {
        setSidebarWidth(220);
      }
    }
  };

  const handleCampaignsToggle = () => {
    // If sidebar is collapsed, navigate to campaigns page
    if (!sidebarExpanded) {
      navigate('/display-advertising/campaigns');
      onMenuItemClick('campaigns');
      return;
    }
    // If sidebar is expanded, just toggle the submenu
    setCampaignsExpanded(!campaignsExpanded);
  };

  return (
    <aside
      className="border-r border-[#E3E4E5] bg-white flex flex-col justify-between p-1.5 h-auto self-stretch overflow-hidden relative"
      style={{
        width: sidebarExpanded ? `${sidebarWidth}px` : '64px',
        transition: isResizingSidebar ? 'none' : 'width 300ms ease-in-out'
      }}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* Menu items section */}
      <div className="flex flex-col gap-0">
        {menuItems.map((item) => {
          const isActive = activeMenuItem === item.id || (item.id === 'campaigns' && activeMenuItem.startsWith('campaigns'));
          const IconComponent = item.Icon;
          const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;
          const isSubmenuActive = hasSubmenu && item.submenuItems.some(sub => activeMenuItem === sub.id);
          const shouldShowAsActive = isActive || isSubmenuActive;
          const isCampaigns = item.id === 'campaigns';

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (isCampaigns) {
                    handleCampaignsToggle();
                    // If expanded, don't navigate, just toggle submenu
                    if (sidebarExpanded) return;
                  } else {
                    // For other items, update state and navigate if applicable
                    onMenuItemClick(item.id);

                    // Navigate to home/dashboard when clicking dashboard
                    if (item.id === 'dashboard') {
                      navigate('/');
                    }
                  }
                }}
                className={`flex items-center ${
                  sidebarExpanded ? 'gap-3 px-3 w-full justify-between' : 'justify-center w-10 mx-auto'
                } h-9 rounded ${
                  shouldShowAsActive && sidebarExpanded ? 'bg-[#E9F1FE]' : ''
                } ${!shouldShowAsActive ? 'hover:bg-gray-100' : ''} transition-colors`}
                aria-label={item.label}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  {IconComponent === Reports ? (
                    <Reports
                      className={shouldShowAsActive ? 'text-[#0053E2]' : 'text-[#2E2F32]'}
                      size={16}
                    />
                  ) : (
                    <IconComponent className={`w-4 h-4 ${shouldShowAsActive ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
                  )}
                  {sidebarExpanded && (
                    <span className={`text-sm truncate ${shouldShowAsActive ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>
                      {item.label}
                    </span>
                  )}
                </div>
                {sidebarExpanded && isCampaigns && (
                  <div className={`transform transition-transform ${campaignsExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                  </div>
                )}
              </button>

              {/* Submenu items for Campaigns */}
              {isCampaigns && campaignsExpanded && sidebarExpanded && (
                <div className="flex flex-col gap-0">
                  {item.submenuItems.map((subItem) => {
                    const isSubActive = activeMenuItem === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          navigate('/display-advertising/campaigns');
                          onMenuItemClick(subItem.id);
                        }}
                        className="flex items-center gap-2 pl-3 pr-3 w-full h-7 hover:bg-gray-100 transition-colors"
                        aria-label={subItem.label}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <circle cx="4" cy="4" r="2.5" fill="none" stroke="#2E2F32" />
                        </svg>
                        <span className="text-sm truncate text-[#2E2F32] flex-1 text-left">
                          {subItem.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Toggle button at bottom */}
      <div>
        <button
          onClick={handleToggle}
          className={`flex items-center ${
            sidebarExpanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'
          } h-9 rounded hover:bg-gray-100 transition-colors`}
          aria-label={sidebarLocked ? 'Collapse sidebar' : 'Lock sidebar open'}
          aria-expanded={sidebarLocked}
        >
          {sidebarExpanded ? (
            <>
              <ArrowLeftIcon />
              <span className="text-sm truncate text-[#2E2F32]">Lock</span>
            </>
          ) : (
            <ArrowRightLineIcon />
          )}
        </button>
      </div>

      {/* Resize handle (only when expanded) */}
      {sidebarExpanded && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] transition-colors bg-transparent z-10"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizingSidebar(true);
            setSidebarResizeStartX(e.clientX);
            setSidebarResizeStartWidth(sidebarWidth);
          }}
        />
      )}
    </aside>
  );
}
