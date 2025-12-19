import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Megaphone, Gauge, BarChart3, Briefcase, Video, CloudUpload, ArrowRight } from 'lucide-react';

export default function SponsoredSearchSidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/', isHomeFill: true },
    { id: 'campaign-management', label: 'Campaign management', icon: Megaphone, path: '#' },
    { id: 'experiments', label: 'Experiments', icon: Gauge, path: '#' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '#' },
    { id: 'tools', label: 'Tools', icon: Briefcase, path: '#' },
    { id: 'video-manager', label: 'Video manager', icon: Video, path: '#' },
    { id: 'bulk-operations', label: 'Bulk operations', icon: CloudUpload, path: '#' }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    if (item.path !== '#') {
      navigate(item.path);
    }
  };

  return (
    <aside
      className="border-r border-[#E3E4E5] bg-white flex flex-col justify-between py-2 h-full overflow-hidden"
      style={{ width: isCollapsed ? '64px' : '260px', transition: 'width 300ms ease-in-out' }}
    >
      {/* Menu Items */}
      <div className="flex flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex items-center h-9 rounded ${
                isCollapsed ? 'justify-center' : 'gap-3 px-3'
              } ${
                isActive ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-[#0053E2]' : 'text-[#2E2F32]'
                }`}
                fill={isActive && item.isHomeFill ? '#0053E2' : 'none'}
              />
              {!isCollapsed && (
                <span className={`flex-1 text-left text-sm ${
                  isActive ? 'text-[#0053E2] font-normal' : 'text-[#2E2F32]'
                }`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Lock Button */}
      <div className="px-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center h-9 rounded hover:bg-gray-100 transition-colors ${
            isCollapsed ? 'justify-center w-full' : 'gap-3 px-3 w-full'
          }`}
        >
          <ArrowRight
            className={`w-4 h-4 text-[#2E2F32] transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
          {!isCollapsed && (
            <span className="flex-1 text-left text-sm text-[#2E2F32]">
              Lock
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
