import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { Divider } from "@/components/ui/Divider";
import { Tag } from "@/components/ui/Tag";
import { Alert } from "@/components/ui/Alert";
import Metric from "@/components/ui/Metric";
import { DataTable, DataTableHead, DataTableBody } from "@/components/ui/DataTable";
import { DataTableHeader } from "@/components/ui/DataTableHeader";
import { DataTableRow } from "@/components/ui/DataTableRow";
import { DataTableCell } from "@/components/ui/DataTableCellText";
import { MastHead } from "@/components/ui/MastHead";
import { AppSideNav } from "@/components/ui/AppSideNav";
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* MastHead */}
      <MastHead companyName="Coca Cola" appName="Ad Center" dropdownLabel="Display" />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Icon Side Nav */}
        <AppSideNav activeId="dashboard" />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "var(--ld-semantic-color-fill-surface-primary, #ffffff)",
          }}
        >
          {/* Template Banner */}
          <Alert variant="info">
            This is a template — replace this content with your application.
            Use the Component Library to explore all available LD 3.5 components.
          </Alert>

          <div style={{ padding: "24px 32px" }}>
            {/* Page Title */}
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "var(--ld-semantic-font-family-sans)",
                color: "var(--ld-semantic-color-text-primary, #2E2F32)",
                marginBottom: "24px",
              }}
            >
              Hi, Gabriela
            </h2>

            {/* Recommendations Section */}
            <RecommendationsCard />

            {/* Filter Bar */}
            <FilterBar />

            {/* Metrics Row */}
            <MetricsRow />

            <Divider />

            {/* Data Table Section */}
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

          {/* Marty Floating Panel */}
          <MartyFloatingPanel />
        </main>
      </div>
    </div>
  );
}

/* ─── Recommendations Card ─── */

function RecommendationsCard() {
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ld-semantic-spacing-2, 8px)", marginBottom: "4px" }}>
          <span style={{
            width: 24, height: 24, borderRadius: "var(--ld-semantic-border-radius-full, 9999px)",
            backgroundColor: "var(--ld-semantic-color-sentiment-info-fill, #E9F1FE)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
          }}>
            &#9889;
          </span>
          <span style={{
            fontSize: "16px", fontWeight: "700",
            fontFamily: "var(--ld-semantic-font-family-sans)",
            color: "var(--ld-semantic-color-text-primary, #2E2F32)",
          }}>
            Recommendations
          </span>
        </div>
        <p style={{
          fontSize: "14px", color: "var(--ld-semantic-color-text-secondary, #74767C)",
          fontFamily: "var(--ld-semantic-font-family-sans)", marginBottom: "16px",
        }}>
          Discover opportunities to improve your campaign performance.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ld-semantic-spacing-4, 16px)" }}>
          <RecommendationItem
            tagLabel="Awareness"
            tagColor="info"
            title="Increase reach and visibility"
            highlight="45k-48k"
            description="Potential increase in impressions"
            count={8}
          />
          <RecommendationItem
            tagLabel="Engagement"
            tagColor="positive"
            title="Drive more clicks and interactions"
            highlight="0.8%-1.2%"
            description="Potential increase in clicks"
            count={14}
          />
          <RecommendationItem
            tagLabel="Conversion"
            tagColor="error"
            title="Increase sales and ROAS"
            highlight="15%-18%"
            description="Potential increase in transactions"
            count={10}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendationItem({ tagLabel, tagColor, title, highlight, description, count }: {
  tagLabel: string;
  tagColor: "info" | "positive" | "error";
  title: string;
  highlight: string;
  description: string;
  count: number;
}) {
  const tagVariantMap: Record<string, "brand" | "positive" | "negative"> = {
    info: "brand",
    positive: "positive",
    error: "negative",
  };

  return (
    <div style={{
      border: "1px solid var(--ld-semantic-color-border-subtle, #E6E6E8)",
      borderRadius: "var(--ld-semantic-border-radius-medium, 8px)",
      padding: "var(--ld-semantic-spacing-4, 16px)",
    }}>
      <Tag color={tagVariantMap[tagColor]} variant="secondary" style={{ marginBottom: "8px" }}>
        {tagLabel}
      </Tag>
      <p style={{
        fontSize: "14px", fontFamily: "var(--ld-semantic-font-family-sans)",
        color: "var(--ld-semantic-color-text-primary, #2E2F32)", marginBottom: "8px",
      }}>
        {title}
      </p>
      <p style={{
        fontSize: "14px", fontFamily: "var(--ld-semantic-font-family-sans)",
        color: "var(--ld-semantic-color-sentiment-positive-text, #2A8703)", fontWeight: "700",
        marginBottom: "2px",
      }}>
        {highlight} <span style={{ fontWeight: "700", color: "var(--ld-semantic-color-text-primary, #2E2F32)" }}>
          {description}
        </span>
      </p>
      <p style={{
        fontSize: "12px", fontFamily: "var(--ld-semantic-font-family-sans)",
        color: "var(--ld-semantic-color-text-secondary, #74767C)", marginBottom: "12px",
      }}>
        {count} recommendations available
      </p>
      <Button variant="secondary" size="small">Review</Button>
    </div>
  );
}

/* ─── Filter Bar ─── */

function FilterBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--ld-semantic-spacing-6, 24px)",
      marginBottom: "16px", paddingBottom: "16px",
      borderBottom: "1px solid var(--ld-semantic-color-border-subtle, #E6E6E8)",
    }}>
      <div>
        <span style={{
          fontSize: "12px", fontFamily: "var(--ld-semantic-font-family-sans)",
          color: "var(--ld-semantic-color-text-secondary, #74767C)", display: "block", marginBottom: "4px",
        }}>
          Attribution window
        </span>
        <Button variant="secondary" size="small">
          14 day attribution ▾
        </Button>
      </div>
      <div>
        <span style={{
          fontSize: "12px", fontFamily: "var(--ld-semantic-font-family-sans)",
          color: "var(--ld-semantic-color-text-secondary, #74767C)", display: "block", marginBottom: "4px",
        }}>
          Date range
        </span>
        <Button variant="secondary" size="small">
          Oct 1, 2025 - Oct 31, 2025 ▾
        </Button>
      </div>
    </div>
  );
}

/* ─── Metrics Row ─── */

function MetricsRow() {
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: "var(--ld-semantic-spacing-4, 16px)",
          paddingBottom: "var(--ld-semantic-spacing-4, 16px)",
          borderBottom: "1px solid var(--ld-semantic-color-border-subtle, #E6E6E8)",
        }}>
          <Metric title="Impressions" value="21,891,371" variant="positiveUp" textLabel="6%" />
          <Metric title="eCPM" value="$5.52" variant="negativeDown" textLabel="1%" />
          <Metric title="Spend" value="$120,869" variant="neutral" textLabel="0%" />
          <Metric title="Total ROAS" value="$3.13" variant="negativeDown" textLabel="1%" />
          <Metric title="Total attributed sales" value="$377,588" variant="negativeDown" textLabel="3%" />
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: "var(--ld-semantic-spacing-4, 16px)",
          paddingTop: "var(--ld-semantic-spacing-4, 16px)",
        }}>
          <Metric title="Total attributed transactions" value="30,666" variant="positiveUp" textLabel="4%" />
          <Metric title="Total attributed units" value="21,891,371" variant="positiveUp" textLabel="2%" />
        </div>
      </CardContent>
    </Card>
  );
}
