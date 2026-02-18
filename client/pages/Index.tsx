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
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { SideNavigation, SideNavigationItem } from "@/components/ui/SideNavigation";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";

const placeholderNavItems = [
  { label: "Dashboard", path: "/" },
  { label: "Component Library", path: "/component-library" },
  { label: "Reports", path: "/" },
  { label: "Settings", path: "/" },
];

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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          borderRight: "1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)",
          backgroundColor: "var(--ld-semantic-color-fill-surface-primary, #ffffff)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          padding: "24px 16px",
          overflowY: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "var(--ld-semantic-font-family-sans)",
            color: "var(--ld-semantic-color-text-primary, #2E2F32)",
            marginBottom: "4px",
          }}
        >
          App Template
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--ld-semantic-color-text-secondary, #74767C)",
            marginBottom: "24px",
            fontFamily: "var(--ld-semantic-font-family-sans)",
          }}
        >
          Living Design 3.5
        </p>

        <SideNavigation aria-label="Main Navigation">
          {placeholderNavItems.map((item) => (
            <SideNavigationItem
              key={item.label}
              href={item.path}
              isCurrent={item.path === "/"}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </SideNavigationItem>
          ))}
        </SideNavigation>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "var(--ld-semantic-color-fill-surface-secondary, #F8F8F8)",
        }}
      >
        {/* Template Banner */}
        <Alert variant="info">
          This is a template — replace this content with your application.
          Use the Component Library to explore all available LD 3.5 components.
        </Alert>

        <div style={{ padding: "24px 32px" }}>
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </Breadcrumb>

          {/* Page Title + Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "var(--ld-semantic-font-family-sans)",
                color: "var(--ld-semantic-color-text-primary, #2E2F32)",
              }}
            >
              Dashboard
            </h2>
            <div style={{ display: "flex", gap: "var(--ld-semantic-spacing-3, 12px)" }}>
              <Button variant="secondary" size="small" onClick={() => navigate("/component-library")}>
                Component Library
              </Button>
              <Button variant="primary" size="small">
                Create New
              </Button>
            </div>
          </div>

          {/* Metrics Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--ld-semantic-spacing-4, 16px)",
              marginBottom: "24px",
            }}
          >
            <Card>
              <CardContent>
                <Metric title="Total Revenue" value="$125,430" variant="positiveUp" textLabel="+12.5% vs last period" />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Metric title="Active Items" value="1,234" variant="positiveUp" textLabel="+48 this week" />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Metric title="Conversion Rate" value="3.2" unit="%" variant="negativeDown" textLabel="-0.4% vs last period" />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Metric title="Avg. Order Value" value="$54.20" variant="neutral" textLabel="No change" />
              </CardContent>
            </Card>
          </div>

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
  );
}
