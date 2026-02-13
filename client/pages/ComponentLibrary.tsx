import React from 'react';
import { BadgeExample } from '@/components/BadgeExample';
import { ButtonExample } from '@/components/ButtonExample';
import { BreadcrumbExample } from '@/components/BreadcrumbExample';
import { LinkExample } from '@/components/LinkExample';
import IconButtonExample from '@/components/IconButtonExample';
import { CardHeaderExample } from '@/components/CardHeaderExample';
import * as Icons from '@/components/icons';

export default function ComponentLibrary() {
  // Organize icons by category
  const iconCategories = {
    'Navigation & Arrows': [
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'ArrowUpDown', 'ArrowUpLeft', 'ArrowUpRight',
      'ArrowsLeftRight', 'ArrowsUpDown', 'ArrowsLeftRightCurve',
      'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight',
      'CaretDown', 'ArrowCircleDot'
    ],
    'Actions & Controls': [
      'Check', 'X', 'Close', 'Plus', 'Minus',
      'Edit', 'Pencil', 'Trash', 'Trash2',
      'Download', 'Upload', 'Refresh', 'RotateCcw', 'Undo',
      'Search', 'Filter', 'Settings', 'Gear', 'Sliders',
      'More', 'MoreHorizontal', 'MoreVertical', 'Menu',
      'Drag', 'GripVertical'
    ],
    'Communication': [
      'Email', 'EmailFill', 'Chat', 'ChatBubbleSquare',
      'Phone', 'Bell', 'Share', 'ShareAndroid',
      'Microphone', 'MicrophoneSlash', 'Speaker', 'SpeakerSlash',
      'VoiceSearch'
    ],
    'Media & Files': [
      'Image', 'ImageIcon', 'Camera', 'Play', 'PlayFill',
      'Pause', 'VideoArrowUp', 'VideoArrowUpFill',
      'Article', 'Note', 'DocumentCorner', 'DocumentExclamation',
      'BoxDocument', 'BoxDocumentFill', 'Clipboard',
      'PaperClip', 'Printer', 'ScanDocument'
    ],
    'User & Account': [
      'User', 'UserCircle', 'UserCircleFill', 'UserPlus',
      'UserBook', 'UserGraph', 'UsersArrows', 'UsersFill',
      'IdCard', 'CardUser', 'SignIn', 'SignOut'
    ],
    'Commerce & Shopping': [
      'Cart', 'CartFill', 'CartArrow', 'Tag', 'TagFill',
      'Dollar', 'DollarCircle', 'DollarCircleFill',
      'Receipt', 'ReceiptPercent', 'ReceiptPercentFill',
      'CreditCard', 'CreditCardFill', 'Wallet',
      'Gift', 'GiftFill', 'Coupon', 'Barcode', 'QrCode',
      'UpcLabel', 'UpcLabelCancel'
    ],
    'Location & Maps': [
      'Location', 'CurrentLocation', 'Map', 'MapRoute', 'MapRouteFill',
      'Pin', 'PinFill', 'PinLine', 'Globe',
      'Facility', 'Home', 'SGHome', 'Building'
    ],
    'Store & Retail': [
      'Store', 'StoreFill', 'StoreAwning', 'StoreAwningFill',
      'StoreClock', 'StoreLocation', 'StoreMap',
      'Associate', 'Services', 'ServicesFill',
      'Returns', 'Restroom'
    ],
    'Charts & Data': [
      'BarGraph', 'BarGraphFill', 'BarGraphThin',
      'LineGraph', 'LineGraphBars', 'LineGraphXY',
      'PieChart', 'DonutChart', 'BubbleChart', 'BubbleChartFill',
      'ScatterChart', 'ChartWaterfall', 'Reports'
    ],
    'Status & Indicators': [
      'CheckCircle', 'CheckCircleFill', 'InfoCircle', 'InfoCircleFill',
      'ExclamationCircle', 'ExclamationCircleFill',
      'CloseCircleFill', 'QuestionCircle', 'HelpCircle',
      'Warning', 'WarningFill', 'Ban',
      'Flag', 'FlagFill', 'FlagStrike',
      'Star', 'StarFill', 'StarHalf',
      'ThumbUp', 'ThumbUpFill', 'ThumbDown', 'ThumbDownFill',
      'Heart', 'HeartFill', 'Spark'
    ],
    'Time & Calendar': [
      'Calendar', 'CalendarMoney', 'Clock', 'History', 'Hourglass'
    ],
    'Logistics & Shipping': [
      'Box', 'BoxArrowUp', 'BoxArrowDown', 'BoxCorners',
      'BoxOpenArrowDown', 'BoxShelves', 'BoxSpark', 'BoxSparkFill',
      'Truck', 'Trailer', 'TrailerArrowRight', 'TrailerDoor',
      'Forklift', 'PalletBoxes', 'ThreeDBoxArrows',
      'FedExBox', 'DockDoor', 'Bulkhead'
    ],
    'Products': [
      'CleaningSpray', 'DishSoap', 'LaundryDetergent',
      'PaperTowels', 'Sponge', 'BottleEach', 'BowlWhisk',
      'FruitCarton', 'FruitEach', 'Shirt'
    ],
    'Tools & Utilities': [
      'Wrench', 'Toolbox', 'ToolboxFill', 'RulerArrow', 'RulerArrowFill',
      'Scale', 'MeasurementConsole', 'Crop', 'Crosshairs',
      'ZoomIn', 'ZoomOut', 'PanelLeft', 'Columns'
    ],
    'Security & Verification': [
      'Lock', 'LockOpen', 'ShieldCheck', 'ShieldCheckFill',
      'Eye', 'EyeSlash'
    ],
    'Technology': [
      'Bluetooth', 'WiFi', 'Mobile', 'Airplane',
      'Headphones', 'Headset', 'Sound'
    ],
    'Business & Finance': [
      'Bank', 'Bill', 'MoneyArrowLeft', 'MoneyArrowRight',
      'HouseMoney', 'Suitcase', 'SuitcaseFill',
      'Trademark', 'TrademarkFill'
    ],
    'Advertising': [
      'SponsoredBrandsCard', 'SponsoredProductsCard', 'SponsoredVideosCard',
      'SGShareImpact', 'CardsHashtag', 'CardsStar',
      'Megaphone', 'MegaphoneFill', 'TargetArrow', 'TargetArrowFill'
    ],
    'Miscellaneous': [
      'Dot', 'Circle', 'Grid', 'GridFill', 'List', 'BulletList',
      'Brackets', 'BoldText', 'Placeholder', 'AppSwitcher',
      'Shuffle', 'SortUp', 'SortDown', 'SortingArrows',
      'Trophy', 'Medal', 'Rocket', 'RocketFill',
      'LightBulb', 'Flash', 'FlashFill', 'FlashSlash',
      'Flames', 'FuelPump', 'Bug', 'Dropper',
      'ConnectLogo', 'Mortarboard'
    ]
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--ld-semantic-color-background-subtle)',
      padding: '40px 60px'
    }}>
      {/* Page Header */}
      <div style={{ 
        marginBottom: '40px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '12px'
        }}>
          Living Design 3.5 Component Library
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          lineHeight: '1.5'
        }}>
          A comprehensive showcase of all UI components and {Object.values(iconCategories).flat().length}+ icons in the Walmart Connect Ad Center. 
          Each component follows the Living Design 3.5 specification with proper accessibility, 
          semantic tokens, and responsive behavior.
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        marginBottom: '32px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '20px',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 600, 
          marginBottom: '12px',
          color: 'var(--ld-semantic-color-text-subtle)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Quick Navigation
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Icons', 'Buttons', 'Badges', 'Breadcrumbs', 'Links', 'Icon Buttons', 'Cards'].map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase().replace(' ', '-')}`}
              style={{
                padding: 'var(--ld-primitive-scale-space-100) var(--ld-primitive-scale-space-200)',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                color: 'var(--ld-semantic-color-text)',
                borderRadius: '20px',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary)';
                e.currentTarget.style.color = 'var(--ld-semantic-color-action-text-on-fill-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
                e.currentTarget.style.color = 'var(--ld-semantic-color-text)';
              }}
            >
              {section}
            </a>
          ))}
        </div>
      </div>

      {/* Icons Section */}
      <Section id="icons" title="Icons" description={`Complete icon library with ${Object.values(iconCategories).flat().length}+ React components organized by category`}>
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '32px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          {Object.entries(iconCategories).map(([category, iconNames]) => (
            <div key={category} style={{ marginBottom: '48px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 600, 
                marginBottom: '20px', 
                color: 'var(--ld-semantic-color-text)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                {category} ({iconNames.length})
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                gap: '16px'
              }}>
                {iconNames.map(iconName => {
                  const IconComponent = (Icons as any)[iconName];
                  if (!IconComponent) return null;
                  
                  return (
                    <IconShowcase 
                      key={iconName}
                      icon={<IconComponent />} 
                      name={iconName} 
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Usage Example */}
          <div style={{
            marginTop: '40px',
            padding: 'var(--ld-primitive-scale-space-300)',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            borderLeft: `4px solid var(--ld-semantic-color-border-info)`
          }}>
            <h4 style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              marginBottom: '12px',
              color: 'var(--ld-semantic-color-text)'
            }}>
              Usage Examples
            </h4>
            <pre style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text)',
              margin: 0,
              lineHeight: '1.6',
              overflowX: 'auto'
            }}>
{`// Import icons from the centralized library
import { Search, Settings, Cart, User } from '@/components/icons';

// Use with className (Tailwind or custom classes)
<Search className="w-5 h-5 text-blue-600" />

// Use with inline styles
<Settings style={{ width: 20, height: 20, color: '#0071DC' }} />

// Use with design tokens
<Cart style={{ 
  color: 'var(--ld-semantic-color-action-fill-primary)',
  width: 'var(--ld-semantic-scale-icon-small)'
}} />

// All icons support currentColor for semantic theming
<User className="text-gray-600 hover:text-blue-600" />`}
            </pre>
          </div>
        </div>
      </Section>

      {/* Buttons Section */}
      <Section id="buttons" title="Buttons" description="Primary, secondary, tertiary, and destructive button variants with full accessibility support">
        <ComponentShowcase>
          <ButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Badges Section */}
      <Section id="badges" title="Badges" description="Count badges, status indicators, and semantic color variants for notifications and labels">
        <ComponentShowcase>
          <BadgeExample />
        </ComponentShowcase>
      </Section>

      {/* Breadcrumbs Section */}
      <Section id="breadcrumbs" title="Breadcrumbs" description="Navigation breadcrumbs with support for 2-5 levels and custom separators">
        <ComponentShowcase>
          <BreadcrumbExample />
        </ComponentShowcase>
      </Section>

      {/* Links Section */}
      <Section id="links" title="Links" description="Text links with underline variants, external link support, and hover states">
        <ComponentShowcase>
          <LinkExample />
        </ComponentShowcase>
      </Section>

      {/* Icon Buttons Section */}
      <Section id="icon-buttons" title="Icon Buttons" description="Icon-only buttons for compact actions with ghost, primary, secondary, and destructive variants">
        <ComponentShowcase>
          <IconButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Cards Section */}
      <Section id="cards" title="Cards" description="Card containers with headers, content areas, and support for leading/trailing elements">
        <ComponentShowcase>
          <CardHeaderExample />
        </ComponentShowcase>
      </Section>

      {/* Design Tokens Section */}
      <Section id="design-tokens" title="Design Tokens" description="Living Design 3.5 semantic color tokens and spacing values">
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '32px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Action Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-primary)" 
              label="Action Primary" 
              token="--ld-semantic-color-action-fill-primary"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-primary-hovered)" 
              label="Action Primary Hovered" 
              token="--ld-semantic-color-action-fill-primary-hovered"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-secondary)" 
              label="Action Secondary" 
              token="--ld-semantic-color-action-fill-secondary"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-negative)" 
              label="Action Negative" 
              token="--ld-semantic-color-action-fill-negative"
            />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Text Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-text)" 
              label="Text Primary" 
              token="--ld-semantic-color-text"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-text-subtle)" 
              label="Text Subtle" 
              token="--ld-semantic-color-text-subtle"
            />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Border Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-border)" 
              label="Border Default" 
              token="--ld-semantic-color-border"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-separator)" 
              label="Separator" 
              token="--ld-semantic-color-separator"
            />
          </div>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section id="usage-guidelines" title="Usage Guidelines" description="Best practices for implementing Living Design 3.5 components">
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '32px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <div style={{ display: 'grid', gap: '24px' }}>
            <GuidelineItem 
              title="Always Use Semantic Tokens"
              description="Never hard-code colors or spacing. Always use LD 3.5 semantic tokens like var(--ld-semantic-color-action-fill-primary) to ensure consistency and support theme switching."
            />
            <GuidelineItem 
              title="Reuse Existing Components"
              description="Before creating custom components, check if an existing LD 3.5 component meets your needs. Reusing components ensures consistency across the application."
            />
            <GuidelineItem 
              title="Use Icon Components"
              description="Always import icons from @/components/icons. All 306+ icons are React components that support currentColor for semantic theming. Never use inline SVG elements."
            />
            <GuidelineItem 
              title="Accessibility First"
              description="All components include proper ARIA labels, keyboard navigation support, and focus indicators. Maintain these standards when implementing components."
            />
            <GuidelineItem 
              title="Responsive Design"
              description="Components are designed to work across all screen sizes. Use responsive utilities and test on mobile, tablet, and desktop viewports."
            />
            <GuidelineItem 
              title="Component Composition"
              description="Break complex UIs into smaller, reusable components. This improves maintainability and follows React best practices."
            />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div style={{
        marginTop: '64px',
        padding: '24px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        textAlign: 'center',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <p style={{ 
          fontSize: '14px', 
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '8px'
        }}>
          Living Design 3.5 Component Library - {Object.values(iconCategories).flat().length} Icons Available
        </p>
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--ld-semantic-color-text-subtlest)'
        }}>
          For more information, visit the{' '}
          <a 
            href="/guidelines" 
            style={{ 
              color: 'var(--ld-semantic-color-text-brand)', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Design System Guidelines
          </a>
        </p>
      </div>
    </div>
  );
}

