import React, { useState } from "react";
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
import DisplayAdvertisingSidebar from "@/features/advertising/DisplayAdvertisingSidebar";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";

export default function Index() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <MastHead />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <DisplayAdvertisingSidebar
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
          <Alert variant="info">
            This is a template -- replace this content with your application.
            Use the Component Library to explore all available LD 3.5 components.
          </Alert>

          <div style={{ padding: "24px 32px" }}>
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

            <div
              style={{
                marginTop: "24px",
                backgroundColor: "var(--ld-semantic-color-fill-surface-primary, #ffffff)",
                borderRadius: "8px",
                border: "1px solid var(--ld-semantic-color-separator, #E3E4E5)",
                overflow: "hidden",
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
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
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
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "var(--ld-semantic-spacing-4, 16px)",
        marginBottom: "16px",
        paddingBottom: "16px",
        borderBottom: "1px solid var(--ld-semantic-color-separator, #E3E4E5)",
      }}
    >
      <div style={{ width: 220 }}>
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
      <div style={{ width: 280 }}>
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

/* ─── Metrics Row ─── */

function MetricsRow() {
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "var(--ld-semantic-spacing-4, 16px)",
            paddingBottom: "var(--ld-semantic-spacing-4, 16px)",
            borderBottom: "1px solid var(--ld-semantic-color-separator, #E3E4E5)",
          }}
        >
          <Metric title="Eyebrow" value="$0.00" variant="positiveUp" textLabel="0%" />
          <Metric title="Eyebrow" value="$0.00" variant="negativeDown" textLabel="0%" />
          <Metric title="Eyebrow" value="$0.00" variant="neutral" textLabel="0%" />
          <Metric title="Eyebrow" value="0" variant="positiveUp" textLabel="0%" />
          <Metric title="Eyebrow" value="$0.00" variant="negativeDown" textLabel="0%" />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "var(--ld-semantic-spacing-4, 16px)",
            paddingTop: "var(--ld-semantic-spacing-4, 16px)",
          }}
        >
          <Metric title="Eyebrow" value="0" variant="positiveUp" textLabel="0%" />
          <Metric title="Eyebrow" value="0" variant="positiveUp" textLabel="0%" />
        </div>
      </CardContent>
    </Card>
  );
}
