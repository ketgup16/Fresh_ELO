import React, { useState } from 'react';
import {
  DataTable,
  DataTableHead,
  DataTableBody,
} from '@/components/ui/DataTable';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableCellText } from '@/components/ui/DataTableCellText';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { Edit } from '@/components/icons/Edit';
import { Pencil } from '@/components/icons/Pencil';
import { MoreHorizontal } from '@/components/icons/MoreHorizontal';
import styles from './DataTableMobileExample.module.css';

const ROWS = [
  { id: '1', col1: 'Data', col2: 'Data', col3: 'Data' },
  { id: '2', col1: 'Data', col2: 'Data', col3: 'Data' },
];

function MobileFrame({ children }: { children: React.ReactNode }) {
  return <div className={styles.mobileFrame}>{children}</div>;
}

/** ─── 1. Basic compact ─── */
function BasicCompact() {
  return (
    <MobileFrame>
      <DataTable compact rounded>
        <DataTableHead>
          <tr>
            <DataTableHeader onSort={() => {}} sort="descending">Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
          </tr>
        </DataTableHead>
        <DataTableBody>
          {ROWS.map(r => (
            <DataTableRow key={r.id}>
              <DataTableCellText>{r.col1}</DataTableCellText>
              <DataTableCellText>{r.col2}</DataTableCellText>
              <DataTableCellText>{r.col3}</DataTableCellText>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </MobileFrame>
  );
}

/** ─── 2. With checkboxes ─── */
function WithCheckboxes() {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const allChecked = ROWS.every(r => sel.has(r.id));
  const someChecked = ROWS.some(r => sel.has(r.id));

  return (
    <MobileFrame>
      <DataTable compact rounded>
        <DataTableHead>
          <tr>
            <DataTableHeaderSelect
              a11yCheckboxLabel="Select all"
              checked={allChecked}
              indeterminate={someChecked && !allChecked}
              onChange={() =>
                setSel(allChecked ? new Set() : new Set(ROWS.map(r => r.id)))
              }
            />
            <DataTableHeader onSort={() => {}} sort="descending">Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
          </tr>
        </DataTableHead>
        <DataTableBody>
          {ROWS.map(r => (
            <DataTableRow key={r.id} selected={sel.has(r.id)}>
              <DataTableCellSelect
                a11yLabelledBy="col-label"
                rowLabel={r.id}
                checked={sel.has(r.id)}
                onChange={() =>
                  setSel(prev => {
                    const next = new Set(prev);
                    next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                    return next;
                  })
                }
              />
              <DataTableCellText>{r.col1}</DataTableCellText>
              <DataTableCellText>{r.col2}</DataTableCellText>
              <DataTableCellText>{r.col3}</DataTableCellText>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </MobileFrame>
  );
}

/** ─── 3. With row actions ─── */
function WithActions() {
  return (
    <MobileFrame>
      <DataTable compact rounded>
        <DataTableHead>
          <tr>
            <DataTableHeader onSort={() => {}} sort="descending">Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Actions</DataTableHeader>
          </tr>
        </DataTableHead>
        <DataTableBody>
          {ROWS.map(r => (
            <DataTableRow key={r.id}>
              <DataTableCellText>{r.col1}</DataTableCellText>
              <DataTableCellText>{r.col2}</DataTableCellText>
              <DataTableCellText>{r.col3}</DataTableCellText>
              <DataTableCellActions>
                <IconButton aria-label="Edit" size="small" variant="ghost"><Edit /></IconButton>
                <IconButton aria-label="Duplicate" size="small" variant="ghost"><Pencil /></IconButton>
                <IconButton aria-label="More" size="small" variant="ghost"><MoreHorizontal /></IconButton>
              </DataTableCellActions>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </MobileFrame>
  );
}

/** ─── 4. Checkboxes + row actions ─── */
function WithCheckboxesAndActions() {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const allChecked = ROWS.every(r => sel.has(r.id));
  const someChecked = ROWS.some(r => sel.has(r.id));

  return (
    <MobileFrame>
      <DataTable compact rounded>
        <DataTableHead>
          <tr>
            <DataTableHeaderSelect
              a11yCheckboxLabel="Select all"
              checked={allChecked}
              indeterminate={someChecked && !allChecked}
              onChange={() =>
                setSel(allChecked ? new Set() : new Set(ROWS.map(r => r.id)))
              }
            />
            <DataTableHeader onSort={() => {}} sort="descending">Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Actions</DataTableHeader>
          </tr>
        </DataTableHead>
        <DataTableBody>
          {ROWS.map(r => (
            <DataTableRow key={r.id} selected={sel.has(r.id)}>
              <DataTableCellSelect
                a11yLabelledBy="col-label"
                rowLabel={r.id}
                checked={sel.has(r.id)}
                onChange={() =>
                  setSel(prev => {
                    const next = new Set(prev);
                    next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                    return next;
                  })
                }
              />
              <DataTableCellText>{r.col1}</DataTableCellText>
              <DataTableCellText>{r.col2}</DataTableCellText>
              <DataTableCellText>{r.col3}</DataTableCellText>
              <DataTableCellActions>
                <IconButton aria-label="Edit" size="small" variant="ghost"><Edit /></IconButton>
                <IconButton aria-label="Duplicate" size="small" variant="ghost"><Pencil /></IconButton>
                <IconButton aria-label="More" size="small" variant="ghost"><MoreHorizontal /></IconButton>
              </DataTableCellActions>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </MobileFrame>
  );
}

/** ─── 5. Selection state + bulk actions bar ─── */
function WithBulkActions() {
  const [sel, setSel] = useState<Set<string>>(new Set(['2']));
  const allChecked = ROWS.every(r => sel.has(r.id));
  const someChecked = ROWS.some(r => sel.has(r.id));

  return (
    <MobileFrame>
      {sel.size > 0 && (
        <DataTableBulkActions
          count={sel.size}
          onSelectAll={() => setSel(new Set(ROWS.map(r => r.id)))}
          onClearSelected={() => setSel(new Set())}
          actionContent={
            <>
              <Button size="small">Button label</Button>
              <IconButton aria-label="More" size="small" variant="ghost">
                <MoreHorizontal />
              </IconButton>
            </>
          }
        />
      )}
      <DataTable compact rounded>
        <DataTableHead>
          <tr>
            <DataTableHeaderSelect
              a11yCheckboxLabel="Select all"
              checked={allChecked}
              indeterminate={someChecked && !allChecked}
              onChange={() =>
                setSel(allChecked ? new Set() : new Set(ROWS.map(r => r.id)))
              }
            />
            <DataTableHeader onSort={() => {}} sort="descending">Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
          </tr>
        </DataTableHead>
        <DataTableBody>
          {ROWS.map(r => (
            <DataTableRow key={r.id} selected={sel.has(r.id)}>
              <DataTableCellSelect
                a11yLabelledBy="col-label"
                rowLabel={r.id}
                checked={sel.has(r.id)}
                onChange={() =>
                  setSel(prev => {
                    const next = new Set(prev);
                    next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                    return next;
                  })
                }
              />
              <DataTableCellText>{r.col1}</DataTableCellText>
              <DataTableCellText>{r.col2}</DataTableCellText>
              <DataTableCellText>{r.col3}</DataTableCellText>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </MobileFrame>
  );
}

/** ─── 6. Selection + bulk actions + row actions ─── */
function WithBulkAndRowActions() {
  const [sel, setSel] = useState<Set<string>>(new Set(['2']));
  const allChecked = ROWS.every(r => sel.has(r.id));
  const someChecked = ROWS.some(r => sel.has(r.id));

  return (
    <MobileFrame>
      {sel.size > 0 && (
        <DataTableBulkActions
          count={sel.size}
          onSelectAll={() => setSel(new Set(ROWS.map(r => r.id)))}
          onClearSelected={() => setSel(new Set())}
          actionContent={
            <>
              <Button size="small">Button label</Button>
              <IconButton aria-label="More" size="small" variant="ghost">
                <MoreHorizontal />
              </IconButton>
            </>
          }
        />
      )}
      <DataTable compact rounded>
        <DataTableHead>
          <tr>
            <DataTableHeaderSelect
              a11yCheckboxLabel="Select all"
              checked={allChecked}
              indeterminate={someChecked && !allChecked}
              onChange={() =>
                setSel(allChecked ? new Set() : new Set(ROWS.map(r => r.id)))
              }
            />
            <DataTableHeader onSort={() => {}} sort="descending">Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Label</DataTableHeader>
            <DataTableHeader>Actions</DataTableHeader>
          </tr>
        </DataTableHead>
        <DataTableBody>
          {ROWS.map(r => (
            <DataTableRow key={r.id} selected={sel.has(r.id)}>
              <DataTableCellSelect
                a11yLabelledBy="col-label"
                rowLabel={r.id}
                checked={sel.has(r.id)}
                onChange={() =>
                  setSel(prev => {
                    const next = new Set(prev);
                    next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                    return next;
                  })
                }
              />
              <DataTableCellText>{r.col1}</DataTableCellText>
              <DataTableCellText>{r.col2}</DataTableCellText>
              <DataTableCellText>{r.col3}</DataTableCellText>
              <DataTableCellActions>
                <IconButton aria-label="Edit" size="small" variant="ghost"><Edit /></IconButton>
                <IconButton aria-label="Duplicate" size="small" variant="ghost"><Pencil /></IconButton>
                <IconButton aria-label="More" size="small" variant="ghost"><MoreHorizontal /></IconButton>
              </DataTableCellActions>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </MobileFrame>
  );
}

export default function DataTableMobileExample() {
  return (
    <div className={styles.grid}>
      <div className={styles.variantBlock}>
        <span className={styles.variantLabel}>Basic compact</span>
        <BasicCompact />
      </div>
      <div className={styles.variantBlock}>
        <span className={styles.variantLabel}>With checkboxes</span>
        <WithCheckboxes />
      </div>
      <div className={styles.variantBlock}>
        <span className={styles.variantLabel}>With row actions</span>
        <WithActions />
      </div>
      <div className={styles.variantBlock}>
        <span className={styles.variantLabel}>Checkboxes + row actions</span>
        <WithCheckboxesAndActions />
      </div>
      <div className={styles.variantBlock}>
        <span className={styles.variantLabel}>Selection + bulk actions</span>
        <WithBulkActions />
      </div>
      <div className={styles.variantBlock}>
        <span className={styles.variantLabel}>Selection + bulk actions + row actions</span>
        <WithBulkAndRowActions />
      </div>
    </div>
  );
}
