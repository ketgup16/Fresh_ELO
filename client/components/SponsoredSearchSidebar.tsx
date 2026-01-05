import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.00049 14.012H6.00049V11.512C6.00049 10.4074 6.89592 9.512 8.00049 9.512C9.10506 9.512 10.0005 10.4074 10.0005 11.512V14.012H13.0005V8.012H14.0005V14.012C14.0005 14.5643 13.5528 15.012 13.0005 15.012H9.00049V12.012C9.00049 11.4597 8.55277 11.012 8.00049 11.012C7.4482 11.012 7.00049 11.4597 7.00049 12.012V15.012H3.00049C2.4482 15.012 2.00049 14.5643 2.00049 14.012V8.012H3.00049V14.012ZM7.37923 1.21645C7.77589 0.927885 8.32508 0.927885 8.72174 1.21645L15.2615 6.21445L14.6399 7.09895L8.05049 2.06395L1.46109 7.09895L0.839493 6.21445L7.37923 1.21645Z"
      fill={isActive ? '#0053E2' : '#2E2F32'}
    />
  </svg>
);

const MegaphoneIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 1.85177C13.5 1.25526 12.9016 0.844293 12.3449 1.05843L6.40716 3.34216H4C2.34315 3.34216 1 4.68531 1 6.34216C1 7.93946 2.24832 9.2452 3.82259 9.337L4.01633 10.0766L4.98761 13.7015C5.23776 14.6351 6.19736 15.1891 7.13092 14.9389C8.06448 14.6888 8.6185 13.7292 8.36836 12.7956L7.56202 9.78634L12.3449 11.6259C12.9016 11.84 13.5 11.4291 13.5 10.8326V8.46414C14.3739 8.15526 15 7.32183 15 6.34217C15 5.36251 14.3739 4.52908 13.5 4.2202V1.85177ZM6.3906 9.34216H4.85769L4.98334 9.82182L5.95354 13.4427C6.06075 13.8428 6.472 14.0802 6.8721 13.973C7.2722 13.8658 7.50964 13.4546 7.40244 13.0545L6.44009 9.46297L6.3906 9.34216ZM4.5 4.34216H6V8.34216H4.5V4.34216ZM13.5 7.34226C13.8036 7.11421 14 6.75112 14 6.34217C14 5.93322 13.8036 5.57013 13.5 5.34208V7.34226ZM7 4.18556L12.5 2.07018V10.6141L7 8.49876V4.18556ZM3.5 4.40517C2.63739 4.62719 2 5.41024 2 6.34216C2 7.27408 2.63739 8.05713 3.5 8.27915V4.40517Z"
      fill={isActive ? '#0053E2' : '#2E2F32'}
    />
  </svg>
);

const ToolboxIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.08813 3.5V5H2C1.44772 5 1 5.44772 1 6V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V6C15 5.44772 14.5523 5 14 5H10.9999V3.5C10.9999 2.67157 10.3283 2 9.4999 2H6.58813C5.75971 2 5.08813 2.67157 5.08813 3.5ZM6.58813 3C6.31199 3 6.08813 3.22386 6.08813 3.5V5H9.9999V3.5C9.9999 3.22386 9.77604 3 9.4999 3H6.58813ZM2 8.5V6H14V8.5H12V7.5C12 7.22386 11.7761 7 11.5 7H9.5C9.22386 7 9 7.22386 9 7.5V8.5H7V7.5C7 7.22386 6.77614 7 6.5 7H4.5C4.22386 7 4 7.22386 4 7.5V8.5H2ZM2 9.5V13H14V9.5H12V10.5C12 10.7761 11.7761 11 11.5 11H9.5C9.22386 11 9 10.7761 9 10.5V9.5H7V10.5C7 10.7761 6.77614 11 6.5 11H4.5C4.22386 11 4 10.7761 4 10.5V9.5H2ZM5 8V10H6V8H5ZM10 10V8H11V10H10Z"
      fill="#2E2F32"
    />
  </svg>
);

const DocumentIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 1C13.5116 1 13.9353 1.38629 13.9933 1.88343L14 2V14C14 14.5126 13.6129 14.9355 13.1164 14.9933L13 15H6.5C6.435 15 6.37 14.987 6.31 14.962C6.26933 14.946 6.23089 14.9238 6.19585 14.8971L6.146 14.854L2.146 10.854C2.084 10.791 2.048 10.711 2.025 10.627L2 10.5V2C2 1.48743 2.38715 1.06453 2.88362 1.00673L3 1H13ZM13 2H3V10H6.5C6.74533 10 6.94958 10.177 6.99194 10.4102L7 10.5V14H13V2ZM6 11H3.707L6 13.293V11ZM11.5 8C11.776 8 12 8.224 12 8.5C12 8.74533 11.823 8.94958 11.5898 8.99194L11.5 9H4.5C4.224 9 4 8.776 4 8.5C4 8.25467 4.17699 8.05042 4.41016 8.00806L4.5 8H11.5ZM11.5 6C11.776 6 12 6.224 12 6.5C12 6.74533 11.823 6.94958 11.5898 6.99194L11.5 7H4.5C4.224 7 4 6.776 4 6.5C4 6.25467 4.17699 6.05042 4.41016 6.00806L4.5 6H11.5ZM11.5 4C11.776 4 12 4.224 12 4.5C12 4.74533 11.823 4.94958 11.5898 4.99194L11.5 5H4.5C4.224 5 4 4.776 4 4.5C4 4.25467 4.17699 4.05042 4.41016 4.00806L4.5 4H11.5Z"
      fill="#2E2F32"
    />
  </svg>
);

const VideoIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 6.38376V6C8 4.34315 6.65685 3 5 3C3.34315 3 2 4.34315 2 6C2 6.76152 2.28243 7.45464 2.74974 7.98409L3 8.26763V8.30961L3.50073 8.59927C3.94097 8.85393 4.45191 9 5 9C6.39651 9 7.57246 8.04488 7.90555 6.75074L8 6.38376ZM3 10.5837V12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V11.1535V9.12329V8C11 7.44772 10.5523 7 10 7H9H8.87398C8.42994 8.72523 6.86384 10 5 10C4.6547 10 4.31962 9.95625 4 9.87398C3.64523 9.78267 3.30951 9.64391 3 9.46487V10.5837ZM12 12V11.875L14.3244 12.7467C14.6513 12.8692 15 12.6276 15 12.2785V7.77329C15 7.41046 14.6257 7.16844 14.2948 7.31733L12 8.35V8C12 6.89543 11.1046 6 10 6H9C9 3.79086 7.20914 2 5 2C2.79086 2 1 3.79086 1 6C1 7.01445 1.37764 7.94069 2 8.64582V9.46487V12C2 13.1046 2.89543 14 4 14H10C11.1046 14 12 13.1046 12 12ZM14 11.557L12 10.807V9.44659L14 8.54659V11.557ZM3.23222 5.76778C3.03695 5.96305 3.03695 6.27963 3.23222 6.47489C3.42748 6.67015 3.74406 6.67015 3.93932 6.47489L4.46448 5.94974V7.49998C4.46448 7.77613 4.68834 7.99998 4.96448 7.99998C5.24062 7.99998 5.46448 7.77613 5.46448 7.49998V5.87873L6.06064 6.47489C6.2559 6.67015 6.57249 6.67015 6.76775 6.47489C6.96301 6.27963 6.96301 5.96305 6.76775 5.76778L5.35354 4.35357C5.15827 4.15831 4.84169 4.15831 4.64643 4.35357L3.23222 5.76778Z"
      fill="#2E2F32"
    />
  </svg>
);

const ServicesIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="5" height="5" rx="1" fill="#2E2F32" />
    <rect x="9" y="2" width="5" height="5" rx="1" fill="#2E2F32" />
    <rect x="2" y="9" width="5" height="5" rx="1" fill="#2E2F32" />
    <rect x="9" y="9" width="5" height="5" rx="1" fill="#2E2F32" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 14.5C5 14.7761 4.77614 15 4.5 15C4.22386 15 4 14.7761 4 14.5V1.5C4 1.22386 4.22386 1 4.5 1C4.77614 1 5 1.22386 5 1.5V7.5H10.293L7.64645 4.85355L7.58859 4.78431C7.4536 4.58944 7.47288 4.32001 7.64645 4.14645C7.82001 3.97288 8.08944 3.9536 8.28431 4.08859L8.35355 4.14645L11.8824 7.67786L11.9333 7.75024L11.9624 7.8094L11.9834 7.87186L11.9948 7.92772L12 8L11.9937 8.07862L11.9834 8.12815L11.9622 8.19104L11.9228 8.26701L11.8654 8.34129L8.35355 11.8536L8.28431 11.9114C8.1138 12.0295 7.8862 12.0295 7.71569 11.9114L7.64645 11.8536L7.58859 11.7843C7.47047 11.6138 7.47047 11.3862 7.58859 11.2157L7.64645 11.1464L10.291 8.5H5V14.5Z"
      fill="#2E2F32"
    />
  </svg>
);

export default function SponsoredSearchSidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', Icon: HomeIcon, path: '/' },
    { id: 'campaign-management', label: 'Campaign Management', Icon: MegaphoneIcon, path: '/all-campaigns' },
    { id: 'tools', label: 'Tools', Icon: ToolboxIcon },
    { id: 'reports', label: 'Reports', Icon: DocumentIcon },
    { id: 'video-manager', label: 'Video manager', Icon: VideoIcon },
    { id: 'services', label: 'Services', Icon: ServicesIcon },
  ];

  return (
    <aside
      className="border-r border-[#E3E4E5] bg-white flex flex-col justify-between h-full"
      style={{ width: '64px' }}
    >
      <div className="flex flex-col items-start gap-1 p-3">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          const IconComponent = item.Icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                if (item.path) {
                  navigate(item.path);
                }
              }}
              className={`flex h-9 px-3 justify-center items-center rounded ${
                isActive ? 'bg-white' : 'bg-white hover:bg-gray-50'
              } transition-colors`}
              aria-label={item.label}
            >
              <IconComponent isActive={isActive} />
            </button>
          );
        })}
      </div>

      <div className="p-3">
        <button
          className="flex p-[10px] items-center rounded bg-white hover:bg-gray-50 transition-colors"
          aria-label="Expand menu"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </aside>
  );
}
