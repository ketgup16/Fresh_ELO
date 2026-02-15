import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import * as Icons from '@/components/icons';

const ChevronDown = Icons.ChevronDown;
const ChevronUp = Icons.ChevronUp;
const ArrowUp = Icons.ArrowUp;

// Extract all CSS custom properties from the document
function extractTokens(prefix: string): Array<{ name: string; value: string; computed: string }> {
  const tokens: Array<{ name: string; value: string; computed: string }> = [];
  const styles = getComputedStyle(document.documentElement);
  
  // Get all CSS custom properties
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const sheet = document.styleSheets[i];
      if (!sheet.cssRules) continue;
      
      for (let j = 0; j < sheet.cssRules.length; j++) {
        const rule = sheet.cssRules[j];
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          const styleDeclaration = rule.style;
          for (let k = 0; k < styleDeclaration.length; k++) {
            const propName = styleDeclaration[k];
            if (propName.startsWith(prefix)) {
              const value = styleDeclaration.getPropertyValue(propName).trim();
              const computed = styles.getPropertyValue(propName).trim();
              tokens.push({ name: propName, value, computed });
            }
          }
        }
      }
    } catch (e) {
      // Skip inaccessible stylesheets (CORS)
      continue;
    }
  }
  
  // Remove duplicates and sort
  const unique = Array.from(new Map(tokens.map(t => [t.name, t])).values());
  return unique.sort((a, b) => a.name.localeCompare(b.name));
}

