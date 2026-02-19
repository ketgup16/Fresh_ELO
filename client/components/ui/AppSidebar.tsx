import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Megaphone,
  BarGraph,
  Toolbox,
  Image,
  Upload,
  ArrowRightLine,
  ArrowLeftLine,
  ChevronDown,
} from '@/components/icons';

export interface SidebarMenuItem {
  id: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route?: string;
  submenuItems?: { id: string; label: string; route?: string }[];
}

export interface AppSidebarProps {
  /** Currently active menu item id */
  activeMenuItem?: string;
  /** Callback when a menu item is clicked */
  onMenuItemClick?: (itemId: string) => void;
  /** Custom menu items — if not provided, uses default set */
  menuItems?: SidebarMenuItem[];
}

const iconStyle = { width: 16, height: 16 };

const defaultMenuItems: SidebarMenuItem[] = [
  { id: 'dashboard', label: 'Home', Icon: Home, route: '/' },
  {
    id: 'campaigns',
    label: 'Notifications',
    Icon: Megaphone,
    submenuItems: [
      { id: 'campaigns-sub1', label: 'Sub page' },
      { id: 'campaigns-sub2', label: 'Sub page' },
      { id: 'campaigns-sub3', label: 'Sub page' },
    ],
  },
  { id: 'reports', label: 'Charts', Icon: BarGraph },
  { id: 'tools', label: 'Tools', Icon: Toolbox },
  { id: 'video-manager', label: 'Media', Icon: Image },
  { id: 'bulk-operations', label: 'Uploads', Icon: Upload },
];

export function AppSidebar({
  activeMenuItem: controlledActive,
  onMenuItemClick,
  menuItems = defaultMenuItems,
}: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [internalActive, setInternalActive] = useState('dashboard');
  const activeMenuItem = controlledActive ?? internalActive;

  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);
  const [expandedSubmenus, setExpandedSubmenus] = useState<Record<string, boolean>>({ campaigns: true });

  const sidebarExpanded = sidebarLocked || sidebarHovered;

  // Auto-detect active item from route
  useEffect(() => {
    if (controlledActive !== undefined) return;
    const match = menuItems.find((item) => item.route && location.pathname === item.route);
    if (match) {
      setInternalActive(match.id);
    }
  }, [location.pathname, menuItems, controlledActive]);

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

  const handleItemClick = (item: SidebarMenuItem) => {
    const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;

    if (hasSubmenu) {
      if (!sidebarExpanded) {
        if (item.route) navigate(item.route);
        onMenuItemClick?.(item.id);
        setInternalActive(item.id);
        return;
      }
      setExpandedSubmenus((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    } else {
      onMenuItemClick?.(item.id);
      setInternalActive(item.id);
      if (item.route) navigate(item.route);
    }
  };

  return (
    <aside
      style={{
        borderRight: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #FFFFFF)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--ld-semantic-spacing-3, 12px)',
        alignSelf: 'stretch',
        overflow: 'hidden',
        position: 'relative',
        width: sidebarExpanded ? `${sidebarWidth}px` : '64px',
        transition: isResizingSidebar ? 'none' : 'width 300ms ease-in-out',
        flexShrink: 0,
      }}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* Menu items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => {
          const isActive =
            activeMenuItem === item.id ||
            (item.submenuItems?.some((sub) => activeMenuItem === sub.id) ?? false);
          const IconComponent = item.Icon;
          const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;
          const isExpanded = expandedSubmenus[item.id] ?? false;

          return (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
                  paddingLeft: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
                  paddingRight: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
                  width: sidebarExpanded ? '100%' : '40px',
                  justifyContent: sidebarExpanded ? 'space-between' : 'center',
                  margin: sidebarExpanded ? undefined : '0 auto',
                  height: '36px',
                  borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
                  backgroundColor:
                    isActive && sidebarExpanded
                      ? 'var(--ld-semantic-color-action-fill-primary-subtle, #E9F1FE)'
                      : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  transition: 'background-color 150ms',
                }}
                onMouseEnter={(e) => {
                  if (!isActive || !sidebarExpanded) {
                    e.currentTarget.style.backgroundColor =
                      'var(--ld-semantic-color-fill-surface-secondary, #F5F5F6)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    isActive && sidebarExpanded
                      ? 'var(--ld-semantic-color-action-fill-primary-subtle, #E9F1FE)'
                      : 'transparent';
                }}
                aria-label={item.label}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-semantic-spacing-3, 12px)' }}>
                  <IconComponent
                    style={{
                      ...iconStyle,
                      color: isActive
                        ? 'var(--ld-semantic-color-action-fill-primary, #0053E2)'
                        : 'var(--ld-semantic-color-text-primary, #2E2F32)',
                    }}
                  />
                  {sidebarExpanded && (
                    <span
                      style={{
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: isActive
                          ? 'var(--ld-semantic-color-action-fill-primary, #0053E2)'
                          : 'var(--ld-semantic-color-text-primary, #2E2F32)',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
                {sidebarExpanded && hasSubmenu && (
                  <div
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 150ms',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                    }}
                  >
                    <ChevronDown style={iconStyle} />
                  </div>
                )}
              </button>

              {/* Submenu items */}
              {hasSubmenu && isExpanded && sidebarExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  {item.submenuItems!.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        onMenuItemClick?.(subItem.id);
                        setInternalActive(subItem.id);
                        if (subItem.route) navigate(subItem.route);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ld-semantic-spacing-3, 12px)',
                        paddingLeft: '48px',
                        paddingRight: 'var(--ld-semantic-spacing-3, 12px)',
                        width: '100%',
                        height: '36px',
                        borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                        transition: 'background-color 150ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          'var(--ld-semantic-color-fill-surface-secondary, #F5F5F6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      aria-label={subItem.label}
                    >
                      <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>
                        ○
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                        }}
                      >
                        {subItem.label}
                      </span>
                    </button>
                  ))}
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
            paddingLeft: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
            paddingRight: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
            width: sidebarExpanded ? '100%' : '40px',
            justifyContent: sidebarExpanded ? undefined : 'center',
            margin: sidebarExpanded ? undefined : '0 auto',
            height: '36px',
            borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            transition: 'background-color 150ms',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              'var(--ld-semantic-color-fill-surface-secondary, #F5F5F6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label={sidebarLocked ? 'Collapse sidebar' : 'Lock sidebar open'}
          aria-expanded={sidebarLocked}
        >
          {sidebarExpanded ? (
            <>
              <ArrowLeftLine style={iconStyle} />
              <span
                style={{
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}
              >
                Lock
              </span>
            </>
          ) : (
            <ArrowRightLine style={iconStyle} />
          )}
        </button>
      </div>

      {/* Resize handle */}
      {sidebarExpanded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '4px',
            height: '100%',
            cursor: 'col-resize',
            backgroundColor: 'transparent',
            transition: 'background-color 150ms',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              'var(--ld-semantic-color-action-fill-primary, #0053E2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
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

export default AppSidebar;
