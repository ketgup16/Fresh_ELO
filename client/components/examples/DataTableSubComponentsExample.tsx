import React from 'react';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { DataTableTitle } from '@/components/ui/DataTableTitle';
import { DataTableConfigPanel, ColumnConfig } from '@/components/ui/DataTableConfigPanel';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { RowActionsMenu } from './DataTableRowActionsMenu';
import { Sliders, Download } from '@/components/icons';
import styles from './DataTableSubComponentsExample.module.css';

/* ================================================================
   1. DataTableTitle Example
   ================================================================ */
function TitleExample() {
  return (
    <div className={styles.exampleCard}>
      <DataTableTitle
        subtitle="12 total results"
        actions={
          <>
            <IconButton aria-label="Settings" variant="secondary">
              <Sliders />
            </IconButton>
            <IconButton aria-label="Download" variant="secondary">
              <Download />
            </IconButton>
          </>
        }
      >
        Campaigns
      </DataTableTitle>
    </div>
  );
}

/* ================================================================
   2. DataTableHeader Variants Example
   ================================================================ */
function HeaderExample() {
  const [sort, setSort] = React.useState<'ascending' | 'descending' | 'none'>('none');

  const toggleSort = () => {
    setSort((prev) =>
      prev === 'none' ? 'ascending' : prev === 'ascending' ? 'descending' : 'ascending',
    );
  };

  return (
    <div className={styles.exampleCard}>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader width={200}>Plain Header</DataTableHeader>
            <DataTableHeader width={200} onSort={toggleSort} sort={sort}>
              Sortable Header
            </DataTableHeader>
            <DataTableHeader width={200} alignment="right">
              Right-Aligned
            </DataTableHeader>
            <DataTableHeader width={200} resizable onResize={() => {}}>
              Resizable Header
            </DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>Cell value</DataTableCell>
            <DataTableCell>Cell value</DataTableCell>
            <DataTableCell variant="numeric">$1,234.56</DataTableCell>
            <DataTableCell>Drag the right edge</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   3. Cell Variants Example
   ================================================================ */
function CellVariantsExample() {
  return (
    <div className={styles.exampleCard}>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader width={200}>Alphanumeric</DataTableHeader>
            <DataTableHeader width={140} alignment="right">Numeric</DataTableHeader>
            <DataTableHeader width={140}>Status</DataTableHeader>
            <DataTableHeader width={100} alignment="right">Actions</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>Product Name</DataTableCell>
            <DataTableCell variant="numeric">$42,500.00</DataTableCell>
            <DataTableCellStatus>
              <Tag variant="tertiary" color="positive">Live</Tag>
            </DataTableCellStatus>
            <DataTableCellActions>
              <RowActionsMenu name="Product" />
            </DataTableCellActions>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Another Item</DataTableCell>
            <DataTableCell variant="numeric">$12,000.00</DataTableCell>
            <DataTableCellStatus>
              <Tag variant="tertiary" color="warning">Paused</Tag>
            </DataTableCellStatus>
            <DataTableCellActions>
              <RowActionsMenu name="Item" />
            </DataTableCellActions>
          </DataTableRow>
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   4. Selection & Bulk Actions Example
   ================================================================ */

const SELECTION_DATA = [
  { id: '1', name: 'Campaign Alpha', budget: '$50,000' },
  { id: '2', name: 'Campaign Beta', budget: '$35,000' },
  { id: '3', name: 'Campaign Gamma', budget: '$80,000' },
];

function SelectionExample() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['1']));

  const allIds = SELECTION_DATA.map((d) => d.id);
  const allSelected = allIds.every((id) => selected.has(id));
  const someSelected = allIds.some((id) => selected.has(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected || someSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.exampleCard}>
      {selected.size > 0 && (
        <DataTableBulkActions
          count={selected.size}
          onSelectAll={() => setSelected(new Set(allIds))}
          onClearSelected={() => setSelected(new Set())}
          actionContent={
            <Button variant="secondary" size="small">Archive Selected</Button>
          }
        />
      )}
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeaderSelect
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
            />
            <DataTableHeader width={250}>Campaign</DataTableHeader>
            <DataTableHeader width={150} alignment="right">Budget</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {SELECTION_DATA.map((d) => (
            <DataTableRow key={d.id} selected={selected.has(d.id)}>
              <DataTableCellSelect
                a11yLabelledBy={`sel-${d.id}`}
                checked={selected.has(d.id)}
                onChange={() => toggleRow(d.id)}
              />
              <DataTableCell id={`sel-${d.id}`}>{d.name}</DataTableCell>
              <DataTableCell variant="numeric">{d.budget}</DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   5. Frozen Columns Example
   ================================================================ */
function FrozenColumnsExample() {
  return (
    <div className={styles.exampleCard}>
      <div style={{ maxWidth: '600px', overflow: 'auto' }}>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width={180} frozen="left">Name (Frozen)</DataTableHeader>
              <DataTableHeader width={150}>Category</DataTableHeader>
              <DataTableHeader width={150}>Region</DataTableHeader>
              <DataTableHeader width={150} alignment="right">Revenue</DataTableHeader>
              <DataTableHeader width={150} alignment="right">Cost</DataTableHeader>
              <DataTableHeader width={80} alignment="right" frozen="right">Actions</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {[
              { name: 'Spring Campaign', category: 'Display', region: 'North America', revenue: '$120,000', cost: '$45,000' },
              { name: 'Summer Promo', category: 'Video', region: 'Europe', revenue: '$85,000', cost: '$32,000' },
            ].map((row, i) => (
              <DataTableRow key={i}>
                <DataTableCell frozen="left">{row.name}</DataTableCell>
                <DataTableCell>{row.category}</DataTableCell>
                <DataTableCell>{row.region}</DataTableCell>
                <DataTableCell variant="numeric">{row.revenue}</DataTableCell>
                <DataTableCell variant="numeric">{row.cost}</DataTableCell>
                <DataTableCellActions frozen="right">
                  <RowActionsMenu name={row.name} />
                </DataTableCellActions>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </div>
    </div>
  );
}

/* ================================================================
   6. Config Panel Example
   ================================================================ */

const PANEL_COLUMNS: ColumnConfig[] = [
  { id: 'name', label: 'Item name', visible: true, pinned: false, alwaysVisible: true },
  { id: 'sku', label: 'SKU', visible: true, pinned: false },
  { id: 'price', label: 'Price', visible: true, pinned: false },
  { id: 'shipping', label: 'Shipping', visible: true, pinned: false },
  { id: 'inventory', label: 'Inventory', visible: true, pinned: false },
  { id: 'fulfillment', label: 'Fulfillment', visible: true, pinned: false },
  { id: 'status', label: 'Status', visible: true, pinned: false },
  { id: 'lastModified', label: 'Last modified', visible: false, pinned: false },
  { id: 'lifecycle', label: 'Lifecycle', visible: false, pinned: false },
  { id: 'repricerStrategy', label: 'Repricer strategy', visible: false, pinned: false },
  { id: 'actions', label: 'Actions', visible: true, pinned: true, alwaysPinned: true },
];

function ConfigPanelExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [columns, setColumns] = React.useState<ColumnConfig[]>(PANEL_COLUMNS);

  const visibleCols = columns.filter((c) => c.visible && c.id !== 'actions');
  const showActions = columns.find((c) => c.id === 'actions')?.visible ?? true;

  return (
    <div className={styles.exampleCard}>
      <DataTableConfigPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Customize Columns"
        columns={columns}
        onApply={(updated) => setColumns(updated)}
      />
      <div className={styles.configPanelRow}>
        <Button variant="secondary" size="small" onClick={() => setIsOpen(true)}>
          Open Column Config Panel
        </Button>
        <span className={styles.configSummary}>
          {visibleCols.length} of {columns.length - 1} columns visible
          {showActions ? ' + Actions pinned right' : ''}
        </span>
      </div>

      <DataTable>
        <DataTableHead>
          <DataTableRow>
            {visibleCols.map((col) => (
              <DataTableHeader key={col.id} width={140} frozen={col.pinned ? 'left' : undefined}>
                {col.label}
              </DataTableHeader>
            ))}
            {showActions && (
              <DataTableHeader width={80} alignment="right" frozen="right">Actions</DataTableHeader>
            )}
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            {visibleCols.map((col) => (
              <DataTableCell key={col.id}>Sample data</DataTableCell>
            ))}
            {showActions && (
              <DataTableCellActions frozen="right">
                <RowActionsMenu name="Sample" />
              </DataTableCellActions>
            )}
          </DataTableRow>
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   7. Table Options (Rounded, Elevated, Text Style) Example
   ================================================================ */
function TableOptionsExample() {
  return (
    <div className={styles.optionsGrid}>
      <div>
        <h4 className={styles.optionLabel}>Rounded + Elevated</h4>
        <DataTable rounded elevated>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width={200}>Name</DataTableHeader>
              <DataTableHeader width={120} alignment="right">Value</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Item A</DataTableCell>
              <DataTableCell variant="numeric">$100</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </div>
      <div>
        <h4 className={styles.optionLabel}>Body Medium Text Style</h4>
        <DataTable textStyle="body-medium">
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width={200}>Name</DataTableHeader>
              <DataTableHeader width={120} alignment="right">Value</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Item B</DataTableCell>
              <DataTableCell variant="numeric">$250</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function Section({ title, description, children }: SectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <p className={styles.sectionDescription}>{description}</p>
      {children}
    </div>
  );
}

export default function DataTableSubComponentsExample() {
  return (
    <div className={styles.root}>
      <Section
        title="DataTableTitle"
        description="Header bar displayed above the table with title, subtitle, and action buttons."
      >
        <TitleExample />
      </Section>

      <Section
        title="DataTableHeader"
        description="Column headers with optional sorting, right-alignment, and resize handles."
      >
        <HeaderExample />
      </Section>

      <Section
        title="Cell Variants"
        description="Different cell types: alphanumeric, numeric, status (Tag), and actions (Menu)."
      >
        <CellVariantsExample />
      </Section>

      <Section
        title="Selection & Bulk Actions"
        description="Row selection with header checkbox (select all / indeterminate) and bulk action toolbar."
      >
        <SelectionExample />
      </Section>

      <Section
        title="Frozen Columns"
        description="Columns can be frozen (sticky) to the left or right edge. Scroll horizontally to see the effect."
      >
        <FrozenColumnsExample />
      </Section>

      <Section
        title="Configure Panel"
        description="Column configuration panel for show/hide, pin/freeze, and drag-to-reorder columns."
      >
        <ConfigPanelExample />
      </Section>

      <Section
        title="Table Options"
        description="Optional rounded corners, elevation, and text style variants."
      >
        <TableOptionsExample />
      </Section>
    </div>
  );
}