export default function ThemesPage() {
  const [colorTokens, setColorTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [spaceTokens, setSpaceTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [textTokens, setTextTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [otherTokens, setOtherTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);
  const [currentFontFamily, setCurrentFontFamily] = React.useState<string>('');
  
  const [colorExpanded, setColorExpanded] = React.useState(true);
  const [spaceExpanded, setSpaceExpanded] = React.useState(false);
  const [textExpanded, setTextExpanded] = React.useState(false);
  const [otherExpanded, setOtherExpanded] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Function to extract and update all tokens
  const updateAllTokens = React.useCallback(() => {
    // Extract color tokens
    const colors = extractTokens('--ld-semantic-color');
    const wcpColors = extractTokens('--wcp-semantic-color');
    const allColors = [...colors, ...wcpColors];

    // Extract space tokens
    const spaces = extractTokens('--ld-semantic-spacing');
    const primitiveSpaces = extractTokens('--ld-primitive-scale-space');
    const allSpaces = [...spaces, ...primitiveSpaces];

    // Extract text/typography tokens
    const textFonts = extractTokens('--ld-semantic-font');
    const textPrimitive = extractTokens('--ld-primitive-font');
    const allText = [...textFonts, ...textPrimitive];

    // Extract other tokens (borders, elevation, duration, etc)
    const borders = extractTokens('--ld-semantic-border');
    const elevation = extractTokens('--ld-semantic-elevation');
    const duration = extractTokens('--ld-semantic-duration');
    const opacity = extractTokens('--ld-semantic-opacity');
    const zIndex = extractTokens('--ld-semantic-z-index');
    const allOther = [...borders, ...elevation, ...duration, ...opacity, ...zIndex];

    // Update all state
    setColorTokens(allColors);
    setSpaceTokens(allSpaces);
    setTextTokens(allText);
    setOtherTokens(allOther);

    // Get current font family
    const styles = getComputedStyle(document.documentElement);
    const fontFamily = styles.getPropertyValue('--ld-semantic-font-family-sans').trim();
    setCurrentFontFamily(fontFamily);
  }, []);

  React.useEffect(() => {
    // Extract tokens on mount
    updateAllTokens();

    // Listen for theme changes by watching for custom event or DOM changes
    // Re-run extraction when any CSS link or style tag changes
    const handleThemeChange = () => {
      // Small delay to ensure CSS has loaded
      setTimeout(updateAllTokens, 100);
    };

    // Watch for class changes on html/body (theme switching often changes these)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          handleThemeChange();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style']
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style']
    });

    // Also listen for style tag changes (theme CSS injection)
    const styleObserver = new MutationObserver(handleThemeChange);
    const head = document.head;
    styleObserver.observe(head, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      styleObserver.disconnect();
    };
  }, [updateAllTokens]);

  // Handle scroll for back-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToken = (tokenName: string) => {
    navigator.clipboard.writeText(`var(${tokenName})`);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" style={{
      padding: '48px',
      maxWidth: '100%',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '12px'
        }}>
          Themes & Design Tokens
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtlest)',
          maxWidth: '900px',
          marginBottom: '24px'
        }}>
          Switch between brand themes and explore all Living Design 3.5 design tokens.
          All components use these semantic tokens to ensure consistent theming across the application.
        </p>
      </div>

      {/* Quick Navigation */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '20px 24px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Quick Navigate
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('theme-selector')}
          >
            Theme Selector
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('color-tokens')}
          >
            Color Tokens ({colorTokens.length})
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('space-tokens')}
          >
            Space Tokens ({spaceTokens.length})
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('text-tokens')}
          >
            Text Tokens ({textTokens.length})
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('other-tokens')}
          >
            Other Tokens ({otherTokens.length})
          </Button>
        </div>
      </div>

      {/* Theme Selector - Full Width Card */}
      <div id="theme-selector" style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '48px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Theme Switcher */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '16px'
            }}>
              Select Theme
            </h2>
            <ThemeSwitcher />
          </div>

          {/* Theme Info */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '16px'
            }}>
              Current Theme Details
            </h2>
            
            {/* Font Family Display */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              borderRadius: '6px',
              boxShadow: 'var(--ld-semantic-elevation-100)',
              marginBottom: '16px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text-subtlest)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Active Font Family
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '4px'
              }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginTop: '8px',
                padding: '8px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '4px'
              }}>
                {currentFontFamily || 'EverydaySans, Helvetica Neue, Arial, sans-serif'}
              </div>
            </div>

            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--ld-semantic-color-text-subtle)',
              marginBottom: '16px'
            }}>
              Themes are complete sets of design tokens that define the visual appearance of components.
              When you switch themes, all components automatically update to match the new color palette and typography.
            </p>
            
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--ld-semantic-color-border-info)'
            }}>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.5',
                color: 'var(--ld-semantic-color-text)',
                margin: 0,
                fontFamily: 'var(--ld-semantic-font-family-mono)',
              }}>
                ✅ Always use semantic tokens: <code>var(--ld-semantic-color-action-fill-primary)</code><br/>
                ❌ Never use hard-coded values: <code style={{ color: 'var(--ld-semantic-color-text-negative)' }}>#0071DC</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Tokens Section */}
      <div id="color-tokens" style={{ marginBottom: '48px' }}>
        <button
          onClick={() => setColorExpanded(!colorExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: colorExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              Color Tokens
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {colorTokens.length} tokens
            </span>
          </div>
          {colorExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {colorExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px] sticky top-0 bg-muted z-10">Color</TableHead>
                  <TableHead className="sticky top-0 bg-muted z-10">Token Name</TableHead>
                  <TableHead className="w-[280px] sticky top-0 bg-muted z-10">Computed Value</TableHead>
                  <TableHead className="w-[120px] text-right sticky top-0 bg-muted z-10">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colorTokens.map((token) => (
                  <TableRow key={token.name}>
                    <TableCell>
                      <div style={{
                        width: '80px',
                        height: '40px',
                        backgroundColor: token.computed || `var(${token.name})`,
                        borderRadius: '4px',
                        border: '1px solid var(--ld-semantic-color-border-subtle)',
                      }} />
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {token.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {token.computed || token.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={copiedToken === token.name ? "primary" : "secondary"}
                        size="small"
                        onClick={() => copyToken(token.name)}
                      >
                        {copiedToken === token.name ? '✓ Copied' : 'Copy'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Space Tokens Section */}
      <div id="space-tokens" style={{ marginBottom: '48px' }}>
        <button
          onClick={() => setSpaceExpanded(!spaceExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: spaceExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              Space Tokens
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {spaceTokens.length} tokens
            </span>
          </div>
          {spaceExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {spaceExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] sticky top-0 bg-muted z-10">Size</TableHead>
                  <TableHead className="sticky top-0 bg-muted z-10">Token Name</TableHead>
                  <TableHead className="w-[180px] sticky top-0 bg-muted z-10">Value</TableHead>
                  <TableHead className="w-[120px] sticky top-0 bg-muted z-10">Pixels</TableHead>
                  <TableHead className="w-[120px] text-right sticky top-0 bg-muted z-10">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spaceTokens.map((token) => {
                  const remValue = token.computed || token.value;
                  const pixels = remValue.includes('rem') 
                    ? `${parseFloat(remValue) * 16}px` 
                    : remValue;
                  
                  return (
                    <TableRow key={token.name}>
                      <TableCell>
                        <div style={{
                          width: token.computed || token.value,
                          height: '24px',
                          backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
                          borderRadius: '2px',
                          minWidth: '4px'
                        }} />
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {token.name}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {remValue}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground font-semibold">
                        {pixels}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={copiedToken === token.name ? "primary" : "secondary"}
                          size="small"
                          onClick={() => copyToken(token.name)}
                        >
                          {copiedToken === token.name ? '✓' : 'Copy'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Text/Typography Tokens Section */}
      <div id="text-tokens" style={{ marginBottom: '48px' }}>
        <button
          onClick={() => setTextExpanded(!textExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: textExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              Text Tokens
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {textTokens.length} tokens (font families, sizes, weights, line heights)
            </span>
          </div>
          {textExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {textExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] sticky top-0 bg-muted z-10">Preview</TableHead>
                  <TableHead className="sticky top-0 bg-muted z-10">Token Name</TableHead>
                  <TableHead className="w-[300px] sticky top-0 bg-muted z-10">Value</TableHead>
                  <TableHead className="w-[120px] text-right sticky top-0 bg-muted z-10">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {textTokens.map((token) => {
                  const isFontFamily = token.name.includes('family');
                  const isFontSize = token.name.includes('size');
                  const isFontWeight = token.name.includes('weight');
                  const isLineHeight = token.name.includes('line-height') || token.name.includes('lineheight');
                  
                  return (
                    <TableRow key={token.name}>
                      <TableCell>
                        {isFontFamily && (
                          <div style={{
                            fontSize: '14px',
                            fontFamily: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                          }}>
                            Abc 123
                          </div>
                        )}
                        {isFontSize && (
                          <div style={{
                            fontSize: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                          }}>
                            Aa
                          </div>
                        )}
                        {isFontWeight && (
                          <div style={{
                            fontSize: '14px',
                            fontWeight: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                          }}>
                            Weight
                          </div>
                        )}
                        {isLineHeight && (
                          <div style={{
                            fontSize: '12px',
                            lineHeight: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                            border: '1px dashed var(--ld-semantic-color-border-subtle)',
                            padding: '4px',
                            display: 'inline-block'
                          }}>
                            Line<br/>Height
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {token.name}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        <div style={{ wordBreak: 'break-all' }}>
                          {token.computed || token.value}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={copiedToken === token.name ? "primary" : "secondary"}
                          size="small"
                          onClick={() => copyToken(token.name)}
                        >
                          {copiedToken === token.name ? '✓' : 'Copy'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Other Tokens Section */}
      <div id="other-tokens">
        <button
          onClick={() => setOtherExpanded(!otherExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: otherExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              Other Tokens
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {otherTokens.length} tokens (borders, elevation, duration, opacity, z-index)
            </span>
          </div>
          {otherExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {otherExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-muted z-10">Token Name</TableHead>
                  <TableHead className="w-[350px] sticky top-0 bg-muted z-10">Value</TableHead>
                  <TableHead className="w-[120px] text-right sticky top-0 bg-muted z-10">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {otherTokens.map((token) => (
                  <TableRow key={token.name}>
                    <TableCell className="font-mono text-xs">
                      {token.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <div style={{ wordBreak: 'break-all' }}>
                        {token.computed || token.value}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={copiedToken === token.name ? "primary" : "secondary"}
                        size="small"
                        onClick={() => copyToken(token.name)}
                      >
                        {copiedToken === token.name ? '✓' : 'Copy'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Usage Note */}
      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '12px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          How to Use Design Tokens
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>In CSS:</strong><br />
            <code style={{
              display: 'block',
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              borderRadius: '4px',
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '12px',
            }}>
              color: var(--ld-semantic-color-text);
            </code>
          </div>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>In inline styles:</strong><br />
            <code style={{
              display: 'block',
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              borderRadius: '4px',
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '12px',
            }}>
              style=&#123;&#123; color: 'var(--ld-semantic-color-text)' &#125;&#125;
            </code>
          </div>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Why tokens matter:</strong><br />
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Enables theme switching</li>
              <li>Ensures brand consistency</li>
              <li>Centralizes design updates</li>
              <li>Maintains accessibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
            color: 'var(--ld-semantic-color-action-text-on-fill-primary)',
            border: 'none',
            boxShadow: 'var(--ld-semantic-elevation-300)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary-hovered)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Back to top"
        >
          <ArrowUp style={{ width: 24, height: 24 }} />
        </button>
      )}
    </div>
  );
}
