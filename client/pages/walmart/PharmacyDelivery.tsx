import {
  ArrowUpRight,
  BottleEach,
  Calendar,
  Cart,
  ChatBubbleSquare,
  ChevronRight,
  Clock,
  DollarCircle,
  Globe,
  Heart,
  Map,
  Phone,
  ShieldCheckFill,
  Star,
  Truck,
  User,
  UserCircle,
} from '@/components/icons';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import styles from './PharmacyDelivery.module.css';

// ── Data ──────────────────────────────────────────────────────────

const SERVICE_CARDS = [
  {
    title: 'Refill prescriptions',
    desc: 'Quickly refill prescriptions in just a few steps',
    cta: 'Refill',
    illustration: '/illustrations/spot-illustration/Bottle.svg',
  },
  {
    title: 'Transfer prescriptions',
    desc: 'Easily transfer prescriptions to any Walmart Pharmacy',
    cta: 'Transfer',
    illustration: '/illustrations/spot-illustration/PetRX.svg',
  },
  {
    title: 'Schedule a vaccine',
    desc: 'Stay protected against the flu, COVID-19 & more',
    cta: 'Schedule',
    illustration: '/illustrations/spot-illustration/CalendarWithClock.svg',
  },
];

const DELIVERY_STEPS = [
  {
    Icon: User,
    title: 'Your Rx is filled by a Walmart pharmacist',
    desc: 'Same professional service, same low cost.',
  },
  {
    Icon: Cart,
    title: 'When the Rx is ready add it to your cart',
    desc: "You'll receive a notification on how to get started.",
  },
  {
    Icon: Truck,
    title: 'Choose how and when to receive your Rx',
    desc: 'Delivered with your groceries & essentials.',
  },
  {
    Icon: Calendar,
    title: 'Schedule one delivery for everything you need',
    desc: "We'll leave it at your door, or you can sign for it.",
  },
  {
    Icon: Star,
    title: 'Walmart+ Members get free delivery',
    desc: 'Save the $3.95 delivery fee with Walmart+',
  },
];

const RX_CARDS = [
  {
    title: 'Refrigerated Rx, delivered',
    desc: 'Now you can get GLP-1s, insulin, antibiotics & more to your door',
    illustration: '/illustrations/spot-illustration/Delivery.svg',
  },
  {
    title: 'Specialty pharmacy',
    desc: 'Offering personalized, affordable care for all.',
    illustration: '/illustrations/spot-illustration/Pharmacy.svg',
  },
  {
    title: 'Simplify diabetes management',
    desc: 'ReliOn® makes it affordable & accessible.',
    illustration: '/illustrations/spot-illustration/Bottle.svg',
  },
];

const ADDITIONAL_SERVICES = [
  {
    Icon: DollarCircle,
    title: 'Low cost prescriptions',
    desc: '30-day supply of generic Rx starting at $4',
    wide: false,
  },
  {
    Icon: ChatBubbleSquare,
    title: 'Medication therapy management',
    desc: 'Get answers to your medication questions.',
    wide: false,
  },
  {
    Icon: Map,
    title: 'Find a Pharmacy',
    desc: 'Locations, hours, contact info and more',
    wide: true,
  },
  {
    Icon: Clock,
    title: 'Same day treatment',
    desc: 'Get assessed & treated for strep throat, flu & COVID-19',
    wide: false,
  },
  {
    Icon: Heart,
    title: 'Birth control prescribing',
    desc: 'Now at select Walmart pharmacies.',
    wide: false,
  },
];

const HELPFUL_LINKS = [
  {
    Icon: Globe,
    title: 'Language assistance',
    desc: 'Over 200 languages available for interpretation',
  },
  {
    Icon: UserCircle,
    title: 'Accessible healthcare',
    desc: 'Making healthcare available to all.',
  },
  {
    Icon: Phone,
    title: 'Help center',
    desc: "Need Health & Wellness help? We're here for you.",
  },
  {
    Icon: BottleEach,
    title: 'Healthcare notices',
    desc: 'Our notice of Privacy Practices & more',
  },
];

// ── Page ──────────────────────────────────────────────────────────