// Helper Components
interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Section({ id, title, description, children }: SectionProps) {
  return (
    <div id={id} style={{ marginBottom: '48px', scrollMarginTop: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px'
        }}>
          {title}
        </h2>
        {description && (
          <p style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtle)',
            lineHeight: '1.5'
          }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function ComponentShowcase({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
      overflow: 'hidden',
      boxShadow: 'var(--ld-semantic-elevation-100)'
    }}>
      {children}
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  label: string;
  token: string;
}

function ColorSwatch({ color, label, token }: ColorSwatchProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        width: '100%',
        height: '100px',
        backgroundColor: color,
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        border: `1px solid var(--ld-semantic-color-separator)`,
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }} />
      <div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '4px'
        }}>
          {label}
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--ld-semantic-color-text-subtle)', 
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          wordBreak: 'break-all'
        }}>
          {token}
        </div>
      </div>
    </div>
  );
}

interface GuidelineItemProps {
  title: string;
  description: string;
}

function GuidelineItem({ title, description }: GuidelineItemProps) {
  return (
    <div style={{
      padding: 'var(--ld-primitive-scale-space-300)',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderLeft: `4px solid var(--ld-semantic-color-border-info)`,
      borderRadius: 'var(--ld-primitive-scale-border-radius-50)'
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '14px',
        color: 'var(--ld-semantic-color-text-subtle)',
        lineHeight: '1.6',
        margin: 0
      }}>
        {description}
      </p>
    </div>
  );
}

interface IconShowcaseProps {
  icon: React.ReactNode;
  name: string;
}

function IconShowcase({ icon, name }: IconShowcaseProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--ld-primitive-scale-space-150)',
        padding: 'var(--ld-primitive-scale-space-200)',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        border: `1px solid transparent`,
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-brand)';
        e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-brand-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
      }}
    >
      <div style={{
        color: 'var(--ld-semantic-color-text)',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {React.cloneElement(icon as React.ReactElement, {
          style: { width: '24px', height: '24px' }
        })}
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--ld-semantic-color-text-subtlest)',
        textAlign: 'center',
        fontFamily: 'var(--ld-semantic-font-family-mono)',
        wordBreak: 'break-word'
      }}>
        {copied ? '✓ Copied!' : name}
      </div>
    </div>
  );
}
