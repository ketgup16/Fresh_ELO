import React, { useState } from "react";
import styles from "@/styles/responsive.module.css";
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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <MastHead currentSolution="Page Template" />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <AppSidebar
          menuItems={menuItems}
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "var(--ld-semantic-color-fill-surface-subtle, #F8F8F8)",
          }}
        >
          <div className={styles.pageContent}>
            {/* Alert banner */}
            <div style={{ marginBottom: "24px" }}>
              <Alert variant="success" action={<a href="#">Action button</a>}>
                Alert message
              </Alert>
            </div>

            {/* Page title */}
            <h1
              style={{
                fontSize: "var(--ld-semantic-font-heading-large-size, 32px)",
                fontWeight: "var(--ld-semantic-font-heading-large-weight-default, 700)",
                fontFamily: "var(--ld-semantic-font-heading-large-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
                lineHeight: "var(--ld-semantic-font-heading-large-lineheight, 1.25)",
                color: "var(--ld-semantic-color-text-primary, #2E2F32)",
                marginBottom: "24px",
              }}
            >
              Home
            </h1>

            {/* Todo / action card */}
            <Card UNSAFE_style={{ marginBottom: "16px" }}>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {/* Spot icon */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      padding: 12,
                      borderRadius: "50%",
                      background: "var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Placeholder style={{ width: 24, height: 24, color: "var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)" }} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        fontFamily: "var(--ld-semantic-font-family-sans)",
                        color: "var(--ld-semantic-color-text-primary, #2E2F32)",
                        marginBottom: "2px",
                      }}
                    >
                      Title
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontFamily: "var(--ld-semantic-font-family-sans)",
                        color: "var(--ld-semantic-color-text-secondary, #74767C)",
                      }}
                    >
                      A short description of the action that a user needs to complete, character count 120.
                    </div>
                  </div>

                  {/* CTA */}
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
        <div className={styles.metricsGrid4}>
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
    <div className={styles.heroGrid}>
      {/* Hero card (dark blue promo) */}
      <div
        style={{
          borderRadius: "8px",
          background: "linear-gradient(135deg, #0a1e5e 0%, #0d2c8a 60%, #1a3fa8 100%)",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "260px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(100,149,237,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(100,149,237,0.13)",
          }}
        />
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 800,
            fontFamily: "var(--ld-semantic-font-heading-large-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
            color: "#ffffff",
            marginBottom: "8px",
            position: "relative",
          }}
        >
          Title
        </h2>
        <p
          style={{
            fontSize: "14px",
            fontFamily: "var(--ld-semantic-font-family-sans)",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "24px",
            position: "relative",
          }}
        >
          Supporting text...
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
          <LinkButton color="white">Button label</LinkButton>
        </div>
      </div>

      {/* Secondary cards stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          {/* Image placeholder */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "var(--ld-semantic-color-fill-surface-secondary, #F2F3F3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ImagePlaceholderIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: "var(--ld-semantic-font-family-sans)",
                color: "var(--ld-semantic-color-text-primary, #2E2F32)",
                marginBottom: "4px",
              }}
            >
              Title
            </div>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "var(--ld-semantic-font-family-sans)",
                color: "var(--ld-semantic-color-text-secondary, #74767C)",
                marginBottom: "12px",
              }}
            >
              Include a short description here that speaks to the value prop of the feature. Character limit of 120.
            </div>
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
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            fontFamily: "var(--ld-semantic-font-heading-small-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
            color: "var(--ld-semantic-color-text-primary, #2E2F32)",
            margin: 0,
          }}
        >
          Primary section
        </h2>
        <LinkButton>Link button</LinkButton>
      </div>

      {/* 4-column card grid */}
      <div className={styles.primaryCardsGrid}>
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {/* Large circular image placeholder */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "var(--ld-semantic-color-fill-surface-secondary, #F2F3F3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <ImagePlaceholderIcon size={48} />
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "var(--ld-semantic-font-family-sans)",
              color: "var(--ld-semantic-color-text-primary, #2E2F32)",
              marginBottom: "8px",
            }}
          >
            Title
          </div>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "var(--ld-semantic-font-family-sans)",
              color: "var(--ld-semantic-color-text-secondary, #74767C)",
              marginBottom: "12px",
            }}
          >
            Include a short description here that speaks to the value prop of the feature. Character limit of 120.
          </div>
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
      style={{ color: "#BABBBE" }}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16l4-4 3 3 3-3 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
