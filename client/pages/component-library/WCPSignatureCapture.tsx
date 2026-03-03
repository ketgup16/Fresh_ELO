import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import {
  WCPSignatureCapture,
  SignatureTrigger,
  SignatureTerms,
  SignatureBase,
  SignatureReauth,
} from '@/components/walmart/WCPSignatureCapture';
import { WCPSignatureCaptureBottomSheet } from '@/components/walmart/WCPSignatureCaptureBottomSheet';
import { WCPSignatureCapturePanel } from '@/components/walmart/WCPSignatureCapturePanel';
import styles from './WCPSignatureCapture.module.css';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{title}</div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

export default function WCPSignatureCapturePage() {
  // Trigger state
  const [triggerClicked, setTriggerClicked] = useState(false);

  // Terms state
  const [termsVariant, setTermsVariant] = useState<'signed' | 'signed-as'>('signed');

  // Base state
  const [fullName, setFullName] = useState('');
  const [isSignChecked, setIsSignChecked] = useState(false);
  const [showBaseErrors, setShowBaseErrors] = useState(false);
  const [baseSignatureState, setBaseSignatureState] = useState<'unsigned' | 'signed'>('unsigned');

  // Reauth state
  const [reauthSubVariant, setReauthSubVariant] = useState<'agree-sign' | 'signed' | 'signed-as'>('agree-sign');

  // Bottom sheet pattern state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetFullName, setSheetFullName] = useState('');
  const [sheetIsSignChecked, setSheetIsSignChecked] = useState(false);
  const [sheetSignatureState, setSheetSignatureState] = useState<'unsigned' | 'signed'>('unsigned');
  const [sheetSubmitted, setSheetSubmitted] = useState(false);
  const [showSheetErrors, setShowSheetErrors] = useState(false);

  const handlePreviewSignature = () => {
    if (fullName.trim()) {
      setBaseSignatureState('signed');
    }
  };

  const handleSheetPreview = () => {
    if (sheetFullName.trim()) {
      setSheetSignatureState('signed');
    }
  };

  const handleSheetSubmit = () => {
    if (!sheetFullName.trim() || !sheetIsSignChecked || sheetSignatureState === 'unsigned') {
      setShowSheetErrors(true);
      return;
    }
    setSheetOpen(false);
    setSheetSubmitted(true);
    setShowSheetErrors(false);
  };

  const handleSheetOpen = () => {
    setSheetOpen(true);
    setSheetSubmitted(false);
  };

  const handleSheetChangeSignature = () => {
    setSheetOpen(true);
    setSheetSignatureState('unsigned');
    setSheetFullName('');
    setSheetIsSignChecked(false);
    setSheetSubmitted(false);
  };

  // Side panel pattern state
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelFullName, setPanelFullName] = useState('');
  const [panelIsSignChecked, setPanelIsSignChecked] = useState(false);
  const [panelSignatureState, setPanelSignatureState] = useState<'unsigned' | 'signed'>('unsigned');
  const [panelSubmitted, setPanelSubmitted] = useState(false);
  const [showPanelErrors, setShowPanelErrors] = useState(false);

  const handlePanelPreview = () => {
    if (panelFullName.trim()) setPanelSignatureState('signed');
  };

  const handlePanelSubmit = () => {
    if (!panelFullName.trim() || !panelIsSignChecked || panelSignatureState === 'unsigned') {
      setShowPanelErrors(true);
      return;
    }
    setPanelOpen(false);
    setPanelSubmitted(true);
    setShowPanelErrors(false);
  };

  const handlePanelChangeSignature = () => {
    setPanelSignatureState('unsigned');
    setPanelFullName('');
    setPanelIsSignChecked(false);
    setPanelSubmitted(false);
    setPanelOpen(true);
  };

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Signature Capture"
      description="A multi-variant subscription signature capture component used to collect legal signatures for subscription agreements."
    >
      <div className={styles.page}>

        {/* ── Variant 1: Subscription Signature Trigger ──────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Variant 1 — Subscription Signature Trigger</SectionTitle>
          <SectionDesc>
            Entry state before the user engages. Shows a full-width secondary "Agree &amp; sign" button with a pencil icon and descriptive subtext. Button is <code>size="small"</code> at 0-899px and <code>size="medium"</code> at 900+px.
          </SectionDesc>

          <div className={styles.variantGrid}>
            <DemoCard title="Default — 0-899px">
              <SignatureTrigger
                onAgreeAndSign={() => setTriggerClicked(true)}
              />
              {triggerClicked && (
                <p className={styles.interactionNote}>✓ "Agree &amp; sign" was clicked — navigate to Signature Base form.</p>
              )}
            </DemoCard>

            <DemoCard title="Custom subtext">
              <SignatureTrigger
                subText="Your signature is required to confirm your pharmacy delivery agreement."
                onAgreeAndSign={() => {}}
              />
            </DemoCard>
          </div>
        </section>

        {/* ── Variant 2: Subscription Signature Terms ────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Variant 2 — Subscription Signature Terms</SectionTitle>
          <SectionDesc>
            Shown after the user has signed. Displays the signature preview with "Your signature" title and a "Change signature" link. Includes an optional warning alert for preview failures.
          </SectionDesc>

          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Signature state:</span>
            <button
              className={[styles.toggleBtn, termsVariant === 'signed' ? styles.toggleBtnActive : ''].join(' ')}
              onClick={() => setTermsVariant('signed')}
            >
              Signed (cursive)
            </button>
            <button
              className={[styles.toggleBtn, termsVariant === 'signed-as' ? styles.toggleBtnActive : ''].join(' ')}
              onClick={() => setTermsVariant('signed-as')}
            >
              Signed As
            </button>
          </div>

          <div className={styles.variantGrid}>
            <DemoCard title="Without warning alert">
              <SignatureTerms
                signatureState={termsVariant}
                signedName="Emilia Garcia"
                showPreviewWarning={false}
              />
            </DemoCard>

            <DemoCard title="With warning alert — preview failed">
              <SignatureTerms
                signatureState={termsVariant}
                signedName="Emilia Garcia"
                showPreviewWarning
                onRefreshPage={() => alert('Refreshing page...')}
              />
            </DemoCard>
          </div>
        </section>

        {/* ── Variant 3: Signature Base (full form) ──────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Variant 3 — Signature Base</SectionTitle>
          <SectionDesc>
            Full signature capture form. Includes optional tech error and pet name warning alerts, subscription terms paragraph, name input field, preview button, signature box, and legal checkbox.
          </SectionDesc>

          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Show error states:</span>
            <button
              className={[styles.toggleBtn, showBaseErrors ? styles.toggleBtnActive : ''].join(' ')}
              onClick={() => setShowBaseErrors(v => !v)}
            >
              {showBaseErrors ? 'Hide errors' : 'Show errors'}
            </button>
          </div>

          <div className={styles.baseFormDemo}>
            <SignatureBase
              userName="Emilia Garcia"
              showTechError={showBaseErrors}
              showPetNameWarning={showBaseErrors}
              showSignBeforeSubmitError={showBaseErrors}
              showPreviewBeforeSignError={showBaseErrors && !fullName}
              showCheckboxError={showBaseErrors && !isSignChecked}
              signatureState={baseSignatureState}
              signedName={fullName || 'Emilia Garcia'}
              fullName={fullName}
              onFullNameChange={setFullName}
              onPreviewSignature={handlePreviewSignature}
              isSignChecked={isSignChecked}
              onSignCheckedChange={setIsSignChecked}
            />
          </div>
        </section>

        {/* ── Variant 4: Signature Reauth ────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Variant 4 — Signature Reauth</SectionTitle>
          <SectionDesc>
            Compact re-authorization version. Shows either the "Agree &amp; sign" flow or the signed state with a short signature box. Includes optional error/warning alerts and a "Confirm" primary button.
          </SectionDesc>

          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Sub-variant:</span>
            <button
              className={[styles.toggleBtn, reauthSubVariant === 'agree-sign' ? styles.toggleBtnActive : ''].join(' ')}
              onClick={() => setReauthSubVariant('agree-sign')}
            >
              Agree &amp; Sign
            </button>
            <button
              className={[styles.toggleBtn, reauthSubVariant === 'signed' ? styles.toggleBtnActive : ''].join(' ')}
              onClick={() => setReauthSubVariant('signed')}
            >
              Signed (cursive)
            </button>
            <button
              className={[styles.toggleBtn, reauthSubVariant === 'signed-as' ? styles.toggleBtnActive : ''].join(' ')}
              onClick={() => setReauthSubVariant('signed-as')}
            >
              Signed As
            </button>
          </div>

          <div className={styles.variantGrid}>
            <DemoCard title="Without alerts">
              <SignatureReauth
                subVariant={reauthSubVariant}
                signedName="Emilia Garcia"
                showReauthError={false}
                showPreviewWarning={false}
              />
            </DemoCard>

            <DemoCard title="With alerts">
              <SignatureReauth
                subVariant={reauthSubVariant}
                signedName="Emilia Garcia"
                showReauthError={reauthSubVariant === 'agree-sign'}
                showPreviewWarning={reauthSubVariant !== 'agree-sign'}
              />
            </DemoCard>
          </div>
        </section>

        {/* ── Bottom Sheet Pattern ────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Bottom Sheet Pattern</SectionTitle>
          <SectionDesc>
            The full signature capture flow: a <code>SignatureTrigger</code> opens a <code>WCPSignatureCaptureBottomSheet</code> containing the <code>SignatureBase</code> form. After the user types their name, previews the signature, checks the checkbox, and taps "Agree &amp; sign" in the sheet footer, the sheet closes and the signed state is shown via <code>SignatureTerms</code>.
          </SectionDesc>

          <div className={styles.baseFormDemo}>
            {sheetSubmitted ? (
              <div className={styles.sheetCompletedBlock}>
                <SignatureTerms
                  signatureState="signed"
                  signedName={sheetFullName || 'Emilia Garcia'}
                  showPreviewWarning={false}
                  onChangeSignature={handleSheetChangeSignature}
                />
              </div>
            ) : (
              <SignatureTrigger onAgreeAndSign={handleSheetOpen} />
            )}
          </div>

          <WCPSignatureCaptureBottomSheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Subscription agreement"
            userName="Emilia Garcia"
            fullName={sheetFullName}
            onFullNameChange={setSheetFullName}
            signatureState={sheetSignatureState}
            signedName={sheetFullName || 'Emilia Garcia'}
            isSignChecked={sheetIsSignChecked}
            onSignCheckedChange={setSheetIsSignChecked}
            onPreviewSignature={handleSheetPreview}
            showPreviewBeforeSignError={showSheetErrors && sheetSignatureState === 'unsigned'}
            showCheckboxError={showSheetErrors && !sheetIsSignChecked}
            onSubmit={handleSheetSubmit}
            submitLabel="Agree & sign"
          />

          <div className={styles.codeBlock}>
            <pre>{`import { SignatureTrigger, SignatureTerms } from '@/components/walmart/WCPSignatureCapture';
import { WCPSignatureCaptureBottomSheet } from '@/components/walmart/WCPSignatureCaptureBottomSheet';

function SignatureFlow() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [signatureState, setSignatureState] = useState<'unsigned' | 'signed'>('unsigned');
  const [isSignChecked, setIsSignChecked] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !isSignChecked || signatureState === 'unsigned') return;
    setSheetOpen(false);
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <SignatureTerms
          signatureState="signed"
          signedName={fullName}
          onChangeSignature={() => setSheetOpen(true)}
        />
      ) : (
        <SignatureTrigger onAgreeAndSign={() => setSheetOpen(true)} />
      )}

      <WCPSignatureCaptureBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Subscription agreement"
        userName="Emilia Garcia"
        fullName={fullName}
        onFullNameChange={setFullName}
        signatureState={signatureState}
        signedName={fullName}
        isSignChecked={isSignChecked}
        onSignCheckedChange={setIsSignChecked}
        onPreviewSignature={() => fullName && setSignatureState('signed')}
        onSubmit={handleSubmit}
      />
    </>
  );
}`}</pre>
          </div>
        </section>

        {/* ── Side Panel Pattern ─────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Side Panel Pattern</SectionTitle>
          <SectionDesc>
            On desktop (900+px) a slide-out side panel is preferred over a bottom sheet. <code>WCPSignatureCapturePanel</code> wraps the same <code>SignatureBase</code> form inside the LD 3.5 <code>Panel</code> component. The flow and validation are identical — only the overlay presentation differs.
          </SectionDesc>

          <div className={styles.baseFormDemo}>
            {panelSubmitted ? (
              <div className={styles.sheetCompletedBlock}>
                <SignatureTerms
                  signatureState="signed"
                  signedName={panelFullName || 'Emilia Garcia'}
                  showPreviewWarning={false}
                  onChangeSignature={handlePanelChangeSignature}
                />
              </div>
            ) : (
              <SignatureTrigger onAgreeAndSign={() => setPanelOpen(true)} />
            )}
          </div>

          <WCPSignatureCapturePanel
            isOpen={panelOpen}
            onClose={() => setPanelOpen(false)}
            title="Subscription agreement"
            size="medium"
            position="right"
            userName="Emilia Garcia"
            fullName={panelFullName}
            onFullNameChange={setPanelFullName}
            signatureState={panelSignatureState}
            signedName={panelFullName || 'Emilia Garcia'}
            isSignChecked={panelIsSignChecked}
            onSignCheckedChange={setPanelIsSignChecked}
            onPreviewSignature={handlePanelPreview}
            showPreviewBeforeSignError={showPanelErrors && panelSignatureState === 'unsigned'}
            showCheckboxError={showPanelErrors && !panelIsSignChecked}
            onSubmit={handlePanelSubmit}
            submitLabel="Agree & sign"
          />

          <div className={styles.codeBlock}>
            <pre>{`import { SignatureTrigger, SignatureTerms } from '@/components/walmart/WCPSignatureCapture';
import { WCPSignatureCapturePanel } from '@/components/walmart/WCPSignatureCapturePanel';

function SignatureFlow() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [signatureState, setSignatureState] = useState<'unsigned' | 'signed'>('unsigned');
  const [isSignChecked, setIsSignChecked] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !isSignChecked || signatureState === 'unsigned') return;
    setPanelOpen(false);
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <SignatureTerms
          signatureState="signed"
          signedName={fullName}
          onChangeSignature={() => setPanelOpen(true)}
        />
      ) : (
        <SignatureTrigger onAgreeAndSign={() => setPanelOpen(true)} />
      )}

      <WCPSignatureCapturePanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title="Subscription agreement"
        size="medium"      // 'small' | 'medium' | 'large'
        position="right"   // 'left' | 'right'
        userName="Emilia Garcia"
        fullName={fullName}
        onFullNameChange={setFullName}
        signatureState={signatureState}
        signedName={fullName}
        isSignChecked={isSignChecked}
        onSignCheckedChange={setIsSignChecked}
        onPreviewSignature={() => fullName && setSignatureState('signed')}
        onSubmit={handleSubmit}
      />
    </>
  );
}`}</pre>
          </div>
        </section>

        {/* ── All variants via WCPSignatureCapture ────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Composite Usage via WCPSignatureCapture</SectionTitle>
          <SectionDesc>
            The main <code>WCPSignatureCapture</code> component wraps all 4 variants via the <code>variant</code> prop.
          </SectionDesc>
          <div className={styles.codeBlock}>
            <pre>{`import { WCPSignatureCapture } from '@/components/walmart/WCPSignatureCapture';

// Trigger
<WCPSignatureCapture variant="trigger" onAgreeAndSign={handleOpen} />

// Terms (after signing)
<WCPSignatureCapture
  variant="terms"
  signatureState="signed"
  signedName="Emilia Garcia"
  showPreviewWarning={false}
  onChangeSignature={handleChange}
/>

// Base form
<WCPSignatureCapture
  variant="base"
  userName="Emilia Garcia"
  fullName={fullName}
  onFullNameChange={setFullName}
  isSignChecked={isSignChecked}
  onSignCheckedChange={setIsSignChecked}
  signatureState={sigState}
/>

// Reauth
<WCPSignatureCapture
  variant="reauth"
  reauthSubVariant="agree-sign"
  showReauthError
  onAgreeAndSign={handleSign}
  onConfirm={handleConfirm}
/>`}</pre>
          </div>
        </section>

        {/* ── Props ───────────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Props</SectionTitle>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>variant</code></td>
                <td><code>'trigger' | 'terms' | 'base' | 'reauth'</code></td>
                <td>—</td>
                <td>Which variant to render.</td>
              </tr>
              <tr>
                <td><code>signatureState</code></td>
                <td><code>'unsigned' | 'signed' | 'signed-as'</code></td>
                <td><code>'unsigned'</code></td>
                <td>Controls what is shown in the signature box.</td>
              </tr>
              <tr>
                <td><code>signedName</code></td>
                <td><code>string</code></td>
                <td><code>'Emilia Garcia'</code></td>
                <td>Name to show in the signature box when signed.</td>
              </tr>
              <tr>
                <td><code>userName</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>Used in the checkbox label for <code>base</code> variant.</td>
              </tr>
              <tr>
                <td><code>showPreviewWarning</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Shows a warning alert about signature preview failure.</td>
              </tr>
              <tr>
                <td><code>showTechError</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>(<code>base</code>) Shows a top-level technical error alert.</td>
              </tr>
              <tr>
                <td><code>showPetNameWarning</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>(<code>base</code>) Shows a warning that the pet name couldn't be loaded.</td>
              </tr>
              <tr>
                <td><code>fullName</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>(<code>base</code>) Controlled value for the full name text field.</td>
              </tr>
              <tr>
                <td><code>isSignChecked</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>(<code>base</code>) Controlled state for the sign checkbox.</td>
              </tr>
              <tr>
                <td><code>reauthSubVariant</code></td>
                <td><code>'agree-sign' | 'signed' | 'signed-as'</code></td>
                <td><code>'agree-sign'</code></td>
                <td>(<code>reauth</code>) Which reauth sub-state to display.</td>
              </tr>
              <tr>
                <td><code>showReauthError</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>(<code>reauth</code>) Shows the top error alert about needing to sign.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </ComponentPageLayout>
  );
}
