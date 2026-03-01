import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { WCPCountrySelectBottomSheet, WCP_DEFAULT_COUNTRIES } from '@/components/walmart/WCPCountrySelectBottomSheet';
import { WCPCountryCodePhoneInput } from '@/components/walmart/WCPCountryCodePhoneInput';
import { WCPCountrySelectGroup } from '@/components/walmart/WCPCountrySelectGroup';
import { Button } from '@/components/ui/Button';
import styles from './WCPCountryComponents.module.css';

export default function WCPCountryComponentsPage() {
  const [sheetOpen1, setSheetOpen1] = React.useState(false);
  const [sheetOpen2, setSheetOpen2] = React.useState(false);
  const [sheetOpen3, setSheetOpen3] = React.useState(false);
  const [sheetOpen4, setSheetOpen4] = React.useState(false);
  const [phoneValue, setPhoneValue] = React.useState('(415) 699-5290');
  const [groupValue, setGroupValue] = React.useState('US');

  return (
    <div>
      <PageHeader
        section="WCP Components"
        title="Country Select"
        description="Country picker, phone input with country code selector, and country select group for shipping and contact flows."
      />

      <div className={styles.content}>

        {/* ── Country Select Bottom Sheet ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Country Select Bottom Sheet</h2>
          <p className={styles.sectionDesc}>
            A bottom sheet that slides up to display a list of countries with radio selection.
            Supports a flat list variant and a card-slot variant, with optional dial codes.
          </p>

          <div className={styles.variantGrid}>
            {/* Flat, no codes */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Flat — Country Name Only</h3>
              <Button variant="secondary" onClick={() => setSheetOpen1(true)}>
                Open sheet
              </Button>
              <WCPCountrySelectBottomSheet
                open={sheetOpen1}
                variant="flat"
                showDialCode={false}
                title="Select country/region"
                actionLabel="Confirm"
                onClose={() => setSheetOpen1(false)}
              />
            </div>

            {/* Flat, with codes */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Flat — With Dial Codes</h3>
              <Button variant="secondary" onClick={() => setSheetOpen2(true)}>
                Open sheet
              </Button>
              <WCPCountrySelectBottomSheet
                open={sheetOpen2}
                variant="flat"
                showDialCode
                title="Select country/region"
                actionLabel="Confirm"
                onClose={() => setSheetOpen2(false)}
              />
            </div>

            {/* Slot, no codes */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Card Slots — Country Name Only</h3>
              <Button variant="secondary" onClick={() => setSheetOpen3(true)}>
                Open sheet
              </Button>
              <WCPCountrySelectBottomSheet
                open={sheetOpen3}
                variant="slot"
                showDialCode={false}
                title="Select country/region"
                actionLabel="Confirm"
                onClose={() => setSheetOpen3(false)}
              />
            </div>

            {/* Slot, with codes */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Card Slots — With Dial Codes</h3>
              <Button variant="secondary" onClick={() => setSheetOpen4(true)}>
                Open sheet
              </Button>
              <WCPCountrySelectBottomSheet
                open={sheetOpen4}
                variant="slot"
                showDialCode
                title="Select country/region"
                actionLabel="Confirm"
                onClose={() => setSheetOpen4(false)}
              />
            </div>
          </div>
        </section>

        {/* ── Country Code Phone Input ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Country Code Phone Number</h2>
          <p className={styles.sectionDesc}>
            A phone number input that pairs a country code selector (flag + abbreviation + dial code)
            with a phone number text field. Supports enabled, disabled, read-only, and error states.
          </p>

          <div className={styles.statesGrid}>
            <div className={styles.stateItem}>
              <span className={styles.stateLabel}>Enabled</span>
              <WCPCountryCodePhoneInput
                label="Phone number*"
                value={phoneValue}
                onChange={setPhoneValue}
                helperText="We'll contact you in case anything comes up with your order."
              />
            </div>

            <div className={styles.stateItem}>
              <span className={styles.stateLabel}>Error</span>
              <WCPCountryCodePhoneInput
                label="Phone number*"
                value={phoneValue}
                onChange={setPhoneValue}
                error
                errorText="Please enter a valid number"
              />
            </div>

            <div className={styles.stateItem}>
              <span className={styles.stateLabel}>Disabled</span>
              <WCPCountryCodePhoneInput
                label="Phone number*"
                value={phoneValue}
                disabled
                helperText="We'll contact you in case anything comes up with your order."
              />
            </div>

            <div className={styles.stateItem}>
              <span className={styles.stateLabel}>Read-only</span>
              <WCPCountryCodePhoneInput
                label="Phone number*"
                value={phoneValue}
                readOnly
                helperText="We'll contact you in case anything comes up with your order."
              />
            </div>
          </div>
        </section>

        {/* ── Country Select Group ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Country Select Group</h2>
          <p className={styles.sectionDesc}>
            A standalone country list in card-slot style with an optional description and footer disclaimer.
            Used for shipping destination selection.
          </p>

          <div className={styles.groupGrid}>
            <div className={styles.groupCard}>
              <h3 className={styles.variantTitle}>Without Dial Codes</h3>
              <WCPCountrySelectGroup
                value={groupValue}
                onChange={c => setGroupValue(c.code)}
                description="Select the country you want to ship to."
                footerText={`Pickup and delivery not available outside of the United States.\n\nWe are only able to ship within listed countries for now, but we are working to expand to more countries soon.`}
              />
            </div>

            <div className={styles.groupCard}>
              <h3 className={styles.variantTitle}>With Dial Codes</h3>
              <WCPCountrySelectGroup
                value={groupValue}
                onChange={c => setGroupValue(c.code)}
                showDialCode
                description="Select the country you want to ship to."
                footerText={`Pickup and delivery not available outside of the United States.\n\nWe are only able to ship within listed countries for now, but we are working to expand to more countries soon.`}
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
