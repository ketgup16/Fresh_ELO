import React from 'react';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';

export function TextFieldExample() {
  const [controlledValue, setControlledValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const handleEmailBlur = () => {
    if (emailValue && !emailValue.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Default Large */}
      <ExampleSection
        title="Default (Large Size)"
        description="A basic text field with label. Large is the default size (56px height, 16px text)."
      >
        <div style={{ width: 360 }}>
          <TextField label="Campaign name" placeholder="Enter campaign name" />
        </div>
      </ExampleSection>

      {/* Small Size */}
      <ExampleSection
        title="Small Size"
        description="A compact text field for condensed layouts (32px height, 14px text). Typically used on desktop."
      >
        <div style={{ width: 360 }}>
          <TextField 
            label="Budget" 
            size="small"
            type="number"
            placeholder="0.00" 
          />
        </div>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="Helper text provides additional guidance below the input."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Item ID"
            placeholder="123456789"
            helperText="Enter the 9-digit item identification number"
          />
        </div>
      </ExampleSection>

      {/* Leading Icon */}
      <ExampleSection
        title="With Leading Icon"
        description="A decorative icon displayed at the start of the input (24x24px recommended)."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Search campaigns"
            placeholder="Type to search..."
            leadingIcon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L15.6464 16.3536C15.8417 16.5488 16.1583 16.5488 16.3536 16.3536C16.5488 16.1583 16.5488 15.8417 16.3536 15.6464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5C14 5.46243 11.5376 3 8.5 3ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z" />
              </svg>
            }
          />
        </div>
      </ExampleSection>

      {/* Trailing Content - Clear Button */}
      <ExampleSection
        title="With Trailing Content (Clear Button)"
        description="The trailing content slot can hold buttons, icons, or custom elements. Here's a search field with a clear button."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Search"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search items..."
            leadingIcon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L15.6464 16.3536C15.8417 16.5488 16.1583 16.5488 16.3536 16.3536C16.5488 16.1583 16.5488 15.8417 16.3536 15.6464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5C14 5.46243 11.5376 3 8.5 3ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z" />
              </svg>
            }
            trailingContent={
              searchValue ? (
                <Button 
                  variant="tertiary" 
                  size="small" 
                  onClick={() => setSearchValue('')}
                  UNSAFE_style={{ marginRight: '-4px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </Button>
              ) : null
            }
          />
        </div>
      </ExampleSection>

      {/* Password with Toggle */}
      <ExampleSection
        title="Password with Show/Hide Toggle"
        description="Using trailing content for a password visibility toggle."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="Enter password"
            trailingContent={
              <Button
                variant="tertiary"
                size="small"
                onClick={() => setShowPassword(!showPassword)}
                UNSAFE_style={{ marginRight: '-4px' }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3.28 2.22a.75.75 0 00-1.06 1.06l2.54 2.55A9.955 9.955 0 002 10c0 5.523 4.477 10 8 10a9.954 9.954 0 004.17-2.76l2.55 2.54a.75.75 0 101.06-1.06l-15-15zM10 16c-3.314 0-6-2.686-6-6 0-1.408.486-2.705 1.299-3.73l8.431 8.431A5.961 5.961 0 0110 16zm8-6c0 1.408-.486 2.705-1.299 3.73l-1.061-1.061A5.961 5.961 0 0016 10c0-3.314-2.686-6-6-6-1.061 0-2.054.275-2.917.757L5.832 3.506A7.963 7.963 0 0110 2c4 0 8 4.477 8 8z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 4C6 4 2 8.477 2 10s4 6 8 6 8-4.477 8-6-4-6-8-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                  </svg>
                )}
              </Button>
            }
          />
        </div>
      </ExampleSection>

      {/* Error State */}
      <ExampleSection
        title="Error State"
        description="Pass an error prop to show error styling and message. The error message replaces helper text."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Email address"
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError('');
            }}
            onBlur={handleEmailBlur}
            error={emailError}
            placeholder="you@example.com"
          />
        </div>
      </ExampleSection>

      {/* Disabled State */}
      <ExampleSection
        title="Disabled"
        description="A disabled field prevents all interaction and appears with reduced contrast."
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ width: 280 }}>
            <TextField
              label="Campaign ID"
              disabled
              value="CAMP-2024-001"
            />
          </div>
          <div style={{ width: 280 }}>
            <TextField
              label="Status"
              size="small"
              disabled
              value="Active"
            />
          </div>
        </div>
      </ExampleSection>

      {/* Read-only State */}
      <ExampleSection
        title="Read-only"
        description="Read-only fields can receive focus but cannot be edited. Use this for values that should be visible and selectable but not editable."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Account ID"
            readOnly
            value="ACC-1234567890"
            helperText="This value cannot be changed"
          />
        </div>
      </ExampleSection>

      {/* Magic (AI-Generated) State */}
      <ExampleSection
        title="Magic (AI-Generated)"
        description="Use isMagic to indicate content was AI-generated. Shows a sparkle icon next to the label and uses magic border colors."
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ width: 280 }}>
            <TextField
              label="Campaign name"
              isMagic
              value="Summer Sale 2024"
              helperText="Generated by AI"
            />
          </div>
          <div style={{ width: 280 }}>
            <TextField
              label="Description"
              size="small"
              isMagic
              value="Premium outdoor gear"
            />
          </div>
        </div>
      </ExampleSection>

      {/* Different Input Types */}
      <ExampleSection
        title="Different Input Types"
        description="TextField supports email, tel, url, number, password, and other HTML5 input types."
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 280 }}>
            <TextField
              label="Email"
              type="email"
              size="small"
              placeholder="you@example.com"
            />
          </div>
          <div style={{ width: 280 }}>
            <TextField
              label="Phone"
              type="tel"
              size="small"
              placeholder="(555) 123-4567"
            />
          </div>
          <div style={{ width: 280 }}>
            <TextField
              label="Website"
              type="url"
              size="small"
              placeholder="https://example.com"
            />
          </div>
          <div style={{ width: 280 }}>
            <TextField
              label="Quantity"
              type="number"
              size="small"
              placeholder="0"
            />
          </div>
        </div>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection
        title="Controlled"
        description="A controlled text field where the consumer manages value and onChange."
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          <div style={{ width: 360 }}>
            <TextField
              label="Controlled input"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              placeholder="Type something..."
            />
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--ld-semantic-color-text-subtle)',
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            paddingBottom: 4,
          }}>
            value: "{controlledValue}"
          </div>
        </div>
      </ExampleSection>

      {/* Uncontrolled with defaultValue */}
      <ExampleSection
        title="Uncontrolled with defaultValue"
        description="For simple forms, use defaultValue instead of value/onChange."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Product SKU"
            defaultValue="SKU-12345"
          />
        </div>
      </ExampleSection>

      {/* All States Side-by-Side (Large) */}
      <ExampleSection
        title="All States - Large Size"
        description="Default, error, disabled, read-only, and magic states displayed side-by-side."
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 220 }}>
            <TextField label="Default" placeholder="Value here" />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Error"
              error="This field is required"
              value=""
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Disabled"
              disabled
              value="Cannot edit"
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Read-only"
              readOnly
              value="View only"
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Magic"
              isMagic
              value="AI generated"
            />
          </div>
        </div>
      </ExampleSection>

      {/* All States Side-by-Side (Small) */}
      <ExampleSection
        title="All States - Small Size"
        description="Small size variants of all states for compact layouts."
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 220 }}>
            <TextField label="Default" size="small" placeholder="Value here" />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Error"
              size="small"
              error="Required"
              value=""
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Disabled"
              size="small"
              disabled
              value="Cannot edit"
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Read-only"
              size="small"
              readOnly
              value="View only"
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Magic"
              size="small"
              isMagic
              value="AI generated"
            />
          </div>
        </div>
      </ExampleSection>

      {/* Complex Example - Search with Clear */}
      <ExampleSection
        title="Search Field Pattern"
        description="Common search pattern with leading search icon and conditional clear button in trailing slot."
      >
        <div style={{ width: 460 }}>
          <TextField
            label="Search products"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name, SKU, or category..."
            leadingIcon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L15.6464 16.3536C15.8417 16.5488 16.1583 16.5488 16.3536 16.3536C16.5488 16.1583 16.5488 15.8417 16.3536 15.6464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5C14 5.46243 11.5376 3 8.5 3ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z" />
              </svg>
            }
            trailingContent={
              searchValue ? (
                <Button
                  variant="tertiary"
                  size="small"
                  onClick={() => setSearchValue('')}
                  UNSAFE_style={{ marginRight: '-4px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </Button>
              ) : null
            }
          />
        </div>
      </ExampleSection>

      {/* With Trailing Button */}
      <ExampleSection
        title="With Action Button"
        description="Trailing content can include action buttons for immediate operations."
      >
        <div style={{ width: 420 }}>
          <TextField
            label="Coupon code"
            placeholder="Enter code"
            trailingContent={
              <Button variant="primary" size="small" UNSAFE_style={{ marginRight: '4px' }}>
                Apply
              </Button>
            }
          />
        </div>
      </ExampleSection>

      {/* Error State with Trailing Content */}
      <ExampleSection
        title="Error with Trailing Content"
        description="Error states work correctly with trailing content."
      >
        <div style={{ width: 360 }}>
          <TextField
            label="Promo code"
            value="INVALID123"
            error="This promo code has expired"
            trailingContent={
              <Button variant="secondary" size="small" UNSAFE_style={{ marginRight: '4px' }}>
                Verify
              </Button>
            }
          />
        </div>
      </ExampleSection>

      {/* Magic State with Trailing Content */}
      <ExampleSection
        title="Magic with Trailing Content"
        description="Magic (AI-generated) state combined with trailing action button."
      >
        <div style={{ width: 420 }}>
          <TextField
            label="Product description"
            isMagic
            value="High-quality wireless headphones with noise cancellation"
            helperText="This description was generated by AI"
            trailingContent={
              <Button variant="secondary" size="small" UNSAFE_style={{ marginRight: '4px' }}>
                Regenerate
              </Button>
            }
          />
        </div>
      </ExampleSection>

      {/* Form Layout Example */}
      <ExampleSection
        title="Form Layout Example"
        description="Multiple text fields in a typical form layout. Notice 16px gap between fields per LD 3.5 spec."
      >
        <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="First name"
            placeholder="Enter first name"
          />
          <TextField
            label="Last name"
            placeholder="Enter last name"
          />
          <TextField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            helperText="We'll use this for campaign notifications"
          />
          <TextField
            label="Phone number"
            type="tel"
            placeholder="(555) 123-4567"
          />
        </div>
      </ExampleSection>

      {/* Interactive States Demo */}
      <ExampleSection
        title="Interactive States (Hover and Focus)"
        description="Hover over these fields to see the hover state (2px border). Click inside to see the focus state. Try all combinations."
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 220 }}>
            <TextField
              label="Hover me"
              placeholder="Normal state"
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Hover me"
              size="small"
              error="Error state"
              placeholder="With error"
            />
          </div>
          <div style={{ width: 220 }}>
            <TextField
              label="Hover me"
              isMagic
              placeholder="Magic state"
            />
          </div>
        </div>
      </ExampleSection>

      {/* Accessibility Example */}
      <ExampleSection
        title="Accessibility Features"
        description="All fields have proper ARIA attributes, label associations, and keyboard navigation support."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 380 }}>
          <TextField
            label="Required field"
            inputProps={{ required: true, 'aria-required': 'true' }}
            helperText="This field is required"
          />
          <TextField
            label="Pattern validation"
            type="tel"
            inputProps={{ pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' }}
            placeholder="555-123-4567"
            helperText="Format: XXX-XXX-XXXX"
          />
          <TextField
            label="Min/max length"
            inputProps={{ minLength: 3, maxLength: 20 }}
            helperText="Between 3 and 20 characters"
          />
        </div>
      </ExampleSection>

      {/* Edge Cases */}
      <ExampleSection
        title="Edge Cases"
        description="Long labels, long error messages, long values - all should wrap gracefully."
      >
        <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="This is an extremely long label that should wrap to multiple lines when the container is constrained"
            placeholder="Value"
          />
          <TextField
            label="Long error message"
            error="This is a very detailed error message that explains exactly what went wrong and provides guidance on how to fix the issue. It should wrap properly to multiple lines."
            value="Invalid input"
          />
          <TextField
            label="Long helper text"
            helperText="This helper text is intentionally verbose to demonstrate how the component handles long supporting messages that need to wrap across multiple lines in the layout."
            placeholder="Enter value"
          />
        </div>
      </ExampleSection>
    </div>
  );
}

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          margin: 0,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: '4px 0 0',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {description}
        </p>
      </div>
      <div style={{
        padding: '24px',
        borderRadius: 'var(--ld-primitive-scale-borderradius-100)',
        border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
        backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
        display: 'flex',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}
