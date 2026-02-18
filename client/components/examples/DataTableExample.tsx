import React from 'react';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Pencil } from '@/components/icons/Pencil';
import { Trash } from '@/components/icons/Trash';

/* ─── Sample data ─── */
const PRODUCTS = [
  { id: 1, name: 'Great Value Whole Milk, 1 Gallon', sku: 'GV-MLK-001', price: 3.48, stock: 2451, status: 'active' as const },
  { id: 2, name: 'Marketside Organic Spring Mix, 5 oz', sku: 'MS-SAL-042', price: 4.97, stock: 834, status: 'active' as const },
  { id: 3, name: 'Freshness Guaranteed Rotisserie Chicken', sku: 'FG-CHK-019', price: 6.97, stock: 0, status: 'out_of_stock' as const },
  { id: 4, name: 'Great Value Purified Drinking Water, 24 pk', sku: 'GV-WTR-024', price: 3.98, stock: 5120, status: 'active' as const },
  { id: 5, name: 'Marketside Caesar Salad Kit, 11.55 oz', sku: 'MS-SAL-088', price: 3.47, stock: 156, status: 'low_stock' as const },
];

type SortField = 'name' | 'price' | 'stock';
type SortDir = 'ascending' | 'descending' | 'none';

const STATUS_MAP: Record<string, { color: 'positive' | 'negative' | 'warning'; label: string }> = {
  active: { color: 'positive', label: 'In Stock' },
  out_of_stock: { color: 'negative', label: 'Out of Stock' },
  low_stock: { color: 'warning', label: 'Low Stock' },
};

export default function DataTableExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <BasicExample />
      <SelectionExample />
      <SortingExample />
    </div>
  );
}

/* ─── 1. Basic table ─── */
function BasicExample() {
  return (
    <section>
      <SectionHeading
        title="Basic Data Table"
        description="Read-only table with alphanumeric, numeric, status, and action cells."
      />
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader>Product Name</DataTableHeader>
            <DataTableHeader>SKU</DataTableHeader>
            <DataTableHeader alignment="right">Price</DataTableHeader>
            <DataTableHeader alignment="right">Stock</DataTableHeader>
            <DataTableHeader>Status</DataTableHeader>
            <DataTableHeader alignment="right">Actions</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {PRODUCTS.map((p) => {
            const st = STATUS_MAP[p.status];
            return (
              <DataTableRow key={p.id}>
                <DataTableCell>{p.name}</DataTableCell>
                <DataTableCell>{p.sku}</DataTableCell>
                <DataTableCell variant="numeric">${p.price.toFixed(2)}</DataTableCell>
                <DataTableCell variant="numeric">{p.stock.toLocaleString()}</DataTableCell>
                <DataTableCellStatus>
                  <Tag variant="tertiary" color={st.color}>{st.label}</Tag>
                </DataTableCellStatus>
                <DataTableCellActions>
                  <IconButton aria-label={`Edit ${p.name}`}>
                    <Pencil />
                  </IconButton>
                  <IconButton aria-label={`Delete ${p.name}`}>
                    <Trash />
                  </IconButton>
                </DataTableCellActions>
              </DataTableRow>
            );
          })}
        </DataTableBody>
      </DataTable>
    </section>
  );
}

/* ─── 2. Selection + Bulk Actions ─── */
function SelectionExample() {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const allSelected = selectedIds.length === PRODUCTS.length && PRODUCTS.length > 0;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const toggleAll = () => {
    setSelectedIds(allSelected || someSelected ? [] : PRODUCTS.map((p) => p.id));
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <section>
      <SectionHeading
        title="Selection & Bulk Actions"
        description="Select rows with checkboxes and perform bulk operations."
      />
      {selectedIds.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <DataTableBulkActions
            count={selectedIds.length}
            onSelectAll={() => setSelectedIds(PRODUCTS.map((p) => p.id))}
            onClearSelected={() => setSelectedIds([])}
            actionContent={
              <Button variant="secondary" size="small" onClick={() => alert(`Delete ${selectedIds.length} items`)}>
                Delete Selected
              </Button>
            }
          />
        </div>
      )}
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeaderSelect
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
            />
            <DataTableHeader>Product Name</DataTableHeader>
            <DataTableHeader>SKU</DataTableHeader>
            <DataTableHeader alignment="right">Price</DataTableHeader>
            <DataTableHeader>Status</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {PRODUCTS.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            const st = STATUS_MAP[p.status];
            return (
              <DataTableRow key={p.id} selected={isSelected}>
                <DataTableCellSelect
                  a11yLabelledBy={`sel-name-${p.id}`}
                  checked={isSelected}
                  onChange={() => toggleRow(p.id)}
                />
                <DataTableCell id={`sel-name-${p.id}`}>{p.name}</DataTableCell>
                <DataTableCell>{p.sku}</DataTableCell>
                <DataTableCell variant="numeric">${p.price.toFixed(2)}</DataTableCell>
                <DataTableCellStatus>
                  <Tag variant="tertiary" color={st.color}>{st.label}</Tag>
                </DataTableCellStatus>
              </DataTableRow>
            );
          })}
        </DataTableBody>
      </DataTable>
    </section>
  );
}

/* ─── 3. Sorting ─── */
function SortingExample() {
  const [sortField, setSortField] = React.useState<SortField | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('none');

  const handleSort = (field: SortField) => () => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortField(field);
      setSortDir('ascending');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortField || sortDir === 'none') return PRODUCTS;
    return [...PRODUCTS].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const factor = sortDir === 'ascending' ? 1 : -1;
      if (typeof aVal === 'string' && typeof bVal === 'string') return aVal.localeCompare(bVal) * factor;
      return ((aVal as number) - (bVal as number)) * factor;
    });
  }, [sortField, sortDir]);

  const sortFor = (field: SortField): SortDir =>
    sortField === field ? sortDir : 'none';

  return (
    <section>
      <SectionHeading
        title="Sortable Columns"
        description="Click column headers to sort ascending or descending."
      />
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader onSort={handleSort('name')} sort={sortFor('name')}>
              Product Name
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('price')} sort={sortFor('price')}>
              Price
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('stock')} sort={sortFor('stock')}>
              Stock
            </DataTableHeader>
            <DataTableHeader>Status</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {sortedData.map((p) => {
            const st = STATUS_MAP[p.status];
            return (
              <DataTableRow key={p.id}>
                <DataTableCell>{p.name}</DataTableCell>
                <DataTableCell variant="numeric">${p.price.toFixed(2)}</DataTableCell>
                <DataTableCell variant="numeric">{p.stock.toLocaleString()}</DataTableCell>
                <DataTableCellStatus>
                  <Tag variant="tertiary" color={st.color}>{st.label}</Tag>
                </DataTableCellStatus>
              </DataTableRow>
            );
          })}
        </DataTableBody>
      </DataTable>
    </section>
  );
}

/* ─── Helpers ─── */
function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <h3
        style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '4px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle, #74767C)',
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
    </div>
  );
}
