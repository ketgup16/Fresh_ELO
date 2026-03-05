import { Phone, Clock, Map, ChevronRight } from "@/components/icons";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import styles from "./PharmacyDelivery.module.css";

const SERVICES = [
  { title: 'Refill prescriptions', desc: 'Quick and easy refills' },
  { title: 'New prescriptions', desc: 'Transfer or start new' },
  { title: 'Over-the-counter', desc: 'Health & wellness products' },
  { title: 'Immunizations', desc: 'Flu shots & vaccines' },
  { title: 'Health screenings', desc: 'Check-ups and tests' },
];

export default function PharmacyDelivery() {
  return (
    <ResponsiveLayout maxWidth="full" mobileTopNavTitle="Pharmacy Delivery" nativeStatusBarVariant="white">
      <div className={styles.page}>

        <div className={styles.content}>
          {/* Hero card */}
          <div className={styles.heroCard}>
            <div className={styles.heroTop}>
              <div>
                <h2 className={styles.heroTitle}>Pharmacy</h2>
                <p className={styles.heroSubtitle}>Fast, reliable prescription delivery</p>
              </div>
            </div>
            <Button variant="secondary" size="medium">
              Transfer prescription
            </Button>
          </div>

          {/* Feature grid */}
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Clock className={styles.featureIcon} />
              <p className={styles.featureLabel}>Same-day</p>
              <p className={styles.featureDesc}>delivery</p>
            </div>
            <div className={styles.featureCard}>
              <Map className={styles.featureIcon} />
              <p className={styles.featureLabel}>Local</p>
              <p className={styles.featureDesc}>pharmacy</p>
            </div>
            <div className={styles.featureCard}>
              <Phone className={styles.featureIcon} />
              <p className={styles.featureLabel}>24/7</p>
              <p className={styles.featureDesc}>support</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className={styles.sectionTitle}>Services</h3>
            <div className={styles.servicesList}>
              {SERVICES.map((service) => (
                <button key={service.title} className={styles.serviceButton}>
                  <div className={styles.serviceTextWrap}>
                    <h4 className={styles.serviceTitle}>{service.title}</h4>
                    <p className={styles.serviceDesc}>{service.desc}</p>
                  </div>
                  <ChevronRight className={styles.serviceChevron} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Help card */}
          <div className={styles.helpCard}>
            <h3 className={styles.helpTitle}>Need help?</h3>
            <p className={styles.helpText}>Our pharmacy team is here to assist you</p>
            <ButtonGroup>
              <Button variant="primary" size="medium" isFullWidth>Call pharmacy</Button>
              <Button variant="secondary" size="medium" isFullWidth>Chat now</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
