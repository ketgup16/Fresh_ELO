---
title: Living Design 3.5 Guidelines
scope: meta
status: stable
owner: design-system
last_updated: 2025-02-25
---

## Purpose

Central index for all Living Design 3.5 design system documentation.

## Directory Structure

### components/

Component-specific guidelines and specifications for all Living Design 3.5 components.

**Core Components:**
- [AppSidebar](components/AppSidebar.md) - Shared sidebar navigation
- [Badge](components/Badge.md) - Notification badges and count indicators
- [Banner](components/Banner.md) - Page-level banners
- [Bottom-Sheet](components/Bottom-Sheet.md) - Mobile bottom sheets
- [Breadcrumb](components/Breadcrumb.md) - Navigation breadcrumb trails
- [Button](components/Button.md) - Primary, secondary, tertiary, and destructive buttons
- [Callout](components/Callout.md) - Tooltips with nubbin positioning
- [Card](components/Card.md) - Content container cards
- [Checkbox](components/Checkbox.md) - Form checkboxes with indeterminate state
- [Chip](components/Chip.md) - Interactive selection chips
- [Content-Message](components/Content-Message.md) - Critical states: empty, error, no permission, loading

**Data Display:**
- [DataTable](components/DataTable.md) - Data table component hierarchy and usage
- [Metric](components/Metric.md) - Metric displays
- [Tag](components/Tag.md) - Status and category tags
- [Rating](components/Rating.md) - Star ratings with half-star support
- [Skeleton](components/Skeleton.md) - Loading placeholder shapes
- [Spinner](components/Spinner.md) - Loading indicators

**Input Components:**
- [DateField](components/DateField.md) - Date input fields
- [DatePicker](components/DatePicker.md) - Text input with calendar popup
- [DatePickerCalendar](components/DatePickerCalendar.md) - Calendar date selection
- [DateRangePicker](components/DateRangePicker.md) - Start/end date range selection
- [FilterChip](components/FilterChip.md) - Filter selection pills with counts
- [Form-Group](components/Form-Group.md) - Form field grouping
- [QuantityStepper](components/QuantityStepper.md) - Numeric quantity increment/decrement
- [Radio](components/Radio.md) - Mutually exclusive single-selection
- [Select](components/Select.md) - Dropdown selectors
- [Switch](components/Switch.md) - On/off toggle controls
- [TextArea](components/TextArea.md) - Multi-line text inputs
- [TextField](components/TextField.md) - Single-line text inputs

**Navigation and Actions:**
- [IconButton](components/IconButton.md) - Icon-only action buttons
- [Link](components/Link.md) - Hyperlinks and text links
- [Link-Button](components/Link-Button.md) - Link-styled buttons
- [LinkButton](components/LinkButton.md) - Polymorphic link-styled interactive element
- [Menu](components/Menu.md) - Dropdown menus
- [Tab](components/Tab.md) - Tab navigation for content switching

**Feedback and Messaging:**
- [Content-Message](components/Content-Message.md) - Content state messages
- [Modal](components/Modal.md) - Dialog modals
- [Nudge](components/Nudge.md) - Nudge notifications

**Layout and Structure:**
- [Divider](components/Divider.md) - Content dividers
- [List](components/List.md) - List components
- [Magic-Box](components/Magic-Box.md) - Magic box container
- [Panel](components/Panel.md) - Resizable side panels
- [Popover](components/Popover.md) - Popover overlays
- [ProgressTracker](components/ProgressTracker.md) - Visual progress through steps

### design-system/

Core design system documentation and token references.

- [DesignTokens.md](design-system/DesignTokens.md) - Complete design token reference with migration guide and best practices
- [Color.md](design-system/Color.md) - Color system and palette
- [typography.md](design-system/typography.md) - Typography system
- [css-variables-source.md](design-system/css-variables-source.md) - CSS variables reference
- [Component-Inventory.md](design-system/Component-Inventory.md) - Available components inventory
- [ComponentReference.md](design-system/ComponentReference.md) - Component API reference
- [ComponentLibraryIntegration.md](design-system/ComponentLibraryIntegration.md) - Component integration checklist
- [component-visibility.md](design-system/component-visibility.md) - Component visibility states
- [FormGroup.md](design-system/FormGroup.md) - FormGroup semantic wrapper
- [Guidelines.md](design-system/Guidelines.md) - General and React development guidelines
- [LLMIntegration.md](design-system/LLMIntegration.md) - AI integration instructions
- [Terminology.md](design-system/Terminology.md) - Official LD 3.5 term translations (EN/ES/FR)

### rules/

Design system enforcement rules and best practices.

