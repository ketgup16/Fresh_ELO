import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

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

  React.useEffect(() => {
    // Extract tokens on mount and when theme changes
    const colors = extractTokens('--ld-semantic-color');
    const wcpColors = extractTokens('--wcp-semantic-color');
    const allColors = [...colors, ...wcpColors];

    const spaces = extractTokens('--ld-semantic-spacing');
    const primitiveSpaces = extractTokens('--ld-primitive-scale-space');
    const allSpaces = [...spaces, ...primitiveSpaces];

    // Extract text/typography tokens separately
    const textFonts = extractTokens('--ld-semantic-font');
    const textPrimitive = extractTokens('--ld-primitive-font');
    const allText = [...textFonts, ...textPrimitive];

    // Get other useful tokens (borders, elevation, duration, etc)
    const borders = extractTokens('--ld-semantic-border');
    const elevation = extractTokens('--ld-semantic-elevation');
    const duration = extractTokens('--ld-semantic-duration');
    const opacity = extractTokens('--ld-semantic-opacity');
    const zIndex = extractTokens('--ld-semantic-z-index');
    const allOther = [...borders, ...elevation, ...duration, ...opacity, ...zIndex];

    setColorTokens(allColors);
    setSpaceTokens(allSpaces);
    setTextTokens(allText);
    setOtherTokens(allOther);

    // Get current font family
    const styles = getComputedStyle(document.documentElement);
    const fontFamily = styles.getPropertyValue('--ld-semantic-font-family-sans').trim();
    setCurrentFontFamily(fontFamily);

    // Re-run when theme changes (listen to CSS variable changes)
    const observer = new MutationObserver(() => {
      const newStyles = getComputedStyle(document.documentElement);
      const newFontFamily = newStyles.getPropertyValue('--ld-semantic-font-family-sans').trim();
      if (newFontFamily !== currentFontFamily) {
        setCurrentFontFamily(newFontFamily);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => observer.disconnect();
  }, [currentFontFamily]);

  const copyToken = (tokenName: string) => {
    navigator.clipboard.writeText(`var(${tokenName})`);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const isColorToken = (name: string) => name.includes('color');

  return (
    <div style={{
      padding: '48px',
      maxWidth: '100%',
      margin: '0 auto'
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

      {/* Theme Selector - Full Width Card */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid var(--ld-semantic-color-border-subtle)',
        marginBottom: '48px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
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
              border: '1px solid var(--ld-semantic-color-border-subtle)',
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

      {/* Color Tokens Table */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
          }}>
            Color Tokens
          </h2>
          <div style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtlest)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            {colorTokens.length} tokens
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: '8px',
          border: '1px solid var(--ld-semantic-color-border-subtle)',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
              }}>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '60px'
                }}>
                  Color
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Token Name
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '200px'
                }}>
                  Computed Value
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '100px'
                }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {colorTokens.map((token, index) => (
                <tr
                  key={token.name}
                  style={{
                    borderBottom: index < colorTokens.length - 1 ? '1px solid var(--ld-semantic-color-border-subtlest)' : 'none',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      backgroundColor: token.computed || `var(${token.name})`,
                      border: '1px solid var(--ld-semantic-color-border-subtle)',
                    }} />
                  </td>
                  <td style={{
                    padding: '10px 16px',
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    color: 'var(--ld-semantic-color-text)',
                  }}>
                    {token.name}
                  </td>
                  <td style={{
                    padding: '10px 16px',
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    color: 'var(--ld-semantic-color-text-subtlest)',
                  }}>
                    {token.computed || token.value}
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <button
                      onClick={() => copyToken(token.name)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: copiedToken === token.name 
                          ? 'var(--ld-semantic-color-text-positive)' 
                          : 'var(--ld-semantic-color-text-brand)',
                        backgroundColor: 'transparent',
                        border: '1px solid currentColor',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                      }}
                      onMouseEnter={(e) => {
                        if (copiedToken !== token.name) {
                          e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-brand-subtle)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {copiedToken === token.name ? '✓ Copied' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Space Tokens Table */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
          }}>
            Space Tokens
          </h2>
          <div style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtlest)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            {spaceTokens.length} tokens
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: '8px',
          border: '1px solid var(--ld-semantic-color-border-subtle)',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
              }}>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '100px'
                }}>
                  Size
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Token Name
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '150px'
                }}>
                  Value
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '100px'
                }}>
                  Pixels
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '100px'
                }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {spaceTokens.map((token, index) => {
                const remValue = token.computed || token.value;
                const pixels = remValue.includes('rem') 
                  ? `${parseFloat(remValue) * 16}px` 
                  : remValue;
                
                return (
                  <tr
                    key={token.name}
                    style={{
                      borderBottom: index < spaceTokens.length - 1 ? '1px solid var(--ld-semantic-color-border-subtlest)' : 'none',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{
                        width: token.computed || token.value,
                        height: '24px',
                        backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
                        borderRadius: '2px',
                        minWidth: '4px'
                      }} />
                    </td>
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text)',
                    }}>
                      {token.name}
                    </td>
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-subtlest)',
                    }}>
                      {remValue}
                    </td>
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-subtlest)',
                      fontWeight: '600'
                    }}>
                      {pixels}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <button
                        onClick={() => copyToken(token.name)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: copiedToken === token.name 
                            ? 'var(--ld-semantic-color-text-positive)' 
                            : 'var(--ld-semantic-color-text-brand)',
                          backgroundColor: 'transparent',
                          border: '1px solid currentColor',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                        }}
                        onMouseEnter={(e) => {
                          if (copiedToken !== token.name) {
                            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-brand-subtle)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {copiedToken === token.name ? '✓' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Text/Typography Tokens Table */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
          }}>
            Text Tokens
          </h2>
          <div style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtlest)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            {textTokens.length} tokens (font families, sizes, weights, line heights)
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: '8px',
          border: '1px solid var(--ld-semantic-color-border-subtle)',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
              }}>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '150px'
                }}>
                  Preview
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Token Name
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '250px'
                }}>
                  Value
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: 'var(--ld-semantic-color-text)',
                  width: '100px'
                }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {textTokens.map((token, index) => {
                const isFontFamily = token.name.includes('family');
                const isFontSize = token.name.includes('size');
                const isFontWeight = token.name.includes('weight');
                const isLineHeight = token.name.includes('line-height') || token.name.includes('lineheight');

                return (
                  <tr
                    key={token.name}
                    style={{
                      borderBottom: index < textTokens.length - 1 ? '1px solid var(--ld-semantic-color-border-subtlest)' : 'none',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '10px 16px' }}>
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
                          padding: '4px'
                        }}>
                          Line<br/>Height
                        </div>
                      )}
                    </td>
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text)',
                    }}>
                      {token.name}
                    </td>
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-subtlest)',
                      wordBreak: 'break-all'
                    }}>
                      {token.computed || token.value}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <button
                        onClick={() => copyToken(token.name)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: copiedToken === token.name
                            ? 'var(--ld-semantic-color-text-positive)'
                            : 'var(--ld-semantic-color-text-brand)',
                          backgroundColor: 'transparent',
                          border: '1px solid currentColor',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                        }}
                        onMouseEnter={(e) => {
                          if (copiedToken !== token.name) {
                            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-brand-subtle)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {copiedToken === token.name ? '✓' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other Tokens Table (Border, Elevation, Duration, etc) */}
      {otherTokens.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
            }}>
              Other Tokens
            </h2>
            <div style={{
              fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtlest)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            {otherTokens.length} tokens (borders, elevation, duration, opacity, z-index)
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-border-subtle)',
            overflow: 'hidden'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              <thead>
                <tr style={{
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
                }}>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--ld-semantic-color-text)',
                  }}>
                    Token Name
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--ld-semantic-color-text)',
                    width: '300px'
                  }}>
                    Value
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--ld-semantic-color-text)',
                    width: '100px'
                  }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherTokens.map((token, index) => (
                  <tr
                    key={token.name}
                    style={{
                      borderBottom: index < otherTokens.length - 1 ? '1px solid var(--ld-semantic-color-border-subtlest)' : 'none',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text)',
                    }}>
                      {token.name}
                    </td>
                    <td style={{
                      padding: '10px 16px',
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-subtlest)',
                      wordBreak: 'break-all'
                    }}>
                      {token.computed || token.value}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <button
                        onClick={() => copyToken(token.name)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: copiedToken === token.name 
                            ? 'var(--ld-semantic-color-text-positive)' 
                            : 'var(--ld-semantic-color-text-brand)',
                          backgroundColor: 'transparent',
                          border: '1px solid currentColor',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                        }}
                        onMouseEnter={(e) => {
                          if (copiedToken !== token.name) {
                            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-brand-subtle)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {copiedToken === token.name ? '✓' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
    </div>
  );
}