export default function PharmacyDelivery() {
  return (
    <ResponsiveLayout maxWidth="full" mobileTopNavTitle="Pharmacy">
      <div className={styles.page}>

        {/* 1 · Hero */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to Pharmacy</h1>
            <p className={styles.heroSubtitle}>
              Offering low cost prescriptions, friendly service, &amp; convenient locations.
            </p>
          </div>
          <img
            src="/illustrations/spot-illustration/Pharmacy.svg"
            alt="Pharmacy"
            className={styles.heroIllustration}
          />
        </div>

        {/* 2 · Delivery announcement */}
        <div className={styles.deliveryBanner}>
          <img
            src="/illustrations/spot-illustration/PharmacyDelivery.svg"
            alt=""
            aria-hidden="true"
            className={styles.bannerIcon}
          />
          <span className={styles.bannerText}>Pharmacy delivery now available!</span>
          <Link href="#" variant="default" className={styles.bannerLink}>How it works</Link>
        </div>

        <div className={styles.content}>

          {/* 3 · Connect account */}
          <div className={styles.connectRow}>
            <div className={styles.connectIconWrap}>
              <UserCircle className={styles.connectIcon} />
            </div>
            <p className={styles.connectText}>
              Connect your account to refill, track, and manage prescriptions
            </p>
            <Button variant="secondary" size="small" UNSAFE_className={styles.connectBtn}>
              Connect my account
            </Button>
          </div>

          <Divider />

          {/* 4 · Vaccines */}
          <div className={styles.vaccineCard}>
            <div className={styles.vaccineContent}>
              <h2 className={styles.vaccineTitle}>Updated vaccines now available</h2>
              <p className={styles.vaccineDesc}>
                This season, help protect yourself &amp; your family from illness with vaccines from your local Walmart Pharmacy.
              </p>
              <Button variant="primary" size="medium">Schedule now</Button>
            </div>
            <img
              src="/illustrations/spot-illustration/CalendarWithClock.svg"
              alt=""
              aria-hidden="true"
              className={styles.vaccineIllustration}
            />
          </div>

          <Divider />

          {/* 5 · How can we help */}
          <div className={styles.helpSection}>
            <h2 className={styles.sectionTitle}>How can we help you today?</h2>
            <div className={styles.serviceCardsGrid}>
              {SERVICE_CARDS.map((card) => (
                <div key={card.title} className={styles.serviceCard}>
                  <img
                    src={card.illustration}
                    alt=""
                    aria-hidden="true"
                    className={styles.serviceCardIllustration}
                  />
                  <h3 className={styles.serviceCardTitle}>{card.title}</h3>
                  <p className={styles.serviceCardDesc}>{card.desc}</p>
                  <Button variant="secondary" size="small">{card.cta}</Button>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* 6 · Delivery steps */}
          <div className={styles.deliverySection}>
            <div className={styles.deliveryInner}>
              <div className={styles.deliveryLeft}>
                <h2 className={styles.deliveryHeading}>
                  Get eligible prescriptions &amp; more delivered as soon as today with no order minimum fees.
                </h2>
                <ul className={styles.stepsList}>
                  {DELIVERY_STEPS.map(({ Icon, title, desc }) => (
                    <li key={title} className={styles.stepItem}>
                      <div className={styles.stepIconWrap}>
                        <Icon className={styles.stepIcon} />
                      </div>
                      <div>
                        <p className={styles.stepTitle}>{title}</p>
                        <p className={styles.stepDesc}>{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src="/illustrations/spot-illustration/FreeDelivery.svg"
                alt="Free delivery"
                className={styles.deliveryIllustration}
              />
            </div>
          </div>

          <Divider />

          {/* 7 · For all your Rx needs */}
          <div className={styles.rxSection}>
            <h2 className={styles.sectionTitle}>For all your Rx needs</h2>
            <div className={styles.rxCards}>
              {RX_CARDS.map((card) => (
                <div key={card.title} className={styles.rxCard}>
                  <div className={styles.rxCardImageWrap}>
                    <img
                      src={card.illustration}
                      alt={card.title}
                      className={styles.rxCardImage}
                    />
                  </div>
                  <div className={styles.rxCardBody}>
                    <h3 className={styles.rxCardTitle}>{card.title}</h3>
                    <p className={styles.rxCardDesc}>{card.desc}</p>
                    <Link href="#" variant="default">Learn more</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* 8 · Additional services */}
          <div className={styles.additionalSection}>
            <h2 className={styles.sectionTitle}>Additional pharmacy services</h2>
            <div className={styles.additionalGrid}>
              {ADDITIONAL_SERVICES.filter((s) => !s.wide).map(({ Icon, title, desc }) => (
                <button key={title} className={styles.additionalItem}>
                  <div className={styles.additionalItemLeft}>
                    <Icon className={styles.additionalIcon} />
                    <div>
                      <p className={styles.additionalTitle}>{title}</p>
                      <p className={styles.additionalDesc}>{desc}</p>
                    </div>
                  </div>
                  <ChevronRight className={styles.additionalChevron} />
                </button>
              ))}
            </div>
            {/* Find a Pharmacy — full width */}
            {ADDITIONAL_SERVICES.filter((s) => s.wide).map(({ Icon, title, desc }) => (
              <button key={title} className={[styles.additionalItem, styles.additionalItemWide].join(' ')}>
                <div className={styles.additionalItemLeft}>
                  <Icon className={styles.additionalIcon} />
                  <div>
                    <p className={styles.additionalTitle}>{title}</p>
                    <p className={styles.additionalDesc}>{desc}</p>
                  </div>
                </div>
                <ChevronRight className={styles.additionalChevron} />
              </button>
            ))}
          </div>

          <Divider />

          {/* 9 · Medicare made easy */}
          <div className={styles.medicareBanner}>
            <div className={styles.medicareLeft}>
              <div className={styles.medicareLogoBadge}>
                <span className={styles.medicareLogoText}>Walmart Insurance Services</span>
              </div>
              <div>
                <h2 className={styles.medicareTitle}>Medicare made easy</h2>
                <p className={styles.medicareDesc}>Speak with a licensed agent today.</p>
                <Link href="#" variant="default">Learn more</Link>
              </div>
            </div>
            <img
              src="/illustrations/spot-illustration/WalmartBenefits.svg"
              alt="Medicare benefits"
              className={styles.medicareIllustration}
            />
          </div>

          <Divider />

          {/* 10 · Helpful links */}
          <div className={styles.helpfulSection}>
            <h2 className={styles.sectionTitle}>Helpful links</h2>
            <div className={styles.helpfulGrid}>
              {HELPFUL_LINKS.map(({ Icon, title, desc }) => (
                <button key={title} className={styles.helpfulItem}>
                  <div className={styles.helpfulItemLeft}>
                    <Icon className={styles.helpfulIcon} />
                    <div>
                      <p className={styles.helpfulTitle}>{title}</p>
                      <p className={styles.helpfulDesc}>{desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight className={styles.helpfulExternal} />
                </button>
              ))}
            </div>
          </div>

          <Divider />

          {/* 11 · Accreditation */}
          <div className={styles.accreditationSection}>
            <div className={styles.accreditationContent}>
              <h2 className={styles.sectionTitle}>Accreditation</h2>
              <p className={styles.accreditationText}>
                The National Association of Boards of Pharmacy® (NABP®) is an independent, impartial
                &amp; international professional organization that supports state pharmacy boards in
                protecting public health via pharmacist accreditation, license verification &amp; testing programs.
              </p>
            </div>
            <div className={styles.nabpBadge}>
              <ShieldCheckFill className={styles.nabpIcon} />
              <p className={styles.nabpTitle}>NABP</p>
              <p className={styles.nabpSubtitle}>Accredited</p>
              <p className={styles.nabpSubtitle}>Digital Pharmacy</p>
            </div>
          </div>

          <Divider />

          {/* 12 · About section */}
          <div className={styles.aboutSection}>
            <h2 className={styles.aboutTitle}>About Pharmacy | Online Rx Refills - Walmart.com</h2>
            <Link href="#" variant="subtle">Show more</Link>
          </div>

        </div>
      </div>
    </ResponsiveLayout>
  );
}
