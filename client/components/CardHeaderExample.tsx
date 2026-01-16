import * as React from 'react';
import { Card } from './ui/Card';
import { CardHeader } from './ui/CardHeader';
import { CardContent } from './ui/CardContent';

/**
 * Example component demonstrating CardHeader usage with Living Design 3.5
 */
export const CardHeaderExample: React.FC = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Example 1: Basic CardHeader with title only */}
      <Card size="small">
        <CardHeader title="Simple Card Title" />
        <CardContent>
          This is a basic card with just a title in the header.
        </CardContent>
      </Card>

      {/* Example 2: CardHeader with leading icon */}
      <Card size="small">
        <CardHeader
          leadingIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          }
          title="Card with Icon"
        />
        <CardContent>
          This card has a leading icon (home icon) in the header.
        </CardContent>
      </Card>

      {/* Example 3: CardHeader with trailing button */}
      <Card size="small">
        <CardHeader
          title="Card with Action"
          trailing={
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#0071ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Action
            </button>
          }
        />
        <CardContent>
          This card has a trailing button in the header for quick actions.
        </CardContent>
      </Card>

      {/* Example 4: Large card with icon, title, and trailing */}
      <Card size="large">
        <CardHeader
          leadingIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          }
          title="Welcome Onboard"
          trailing={
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#0071ce',
                border: '1px solid #0071ce',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Start Here
            </button>
          }
        />
        <CardContent>
          This is a large card with a leading icon, title, and trailing button. 
          The larger size provides more generous spacing and emphasizes the content.
        </CardContent>
      </Card>

      {/* Example 5: Long title example */}
      <Card size="small">
        <CardHeader
          leadingIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          }
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim magna id tortor pharetra laoreet."
          trailing={
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                color: '#0071ce',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Learn More
            </button>
          }
        />
        <CardContent>
          This card demonstrates how the CardHeader handles long titles while 
          maintaining proper layout and keeping the trailing content accessible.
        </CardContent>
      </Card>
    </div>
  );
};
