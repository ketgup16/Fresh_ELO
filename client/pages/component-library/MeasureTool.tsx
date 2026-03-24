import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './MeasureTool.module.css';

interface Highlight {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface MeasureData {
  tag: string;
  width: number;
  height: number;
  padding: [string, string, string, string];
  margin: [string, string, string, string];
  gap: string | null;
  borderRadius: string;
}

interface MeasureToolProps {
  children: React.ReactNode;
  active: boolean;
}

function fmt(val: string): string {
  const n = Math.round(parseFloat(val));
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

export function MeasureTool({ children, active }: MeasureToolProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [measureData, setMeasureData] = useState<MeasureData | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    if (!overlay || !container) return;

    // Temporarily hide overlay to hit-test elements beneath it
    overlay.style.display = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    overlay.style.display = '';

    if (!el || el === container || el === overlay) {
      setHighlight(null);
      setMeasureData(null);
      return;
    }

    const computed = getComputedStyle(el);
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    setHighlight({
      top: elRect.top - cRect.top,
      left: elRect.left - cRect.left,
      width: elRect.width,
      height: elRect.height,
    });

    // Build a readable tag label
    const tag = el.tagName.toLowerCase();
    const aria = el.getAttribute('aria-label');
    const tagLabel = aria ? `${tag}[aria="${aria}"]` : tag;

    const isFlexOrGrid = computed.display === 'flex' || computed.display === 'grid';

    setMeasureData({
      tag: tagLabel,
      width: Math.round(elRect.width),
      height: Math.round(elRect.height),
      padding: [computed.paddingTop, computed.paddingRight, computed.paddingBottom, computed.paddingLeft],
      margin: [computed.marginTop, computed.marginRight, computed.marginBottom, computed.marginLeft],
      gap: isFlexOrGrid ? computed.gap : null,
      borderRadius: computed.borderRadius,
    });

    setMouse({ x: e.clientX - cRect.left, y: e.clientY - cRect.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHighlight(null);
    setMeasureData(null);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !active) return;
    overlay.addEventListener('mousemove', handleMouseMove);
    overlay.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      overlay.removeEventListener('mousemove', handleMouseMove);
      overlay.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active, handleMouseMove, handleMouseLeave]);

  // Clamp tooltip so it stays inside container
  const TOOLTIP_W = 220;
  const TOOLTIP_H = 140;
  const containerW = containerRef.current?.offsetWidth ?? 400;
  const containerH = containerRef.current?.offsetHeight ?? 600;
  const tipX = mouse.x + 14 + TOOLTIP_W > containerW ? mouse.x - TOOLTIP_W - 8 : mouse.x + 14;
  const tipY = mouse.y + 14 + TOOLTIP_H > containerH ? mouse.y - TOOLTIP_H - 8 : mouse.y + 14;

  return (
    <div ref={containerRef} className={styles.measureWrap}>
      {children}
      {active && (
        <div ref={overlayRef} className={styles.overlay}>
          {highlight && (
            <div
              className={styles.highlight}
              style={{
                top: highlight.top,
                left: highlight.left,
                width: highlight.width,
                height: highlight.height,
              }}
            >
              <div className={styles.sizeLabel}>
                {Math.round(highlight.width)} × {Math.round(highlight.height)}
              </div>
            </div>
          )}

          {measureData && (
            <div className={styles.tooltip} style={{ top: tipY, left: tipX }}>
              <div className={styles.tooltipTag}>{measureData.tag}</div>
              <div className={styles.divider} />

              <div className={styles.row}>
                <span className={styles.lbl}>Size</span>
                <span className={styles.val}>{measureData.width} × {measureData.height}</span>
              </div>

              {!allZero(measureData.padding) && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Padding</span>
                  <span className={styles.val}>
                    {shorthand(...measureData.padding)}
                  </span>
                </div>
              )}

              {!allZero(measureData.margin) && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Margin</span>
                  <span className={styles.val}>
                    {shorthand(...measureData.margin)}
                  </span>
                </div>
              )}

              {measureData.gap && measureData.gap !== 'normal' && !measureData.gap.startsWith('0px') && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Gap</span>
                  <span className={styles.val}>{measureData.gap}</span>
                </div>
              )}

              {measureData.borderRadius && !measureData.borderRadius.startsWith('0px') && (
                <div className={styles.row}>
                  <span className={styles.lbl}>Radius</span>
                  <span className={styles.val}>{measureData.borderRadius}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
