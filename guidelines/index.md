# Living Design 3.5 Guidelines

This directory contains comprehensive documentation for the Living Design 3.5 design system implementation.

## Directory Structure

### 📁 components/
Component-specific guidelines and specifications for all Living Design 3.5 components.

**Core Components:**
- [Badge](components/Badge.md) - Notification badges and count indicators
- [Breadcrumb](components/Breadcrumb.md) - Navigation breadcrumb trails
- [Button](components/Button.md) - Primary, secondary, tertiary, and destructive buttons
- [Callout](components/Callout.md) - Tooltips with nubbin positioning
- [Card](components/Card.md) - Content container cards
- [Checkbox](components/Checkbox.md) - Form checkboxes with indeterminate state
- [Chip](components/Chip.md) - Interactive selection chips
- [FilterChip](components/FilterChip.md) - Filter selection pills with counts

**Input Components:**
- [DateField](components/DateField.md) - Date input fields
- [Select](components/Select.md) - Dropdown selectors
- [TextArea](components/TextArea.md) - Multi-line text inputs
- [TextField](components/TextField.md) - Single-line text inputs
- [Form-Group](components/Form-Group.md) - Form field grouping

**Navigation & Actions:**
- [IconButton](components/IconButton.md) - Icon-only action buttons
- [Link](components/Link.md) - Hyperlinks and text links
- [Link-Button](components/Link-Button.md) - Link-styled buttons
- [Menu](components/Menu.md) - Dropdown menus

**Feedback & Messaging:**
- [Banner](components/Banner.md) - Page-level banners
- [Content-Message](components/Content-Message.md) - Content state messages
- [Modal](components/Modal.md) - Dialog modals
- [Nudge](components/Nudge.md) - Nudge notifications

**Layout & Structure:**
- [Bottom-Sheet](components/Bottom-Sheet.md) - Mobile bottom sheets
- [Divider](components/Divider.md) - Content dividers
- [List](components/List.md) - List components
- [Magic-Box](components/Magic-Box.md) - Magic box container
- [Panel](components/Panel.md) - Resizable side panels
- [Popover](components/Popover.md) - Popover overlays

**Data Display:**
- [Metric](components/Metric.md) - Metric displays
- [Tag](components/Tag.md) - Status and category tags

### 📁 migrations/
Migration plans and standardization documentation for transitioning to Living Design 3.5.

- [Button Standardization Summary](migrations/BUTTON-STANDARDIZATION-SUMMARY.md)
- [IconButton Migration Plan](migrations/ICONBUTTON_MIGRATION_PLAN.md)
- [Living Design Migration Assessment](migrations/LIVING-DESIGN-MIGRATION-ASSESSMENT.md)
- [Table Standardization Plan](migrations/PLAN_TABLE_STANDARDIZATION.md)
- [UI Component Replacement Plan](migrations/UI-COMPONENT-REPLACEMENT-PLAN.md)

### 📁 rules/
Design system enforcement rules and best practices.

- [Rules Index](rules/RULES_INDEX.md) - Overview of all design system rules
- [Design System Enforcement](rules/RULE_DesignSystemEnforcement.md) - Component usage rules
- [Design Token Enforcement](rules/RULE_DesignTokenEnforcement.md) - Token usage requirements
- [Icon Usage](rules/RULE_IconUsage.md) - Icon library usage guidelines
- [Theme Switcher](rules/RULE_ThemeSwitcher.md) - Theme management rules

## Core Documentation

### Design Tokens & Theming
- [DesignTokens.md](DesignTokens.md) - Complete design token reference
- [design-tokens-overview.md](design-tokens-overview.md) - Token system overview
- [tokens.md](tokens.md) - Token usage guide
- [Color.md](Color.md) - Color system and palette
- [typography.md](typography.md) - Typography system

### Development Guidelines
- [Guidelines.md](Guidelines.md) - General development guidelines
- [Guidelines-react.md](Guidelines-react.md) - React-specific guidelines
- [Component-Inventory.md](Component-Inventory.md) - Available components inventory
- [LivingDesign-Component-Reference.md](LivingDesign-Component-Reference.md) - Component reference

### Technical Reference
- [css-variables-source.md](css-variables-source.md) - CSS variables reference
- [component-visibility.md](component-visibility.md) - Component visibility states
- [overview-components.md](overview-components.md) - Components overview
- [Agent-Implementation-Checklist.md](Agent-Implementation-Checklist.md) - Implementation checklist

## Quick Links

- 🎨 **Design Tokens**: Start with [DesignTokens.md](DesignTokens.md)
- 🧱 **Components**: Browse [components/](components/)
- 🔄 **Migration**: See [migrations/](migrations/)
- ✅ **Rules**: Check [rules/](rules/)

## Getting Started

1. **For new components**: Read the component-specific guide in `components/`
2. **For migrations**: Check `migrations/` for transition plans
3. **For token usage**: Reference `DesignTokens.md`
4. **For best practices**: Review files in `rules/`

---

Last updated: 2025-02-14
