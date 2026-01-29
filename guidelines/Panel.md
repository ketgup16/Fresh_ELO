# Panel Component Guidelines

## Overview
Panels (also known as drawers, sidebars, or slide-out panels) are overlay components that slide in from the edge of the screen to display additional content or functionality.

## CRITICAL RULE: All Panels Must Be Resizable

**REQUIREMENT**: All panel implementations MUST include the following features:

### 1. Width Constraints
- **Min Width**: 420px (ensures content remains readable and usable)
- **Max Width**: Typically 800px, but may vary based on use case
- **Responsive**: On smaller screens, max width should adjust to `window.innerWidth - 40px` to maintain viewport margin

### 2. Resizable Handle
All panels MUST include a resize handle that allows users to adjust the panel width:

```tsx
{/* Resize Handle - Required for all panels */}
<div
  className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-[#0053E2] cursor-col-resize transition-colors z-10"
  onMouseDown={handleMouseDown}
>
  {/* Invisible expanded hit area */}
  <div className="absolute left-0 top-0 bottom-0 w-4 -translate-x-1.5" />
  {/* Visual indicator - centered dots */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
    <div className="w-1 h-1 rounded-full bg-[#909196]" />
    <div className="w-1 h-1 rounded-full bg-[#909196]" />
    <div className="w-1 h-1 rounded-full bg-[#909196]" />
  </div>
</div>
```

### 3. State Management
Panels MUST maintain width state and persist user preferences:

```tsx
// Panel width state with localStorage persistence
const [panelWidth, setPanelWidth] = useState(() => {
  const saved = localStorage.getItem('panelName_Width');
  return saved ? parseInt(saved, 10) : 800; // Default to max width
});
const [isResizing, setIsResizing] = useState(false);

// Save to localStorage when width changes
useEffect(() => {
  localStorage.setItem('panelName_Width', panelWidth.toString());
}, [panelWidth]);
```

### 4. Resize Logic
Required event handlers for resize functionality:

```tsx
// Mouse down handler
const handleMouseDown = (e: React.MouseEvent) => {
  setIsResizing(true);
  e.preventDefault();
};

// Mouse move and cleanup
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const maxWidth = Math.min(800, window.innerWidth - 40); // Responsive max
    const clampedWidth = Math.min(Math.max(newWidth, 420), maxWidth);
    setPanelWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  if (isResizing) {
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return () => {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}, [isResizing]);
```

### 5. Responsive Window Resize
Adjust panel width when window is resized:

```tsx
useEffect(() => {
  const handleWindowResize = () => {
    const maxWidth = Math.min(800, window.innerWidth - 40);
    if (panelWidth > maxWidth) {
      setPanelWidth(maxWidth);
    }
  };

  window.addEventListener('resize', handleWindowResize);
  return () => window.removeEventListener('resize', handleWindowResize);
}, [panelWidth]);
```

## Implementation Checklist

When creating a new panel component, ensure:

- [ ] Min width is set to 420px
- [ ] Max width is defined (typically 800px)
- [ ] Resize handle is present on the left edge (for right-side panels)
- [ ] Visual indicator (3 dots) is visible on the resize handle
- [ ] Hover state changes handle color to `#0053E2` (LD 3.5 blue)
- [ ] Cursor changes to `col-resize` when hovering/dragging
- [ ] Width is clamped between min and max values
- [ ] Panel width is saved to localStorage with a unique key
- [ ] Responsive behavior adjusts max width on small screens
- [ ] Window resize listener prevents panel from exceeding viewport

## Panel Structure

```tsx
<div
  className="fixed top-0 right-0 bottom-0 bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col"
  style={{ width: `${panelWidth}px` }}
>
  {/* Resize Handle - REQUIRED */}
  <div
    className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-[#0053E2] cursor-col-resize transition-colors z-10"
    onMouseDown={handleMouseDown}
  >
    <div className="absolute left-0 top-0 bottom-0 w-4 -translate-x-1.5" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
      <div className="w-1 h-1 rounded-full bg-[#909196]" />
      <div className="w-1 h-1 rounded-full bg-[#909196]" />
      <div className="w-1 h-1 rounded-full bg-[#909196]" />
    </div>
  </div>

  {/* Panel Content */}
  {/* ... */}
</div>
```

## Design Tokens

### Colors
- **Resize handle hover**: `var(--ld-semantic-color-action-fill-primary)` or `#0053E2`
- **Resize handle dots**: `#909196`
- **Panel background**: `var(--ld-semantic-color-fill-primary)` or `#FFFFFF`
- **Panel shadow**: `0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)`

### Spacing
- **Resize handle width**: 1px (4px hit area)
- **Min panel width**: 420px
- **Max panel width**: 800px (or responsive)
- **Viewport margin**: 40px on small screens

## Reference Implementation

See `client/components/RecommendationsPanel.tsx` for a complete reference implementation of an expandable panel with all required features.

## Why This Matters

1. **User Control**: Users can adjust panel width to fit their workflow and screen size
2. **Flexibility**: Different content requires different widths
3. **Persistence**: User preferences are remembered across sessions
4. **Responsive**: Panels adapt gracefully to smaller viewports
5. **Consistency**: All panels follow the same interaction pattern
6. **Accessibility**: Large hit areas make resizing easier for all users

## Exceptions

The only time a panel may NOT be resizable is if:
- It's a full-screen modal (100% width)
- It's a temporary tooltip or popover (fixed small size)
- There's a documented UX reason requiring a fixed width

For all other cases, panels MUST be resizable as specified above.
