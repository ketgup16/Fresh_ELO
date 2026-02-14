import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/tag';
import { OLQTag } from '@/components/ui/olq-tag';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import * as Icons from '@/components/icons';

type ComponentType = 'button' | 'badge' | 'chip' | 'filterchip' | 'tag' | 'olqtag' | 'iconbutton' | 'checkbox' | 'radio';

const components = [
  { id: 'button', name: 'Button' },
  { id: 'badge', name: 'Badge' },
  { id: 'chip', name: 'Chip' },
  { id: 'filterchip', name: 'Filter Chip' },
  { id: 'tag', name: 'Tag' },
  { id: 'olqtag', name: 'OLQ Tag' },
  { id: 'iconbutton', name: 'Icon Button' },
  { id: 'checkbox', name: 'Checkbox' },
  { id: 'radio', name: 'Radio' },
];

export default function ComponentTester() {
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentType>('button');
  
  // Button props
  const [buttonVariant, setButtonVariant] = React.useState<'primary' | 'secondary' | 'tertiary' | 'destructive'>('primary');
  const [buttonSize, setButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Click me');
  
  // Badge props
  const [badgeVariant, setBadgeVariant] = React.useState<'default' | 'info' | 'success' | 'warning' | 'error'>('default');
  const [badgeContent, setBadgeContent] = React.useState('5');
  
  // Chip props
  const [chipSelected, setChipSelected] = React.useState(false);
  const [chipText, setChipText] = React.useState('Chip Label');
  
  // Filter Chip props
  const [filterChipSelected, setFilterChipSelected] = React.useState(false);
  const [filterChipText, setFilterChipText] = React.useState('Filter');
  const [filterChipCount, setFilterChipCount] = React.useState(12);
  
  // Tag props
  const [tagVariant, setTagVariant] = React.useState<'default' | 'success' | 'warning' | 'error' | 'info'>('default');
  const [tagText, setTagText] = React.useState('Tag Label');
  
  // OLQ Tag props
  const [olqPercentage, setOlqPercentage] = React.useState(85);
  
  // Icon Button props
  const [iconButtonVariant, setIconButtonVariant] = React.useState<'ghost' | 'primary' | 'secondary' | 'destructive'>('ghost');
  const [iconButtonSize, setIconButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  
  // Checkbox props
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [checkboxLabel, setCheckboxLabel] = React.useState('Checkbox Label');
  
  // Radio props
  const [radioValue, setRadioValue] = React.useState('option1');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        );
      
      case 'badge':
        return <Badge variant={badgeVariant}>{badgeContent}</Badge>;
      
      case 'chip':
        return (
          <Chip
            selected={chipSelected}
            onClick={() => setChipSelected(!chipSelected)}
          >
            {chipText}
          </Chip>
        );
      
      case 'filterchip':
        return (
          <FilterChip
            selected={filterChipSelected}
            count={filterChipCount}
            onClick={() => setFilterChipSelected(!filterChipSelected)}
          >
            {filterChipText}
          </FilterChip>
        );
      
      case 'tag':
        return <Tag variant={tagVariant}>{tagText}</Tag>;
      
      case 'olqtag':
        return <OLQTag percentage={olqPercentage} />;
      
      case 'iconbutton':
        return (
          <IconButton
            variant={iconButtonVariant}
            size={iconButtonSize}
            aria-label="Settings"
          >
            <Icons.Settings size={20} />
          </IconButton>
        );
      
      case 'checkbox':
        return (
          <Checkbox
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
            label={checkboxLabel}
          />
        );
      
      case 'radio':
        return (
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
          </RadioGroup>
        );
      
      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Variant
              </label>
              <select
                value={buttonVariant}
                onChange={(e) => setButtonVariant(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="tertiary">Tertiary</option>
                <option value="destructive">Destructive</option>
              </select>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Size
              </label>
              <select
                value={buttonSize}
                onChange={(e) => setButtonSize(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Text
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <Checkbox
                checked={buttonDisabled}
                onCheckedChange={(checked) => setButtonDisabled(checked as boolean)}
                label="Disabled"
              />
            </div>
          </div>
        );
      
      case 'badge':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Variant
              </label>
              <select
                value={badgeVariant}
                onChange={(e) => setBadgeVariant(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              >
                <option value="default">Default</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Content
              </label>
              <input
                type="text"
                value={badgeContent}
                onChange={(e) => setBadgeContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        );
      
      case 'chip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Text
              </label>
              <input
                type="text"
                value={chipText}
                onChange={(e) => setChipText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <Checkbox
                checked={chipSelected}
                onCheckedChange={(checked) => setChipSelected(checked as boolean)}
                label="Selected"
              />
            </div>
          </div>
        );
      
      case 'filterchip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Text
              </label>
              <input
                type="text"
                value={filterChipText}
                onChange={(e) => setFilterChipText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Count
              </label>
              <input
                type="number"
                value={filterChipCount}
                onChange={(e) => setFilterChipCount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <Checkbox
                checked={filterChipSelected}
                onCheckedChange={(checked) => setFilterChipSelected(checked as boolean)}
                label="Selected"
              />
            </div>
          </div>
        );
      
      case 'tag':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Variant
              </label>
              <select
                value={tagVariant}
                onChange={(e) => setTagVariant(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              >
                <option value="default">Default</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Text
              </label>
              <input
                type="text"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        );
      
      case 'olqtag':
        return (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
            }}>
              Percentage (0-100)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={olqPercentage}
              onChange={(e) => setOlqPercentage(Number(e.target.value))}
              style={{ width: '100%', marginBottom: '8px' }}
            />
            <div style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-secondary, #74767C)'
            }}>
              {olqPercentage}%
            </div>
          </div>
        );
      
      case 'iconbutton':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Variant
              </label>
              <select
                value={iconButtonVariant}
                onChange={(e) => setIconButtonVariant(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              >
                <option value="ghost">Ghost</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="destructive">Destructive</option>
              </select>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Size
              </label>
              <select
                value={iconButtonSize}
                onChange={(e) => setIconButtonSize(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
              }}>
                Label
              </label>
              <input
                type="text"
                value={checkboxLabel}
                onChange={(e) => setCheckboxLabel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        );
      
      case 'radio':
        return (
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F7F7F8)',
            borderRadius: '6px',
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)'
          }}>
            Click the radio buttons in the preview to change the selection
          </div>
        );
      
      default:
        return null;
    }
  };

  const getCodeSnippet = () => {
    switch (selectedComponent) {
      case 'button':
        return `<Button
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}
>
  ${buttonText}
</Button>`;
      
      case 'badge':
        return `<Badge variant="${badgeVariant}">${badgeContent}</Badge>`;
      
      case 'chip':
        return `<Chip${chipSelected ? ' selected' : ''}>
  ${chipText}
</Chip>`;
      
      case 'filterchip':
        return `<FilterChip${filterChipSelected ? ' selected' : ''}
  count={${filterChipCount}}
>
  ${filterChipText}
</FilterChip>`;
      
      case 'tag':
        return `<Tag variant="${tagVariant}">${tagText}</Tag>`;
      
      case 'olqtag':
        return `<OLQTag percentage={${olqPercentage}} />`;
      
      case 'iconbutton':
        return `<IconButton
  variant="${iconButtonVariant}"
  size="${iconButtonSize}"
  aria-label="Settings"
>
  <Icons.Settings size={20} />
</IconButton>`;
      
      case 'checkbox':
        return `<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
  label="${checkboxLabel}"
/>`;
      
      case 'radio':
        return `<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>`;
      
      default:
        return '';
    }
  };

  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Component Sandbox
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          Interactive testing environment for Living Design 3.5 components. Select a component and adjust its properties to see live updates.
        </p>
      </div>

      {/* Component Selector */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '12px',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
        }}>
          Select Component
        </label>
        <select
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value as ComponentType)}
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: '2px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
            cursor: 'pointer',
            minWidth: '200px'
          }}
        >
          {components.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '24px'
      }}>
        {/* Controls Panel */}
        <div>
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
            }}>
              Properties
            </h3>
            {renderControls()}
          </div>
        </div>

        {/* Preview & Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Preview */}
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
            padding: '48px',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {renderComponent()}
          </div>

          {/* Code Snippet */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
            }}>
              Code
            </h3>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-fill-surface-tertiary, #2E2F32)',
              padding: '20px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#E6E6E8',
              overflowX: 'auto',
              whiteSpace: 'pre'
            }}>
              {getCodeSnippet()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
