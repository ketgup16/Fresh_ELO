import React, { useRef } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { TokenSection, type TokenDef } from '@/components/theme-editor/TokenSection';
import { PreviewPanel } from '@/components/theme-editor/PreviewPanel';
import { useThemeEditor } from '@/hooks/useThemeEditor';
import { Download } from '@/components/icons/Download';
import { Upload } from '@/components/icons/Upload';
import { RotateCcw } from '@/components/icons/RotateCcw';
import styles from './ThemeEditorPage.module.css';

// ─── Token Group Definitions ──────────────────────────────────────────────────
// Only --ld-semantic-* and --wcp-semantic-* color tokens are exposed.
// Primitive tokens (--ld-primitive-color-*) and scale tokens
// (spacing, type scale, sizing scale) are never shown — they are fixed by design.

const PRIMARY_ACTION_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-action-fill-primary',         label: 'Primary fill' },
  { token: '--ld-semantic-color-action-fill-primary-hovered', label: 'Primary fill (hover)' },
  { token: '--ld-semantic-color-action-fill-primary-pressed', label: 'Primary fill (pressed)' },
  { token: '--ld-semantic-color-action-text-on-fill-primary', label: 'Text on primary' },
  { token: '--ld-semantic-color-action-focus-outline',        label: 'Focus ring' },
];

const SECONDARY_ACTION_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-action-fill-secondary',           label: 'Secondary fill' },
  { token: '--ld-semantic-color-action-border-secondary',         label: 'Secondary border' },
  { token: '--ld-semantic-color-action-text-on-fill-secondary',   label: 'Text on secondary' },
];

const BRAND_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-fill-brand',                  label: 'Brand fill' },
  { token: '--ld-semantic-color-fill-brand-bold',             label: 'Brand fill (bold)' },
  { token: '--ld-semantic-color-fill-brand-subtle',           label: 'Brand fill (subtle)' },
  { token: '--ld-semantic-color-text-brand',                  label: 'Brand text' },
  { token: '--ld-semantic-color-border-brand',                label: 'Brand border' },
  { token: '--ld-semantic-color-text-on-fill-brand-subtle',   label: 'Text on brand subtle' },
];

const DESTRUCTIVE_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-action-fill-negative',              label: 'Destructive fill' },
  { token: '--ld-semantic-color-action-fill-negative-hovered',      label: 'Destructive (hover)' },
  { token: '--ld-semantic-color-action-text-on-fill-negative',      label: 'Text on destructive' },
];

const WCP_COMMERCE_TOKENS: TokenDef[] = [
  { token: '--wcp-semantic-color-action-fill-primary-alt',          label: 'Alt primary fill (spark)' },
  { token: '--wcp-semantic-color-action-fill-primary-alt-hovered',  label: 'Alt primary (hover)' },
  { token: '--wcp-semantic-color-action-text-on-fill-primary-alt',  label: 'Text on alt primary' },
  { token: '--wcp-semantic-color-fill-confidence',                  label: 'Confidence fill' },
  { token: '--wcp-semantic-color-fill-confidence-bold',             label: 'Confidence bold fill' },
  { token: '--wcp-semantic-color-fill-savings-bold',                label: 'Savings bold fill' },
  { token: '--wcp-semantic-color-fill-urgent',                      label: 'Urgent fill' },
  { token: '--wcp-semantic-color-fill-holiday-member',              label: 'Holiday member fill' },
  { token: '--wcp-semantic-color-border-social',                    label: 'Social border' },
];

const TOKEN_GROUPS = [
  { id: 'primary-action',    title: 'Primary Action',    tokens: PRIMARY_ACTION_TOKENS },
  { id: 'secondary-action',  title: 'Secondary Action',  tokens: SECONDARY_ACTION_TOKENS },
  { id: 'brand',             title: 'Brand',             tokens: BRAND_TOKENS },
  { id: 'destructive',       title: 'Destructive',       tokens: DESTRUCTIVE_TOKENS },
  { id: 'wcp-commerce',      title: 'WCP Commerce',      tokens: WCP_COMMERCE_TOKENS },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ThemeEditorPage() {
  const { overrides, setOverride, resetOverride, resetAll, exportJSON, importJSON, getCurrentValue } = useThemeEditor();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importSuccess, setImportSuccess] = React.useState(false);

  const totalOverrides = Object.keys(overrides).length;

  // ── Export ──────────────────────────────────────────────────────────────────
  function handleExport() {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-overrides-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Import ──────────────────────────────────────────────────────────────────
  function handleImportClick() {
    setImportError(null);
    setImportSuccess(false);
    importInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text !== 'string') return;
      const result = importJSON(text);
      if (result.success) {
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError(result.error ?? 'Unknown error');
      }
    };
    reader.readAsText(file);
    // Reset the input so the same file can be re-imported
    e.target.value = '';
  }

  // ── Reset All ───────────────────────────────────────────────────────────────
  function handleResetAll() {
    resetAll();
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageTop}>
        <PageHeader
          section="Tools"
          title="Theme Editor"
          description="Override semantic tokens in real time. Changes stack on top of the active theme via CSS cascade and persist across sessions via localStorage. Only semantic tokens (--ld-semantic-* and --wcp-semantic-*) are editable — primitive and scale tokens are fixed by design."
        />

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            {totalOverrides > 0 && (
              <span className={styles.overrideBadge}>
                {totalOverrides} override{totalOverrides !== 1 ? 's' : ''} active
              </span>
            )}
            {importSuccess && (
              <span className={styles.successMessage}>Overrides imported successfully</span>
            )}
            {importError && (
              <span className={styles.errorMessage}>{importError}</span>
            )}
          </div>
          <div className={styles.toolbarRight}>
            <ButtonGroup>
              <Button
                variant="tertiary"
                size="small"
                leading={<RotateCcw width={16} height={16} />}
                onClick={handleResetAll}
              >
                Reset all
              </Button>
              <Button
                variant="secondary"
                size="small"
                leading={<Upload width={16} height={16} />}
                onClick={handleImportClick}
              >
                Import JSON
              </Button>
              <Button
                variant="secondary"
                size="small"
                leading={<Download width={16} height={16} />}
                onClick={handleExport}
              >
                Export JSON
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* Hidden file input for JSON import */}
        <input
          ref={importInputRef}
          type="file"
          accept=".json,application/json"
          className={styles.hiddenFileInput}
          onChange={handleImportFile}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Two-column layout */}
      <div className={styles.columns}>
        {/* Left: Token editor */}
        <div className={styles.editorColumn}>
          <div className={styles.tokenSections}>
            {TOKEN_GROUPS.map((group) => (
              <TokenSection
                key={group.id}
                title={group.title}
                tokens={group.tokens}
                overrides={overrides}
                onSet={setOverride}
                onReset={resetOverride}
                getCurrentValue={getCurrentValue}
                defaultOpen={group.id === 'primary-action'}
              />
            ))}
          </div>
        </div>

        {/* Right: Live preview (sticky) */}
        <div className={styles.previewColumn}>
          <div className={styles.previewSticky}>
            <PreviewPanel overrideCount={totalOverrides} />
          </div>
        </div>
      </div>
    </div>
  );
}
