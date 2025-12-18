import { Home, Megaphone, BarChart3, User, ArrowRight, ArrowLeft } from "lucide-react";

interface SidebarProps {
  expanded: boolean;
  activeItem: string;
  onToggle: () => void;
  onItemClick: (itemId: string) => void;
  expandedGroups: string[];
  onGroupToggle: (groupId: string) => void;
}

export default function Sidebar({ 
  expanded, 
  activeItem, 
  onToggle, 
  onItemClick,
  expandedGroups,
  onGroupToggle 
}: SidebarProps) {
  return (
    <aside className={`${expanded ? 'w-[260px]' : 'w-16'} border-r border-[#E3E4E5] bg-white flex flex-col justify-between py-1.5 h-auto self-stretch transition-[width] duration-300 overflow-hidden`}>
      <div className="flex flex-col gap-0">
        {/* Dashboard */}
        <button 
          onClick={() => onItemClick('dashboard')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'dashboard' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Dashboard"
        >
          <Home className={`w-4 h-4 ${activeItem === 'dashboard' ? 'text-[#0053E2] fill-[#0053E2]' : 'text-[#2E2F32]'}`} />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'dashboard' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Dashboard</span>
        </button>

        {/* Campaigns */}
        <button 
          onClick={() => onItemClick('campaigns')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'campaigns' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Campaigns"
        >
          <Megaphone className={`w-4 h-4 ${activeItem === 'campaigns' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'campaigns' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Campaigns</span>
        </button>

        {/* Performance */}
        <button 
          onClick={() => onItemClick('performance')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'performance' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Performance"
        >
          <BarChart3 className={`w-4 h-4 ${activeItem === 'performance' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'performance' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Performance</span>
        </button>

        {/* Inventory group */}
        <div className="flex flex-col gap-0">
          <button 
            onClick={() => {
              if (expanded) {
                onGroupToggle('inventory');
              }
              onItemClick('inventory');
            }}
            className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem.startsWith('inventory-') || activeItem === 'inventory' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
            aria-label="Inventory"
          >
            <svg className={`w-4 h-4 ${activeItem.startsWith('inventory-') || activeItem === 'inventory' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.08421 8C8.1533 8 8.20977 8.05127 8.22667 8.11633L8.23185 8.15673V8.44407C8.44764 8.47435 8.65081 8.53855 8.83084 8.64915L8.936 8.72118C8.99752 8.74579 9.00777 8.82639 9.00948 8.87887L9.00982 8.9063C9.00982 8.94492 9.00982 9.02783 8.936 9.10165C8.89852 9.13799 8.8247 9.18569 8.76905 9.18569C8.685 9.18569 8.64866 9.14708 8.62935 9.12095C8.54758 9.04645 8.44255 8.99593 8.32356 8.96475L8.23185 8.94492V9.76831L8.3836 9.81762C8.76439 9.95128 9.13929 10.1731 9.13929 10.7132C9.15746 10.9267 9.08364 11.1391 8.92691 11.297C8.82697 11.4111 8.64088 11.5341 8.34711 11.5856L8.23185 11.6014V11.8421C8.23185 11.9122 8.1869 11.9751 8.12393 11.9941L8.08421 12H7.93543C7.86634 12 7.80908 11.9487 7.79191 11.883L7.78665 11.8421V11.5832C7.47319 11.5378 7.17677 11.4355 6.95417 11.2402L6.91232 11.1894C6.89016 11.1593 6.87013 11.1205 6.87013 11.0653C6.87013 10.9845 6.92303 10.9295 6.95199 10.8995L6.95417 10.8972C6.99051 10.8609 7.06433 10.8245 7.12112 10.8245C7.18654 10.8245 7.23596 10.8536 7.25777 10.8705L7.26876 10.8802C7.36151 10.9568 7.49922 11.0461 7.67596 11.1007L7.78665 11.1289V10.167L7.63064 10.1191C7.24424 9.99255 6.89852 9.80292 6.89852 9.29585C6.89852 8.86251 7.22393 8.54195 7.69133 8.45024L7.78665 8.43498V8.15673C7.78665 8.08764 7.83239 8.02486 7.89562 8.00585L7.93543 8H8.08421ZM8.23299 10.2964V11.1278C8.26933 11.1225 8.30315 11.1131 8.33512 11.1018L8.38177 11.0835C8.38625 11.0809 8.39145 11.0798 8.39656 11.0787C8.40052 11.0779 8.40442 11.077 8.40789 11.0755C8.56121 10.9994 8.64752 10.8768 8.64866 10.711C8.64752 10.6065 8.61118 10.5281 8.54531 10.4634C8.4942 10.4145 8.42492 10.3737 8.33974 10.3384L8.23299 10.2964ZM7.78665 8.92561C7.5561 8.97217 7.39823 9.11073 7.39823 9.29585C7.39823 9.45233 7.51579 9.5424 7.71022 9.61951L7.78665 9.64793V8.92561Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 3H6V2.5L5.99194 2.41012C5.94961 2.17688 5.74546 2 5.5 2C5.22386 2 5 2.22386 5 2.5V3H1.75C1.33579 3 1 3.33579 1 3.75V13.25C1 13.6642 1.33579 14 1.75 14H14.25C14.6642 14 15 13.6642 15 13.25V3.75C15 3.33579 14.6642 3 14.25 3H11V2.5L10.9919 2.41012C10.9496 2.17688 10.7455 2 10.5 2C10.2239 2 10 2.22386 10 2.5V3ZM6 4.5C6 4.77614 5.77614 5 5.5 5C5.25454 5 5.05039 4.82312 5.00806 4.58988L5 4.5V4H2V6H14V4H11V4.5C11 4.77614 10.7761 5 10.5 5C10.2545 5 10.0504 4.82312 10.0081 4.58988L10 4.5V4H6V4.5ZM2 7H14V13H2V7Z" fill="currentColor"/>
            </svg>
            <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem.startsWith('inventory-') || activeItem === 'inventory' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Inventory</span>
          </button>
          {expanded && expandedGroups.includes('inventory') && (
            <>
              <button 
                onClick={() => onItemClick('inventory-ad-inventory')}
                className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-7 flex items-center justify-center">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                    <circle cx="20" cy="14" r={activeItem === 'inventory-ad-inventory' ? '3' : '2.5'} fill={activeItem === 'inventory-ad-inventory' ? '#0053E2' : 'none'} stroke={activeItem === 'inventory-ad-inventory' ? 'none' : '#2E2F32'} />
                  </svg>
                </div>
                <span className={`text-sm flex-1 whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'inventory-ad-inventory' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Ad inventory</span>
              </button>
              <button 
                onClick={() => onItemClick('inventory-policy')}
                className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-7 flex items-center justify-center">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                    <circle cx="20" cy="14" r={activeItem === 'inventory-policy' ? '3' : '2.5'} fill={activeItem === 'inventory-policy' ? '#0053E2' : 'none'} stroke={activeItem === 'inventory-policy' ? 'none' : '#2E2F32'} />
                  </svg>
                </div>
                <span className={`text-sm flex-1 whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'inventory-policy' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Inventory policy</span>
              </button>
            </>
          )}
        </div>

        {/* Asset library */}
        <button 
          onClick={() => onItemClick('asset-library')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'asset-library' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Asset library"
        >
          <User className={`w-4 h-4 ${activeItem === 'asset-library' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'asset-library' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Asset library</span>
        </button>

        {/* Creative builder */}
        <button 
          onClick={() => onItemClick('creative-builder')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'creative-builder' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Creative builder"
        >
          <svg className={`w-4 h-4 ${activeItem === 'creative-builder' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.68336 9.88169C2.45596 10.1514 2.24107 10.4615 2.03825 10.8125C2.01318 10.8567 2 10.9067 2 10.9576V13C2 13.5523 2.44772 14 3 14H13.0359C13.5679 14 13.9992 13.5688 13.9994 13.0368L14 11.0023C14 11.0018 13.9994 11.0016 13.9991 11.0019C13.931 11.0576 13.8599 11.1103 13.7858 11.1599C13.5526 11.3161 13.2902 11.4415 12.9999 11.5359C12.5621 11.6783 12.0606 11.75 11.4993 11.75C10.3838 11.75 9.68127 11.3642 8.48358 10.288L7.86692 9.72369C7.86025 9.71768 7.85361 9.71171 7.84698 9.70576C6.83374 8.79585 6.29265 8.5 5.49973 8.5C4.74372 8.5 4.06602 8.71358 3.46119 9.15009C3.21221 9.32978 2.97558 9.54725 2.75092 9.80314C2.72828 9.82893 2.70576 9.85511 2.68336 9.88169ZM9.15206 9.54427C10.1653 10.4542 10.7064 10.75 11.4993 10.75C12.2474 10.75 12.8199 10.6099 13.2365 10.3241C13.5967 10.077 13.8403 9.72102 13.9801 9.25249C13.9927 9.2057 13.9991 9.15746 13.9991 9.10901V3C13.9991 2.44771 13.5514 2 12.9991 2H3.00007C2.44776 2 2.00003 2.44776 2.00007 3.00007L2.00042 8.34275C2.00043 8.62115 2.35748 8.76149 2.56931 8.58084C2.7091 8.46163 2.85279 8.35214 3.00033 8.25245C3.73858 7.75362 4.57335 7.5 5.49973 7.5C6.61524 7.5 7.31774 7.88579 8.51543 8.96199L9.13208 9.52631C9.13876 9.53232 9.14542 9.53831 9.15206 9.54427ZM10.7493 3C9.50678 3 8.4995 4.00736 8.4995 5.25C8.4995 6.49264 9.50678 7.5 10.7493 7.5C11.9919 7.5 12.9992 6.49264 12.9992 5.25C12.9992 4.00736 11.9919 3 10.7493 3ZM11.9992 5.25C11.9992 4.55964 11.4396 4 10.7493 4C10.059 4 9.49943 4.55964 9.49943 5.25C9.49943 5.94036 10.059 6.5 10.7493 6.5C11.4396 6.5 11.9992 5.94036 11.9992 5.25Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 3H6V2.5L5.99194 2.41012C5.94961 2.17688 5.74546 2 5.5 2C5.22386 2 5 2.22386 5 2.5V3H1.75C1.33579 3 1 3.33579 1 3.75V13.25C1 13.6642 1.33579 14 1.75 14H14.25C14.6642 14 15 13.6642 15 13.25V3.75C15 3.33579 14.6642 3 14.25 3H11V2.5L10.9919 2.41012C10.9496 2.17688 10.7455 2 10.5 2C10.2239 2 10 2.22386 10 2.5V3ZM6 4.5C6 4.77614 5.77614 5 5.5 5C5.25454 5 5.05039 4.82312 5.00806 4.58988L5 4.5V4H2V6H14V4H11V4.5C11 4.77614 10.7761 5 10.5 5C10.2545 5 10.0504 4.82312 10.0081 4.58988L10 4.5V4H6V4.5ZM2 7H14V13H2V7Z" fill="currentColor"/>
            </svg>
            <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem.startsWith('inventory-') || activeItem === 'inventory' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Inventory</span>
          </button>
          {expanded && expandedGroups.includes('inventory') && (
            <>
              <button 
                onClick={() => onItemClick('inventory-ad-inventory')}
                className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-7 flex items-center justify-center">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                    <circle cx="20" cy="14" r={activeItem === 'inventory-ad-inventory' ? '3' : '2.5'} fill={activeItem === 'inventory-ad-inventory' ? '#0053E2' : 'none'} stroke={activeItem === 'inventory-ad-inventory' ? 'none' : '#2E2F32'} />
                  </svg>
                </div>
                <span className={`text-sm flex-1 whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'inventory-ad-inventory' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Ad inventory</span>
              </button>
              <button 
                onClick={() => onItemClick('inventory-policy')}
                className="flex items-center pr-3 h-7 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-7 flex items-center justify-center">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="w-10 h-7">
                    <circle cx="20" cy="14" r={activeItem === 'inventory-policy' ? '3' : '2.5'} fill={activeItem === 'inventory-policy' ? '#0053E2' : 'none'} stroke={activeItem === 'inventory-policy' ? 'none' : '#2E2F32'} />
                  </svg>
                </div>
                <span className={`text-sm flex-1 whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'inventory-policy' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Inventory policy</span>
              </button>
            </>
          )}
        </div>

        {/* Asset library */}
        <button 
          onClick={() => onItemClick('asset-library')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'asset-library' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Asset library"
        >
          <User className={`w-4 h-4 ${activeItem === 'asset-library' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} />
          <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'asset-library' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Asset library</span>
        </button>

        {/* Creative builder */}
        <button 
          onClick={() => onItemClick('creative-builder')}
          className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded ${activeItem === 'creative-builder' ? 'bg-[#E9F1FE]' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Creative builder"
        >
          <svg className={`w-4 h-4 ${activeItem === 'creative-builder' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`} viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.68336 9.88169C2.45596 10.1514 2.24107 10.4615 2.03825 10.8125C2.01318 10.8567 2 10.9067 2 10.9576V13C2 13.5523 2.44772 14 3 14H13.0359C13.5679 14 13.9992 13.5688 13.9994 13.0368L14 11.0023C14 11.0018 13.9994 11.0016 13.9991 11.0019C13.931 11.0576 13.8599 11.1103 13.7858 11.1599C13.5526 11.3161 13.2902 11.4415 12.9999 11.5359C12.5621 11.6783 12.0606 11.75 11.4993 11.75C10.3838 11.75 9.68127 11.3642 8.48358 10.288L7.86692 9.72369C7.86025 9.71768 7.85361 9.71171 7.84698 9.70576C6.83374 8.79585 6.29265 8.5 5.49973 8.5C4.74372 8.5 4.06602 8.71358 3.46119 9.15009C3.21221 9.32978 2.97558 9.54725 2.75092 9.80314C2.72828 9.82893 2.70576 9.85511 2.68336 9.88169ZM9.15206 9.54427C10.1653 10.4542 10.7064 10.75 11.4993 10.75C12.2474 10.75 12.8199 10.6099 13.2365 10.3241C13.5967 10.077 13.8403 9.72102 13.9801 9.25249C13.9927 9.2057 13.9991 9.15746 13.9991 9.10901V3C13.9991 2.44771 13.5514 2 12.9991 2H3.00007C2.44776 2 2.00003 2.44776 2.00007 3.00007L2.00042 8.34275C2.00043 8.62115 2.35748 8.76149 2.56931 8.58084C2.7091 8.46163 2.85279 8.35214 3.00033 8.25245C3.73858 7.75362 4.57335 7.5 5.49973 7.5C6.61524 7.5 7.31774 7.88579 8.51543 8.96199L9.13208 9.52631C9.13876 9.53232 9.14542 9.53831 9.15206 9.54427ZM10.7493 3C9.50678 3 8.4995 4.00736 8.4995 5.25C8.4995 6.49264 9.50678 7.5 10.7493 7.5C11.9919 7.5 12.9992 6.49264 12.9992 5.25C12.9992 4.00736 11.9919 3 10.7493 3ZM11.9992 5.25C11.9992 4.55964 11.4396 4 10.7493 4C10.059 4 9.49943 4.55964 9.49943 5.25C9.49943 5.94036 10.059 6.5 10.7493 6.5C11.4396 6.5 11.9992 5.94036 11.9992 5.25Z" fill="currentColor"/>
          </svg>
          <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} ${activeItem === 'creative-builder' ? 'text-[#0053E2]' : 'text-[#2E2F32]'}`}>Creative builder</span>
        </button>
      </div>

      {/* Toggle button */}
      <button 
        onClick={onToggle}
        className={`flex items-center ${expanded ? 'gap-3 px-3 w-full' : 'justify-center w-10 mx-auto'} h-9 rounded hover:bg-gray-100 transition-colors`}
        aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={expanded}
      >
        {expanded ? (
          <ArrowLeft className="w-4 h-4 text-[#2E2F32]" />
        ) : (
          <ArrowRight className="w-4 h-4 text-[#2E2F32]" />
        )}
        <span className={`text-sm whitespace-nowrap transition-opacity duration-100 ${expanded ? 'opacity-100' : 'opacity-0'} text-[#2E2F32]`}>Lock</span>
      </button>
    </aside>
  );
}