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
      'Check', 'X', 'Plus', 'Minus',
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
          {['Icons', 'Component Tester', 'Buttons', 'Badges', 'Breadcrumbs', 'Links', 'Icon Buttons', 'Cards', 'Design Tokens'].map(section => (
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

      {/* Interactive Component Tester */}
      <Section id="component-tester" title="Component Property Tester" description="Interactive playground to test component variants, sizes, and properties in real-time">
        <InteractiveComponentTester />
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
      <Section id="design-tokens" title="Design Tokens" description="Complete Living Design 3.5 semantic token system - 624 tokens organized by category">
        <TokenCategorySection />
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
              description="Always import icons from @/components/icons. All 304+ icons are React components that support currentColor for semantic theming. Never use inline SVG elements."
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

// Interactive Component Tester
function InteractiveComponentTester() {
  const [buttonVariant, setButtonVariant] = React.useState<'primary' | 'secondary' | 'tertiary' | 'destructive'>('primary');
  const [buttonSize, setButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [buttonFullWidth, setButtonFullWidth] = React.useState(false);
  const [buttonWithIcon, setButtonWithIcon] = React.useState(false);

  const SearchIcon = (Icons as any).Search;
  const ArrowRightIcon = (Icons as any).ArrowRight;

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: 'var(--ld-semantic-border-radius-large)',
      padding: 'var(--ld-semantic-spacing-400)',
      boxShadow: 'var(--ld-semantic-elevation-100)'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ld-semantic-spacing-400)' }}>
        {/* Controls Panel */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            marginBottom: 'var(--ld-semantic-spacing-200)',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            Component Properties
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-semantic-spacing-200)' }}>
            {/* Variant Selection */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: 'var(--ld-semantic-spacing-100)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                Variant
              </label>
              <div style={{ display: 'flex', gap: 'var(--ld-semantic-spacing-100)', flexWrap: 'wrap' }}>
                {(['primary', 'secondary', 'tertiary', 'destructive'] as const).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setButtonVariant(variant)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 500,
                      borderRadius: 'var(--ld-semantic-border-radius-medium)',
                      border: '1px solid var(--ld-semantic-color-border-subtlest)',
                      backgroundColor: buttonVariant === variant ? 'var(--ld-semantic-color-fill-activated)' : 'var(--ld-semantic-color-surface)',
                      color: buttonVariant === variant ? 'var(--ld-semantic-color-text-on-fill-activated-subtle)' : 'var(--ld-semantic-color-text)',
                      cursor: 'pointer',
                      fontFamily: 'var(--ld-semantic-font-family-sans)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: 'var(--ld-semantic-spacing-100)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                Size
              </label>
              <div style={{ display: 'flex', gap: 'var(--ld-semantic-spacing-100)' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setButtonSize(size)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 500,
                      borderRadius: 'var(--ld-semantic-border-radius-medium)',
                      border: '1px solid var(--ld-semantic-color-border-subtlest)',
                      backgroundColor: buttonSize === size ? 'var(--ld-semantic-color-fill-activated)' : 'var(--ld-semantic-color-surface)',
                      color: buttonSize === size ? 'var(--ld-semantic-color-text-on-fill-activated-subtle)' : 'var(--ld-semantic-color-text)',
                      cursor: 'pointer',
                      fontFamily: 'var(--ld-semantic-font-family-sans)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Boolean Properties */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-semantic-spacing-100)' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ld-semantic-spacing-100)',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                <input
                  type="checkbox"
                  checked={buttonDisabled}
                  onChange={(e) => setButtonDisabled(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                Disabled
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ld-semantic-spacing-100)',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                <input
                  type="checkbox"
                  checked={buttonFullWidth}
                  onChange={(e) => setButtonFullWidth(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                Full Width
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ld-semantic-spacing-100)',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                <input
                  type="checkbox"
                  checked={buttonWithIcon}
                  onChange={(e) => setButtonWithIcon(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                With Icons
              </label>
            </div>

            {/* Code Preview */}
            <div style={{ marginTop: 'var(--ld-semantic-spacing-200)' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: 'var(--ld-semantic-spacing-100)',
                fontFamily: 'var(--ld-semantic-font-family-sans)'
              }}>
                Generated Code
              </label>
              <pre style={{
                fontSize: '11px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                padding: 'var(--ld-semantic-spacing-150)',
                borderRadius: 'var(--ld-semantic-border-radius-small)',
                color: 'var(--ld-semantic-color-text)',
                overflowX: 'auto',
                lineHeight: '1.5',
                margin: 0
              }}>
{`<Button
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}${buttonFullWidth ? '\n  isFullWidth' : ''}${buttonWithIcon ? `\n  leading={<Search />}\n  trailing={<ArrowRight />}` : ''}
>
  Click Me
</Button>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            marginBottom: 'var(--ld-semantic-spacing-200)',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            Live Preview
          </h3>
          <div style={{
            padding: 'var(--ld-semantic-spacing-400)',
            backgroundColor: 'var(--ld-semantic-color-background-subtle)',
            borderRadius: 'var(--ld-semantic-border-radius-large)',
            border: '2px dashed var(--ld-semantic-color-border-subtlest)',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: buttonFullWidth ? '100%' : 'auto' }}>
              <button
                disabled={buttonDisabled}
                className={`button button--variant-${buttonVariant} button--size-${buttonSize}${buttonFullWidth ? ' button--fullWidth' : ''}`}
                style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  border: '2px solid transparent',
                  cursor: buttonDisabled ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  width: buttonFullWidth ? '100%' : 'auto',
                  padding: buttonSize === 'small' ? '6px 16px' : buttonSize === 'medium' ? '10px 20px' : '14px 24px',
                  fontSize: buttonSize === 'small' ? '14px' : buttonSize === 'medium' ? '16px' : '18px',
                  backgroundColor: buttonVariant === 'primary' ? 'var(--ld-semantic-color-action-fill-primary)' :
                                   buttonVariant === 'destructive' ? 'var(--ld-semantic-color-action-fill-negative)' :
                                   'var(--ld-semantic-color-action-fill-secondary)',
                  color: buttonVariant === 'primary' || buttonVariant === 'destructive' ?
                         'var(--ld-semantic-color-action-text-on-fill-primary)' :
                         'var(--ld-semantic-color-action-text-on-fill-secondary)',
                  borderColor: buttonVariant === 'secondary' || buttonVariant === 'tertiary' ?
                               'var(--ld-semantic-color-action-border-secondary)' : 'transparent',
                  opacity: buttonDisabled ? 0.4 : 1
                }}
              >
                {buttonWithIcon && <SearchIcon style={{ width: 16, height: 16 }} />}
                Click Me
                {buttonWithIcon && <ArrowRightIcon style={{ width: 16, height: 16 }} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Token Category Section with Collapsible Groups
function TokenCategorySection() {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    'action-colors': false,
    'text-colors': false,
    'fill-colors': false,
    'border-colors': false,
    'surface-colors': false,
    'spacing': false,
    'typography': false,
    'border-radius': false,
    'elevation': false,
    'duration': false,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const tokenGroups = {
    'action-colors': {
      title: 'Action Colors (Buttons & Interactive Elements)',
      count: 60,
      tokens: [
        { name: 'Primary', token: '--ld-semantic-color-action-fill-primary' },
        { name: 'Primary Hovered', token: '--ld-semantic-color-action-fill-primary-hovered' },
        { name: 'Primary Pressed', token: '--ld-semantic-color-action-fill-primary-pressed' },
        { name: 'Primary Disabled', token: '--ld-semantic-color-action-fill-primary-disabled' },
        { name: 'Secondary', token: '--ld-semantic-color-action-fill-secondary' },
        { name: 'Secondary Hovered', token: '--ld-semantic-color-action-fill-secondary-hovered' },
        { name: 'Tertiary', token: '--ld-semantic-color-action-fill-tertiary' },
        { name: 'Negative/Destructive', token: '--ld-semantic-color-action-fill-negative' },
        { name: 'Negative Hovered', token: '--ld-semantic-color-action-fill-negative-hovered' },
        { name: 'Text on Primary', token: '--ld-semantic-color-action-text-on-fill-primary' },
        { name: 'Text on Secondary', token: '--ld-semantic-color-action-text-on-fill-secondary' },
        { name: 'Focus Outline', token: '--ld-semantic-color-action-focus-outline' },
      ]
    },
    'text-colors': {
      title: 'Text Colors',
      count: 50,
      tokens: [
        { name: 'Text Primary', token: '--ld-semantic-color-text' },
        { name: 'Text Subtle', token: '--ld-semantic-color-text-subtle' },
        { name: 'Text Subtlest', token: '--ld-semantic-color-text-subtlest' },
        { name: 'Text Brand', token: '--ld-semantic-color-text-brand' },
        { name: 'Text Inverse (White)', token: '--ld-semantic-color-text-inverse' },
        { name: 'Text Info', token: '--ld-semantic-color-text-info' },
        { name: 'Text Positive', token: '--ld-semantic-color-text-positive' },
        { name: 'Text Negative', token: '--ld-semantic-color-text-negative' },
        { name: 'Text Warning', token: '--ld-semantic-color-text-warning' },
        { name: 'Text Disabled', token: '--ld-semantic-color-text-disabled' },
      ]
    },
    'fill-colors': {
      title: 'Fill/Background Colors',
      count: 80,
      tokens: [
        { name: 'Fill (White)', token: '--ld-semantic-color-fill' },
        { name: 'Fill Subtle', token: '--ld-semantic-color-fill-subtle' },
        { name: 'Fill Hovered', token: '--ld-semantic-color-fill-hovered' },
        { name: 'Fill Pressed', token: '--ld-semantic-color-fill-pressed' },
        { name: 'Fill Activated', token: '--ld-semantic-color-fill-activated' },
        { name: 'Fill Info', token: '--ld-semantic-color-fill-info' },
        { name: 'Fill Info Subtle', token: '--ld-semantic-color-fill-info-subtle' },
        { name: 'Fill Positive', token: '--ld-semantic-color-fill-positive' },
        { name: 'Fill Positive Subtle', token: '--ld-semantic-color-fill-positive-subtle' },
        { name: 'Fill Negative', token: '--ld-semantic-color-fill-negative' },
        { name: 'Fill Negative Subtle', token: '--ld-semantic-color-fill-negative-subtle' },
        { name: 'Fill Warning', token: '--ld-semantic-color-fill-warning' },
      ]
    },
    'border-colors': {
      title: 'Border & Separator Colors',
      count: 40,
      tokens: [
        { name: 'Border', token: '--ld-semantic-color-border' },
        { name: 'Border Subtle', token: '--ld-semantic-color-border-subtle' },
        { name: 'Border Subtlest', token: '--ld-semantic-color-border-subtlest' },
        { name: 'Separator', token: '--ld-semantic-color-separator' },
        { name: 'Border Brand', token: '--ld-semantic-color-border-brand' },
        { name: 'Border Info', token: '--ld-semantic-color-border-info' },
        { name: 'Border Positive', token: '--ld-semantic-color-border-positive' },
        { name: 'Border Negative', token: '--ld-semantic-color-border-negative' },
        { name: 'Border Warning', token: '--ld-semantic-color-border-warning' },
      ]
    },
    'surface-colors': {
      title: 'Surface & Elevation Colors',
      count: 20,
      tokens: [
        { name: 'Surface (Cards, Modals)', token: '--ld-semantic-color-surface' },
        { name: 'Surface Hovered', token: '--ld-semantic-color-surface-hovered' },
        { name: 'Surface Activated', token: '--ld-semantic-color-surface-activated' },
        { name: 'Surface Overlay', token: '--ld-semantic-color-surface-overlay' },
        { name: 'Surface Brand', token: '--ld-semantic-color-surface-brand' },
        { name: 'Background', token: '--ld-semantic-color-background' },
        { name: 'Background Subtle', token: '--ld-semantic-color-background-subtle' },
      ]
    },
    'spacing': {
      title: 'Spacing Scale',
      count: 30,
      tokens: [
        { name: 'Spacing 25 (2px)', token: '--ld-semantic-spacing-25', value: '0.125rem' },
        { name: 'Spacing 50 (4px)', token: '--ld-semantic-spacing-50', value: '0.25rem' },
        { name: 'Spacing 100 (8px)', token: '--ld-semantic-spacing-100', value: '0.5rem' },
        { name: 'Spacing 150 (12px)', token: '--ld-semantic-spacing-150', value: '0.75rem' },
        { name: 'Spacing 200 (16px)', token: '--ld-semantic-spacing-200', value: '1rem' },
        { name: 'Spacing 250 (20px)', token: '--ld-semantic-spacing-250', value: '1.25rem' },
        { name: 'Spacing 300 (24px)', token: '--ld-semantic-spacing-300', value: '1.5rem' },
        { name: 'Spacing 400 (32px)', token: '--ld-semantic-spacing-400', value: '2rem' },
      ]
    },
    'typography': {
      title: 'Typography Tokens',
      count: 60,
      tokens: [
        { name: 'Font Family Sans', token: '--ld-semantic-font-family-sans', value: 'EverydaySans' },
        { name: 'Font Family Mono', token: '--ld-semantic-font-family-mono', value: 'EverydaySansMono' },
        { name: 'Heading Large Size', token: '--ld-semantic-font-heading-large-size-b-s', value: '1.5rem' },
        { name: 'Heading Medium Size', token: '--ld-semantic-font-heading-medium-size-b-s', value: '1.25rem' },
        { name: 'Body Medium Size', token: '--ld-semantic-font-body-medium-size', value: '1rem' },
        { name: 'Body Small Size', token: '--ld-semantic-font-body-small-size', value: '0.875rem' },
        { name: 'Caption Size', token: '--ld-semantic-font-caption-size', value: '0.75rem' },
      ]
    },
    'border-radius': {
      title: 'Border Radius',
      count: 13,
      tokens: [
        { name: 'Small (2px)', token: '--ld-semantic-border-radius-small', value: '0.125rem' },
        { name: 'Medium (4px)', token: '--ld-semantic-border-radius-medium', value: '0.25rem' },
        { name: 'Large (8px)', token: '--ld-semantic-border-radius-large', value: '0.5rem' },
        { name: 'Button (Pill)', token: '--ld-semantic-border-radius-button', value: '62.5rem' },
        { name: 'Card', token: '--ld-semantic-border-radius-card', value: '0.5rem' },
        { name: 'Round (Pill)', token: '--ld-semantic-border-radius-round', value: '62.5rem' },
      ]
    },
    'elevation': {
      title: 'Elevation/Shadow Tokens',
      count: 3,
      tokens: [
        { name: 'Elevation 100 (Subtle)', token: '--ld-semantic-elevation-100', value: 'box-shadow' },
        { name: 'Elevation 200 (Medium)', token: '--ld-semantic-elevation-200', value: 'box-shadow' },
        { name: 'Elevation 300 (High)', token: '--ld-semantic-elevation-300', value: 'box-shadow' },
      ]
    },
    'duration': {
      title: 'Animation Duration',
      count: 20,
      tokens: [
        { name: 'Instant (100ms)', token: '--ld-semantic-duration-instant', value: '0.10s' },
        { name: 'Fast (200ms)', token: '--ld-semantic-duration-fast', value: '0.20s' },
        { name: 'Medium (300ms)', token: '--ld-semantic-duration-medium', value: '0.30s' },
        { name: 'Button Hover', token: '--ld-semantic-duration-button-hover', value: '0.20s' },
        { name: 'Modal Open', token: '--ld-semantic-duration-modal-open', value: '0.30s' },
      ]
    },
  };

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: 'var(--ld-semantic-border-radius-large)',
      overflow: 'hidden',
      boxShadow: 'var(--ld-semantic-elevation-100)'
    }}>
      {Object.entries(tokenGroups).map(([key, group]) => (
        <CollapsibleTokenGroup
          key={key}
          title={group.title}
          count={group.count}
          tokens={group.tokens}
          isExpanded={expandedSections[key]}
          onToggle={() => toggleSection(key)}
        />
      ))}
    </div>
  );
}

interface TokenItem {
  name: string;
  token: string;
  value?: string;
}

interface CollapsibleTokenGroupProps {
  title: string;
  count: number;
  tokens: TokenItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

function CollapsibleTokenGroup({ title, count, tokens, isExpanded, onToggle }: CollapsibleTokenGroupProps) {
  const ChevronDown = (Icons as any).ChevronDown;

  return (
    <div style={{ borderBottom: '1px solid var(--ld-semantic-color-separator)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--ld-semantic-spacing-200) var(--ld-semantic-spacing-300)',
          backgroundColor: isExpanded ? 'var(--ld-semantic-color-fill-subtle)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-hovered)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            margin: 0
          }}>
            {title}
          </h3>
          <span style={{
            fontSize: '12px',
            color: 'var(--ld-semantic-color-text-subtle)',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--ld-semantic-border-radius-round)',
            fontWeight: 600
          }}>
            {count} tokens
          </span>
        </div>
        <div style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          <ChevronDown style={{ width: 20, height: 20 }} />
        </div>
      </button>

      {isExpanded && (
        <div style={{
          padding: 'var(--ld-semantic-spacing-300)',
          backgroundColor: 'var(--ld-semantic-color-background-subtle)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--ld-semantic-spacing-200)'
          }}>
            {tokens.map((item) => (
              <TokenSwatch key={item.token} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface TokenSwatchProps {
  name: string;
  token: string;
  value?: string;
}

function TokenSwatch({ name, token, value }: TokenSwatchProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColorToken = token.includes('color');

  return (
    <div
      onClick={handleCopy}
      style={{
        padding: 'var(--ld-semantic-spacing-150)',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        borderRadius: 'var(--ld-semantic-border-radius-medium)',
        border: '1px solid var(--ld-semantic-color-border-subtlest)',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-brand)';
        e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-subtlest)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {isColorToken && (
        <div style={{
          width: '100%',
          height: '60px',
          backgroundColor: `var(${token})`,
          borderRadius: 'var(--ld-semantic-border-radius-small)',
          border: '1px solid var(--ld-semantic-color-separator)',
          marginBottom: 'var(--ld-semantic-spacing-100)'
        }} />
      )}
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '4px'
      }}>
        {name}
      </div>
      <div style={{
        fontSize: '10px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-mono)',
        wordBreak: 'break-all',
        lineHeight: '1.4'
      }}>
        {copied ? '✓ Copied!' : token}
      </div>
      {value && (
        <div style={{
          fontSize: '10px',
          color: 'var(--ld-semantic-color-text-subtlest)',
          marginTop: '4px',
          fontFamily: 'var(--ld-semantic-font-family-mono)'
        }}>
          {value}
        </div>
      )}
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
