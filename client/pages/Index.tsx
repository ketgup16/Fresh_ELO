import React, { useState } from "react";
import styles from "@/styles/responsive.module.css";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Divider } from "@/components/ui/Divider";
import { Tag } from "@/components/ui/Tag";
import { Alert } from "@/components/ui/Alert";
import Metric from "@/components/ui/Metric";
import { Select, SelectItem } from "@/components/ui/Select";
import DataTableExample from "@/components/examples/DataTableExample";
import { MastHead } from "@/components/ui/MastHead";
import { AppSidebar } from "@/components/ui/AppSidebar";
import type { SidebarMenuItem } from "@/components/ui/AppSidebar";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";
import {
  Home,
  Megaphone,
  BarGraph,
  Toolbox,
  Image,
  Upload,
} from "@/components/icons";

/**
 * Dashboard page sidebar menu items — Advertising / Home navigation.
 * Each page defines its own menu items relevant to that page's context.
 */
const dashboardMenuItems: SidebarMenuItem[] = [
  { id: "dashboard", label: "Home", Icon: Home, route: "/" },
  {
    id: "campaigns",
    label: "Notifications",
    Icon: Megaphone,
    submenuItems: [
      { id: "campaigns-sub1", label: "Sub page" },
      { id: "campaigns-sub2", label: "Sub page" },
      { id: "campaigns-sub3", label: "Sub page" },
    ],
  },
  { id: "reports", label: "Charts", Icon: BarGraph },
  { id: "tools", label: "Tools", Icon: Toolbox },
  { id: "video-manager", label: "Media", Icon: Image },
  { id: "bulk-operations", label: "Uploads", Icon: Upload },
];

export default function Index() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <MastHead />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <AppSidebar
          menuItems={dashboardMenuItems}
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
            <div style={{ marginBottom: "24px" }}>
              <Alert variant="info">
                This is a template -- replace this content with your application.
                Use the Component Library to explore all available LD 3.5 components.
              </Alert>
            </div>

            <h2
              style={{
                fontSize: "var(--ld-semantic-font-heading-large-size, 32px)",
                fontWeight: "var(--ld-semantic-font-heading-large-weight-default, 700)",
                fontFamily: "var(--ld-semantic-font-heading-large-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
                lineHeight: "var(--ld-semantic-font-heading-large-lineheight, 1.25)",
                color: "var(--ld-semantic-color-text-primary, #2E2F32)",
                marginBottom: "24px",
              }}
            >
              Hello World
            </h2>

            <RecommendationsCards />

            <FilterBar />

            <MetricsRow />

            <Divider />

            {/* Section header — 8px hierarchy rule: title 24px above tabs/content, 16px below divider */}
            <SectionHeader title="Top performing by ROAS" />

            <div
              className={styles.tableWrapper}
              style={{
                backgroundColor: "var(--ld-semantic-color-fill-surface-primary, #ffffff)",
                borderRadius: "8px",
                border: "1px solid var(--ld-semantic-color-separator, #E3E4E5)",
              }}
            >
              <DataTableExample />
            </div>
          </div>

          <MartyFloatingPanel />
        </main>
      </div>
    </div>
  );
}

/* ─── Recommendations Card ─── */

function RecommendationCard({
  category,
  heading,
  body,
  cta,
}: {
  category: string;
  heading: string;
  body: string;
  cta: string;
}) {
  return (
    <Card UNSAFE_style={{ flex: "1 1 0" }}>
      <CardContent>
        <Tag color="blue" variant="tertiary" style={{ marginBottom: "12px" }}>
          {category}
        </Tag>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "var(--ld-semantic-font-family-sans)",
            color: "var(--ld-semantic-color-text-primary, #2E2F32)",
            marginBottom: "8px",
          }}
        >
          {heading}
        </h3>
        <p
          style={{
            fontSize: "16px",
            fontFamily: "var(--ld-semantic-font-family-sans)",
            color: "var(--ld-semantic-color-text-secondary, #74767C)",
            marginBottom: "16px",
          }}
        >
          {body}
        </p>
        <Button variant="secondary" size="small">
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}

function RecommendationsCards() {
  return (
    <div className={styles.threeColGrid}>
      <RecommendationCard
        category="Category"
        heading="Heading Text"
        body="Body Text"
        cta="Call to Action"
      />
      <RecommendationCard
        category="Category"
        heading="Heading Text"
        body="Body Text"
        cta="Call to Action"
      />
      <RecommendationCard
        category="Category"
        heading="Heading Text"
        body="Body Text"
        cta="Call to Action"
      />
    </div>
  );
}

/* ─── Filter Bar ─── */

function FilterBar() {
  const [daysWindow, setDaysWindow] = useState("14");
  const [dateRange, setDateRange] = useState("range-1");

  return (
    <div className={styles.filterBar}>
      <div style={{ width: 220, minWidth: 180, flex: '0 1 220px' }}>
        <Select
          label="Days window"
          value={daysWindow}
          onValueChange={setDaysWindow}
          size="large"
        >
          <SelectItem value="7">7 days</SelectItem>
          <SelectItem value="14">14 days</SelectItem>
          <SelectItem value="28">28 days</SelectItem>
          <SelectItem value="30">30 days</SelectItem>
        </Select>
      </div>
      <div style={{ width: 280, minWidth: 200, flex: '0 1 280px' }}>
        <Select
          label="Date range"
          value={dateRange}
          onValueChange={setDateRange}
          size="large"
        >
          <SelectItem value="range-1">Jan 1, 2025 - Jan 31, 2025</SelectItem>
          <SelectItem value="range-2">Feb 1, 2025 - Feb 28, 2025</SelectItem>
          <SelectItem value="range-3">Mar 1, 2025 - Mar 31, 2025</SelectItem>
          <SelectItem value="range-4">Apr 1, 2025 - Apr 30, 2025</SelectItem>
        </Select>
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
/* 8px HIERARCHY RULE: Use multiples of 8px for spacing between content sections.
   - 24px (3×8) between section title and content below
   - 16px (2×8) between divider and section title
   - 32px (4×8) between major page sections */

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <h3
        style={{
          fontFamily: "var(--ld-semantic-font-heading-small-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
          fontSize: "var(--ld-semantic-font-heading-small-size, 20px)",
          fontWeight: "var(--ld-semantic-font-heading-small-weight-default, 700)",
          lineHeight: "var(--ld-semantic-font-heading-small-lineheight, 1.4)",
          color: "var(--ld-semantic-color-text, #2E2F32)",
          margin: 0,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

/* ─── Metrics Row ─── */

function MetricsRow() {
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div className={styles.metricsGrid7}>
          <Metric title="Impressions" value="21,891,371" variant="positiveUp" textLabel="6%" showInfoIcon />
          <Metric title="eCPM" value="$5.52" variant="negativeDown" textLabel="1%" showInfoIcon />
          <Metric title="Spend" value="$120,869" variant="neutral" textLabel="0%" showInfoIcon />
          <Metric title="Total ROAS" value="$3.13" variant="positiveUp" textLabel="1%" showInfoIcon />
          <Metric title="Total attributed sales" value="$377,588" variant="positiveUp" textLabel="3%" showInfoIcon />
          <Metric title="Total attributed orders" value="30,666" variant="positiveUp" textLabel="4%" showInfoIcon />
          <Metric title="Total attributed units" value="21,891,371" variant="positiveUp" textLabel="2%" showInfoIcon />
        </div>
      </CardContent>
    </Card>
  );
}
