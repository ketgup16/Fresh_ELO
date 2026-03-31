import { useState, useEffect, useCallback } from 'react';
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

interface GapRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface HighlightState {
  // Content/border box
  top: number;
  left: number;
  width: number;
  height: number;
  // Spacing (in px numbers for overlay math)
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
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

// Color tokens for box-model layers
const COLOR_MARGIN  = '#fb923c'; // orange
const COLOR_SIZE    = '#e879f9'; // magenta
const COLOR_PADDING = '#4ade80'; // green
const COLOR_GAP     = '#22d3ee'; // cyan

// Pencil ruler icon
function RulerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.5 14L14 2.5l3.5 3.5L6 17.5H2.5V14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 5.5L14.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LegendSwatch({ color }: { color: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: 2,
        background: color,
        flexShrink: 0,
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    />
  );
}

export function GlobalMeasureTool() {
  const [active, setActive] = useState(false);
  const [highlight, setHighlight] = useState<HighlightState | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [gapRects, setGapRects] = useState<GapRect[]>([]);

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

    const px = (v: string) => parseFloat(v) || 0;

    setHighlight({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      marginTop:    px(computed.marginTop),
      marginRight:  px(computed.marginRight),
      marginBottom: px(computed.marginBottom),
      marginLeft:   px(computed.marginLeft),
      paddingTop:    px(computed.paddingTop),
      paddingRight:  px(computed.paddingRight),
      paddingBottom: px(computed.paddingBottom),
      paddingLeft:   px(computed.paddingLeft),
    });

    const tag = el.tagName.toLowerCase();
    const isFlexOrGrid = computed.display === 'flex' || computed.display === 'grid';
    const showType = hasDirectText(el);

    setTooltip({
      tag,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      padding: [computed.paddingTop, computed.paddingRight, computed.paddingBottom, computed.paddingLeft],
      margin:  [computed.marginTop, computed.marginRight, computed.marginBottom, computed.marginLeft],
      gap: isFlexOrGrid ? computed.gap : null,
      borderRadius: computed.borderRadius,
      showType,
      fontFamily: cleanFontFamily(computed.fontFamily),
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      lineHeight: computed.lineHeight,
      textColor: computed.color,
    });

    // ── Gap overlays: show gaps between children of a flex/grid container ──
    function collectGapRects(container: HTMLElement, rects: GapRect[]) {
      const cs = getComputedStyle(container);
      const disp = cs.display;
      if (!['flex', 'inline-flex', 'grid', 'inline-grid'].includes(disp)) return;
      const colGap = parseFloat(cs.columnGap) || 0;
      const rowGap = parseFloat(cs.rowGap) || 0;
      if (colGap === 0 && rowGap === 0) return;
      const kids = Array.from(container.children).filter(
        c => !(c as HTMLElement).closest('[data-measure-ignore]')
      ) as HTMLElement[];
      const flexDir = cs.flexDirection;
      const isRow = flexDir === 'row' || flexDir === 'row-reverse' ||
                    disp === 'grid' || disp === 'inline-grid';
      for (let i = 0; i < kids.length - 1; i++) {
        const a = kids[i].getBoundingClientRect();
        const b = kids[i + 1].getBoundingClientRect();
        if (isRow && colGap > 0) {
          const gapW = b.left - a.right;
          if (gapW > 0) {
            rects.push({
              top: Math.min(a.top, b.top),
              left: a.right,
              width: gapW,
              height: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top),
            });
          }
        } else if (!isRow && rowGap > 0) {
          const gapH = b.top - a.bottom;
          if (gapH > 0) {
            rects.push({
              top: a.bottom,
              left: Math.min(a.left, b.left),
              width: Math.max(a.right, b.right) - Math.min(a.left, b.left),
              height: gapH,
            });
          }
        }
      }
    }

