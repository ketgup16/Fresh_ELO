import React, { useState } from "react";
import gridStyles from "@/styles/responsive.module.css";
import styles from "@/styles/pageTemplate.module.css";
import { MastHead } from "@/components/ui/MastHead";
import { AppSidebar } from "@/components/ui/AppSidebar";
import type { SidebarMenuItem } from "@/components/ui/AppSidebar";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import Metric from "@/components/ui/Metric";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";
import {
  Home,
  Megaphone,
  BarGraph,
  Toolbox,
  Image,
  Upload,
  Placeholder,
} from "@/components/icons";

const menuItems: SidebarMenuItem[] = [
  { id: "home", label: "Home", Icon: Home, route: "/" },
  {
    id: "notifications",
    label: "Notifications",
    Icon: Megaphone,
    submenuItems: [
      { id: "notif-sub1", label: "Sub page" },
      { id: "notif-sub2", label: "Sub page" },
      { id: "notif-sub3", label: "Sub page" },
    ],
  },
  { id: "charts", label: "Charts", Icon: BarGraph },
  { id: "tools", label: "Tools", Icon: Toolbox },
  { id: "media", label: "Media", Icon: Image },
  { id: "uploads", label: "Uploads", Icon: Upload },
];

export default function PageTemplate() {
  const [activeMenuItem, setActiveMenuItem] = useState("home");

  return (
    <div className={styles.root}>
      <MastHead currentSolution="Page Template" />

      <div className={styles.appRow}>
        <AppSidebar
          menuItems={menuItems}
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        <main className={styles.main}>
          <div className={styles.pageContent}>
            {/* Alert banner */}
            <div className={styles.alertWrapper}>
              <Alert variant="success" action={<a href="#">Action button</a>}>
                Alert message
              </Alert>
            </div>

            {/* Page title */}
            <h1 className={styles.pageTitle}>Home</h1>

            {/* Todo / action card */}
            <Card UNSAFE_style={{ marginBottom: "16px" }}>
              <CardContent>
                <div className={styles.actionRow}>
                  <div className={styles.spotIcon}>
                    <Placeholder style={{ width: 24, height: 24, color: "var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)" }} />
                  </div>
                  <div className={styles.actionTextGroup}>
                    <p className={styles.actionTitle}>Title</p>
                    <p className={styles.actionDescription}>
                      A short description of the action that a user needs to complete, character count 120.
                    </p>
                  </div>
                  <Button variant="secondary" size="small">Button label</Button>
                </div>
              </CardContent>
            </Card>

            {/* Metrics row */}
            <MetricsRow />

            {/* Hero + secondary cards row */}
            <HeroSection />

            {/* Primary section */}
            <PrimarySection />
          </div>

          <MartyFloatingPanel />
        </main>
      </div>
    </div>
  );
}

/* ─── Metrics Row ─── */
function MetricsRow() {
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div className={gridStyles.metricsGrid4}>
          <Metric title="Label" value="Value" variant="neutral" textLabel="0%" />
          <Metric title="Label" value="Value" variant="neutral" textLabel="0%" />
          <Metric title="Label" value="Value" variant="neutral" textLabel="0%" />
          <Metric title="Label" value="Value" variant="neutral" textLabel="0%" />
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <div className={gridStyles.heroGrid}>
      {/* Hero card (dark blue promo) */}
      <div className={styles.heroCard}>
        <div className={styles.heroCircle1} />
        <div className={styles.heroCircle2} />
        <h2 className={styles.heroTitle}>Title</h2>
        <p className={styles.heroSubtitle}>Supporting text...</p>
        <div className={styles.heroActions}>
          <LinkButton color="white">Button label</LinkButton>
        </div>
      </div>

      {/* Secondary cards stack */}
      <div className={styles.secondaryStack}>
        <SecondaryCard />
        <SecondaryCard />
      </div>
    </div>
  );
}

function SecondaryCard() {
  return (
    <Card>
      <CardContent>
        <div className={styles.secondaryCardRow}>
          <div className={styles.imagePlaceholder}>
            <ImagePlaceholderIcon />
          </div>
          <div className={styles.secondaryCardText}>
            <p className={styles.secondaryCardTitle}>Title</p>
            <p className={styles.secondaryCardDescription}>
              Include a short description here that speaks to the value prop of the feature. Character limit of 120.
            </p>
            <LinkButton>Button label</LinkButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Primary Section ─── */
function PrimarySection() {
  return (
    <div>
      <div className={styles.primarySectionHeader}>
        <h2 className={styles.primarySectionTitle}>Primary section</h2>
        <LinkButton>Link button</LinkButton>
      </div>

      <div className={gridStyles.primaryCardsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <PrimaryCard key={i} />
        ))}
      </div>
    </div>
  );
}

function PrimaryCard() {
  return (
    <Card>
      <CardContent>
        <div className={styles.primaryCardContent}>
          <div className={styles.primaryCardImage}>
            <ImagePlaceholderIcon size={48} />
          </div>
          <p className={styles.primaryCardTitle}>Title</p>
          <p className={styles.primaryCardDescription}>
            Include a short description here that speaks to the value prop of the feature. Character limit of 120.
          </p>
          <LinkButton>Button label</LinkButton>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Image Placeholder SVG ─── */
function ImagePlaceholderIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "var(--ld-semantic-color-border-disabled, #BABBBE)" }}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16l4-4 3 3 3-3 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
