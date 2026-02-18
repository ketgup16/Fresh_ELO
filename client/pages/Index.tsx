import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { Divider } from "@/components/ui/Divider";
import { Tag } from "@/components/ui/Tag";
import { Alert } from "@/components/ui/Alert";
import Metric from "@/components/ui/Metric";
import { Select, SelectItem } from "@/components/ui/Select";
import { DataTable, DataTableHead, DataTableBody } from "@/components/ui/DataTable";
import { DataTableHeader } from "@/components/ui/DataTableHeader";
import { DataTableRow } from "@/components/ui/DataTableRow";
import { DataTableCell } from "@/components/ui/DataTableCellText";
import { MastHead } from "@/components/ui/MastHead";
import DisplayAdvertisingSidebar from "@/features/advertising/DisplayAdvertisingSidebar";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";

const placeholderTableData = [
  { id: "001", name: "Sample Item Alpha", status: "Active" as const, category: "Category A", value: "$12,450" },
  { id: "002", name: "Sample Item Beta", status: "Pending" as const, category: "Category B", value: "$8,320" },
  { id: "003", name: "Sample Item Gamma", status: "Active" as const, category: "Category A", value: "$23,100" },
  { id: "004", name: "Sample Item Delta", status: "Inactive" as const, category: "Category C", value: "$5,670" },
  { id: "005", name: "Sample Item Epsilon", status: "Active" as const, category: "Category B", value: "$15,890" },
];

const statusTagColor: Record<string, "positive" | "warning" | "neutral"> = {
  Active: "positive",
  Pending: "warning",
  Inactive: "neutral",
};

export default function Index() {
  const navigate = useNavigate();
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
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "var(--ld-semantic-font-family-sans)",
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

            <div style={{ marginTop: "24px" }}>
              <Card>
                <CardHeader
                  title="Sample Data Table"
                  trailing={
                    <Button variant="tertiary" size="small">
                      View All
                    </Button>
                  }
                />
                <CardContent>
                  <DataTable aria-label="Sample data table">
                    <DataTableHead>
                      <DataTableRow>
                        <DataTableHeader width={80}>ID</DataTableHeader>
                        <DataTableHeader>Name</DataTableHeader>
                        <DataTableHeader>Status</DataTableHeader>
                        <DataTableHeader>Category</DataTableHeader>
                        <DataTableHeader alignment="right">Value</DataTableHeader>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                      {placeholderTableData.map((row) => (
                        <DataTableRow key={row.id}>
                          <DataTableCell>{row.id}</DataTableCell>
                          <DataTableCell>{row.name}</DataTableCell>
                          <DataTableCell>
                            <Tag color={statusTagColor[row.status]} variant="secondary">
                              {row.status}
                            </Tag>
                          </DataTableCell>
                          <DataTableCell>{row.category}</DataTableCell>
                          <DataTableCell variant="numeric">{row.value}</DataTableCell>
                        </DataTableRow>
                      ))}
                    </DataTableBody>
                  </DataTable>
                </CardContent>
              </Card>
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
            fontSize: "14px",
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
          size="small"
          borderless
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
          size="small"
          borderless
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
