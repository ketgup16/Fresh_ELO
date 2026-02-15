import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/Button';

export default function TooltipExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <TooltipProvider>
        <section>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary)',
            marginBottom: '16px'
          }}>
            Basic Tooltip
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </section>

        <section>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary)',
            marginBottom: '16px'
          }}>
            Tooltip with Rich Content
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="primary">Hover for details</Button>
            </TooltipTrigger>
            <TooltipContent>
              <div style={{ maxWidth: '200px' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Pro Tip</h4>
                <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                  You can customize the content of tooltips with any React component.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </section>

        <section>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary)',
            marginBottom: '16px'
          }}>
            Multiple Tooltips
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="small">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip on top</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="small">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip on bottom</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="small">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Tooltip on left</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="small">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip on right</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>
      </TooltipProvider>
    </div>
  );
}