- [Rules Index](rules/RULES_INDEX.md) - Overview of all design system rules
- [Design System Enforcement](rules/RULE_DesignSystemEnforcement.md) - Tokens, icons, and component enforcement (consolidated)
- [Create New Component](rules/RULE_CreateNewComponent.md) - Complete process for new components
- [Component Sandbox](rules/RULE_ComponentPropertyTester.md) - All components must be testable
- [Standalone Components](rules/RULE_StandaloneComponents.md) - No external dependencies
- [No Emojis, Use Icons](rules/RULE_NoEmojisUseIcons.md) - No emojis or random images
- [Icon Usage](rules/RULE_IconUsage.md) - Icon library usage guidelines
- [LinkButton and Spot Icon](rules/RULE_LinkButtonAndSpotIcon.md) - LinkButton and Spot Icon patterns
- [Figma Asset Extraction](rules/RULE_FigmaAssetExtraction.md) - Exportable asset rules
- [Dev Server Health Check](rules/RULE_DevServerHealthCheck.md) - Verify dev server after changes
- [Guidelines Page Sync](rules/RULE_GuidelinesPageSync.md) - Keep doc index in sync
- [Internationalization](rules/RULE_Internationalization.md) - All strings must be translatable
- [Responsive Layout](rules/RULE_ResponsiveLayout.md) - Page structure and responsive rules
- [Theme Switcher](rules/RULE_ThemeSwitcher.md) - Theme management rules
- [Theme Addition](rules/RULE_ThemeAddition.md) - Process for adding new themes
- [Markdown Organization](rules/RULE_MarkdownOrganization.md) - Markdown file organization
- [Radix Migration Plan](rules/PLAN_RadixMigration.md) - Plan to remove Radix UI dependencies
- [WCP Component Creation](rules/RULE_WCPComponentCreation.md) - Workflow for creating Walmart Component Platform (WCP) product components
- [Carousel and Scroll Patterns](rules/RULE_CarouselAndScrollPatterns.md) - Scroll snap vs auto-advance carousel implementation
- [Inline Style vs CSS Module](rules/RULE_InlineStyleVsCSSModule.md) - When to use inline styles vs CSS modules
- [Animation and Motion](rules/RULE_AnimationAndMotion.md) - Animation types, durations, and prefers-reduced-motion requirements
- [Data-Driven Components](rules/RULE_DataDrivenComponents.md) - Local static data array conventions and TypeScript patterns
- [Component Variant Naming](rules/RULE_ComponentVariantNaming.md) - Action-intent vs visual-theme vs status variant conventions
- [Walmart Page Composition](rules/RULE_WalmartPageComposition.md) - Page shell, stacking order, and full-bleed layout rules

### implementations/

Completed component implementation summaries and documentation.

- [Attribution Dropdown](implementations/ATTRIBUTION-DROPDOWN-SUMMARY.md) - Attribution filter implementation
- [Component Consolidation](implementations/COMPONENT-CONSOLIDATION-SUMMARY.md) - Button standardization
- [Tag Implementation](implementations/LD-TAG-IMPLEMENTATION-SUMMARY.md) - Tag component implementation

### migrations/

Migration plans and standardization documentation for transitioning to Living Design 3.5.

- [Button Standardization](migrations/BUTTON-STANDARDIZATION-SUMMARY.md) - Button standardization summary
- [IconButton Migration](migrations/ICONBUTTON_MIGRATION_PLAN.md) - IconButton migration plan
- [Living Design Migration](migrations/LIVING-DESIGN-MIGRATION-ASSESSMENT.md) - Migration assessment
- [Table Standardization](migrations/PLAN_TABLE_STANDARDIZATION.md) - Table standardization plan
- [Theme Switcher Plan](migrations/THEME_SWITCHER_PLAN.md) - Theme switcher implementation plan
- [UI Component Replacement](migrations/UI-COMPONENT-REPLACEMENT-PLAN.md) - shadcn-to-LD replacement plan

### Project Documentation

- [AGENTS.md](AGENTS.md) - Fusion Starter project documentation and tech stack
- [TEMPLATE.md](TEMPLATE.md) - Standard template for all guideline files

## Quick Links

- **Design Tokens**: Start with [design-system/DesignTokens.md](design-system/DesignTokens.md)
- **Components**: Browse [components/](components/)
- **Migrations**: See [migrations/](migrations/)
- **Rules**: Check [rules/](rules/)
- **Implementations**: Review [implementations/](implementations/)

## Getting Started

1. **For new components**: Read the component-specific guide in `components/`
2. **For design tokens**: Reference `design-system/DesignTokens.md`
3. **For migrations**: Check `migrations/` for transition plans
4. **For best practices**: Review files in `rules/`
5. **For implementation examples**: See `implementations/`
