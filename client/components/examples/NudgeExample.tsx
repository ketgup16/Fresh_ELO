import * as React from 'react';
import { Nudge } from '@/components/ui/Nudge';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { LinkButton } from '@/components/ui/LinkButton';
import { InfoCircle, LightBulb, Star, Gift } from '@/components/icons';

export function NudgeExample() {
  const [dismissedNudges, setDismissedNudges] = React.useState<Set<string>>(new Set());

  const handleDismiss = (nudgeId: string) => {
    setDismissedNudges(prev => new Set([...prev, nudgeId]));
  };

  const resetAll = () => {
    setDismissedNudges(new Set());
  };

  return (
    <div className="space-y-12">
      {/* Reset Button */}
      {dismissedNudges.size > 0 && (
        <div className="flex justify-end">
          <Button variant="secondary" size="small" onClick={resetAll}>
            Reset All Nudges
          </Button>
        </div>
      )}

      {/* Basic Usage */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          Basic Usage
        </h3>
        <div className="space-y-4">
          <Nudge title="Quick tip">
            Use keyboard shortcuts to work faster and more efficiently.
          </Nudge>

          <Nudge title="Complete your profile">
            Add a profile picture and bio to help others recognize you and build trust with your team.
          </Nudge>
        </div>
      </section>

      {/* With Leading Icons */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          With Leading Icons
        </h3>
        <div className="space-y-4">
          <Nudge 
            title="Helpful information" 
            leading={
              <div style={{
                color: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <InfoCircle style={{ width: 24, height: 24 }} />
              </div>
            }
          >
            This feature can help you save time on repetitive tasks.
          </Nudge>

          <Nudge 
            title="Pro tip" 
            leading={
              <div style={{
                color: 'var(--ld-semantic-color-text-warning, #F59E0B)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <LightBulb style={{ width: 24, height: 24 }} />
              </div>
            }
          >
            Enable auto-save to prevent losing your work.
          </Nudge>

          <Nudge 
            title="New feature available" 
            leading={
              <div style={{ 
                color: 'var(--ld-semantic-color-text-positive, #2A8703)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Star style={{ width: 24, height: 24 }} />
              </div>
            }
          >
            Try out our new collaboration tools to work better with your team.
          </Nudge>
        </div>
      </section>

      {/* Dismissible Nudges */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          Dismissible Nudges
        </h3>
        <div className="space-y-4">
          {!dismissedNudges.has('tip-1') && (
            <Nudge 
              title="First-time user tip" 
              onClose={() => handleDismiss('tip-1')}
              leading={
                <div style={{
                color: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <InfoCircle style={{ width: 24, height: 24 }} />
              </div>
              }
            >
              Click the settings icon to customize your workspace preferences.
            </Nudge>
          )}

          {!dismissedNudges.has('tip-2') && (
            <Nudge 
              title="Did you know?" 
              onClose={() => handleDismiss('tip-2')}
            >
              You can drag and drop items to reorder them in your list.
            </Nudge>
          )}
        </div>
      </section>

      {/* With Actions */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          With Actions
        </h3>
        <div className="space-y-4">
          <Nudge 
            title="Save your progress" 
            actions={<Button variant="primary">Save now</Button>}
          >
            Your work will be saved automatically, but you can save manually at any time.
          </Nudge>

          <Nudge 
            title="Try the premium features" 
            leading={
              <div style={{ 
                color: 'var(--ld-semantic-color-text-warning, #F59E0B)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Gift style={{ width: 24, height: 24 }} />
              </div>
            }
            actions={
              <ButtonGroup>
                <Button variant="primary">Start free trial</Button>
                <LinkButton>Learn more</LinkButton>
              </ButtonGroup>
            }
          >
            Unlock advanced analytics and collaboration features with our premium plan.
          </Nudge>

          <Nudge 
            title="Unsaved changes" 
            actions={
              <ButtonGroup>
                <Button variant="primary">Save changes</Button>
                <Button variant="secondary">Discard</Button>
              </ButtonGroup>
            }
          >
            You have unsaved changes that will be lost if you leave this page.
          </Nudge>
        </div>
      </section>

      {/* Complete Examples (All Features) */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          Complete Examples (All Features)
        </h3>
        <div className="space-y-4">
          {!dismissedNudges.has('complete-1') && (
            <Nudge 
              title="Complete your setup" 
              leading={
                <div style={{ 
                  color: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Star style={{ width: 24, height: 24 }} />
                </div>
              }
              actions={
                <ButtonGroup>
                  <Button variant="primary">Continue setup</Button>
                  <LinkButton>Skip for now</LinkButton>
                </ButtonGroup>
              }
              onClose={() => handleDismiss('complete-1')}
            >
              Add your team information to unlock collaboration features and improve your experience.
            </Nudge>
          )}

          {!dismissedNudges.has('complete-2') && (
            <Nudge 
              title="Special offer" 
              leading={
                <div style={{ 
                  color: 'var(--ld-semantic-color-text-positive, #2A8703)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Gift style={{ width: 24, height: 24 }} />
                </div>
              }
              actions={
                <ButtonGroup>
                  <Button variant="primary">Claim offer</Button>
                  <LinkButton>View details</LinkButton>
                </ButtonGroup>
              }
              onClose={() => handleDismiss('complete-2')}
            >
              Get 30% off your first month when you upgrade to our premium plan today.
            </Nudge>
          )}
        </div>
      </section>

      {/* Without Content (Title Only) */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          Title Only (No Content)
        </h3>
        <div className="space-y-4">
          <Nudge title="Quick reminder: Save your work frequently" />
          
          <Nudge 
            title="Pro tip: Use keyboard shortcuts to work faster" 
            onClose={() => {}}
          />
        </div>
      </section>

      {/* Long Content */}
      <section>
        <h3 className="text-lg font-bold mb-4" style={{ 
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)'
        }}>
          Long Content
        </h3>
        <Nudge 
          title="Important information about data privacy" 
          leading={
            <div style={{
              color: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <InfoCircle style={{ width: 24, height: 24 }} />
            </div>
          }
          actions={
            <ButtonGroup>
              <Button variant="primary">Review settings</Button>
              <LinkButton>Learn more</LinkButton>
            </ButtonGroup>
          }
          onClose={() => {}}
        >
          We take your privacy seriously. Your data is encrypted and stored securely. You have full control
          over your information and can export or delete it at any time. We never share your personal data
          with third parties without your explicit consent. Review your privacy settings to customize how
          your information is used within the platform.
        </Nudge>
      </section>
    </div>
  );
}