    const newGapRects: GapRect[] = [];
    // 1. Gaps between the hovered element's own children (element is the container)
    collectGapRects(el, newGapRects);
    // 2. Gaps between siblings in the parent (element is a child of a gap container)
    if (el.parentElement) collectGapRects(el.parentElement, newGapRects);
    setGapRects(newGapRects);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHighlight(null);
    setTooltip(null);
    setGapRects([]);
  }, []);

  useEffect(() => {
    if (!active) {
      setHighlight(null);
      setTooltip(null);
      setGapRects([]);
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
  const TIP_W = 260;
  const TIP_H = tooltip?.showType ? 240 : 160;
  const tipX = mouse.x + 16 + TIP_W > window.innerWidth  ? mouse.x - TIP_W - 8 : mouse.x + 16;
  const tipY = mouse.y + 16 + TIP_H > window.innerHeight ? mouse.y - TIP_H - 8 : mouse.y + 16;

  const hasMargin  = highlight && (highlight.marginTop || highlight.marginRight || highlight.marginBottom || highlight.marginLeft);
  const hasPadding = highlight && (highlight.paddingTop || highlight.paddingRight || highlight.paddingBottom || highlight.paddingLeft);

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
          {/* ── Gap overlays — yellow fill, between flex/grid siblings ── */}
          {gapRects.map((rect, i) => (
            <div
              key={i}
              data-measure-ignore="true"
              className={styles.highlightGap}
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              }}
            />
          ))}

          {/* ── Margin overlay — orange dashed, extends beyond element ── */}
          {highlight && hasMargin && (
            <div
              data-measure-ignore="true"
              className={styles.highlightMargin}
              style={{
                top:    highlight.top    - highlight.marginTop,
                left:   highlight.left   - highlight.marginLeft,
                width:  highlight.width  + highlight.marginLeft + highlight.marginRight,
                height: highlight.height + highlight.marginTop  + highlight.marginBottom,
              }}
            />
          )}

          {/* ── Element size highlight — blue solid ── */}
          {highlight && (
            <div
              data-measure-ignore="true"
              className={styles.highlight}
              style={{
                top:    highlight.top,
                left:   highlight.left,
                width:  highlight.width,
                height: highlight.height,
              }}
            />
          )}

          {/* ── Padding overlay — green dashed, inset by padding ── */}
          {highlight && hasPadding && (
            <div
              data-measure-ignore="true"
              className={styles.highlightPadding}
              style={{
                top:    highlight.top    + highlight.paddingTop,
                left:   highlight.left   + highlight.paddingLeft,
                width:  highlight.width  - highlight.paddingLeft - highlight.paddingRight,
                height: highlight.height - highlight.paddingTop  - highlight.paddingBottom,
              }}
            />
          )}

          {/* ── Floating tooltip ── */}
          {tooltip && (
            <div
              data-measure-ignore="true"
              className={styles.tooltip}
              style={{ top: tipY, left: tipX }}
            >
              <div className={styles.tooltipTag}>{tooltip.tag}</div>
              <div className={styles.divider} />

              {/* Size row */}
              <div className={styles.row}>
                <span className={styles.legendCell}>
                  <LegendSwatch color={COLOR_SIZE} />
                  <span className={styles.lbl}>Size</span>
                </span>
                <span className={styles.val}>{tooltip.width} × {tooltip.height}</span>
              </div>

              {/* Padding row */}
              {!allZero(tooltip.padding) && (
                <div className={styles.row}>
                  <span className={styles.legendCell}>
                    <LegendSwatch color={COLOR_PADDING} />
                    <span className={styles.lbl}>Padding</span>
                  </span>
                  <span className={styles.val}>{shorthand(...tooltip.padding)}</span>
                </div>
              )}

              {/* Margin row */}
              {!allZero(tooltip.margin) && (
                <div className={styles.row}>
                  <span className={styles.legendCell}>
                    <LegendSwatch color={COLOR_MARGIN} />
                    <span className={styles.lbl}>Margin</span>
                  </span>
                  <span className={styles.val}>{shorthand(...tooltip.margin)}</span>
                </div>
              )}

              {tooltip.gap && tooltip.gap !== 'normal' && !tooltip.gap.startsWith('0px') && (
                <div className={styles.row}>
                  <span className={styles.legendCell}>
                    <LegendSwatch color={COLOR_GAP} />
                    <span className={styles.lbl}>Gap</span>
                  </span>
                  <span className={styles.val}>{tooltip.gap}</span>
                </div>
              )}

              {tooltip.borderRadius && !tooltip.borderRadius.startsWith('0px') && (
                <div className={styles.row}>
                  <span className={styles.legendCell}>
                    <span style={{ width: 8, flexShrink: 0 }} />
                    <span className={styles.lbl}>Radius</span>
                  </span>
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
