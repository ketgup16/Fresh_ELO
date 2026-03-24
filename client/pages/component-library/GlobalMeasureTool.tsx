import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './GlobalMeasureTool.module.css';

function fmt(v: string): string {
  const n = Math.round(parseFloat(v));
  return isNaN(n) ? '—' : `${n}px`;
}

function shorthand(t: string, r: string, b: string, l: string): string {
  const vs = [t, r, b, l].map(v => `${Math.round(parseFloat(v))}px`);
  if (vs[0] === vs[1] && vs[1] === vs[2] && vs[2] === vs[3]) return vs[0];
  if (vs[0] === vs[2] && vs[1] === vs[3]) return `${vs[0]} ${vs[1]}`;
  return vs.join(' ');
}

function allZero(vals: string[]): boolean {
  return vals.every(v => parseFloat(v) === 0);
}

function hasDirectText(el: HTMLElement): boolean {
  return Array.from(el.childNodes).some(
    n => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim().length ?? 0) > 0
  );
}

function cleanFontFamily(raw: string): string {
  return raw.split(',')[0].replace(/['"]/g, '').trim();
}

interface HighlightState {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TooltipData {
  tag: string;
  width: number;
  height: number;
  padding: [string, string, string, string];
  margin: [string, string, string, string];
  gap: string | null;
  borderRadius: string;
  showType: boolean;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  textColor: string;
}

// Pencil ruler icon
function RulerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.5 14L14 2.5l3.5 3.5L6 17.5H2.5V14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 5.5L14.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function GlobalMeasureTool() {
  const [active, setActive] = useState(false);
  const [highlight, setHighlight] = useState<HighlightState | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });

    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;

    // Skip our own measure UI
    if (!el || el.closest('[data-measure-ignore]')) {
      setHighlight(null);
      setTooltip(null);
      return;
    }

    const computed = getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    setHighlight({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });

    const tag = el.tagName.toLowerCase();
    const isFlexOrGrid = computed.display === 'flex' || computed.display === 'grid';
    const showType = hasDirectText(el);

    setTooltip({
      tag,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      padding: [computed.paddingTop, computed.paddingRight, computed.paddingBottom, computed.paddingLeft],
      margin: [computed.marginTop, computed.marginRight, computed.marginBottom, computed.marginLeft],
      gap: isFlexOrGrid ? computed.gap : null,
      borderRadius: computed.borderRadius,
      showType,
      fontFamily: cleanFontFamily(computed.fontFamily),
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      lineHeight: computed.lineHeight,
      textColor: computed.color,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHighlight(null);
    setTooltip(null);
  }, []);

  useEffect(() => {
    if (!active) {
      setHighlight(null);
      setTooltip(null);
      document.body.style.cursor = '';
      return;
    }
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active, handleMouseMove, handleMouseLeave]);

  // Clamp tooltip so it stays in viewport
  const TIP_W = 250;
  const TIP_H = tooltip?.showType ? 220 : 140;
  const tipX = mouse.x + 16 + TIP_W > window.innerWidth ? mouse.x - TIP_W - 8 : mouse.x + 16;
  const tipY = mouse.y + 16 + TIP_H > window.innerHeight ? mouse.y - TIP_H - 8 : mouse.y + 16;

  return (
    <>
      {/* Floating Action Button */}
      <button
        data-measure-ignore="true"
        className={`${styles.fab} ${active ? styles.fabActive : ''}`}
        onClick={() => setActive(a => !a)}
        aria-label={active ? 'Deactivate measure tool' : 'Activate measure tool'}
        title="Measure tool"
      >
        <RulerIcon />
        <span className={styles.fabLabel}>{active ? 'Measuring' : 'Measure'}</span>
      </button>

      {active && createPortal(
        <>
          {/* Magenta highlight box */}
          {highlight && (
            <div
              data-measure-ignore="true"
              className={styles.highlight}
              style={{
                top: highlight.top,
                left: highlight.left,
                width: highlight.width,
                height: highlight.height,
              }}
            />
          )}

          {/* Floating tooltip */}
          {tooltip && (
            <div
              data-measure-ignore="true"
              className={styles.tooltip}
              style={{ top: tipY, left: tipX }}
            >
              <div className={styles.tooltipTag}>{tooltip.tag}</div>
              <div className={styles.divider} />

              <div className={styles.row}>
                <span className={styles.lbl}>Size</span>
                <span className={styles.val}>{tooltip.width} × {tooltip.height}</span>
              </div>

              {!allZero(tooltip.padding) && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Padding</span>
                  <span className={styles.val}>{shorthand(...tooltip.padding)}</span>
                </div>
              )}

              {!allZero(tooltip.margin) && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Margin</span>
                  <span className={styles.val}>{shorthand(...tooltip.margin)}</span>
                </div>
              )}

              {tooltip.gap && tooltip.gap !== 'normal' && !tooltip.gap.startsWith('0px') && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Gap</span>
                  <span className={styles.val}>{tooltip.gap}</span>
                </div>
              )}

              {tooltip.borderRadius && !tooltip.borderRadius.startsWith('0px') && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Radius</span>
                  <span className={styles.val}>{tooltip.borderRadius}</span>
                </div>
              )}

              {tooltip.showType && (
                <>
                  <div className={styles.divider} />
                  <div className={styles.sectionLabel}>Type</div>

                  <div className={styles.row}>
                    <span className={styles.lbl}>Family</span>
                    <span className={styles.val} style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {tooltip.fontFamily}
                    </span>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.lbl}>Size</span>
                    <span className={styles.val}>{fmt(tooltip.fontSize)}</span>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.lbl}>Weight</span>
                    <span className={styles.val}>{tooltip.fontWeight}</span>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.lbl}>Leading</span>
                    <span className={styles.val}>{fmt(tooltip.lineHeight)}</span>
                  </div>

                  <div className={styles.row}>
                    <span className={styles.lbl}>Color</span>
                    <span className={styles.val}>
                      <span className={styles.colorSwatch} style={{ background: tooltip.textColor }} />
                      {tooltip.textColor}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
