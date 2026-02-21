import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { DataTableTitle } from '@/components/ui/DataTableTitle';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/Tag';
import { Menu } from '@/components/ui/Menu';
import { MenuItem } from '@/components/ui/MenuItem';
import { RowActionsMenu } from './DataTableRowActionsMenu';
import {
  Search, X, ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  Sliders, Download,
} from '@/components/icons';

/* ================================================================
   DATA
   ================================================================ */

interface Campaign {
  id: string;
  name: string;
  type: 'campaign' | 'adgroup' | 'creative';
  status: 'Live' | 'Scheduled' | 'Paused' | 'Completed';
  recommendations: number;
  totalBudget?: string;
  targetingStrategy?: string;
  impressions?: string;
  pacing?: { value: string; trend: 'positive' | 'warning' };
  children?: Campaign[];
}

const CAMPAIGNS: Campaign[] = [
  {
    id: '10001',
    name: 'Walmart|Display|Auction|Cross Device|Brand Awareness Campaign_FY27',
    type: 'campaign',
    status: 'Live',
    recommendations: 1,
    totalBudget: '$200,553.22',
    targetingStrategy: 'Contextual targeting',
    impressions: '1,223,112',
    pacing: { value: '113%', trend: 'positive' },
    children: [
      { id: 'ag-1', name: 'Young Adults 18-24', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-1', name: 'Banner Ad - Homepage Hero', type: 'creative', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10002',
    name: 'H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839',
    type: 'campaign',
    status: 'Scheduled',
    recommendations: 2,
    totalBudget: '$213,443.33',
    targetingStrategy: 'Behavioral targeting',
    impressions: '3,200,332',
    pacing: { value: '123%', trend: 'warning' },
    children: [
      { id: 'ag-2', name: 'Display Banner Group A', type: 'adgroup', status: 'Scheduled', recommendations: 0 },
      { id: 'cr-2', name: 'Video Ad - Product Showcase', type: 'creative', status: 'Scheduled', recommendations: 1 },
    ],
  },
  {
    id: '10003',
    name: 'Spring Sale 2024 Campaign',
    type: 'campaign',
    status: 'Live',
    recommendations: 0,
    totalBudget: '$150,000.00',
    targetingStrategy: 'Contextual targeting',
    impressions: '2,500,000',
    pacing: { value: '105%', trend: 'positive' },
    children: [
      { id: 'ag-3', name: 'Seasonal Shoppers 25-44', type: 'adgroup', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10004',
    name: 'Holiday Promotions Q4',
    type: 'campaign',
    status: 'Scheduled',
    recommendations: 3,
    totalBudget: '$300,000.00',
    targetingStrategy: 'Behavioral targeting',
    impressions: '5,000,000',
    pacing: { value: '98%', trend: 'positive' },
    children: [
      { id: 'ag-4', name: 'Gift Buyers Segment', type: 'adgroup', status: 'Scheduled', recommendations: 1 },
      { id: 'cr-4a', name: 'Holiday Hero Banner', type: 'creative', status: 'Scheduled', recommendations: 0 },
      { id: 'cr-4b', name: 'Countdown Timer Ad', type: 'creative', status: 'Scheduled', recommendations: 2 },
    ],
  },
  {
    id: '10005',
    name: 'Campaign 100',
    type: 'campaign',
    status: 'Paused',
    recommendations: 0,
    totalBudget: '$9,009.24',
    targetingStrategy: 'Run of site',
    impressions: '2,334,221',
    pacing: { value: '102%', trend: 'positive' },
    children: [],
  },
  {
    id: '10006',
    name: 'Summer Electronics Flash Sale',
    type: 'campaign',
    status: 'Live',
    recommendations: 2,
    totalBudget: '$220,000.00',
    targetingStrategy: 'Contextual targeting',
    impressions: '4,200,000',
    pacing: { value: '108%', trend: 'positive' },
    children: [
      { id: 'ag-6', name: 'Electronics Enthusiasts', type: 'adgroup', status: 'Live', recommendations: 1 },
      { id: 'cr-6', name: 'Flash Sale Carousel Ad', type: 'creative', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10007',
    name: 'Fashion Week Exclusive Deals',
    type: 'campaign',
    status: 'Completed',
    recommendations: 0,
    totalBudget: '$50,000.00',
    targetingStrategy: 'Run of site',
    impressions: '900,000',
    pacing: { value: '85%', trend: 'warning' },
    children: [],
  },
  {
    id: '10008',
    name: 'Back to School 2024',
    type: 'campaign',
    status: 'Live',
    recommendations: 1,
    totalBudget: '$75,500.00',
    targetingStrategy: 'Run of site',
    impressions: '1,800,000',
    pacing: { value: '110%', trend: 'positive' },
    children: [
      { id: 'ag-8', name: 'Parents & Students', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-8', name: 'School Supplies Banner', type: 'creative', status: 'Live', recommendations: 1 },
    ],
  },
];

const STATUS_TAG_COLORS: Record<string, 'positive' | 'negative' | 'warning' | 'info'> = {
  Live: 'positive',
  Scheduled: 'info',
  Paused: 'warning',
  Completed: 'info',
};

const STATUS_KEYS: Record<string, string> = {
  Live: 'dataTable.statusLive',
  Scheduled: 'dataTable.statusScheduled',
  Paused: 'dataTable.statusPaused',
  Completed: 'dataTable.statusCompleted',
};

const CAMPAIGN_NAME_KEYS: Record<string, string> = {
  '10001': 'dataTable.campaign_10001',
  '10002': 'dataTable.campaign_10002',
  '10003': 'dataTable.campaign_10003',
  '10004': 'dataTable.campaign_10004',
  '10005': 'dataTable.campaign_10005',
  '10006': 'dataTable.campaign_10006',
  '10007': 'dataTable.campaign_10007',
  '10008': 'dataTable.campaign_10008',
  'ag-1': 'dataTable.child_ag1',
  'cr-1': 'dataTable.child_cr1',
  'ag-2': 'dataTable.child_ag2',
  'cr-2': 'dataTable.child_cr2',
  'ag-3': 'dataTable.child_ag3',
  'ag-4': 'dataTable.child_ag4',
  'cr-4a': 'dataTable.child_cr4a',
  'cr-4b': 'dataTable.child_cr4b',
  'ag-6': 'dataTable.child_ag6',
  'cr-6': 'dataTable.child_cr6',
  'ag-8': 'dataTable.child_ag8',
  'cr-8': 'dataTable.child_cr8',
};

const TARGETING_KEYS: Record<string, string> = {
  'Contextual targeting': 'dataTable.targetContextual',
  'Behavioral targeting': 'dataTable.targetBehavioral',
  'Run of site': 'dataTable.targetRunOfSite',
};

type SortField = 'name' | 'status' | 'totalBudget' | 'impressions' | 'pacing';
type SortDir = 'ascending' | 'descending' | 'none';

const RESULTS_PER_PAGE = 5;

/* ================================================================
   MAIN EXAMPLE
   ================================================================ */

export default function DataTableExample() {
  const { t } = useTranslation('pages');

  /* ── Search ── */
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchScope, setSearchScope] = React.useState<'Campaign name' | 'ID'>('Campaign name');
  const [showScopeDropdown, setShowScopeDropdown] = React.useState(false);

  /* ── Filters ── */
  const [statusFilters, setStatusFilters] = React.useState<Set<string>>(new Set());

  /* ── Sort ── */
  const [sortField, setSortField] = React.useState<SortField | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('none');

  /* ── Selection ── */
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  /* ── Expand / collapse ── */
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  /* ── Pagination ── */
  const [currentPage, setCurrentPage] = React.useState(1);

  /* ── Column widths (resizable) ── */
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({
    select: 48,
    campaign: 280,
    status: 120,
    recommendations: 160,
    totalBudget: 140,
    targetingStrategy: 170,
    impressions: 140,
    pacing: 110,
    actions: 80,
  });

  const handleColumnResize = React.useCallback((column: string) => (newWidth: number) => {
    setColumnWidths((prev) => ({ ...prev, [column]: newWidth }));
  }, []);

  /* ────────────────────────────────────────────
     Derived data: filter → search → sort → paginate
     ──────────────────────────────────────────── */

  const filteredData = React.useMemo(() => {
    let data = CAMPAIGNS;

    // Status filter
    if (statusFilters.size > 0) {
      data = data.filter((c) => statusFilters.has(c.status));
    }

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      data = data.filter((c) =>
        searchScope === 'Campaign name'
          ? c.name.toLowerCase().includes(q)
          : c.id.toLowerCase().includes(q),
      );
    }

    return data;
  }, [searchQuery, searchScope, statusFilters]);

  const sortedData = React.useMemo(() => {
    if (!sortField || sortDir === 'none') return filteredData;
    return [...filteredData].sort((a, b) => {
      const factor = sortDir === 'ascending' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return a.name.localeCompare(b.name) * factor;
        case 'status':
          return a.status.localeCompare(b.status) * factor;
        case 'totalBudget': {
          const av = parseFloat((a.totalBudget ?? '0').replace(/[$,]/g, ''));
          const bv = parseFloat((b.totalBudget ?? '0').replace(/[$,]/g, ''));
          return (av - bv) * factor;
        }
        case 'impressions': {
          const av = parseFloat((a.impressions ?? '0').replace(/,/g, ''));
          const bv = parseFloat((b.impressions ?? '0').replace(/,/g, ''));
          return (av - bv) * factor;
        }
        case 'pacing': {
          const av = parseFloat((a.pacing?.value ?? '0').replace('%', ''));
          const bv = parseFloat((b.pacing?.value ?? '0').replace('%', ''));
          return (av - bv) * factor;
        }
        default:
          return 0;
      }
    });
  }, [filteredData, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / RESULTS_PER_PAGE));
  const paginatedData = sortedData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  // Reset page when filters/search change
  React.useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilters]);

  /* ── Handlers ── */

  const handleSort = (field: SortField) => () => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortField(field);
      setSortDir('ascending');
    }
  };

  const sortFor = (field: SortField): SortDir =>
    sortField === field ? sortDir : 'none';

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) => {
      const next = new Set(prev);
      next.has(status) ? next.delete(status) : next.add(status);
      return next;
    });
  };

  const allPageIds = paginatedData.map((c) => c.id);
  const allSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id));
  const someSelected = allPageIds.some((id) => selectedIds.has(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected || someSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allPageIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allPageIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const styles = INLINE_STYLES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* ── Bulk Actions Bar ── */}
      {selectedIds.size > 0 && (
        <DataTableBulkActions
          count={selectedIds.size}
          onSelectAll={() => setSelectedIds(new Set(sortedData.map((c) => c.id)))}
          onClearSelected={() => setSelectedIds(new Set())}
          actionContent={
            <Button variant="secondary" size="small">
              {t('dataTable.archiveSelected')}
            </Button>
          }
        />
      )}

      {/* ── Table Title ── */}
      <DataTableTitle
        subtitle={t('dataTable.totalResults', { count: sortedData.length })}
        actions={
          <>
            <IconButton aria-label={t('dataTable.tableSettings')} variant="secondary">
              <Sliders />
            </IconButton>
            <IconButton aria-label={t('dataTable.download')} variant="secondary">
              <Download />
            </IconButton>
          </>
        }
      >
        {t('dataTable.colCampaign', 'Campaigns')}
      </DataTableTitle>

      {/* ── Toolbar: Search + Filters + Actions ── */}
      <div style={styles.toolbar}>
        {/* Search */}
        <div style={styles.searchBar}>
          <Search style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
          <span style={styles.searchLabel}>{t('dataTable.searchBy')}</span>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              style={styles.scopeButton}
              onClick={() => setShowScopeDropdown((p) => !p)}
            >
              {searchScope === 'Campaign name' ? t('dataTable.campaignName') : t('dataTable.id')}
              {showScopeDropdown
                ? <ChevronUp style={{ width: 16, height: 16 }} />
                : <ChevronDown style={{ width: 16, height: 16 }} />
              }
            </button>
            <div style={{ position: 'absolute', left: 0, top: '100%', marginTop: '4px', zIndex: 50 }}>
            <Menu
              isOpen={showScopeDropdown}
              onClose={() => setShowScopeDropdown(false)}
              position="bottomLeft"
            >
              {(['Campaign name', 'ID'] as const).map((s) => (
                <MenuItem
                  key={s}
                  selected={searchScope === s}
                  onClick={() => { setSearchScope(s); setShowScopeDropdown(false); }}
                >
                  {s === 'Campaign name' ? t('dataTable.campaignName') : t('dataTable.id')}
                </MenuItem>
              ))}
            </Menu>
            </div>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
            placeholder=""
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} style={styles.clearButton} aria-label={t('dataTable.clearSearch')}>
              <X style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {(['Live', 'Scheduled', 'Paused', 'Completed'] as const).map((s) => (
            <FilterChip
              key={s}
              selected={statusFilters.has(s)}
              onSelectedChange={() => toggleStatusFilter(s)}
            >
              {t(STATUS_KEYS[s])}
            </FilterChip>
          ))}
        </div>

      </div>

      {/* ── Table ── */}
      <DataTable rounded elevated>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeaderSelect
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
              frozen="left"
              UNSAFE_style={{ width: columnWidths.select }}
            />
            <DataTableHeader onSort={handleSort('name')} sort={sortFor('name')} width={columnWidths.campaign} resizable onResize={handleColumnResize('campaign')}>
              {t('dataTable.colCampaign')}
            </DataTableHeader>
            <DataTableHeader onSort={handleSort('status')} sort={sortFor('status')} width={columnWidths.status} resizable onResize={handleColumnResize('status')}>
              {t('dataTable.colStatus')}
            </DataTableHeader>
            <DataTableHeader width={columnWidths.recommendations} resizable onResize={handleColumnResize('recommendations')}>
              {t('dataTable.colRecommendations')}
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('totalBudget')} sort={sortFor('totalBudget')} width={columnWidths.totalBudget} resizable onResize={handleColumnResize('totalBudget')}>
              {t('dataTable.colTotalBudget')}
            </DataTableHeader>
            <DataTableHeader width={columnWidths.targetingStrategy} resizable onResize={handleColumnResize('targetingStrategy')}>
              {t('dataTable.colTargetingStrategy')}
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('impressions')} sort={sortFor('impressions')} width={columnWidths.impressions} resizable onResize={handleColumnResize('impressions')}>
              {t('dataTable.colImpressions')}
            </DataTableHeader>
            <DataTableHeader alignment="right" onSort={handleSort('pacing')} sort={sortFor('pacing')} width={columnWidths.pacing} resizable onResize={handleColumnResize('pacing')}>
              {t('dataTable.colPacing')}
            </DataTableHeader>
            <DataTableHeader alignment="right" width={columnWidths.actions} frozen="right">
              {t('dataTable.colActions')}
            </DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {paginatedData.length === 0 && (
            <DataTableRow>
              <DataTableCell UNSAFE_style={{ textAlign: 'center', padding: '32px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} colSpan={9}>
                {t('dataTable.noResults')}
              </DataTableCell>
            </DataTableRow>
          )}
          {paginatedData.map((campaign) => (
            <Fragment key={campaign.id}>
              {/* ── Parent row ── */}
              <DataTableRow selected={selectedIds.has(campaign.id)}>
                <DataTableCellSelect
                  a11yLabelledBy={`name-${campaign.id}`}
                  checked={selectedIds.has(campaign.id)}
                  onChange={() => toggleRow(campaign.id)}
                  frozen="left"
                />
                <DataTableCell id={`name-${campaign.id}`}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    {campaign.children && campaign.children.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => toggleExpand(campaign.id)}
                        style={styles.expandButton}
                        aria-label={expandedIds.has(campaign.id) ? t('dataTable.collapse') : t('dataTable.expand')}
                      >
                        {expandedIds.has(campaign.id)
                          ? <ChevronDown style={{ width: 20, height: 20 }} />
                          : <ChevronRight style={{ width: 20, height: 20 }} />
                        }
                      </button>
                    ) : (
                      <span style={{ width: '24px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <span style={styles.campaignLink}>{CAMPAIGN_NAME_KEYS[campaign.id] ? t(CAMPAIGN_NAME_KEYS[campaign.id]) : campaign.name}</span>
                      <div style={styles.campaignId}>{t('dataTable.idLabel')}: {campaign.id}</div>
                    </div>
                  </div>
                </DataTableCell>
                <DataTableCellStatus>
                  <Tag variant="tertiary" color={STATUS_TAG_COLORS[campaign.status]}>
                    {t(STATUS_KEYS[campaign.status])}
                  </Tag>
                </DataTableCellStatus>
                <DataTableCell>
                  {campaign.recommendations > 0 ? (
                    <span style={styles.recBadge}>
                      {t('dataTable.recommendation', { count: campaign.recommendations })}
                    </span>
                  ) : (
                    '-'
                  )}
                </DataTableCell>
                <DataTableCell variant="numeric">{campaign.totalBudget ?? '-'}</DataTableCell>
                <DataTableCell>{campaign.targetingStrategy ? t(TARGETING_KEYS[campaign.targetingStrategy] ?? campaign.targetingStrategy) : '-'}</DataTableCell>
                <DataTableCell variant="numeric">{campaign.impressions ?? '-'}</DataTableCell>
                <DataTableCell variant="numeric">
                  {campaign.pacing ? (
                    <span style={{
                      fontWeight: 600,
                      color: campaign.pacing.trend === 'positive'
                        ? 'var(--ld-semantic-color-text-positive, #2A8703)'
                        : 'var(--ld-semantic-color-text-warning, #995213)',
                    }}>
                      {campaign.pacing.value}
                    </span>
                  ) : '-'}
                </DataTableCell>
                <DataTableCellActions frozen="right">
                  <RowActionsMenu name={campaign.name} />
                </DataTableCellActions>
              </DataTableRow>

              {/* ── Child rows (expanded) ── */}
              {expandedIds.has(campaign.id) && campaign.children?.map((child) => (
                <DataTableRow key={child.id}>
                  <DataTableCell frozen="left">{'\u00A0'}</DataTableCell>
                  <DataTableCell>
                    <div style={{ paddingLeft: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.5px',
                        color: 'var(--ld-semantic-color-text-subtle, #74767C)',
                        flexShrink: 0,
                      }}>
                        {child.type === 'adgroup' ? t('dataTable.adGroupLabel') : t('dataTable.creativeLabel')}
                      </span>
                      <span style={styles.campaignLink}>{CAMPAIGN_NAME_KEYS[child.id] ? t(CAMPAIGN_NAME_KEYS[child.id]) : child.name}</span>
                    </div>
                  </DataTableCell>
                  <DataTableCellStatus>
                    <Tag variant="tertiary" color={STATUS_TAG_COLORS[child.status]}>
                      {t(STATUS_KEYS[child.status])}
                    </Tag>
                  </DataTableCellStatus>
                  <DataTableCell>
                    {child.recommendations > 0 ? (
                      <span style={styles.recBadge}>{child.recommendations}</span>
                    ) : '-'}
                  </DataTableCell>
                  <DataTableCell variant="numeric">-</DataTableCell>
                  <DataTableCell>-</DataTableCell>
                  <DataTableCell variant="numeric">-</DataTableCell>
                  <DataTableCell variant="numeric">-</DataTableCell>
                  <DataTableCellActions frozen="right">
                    <RowActionsMenu name={child.name} />
                  </DataTableCellActions>
                </DataTableRow>
              ))}
            </Fragment>
          ))}
        </DataTableBody>
      </DataTable>

      {/* ── Pagination ── */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={sortedData.length}
        resultsPerPage={RESULTS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/* ================================================================
   PAGINATION SUBCOMPONENT
   ================================================================ */

function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const styles = INLINE_STYLES;
  const { t } = useTranslation('pages');

  return (
    <div style={styles.paginationBar}>
      <span style={styles.paginationInfo}>
        {t('dataTable.resultsPerPage', { count: resultsPerPage })} &middot; {t('dataTable.totalResults', { count: totalResults })}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <IconButton
          aria-label={t('dataTable.firstPage')}
          variant="ghost"
          size="small"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
          <ChevronLeft style={{ width: 16, height: 16, marginLeft: -10 }} />
        </IconButton>
        <IconButton
          aria-label={t('dataTable.previousPage')}
          variant="ghost"
          size="small"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </IconButton>

        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', padding: '0 4px' }}>
          {t('dataTable.page')}
        </span>
        <span style={styles.pageIndicator}>{currentPage}</span>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', padding: '0 4px' }}>
          {t('dataTable.of', { count: totalPages })}
        </span>

        <IconButton
          aria-label={t('dataTable.nextPage')}
          variant="ghost"
          size="small"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
        </IconButton>
        <IconButton
          aria-label={t('dataTable.lastPage')}
          variant="ghost"
          size="small"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
          <ChevronRight style={{ width: 16, height: 16, marginLeft: -10 }} />
        </IconButton>
      </div>
    </div>
  );
}

/* ================================================================
   INLINE STYLES (using LD tokens)
   ================================================================ */

const INLINE_STYLES = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    flexWrap: 'wrap' as const,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: '1 1 300px',
    minWidth: '260px',
    maxWidth: '460px',
    height: '32px',
    padding: '0 12px',
    border: '1px solid var(--ld-semantic-color-border-strong, #2E2F32)',
    borderRadius: '9999px',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    fontSize: '14px',
  },
  searchLabel: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text-subtle, #74767C)',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
  scopeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 4px',
    borderRadius: '4px',
    whiteSpace: 'nowrap' as const,
  },
  searchInput: {
    flex: 1,
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    minWidth: '40px',
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    flexShrink: 0,
  },
  expandButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: '-2px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  campaignLink: {
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  },
  campaignId: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text-subtle, #74767C)',
    marginTop: '2px',
  },
  recBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 400,
    background: 'var(--ld-semantic-color-fill-negative-subtle, #FDE7F3)',
    color: '#8C1E64',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  paginationBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
  },
  paginationInfo: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  paginationButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  pageIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '24px',
    border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    padding: '0 4px',
  },
} as const;
