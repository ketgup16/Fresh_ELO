# Design System Terminology — Official Translation Standard

This document defines the official translations for all Living Design 3.5 terminology. Designers and developers must use these terms when writing documentation, UI labels, and cross-team communication in Spanish and French.

## Guiding Principles

1. **Code identifiers stay in English.** Component names (`Button`, `TextField`), prop values (`variant="primary"`), CSS tokens (`--ld-semantic-color-action-fill-primary`), and JSON keys are never translated.
2. **User-facing labels are translated.** Any text a user reads in the UI must use the official translations below.
3. **Documentation headings are translated.** Section titles, guideline labels, and navigation items use the translations below.
4. **When in doubt, keep it in English.** If a term has no clear equivalent or is an industry-standard technical term (e.g., "popover", "tooltip"), keep the English form.

---

## Component Variant Names

These terms appear when describing component variants in documentation and UI controls.

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Primary | Primario | Primaire | Button, Tag, IconButton variant |
| Secondary | Secundario | Secondaire | Button, Tag, IconButton variant |
| Tertiary | Terciario | Tertiaire | Button, Tag variant |
| Destructive | Destructivo | Destructif | Button, IconButton variant |
| Ghost | Ghost | Ghost | Keep English — industry term |

## Size Names

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Small | Pequeño | Petit | Component size prop |
| Medium | Mediano | Moyen | Component size prop |
| Large | Grande | Grand | Component size prop |

## Component State Names

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Disabled | Deshabilitado | Désactivé | Interactive state |
| Loading | Cargando | Chargement | Async state |
| Active | Activo | Actif | Selected/current state |
| Hover | Hover | Hover | Keep English — CSS pseudo-class |
| Focused | Enfocado | Focalisé | Keyboard focus state |
| Pressed | Presionado | Pressé | Touch/click state |
| Selected | Seleccionado | Sélectionné | Toggle/check state |
| Indeterminate | Indeterminado | Indéterminé | Checkbox partial state |
| Read-only | Solo lectura | Lecture seule | Non-editable state |
| Error | Error | Erreur | Validation state |

## Status Terms

Used in data tables, tags, and status indicators.

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Live | Activa | Active | Campaign/item status |
| Scheduled | Programada | Programmée | Future activation |
| Paused | Pausada | En pause | Temporarily stopped |
| Completed | Completada | Terminée | Finished |
| Draft | Borrador | Brouillon | Not yet published |
| Archived | Archivado | Archivé | Stored/inactive |

## Semantic Color/Sentiment Names

Used in Tags, Badges, Alerts, and Progress indicators.

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Brand | Marca | Marque | Brand color category |
| Positive / Success | Positivo / Éxito | Positif / Succès | Green sentiment |
| Negative / Error | Negativo / Error | Négatif / Erreur | Red sentiment |
| Warning | Advertencia | Avertissement | Orange/yellow sentiment |
| Info / Informational | Información | Information | Blue sentiment |
| Neutral | Neutro | Neutre | Gray/default sentiment |

## Action Terms

Standard labels for buttons and interactive elements.

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Save | Guardar | Enregistrer | |
| Cancel | Cancelar | Annuler | |
| Edit | Editar | Modifier | |
| Delete | Eliminar | Supprimer | |
| Submit | Enviar | Soumettre | |
| Close | Cerrar | Fermer | |
| Back | Volver | Retour | |
| Next | Siguiente | Suivant | |
| Apply | Aplicar | Appliquer | |
| Confirm | Confirmar | Confirmer | |
| Copy | Copiar | Copier | |
| Copied | Copiado | Copié | Feedback after copy |
| Download | Descargar | Télécharger | |
| Upload | Subir | Téléverser | |
| Search | Buscar | Rechercher | |
| Clear | Limpiar | Effacer | |
| Expand | Expandir | Développer | |
| Collapse | Contraer | Réduire | |
| View/Edit | Ver/editar | Voir/modifier | |

## Component Names

Component names in code stay in English. These translations are for documentation and navigation labels only.

| English | Español | Français | Keep English in code? |
|---------|---------|----------|----------------------|
| Button | Botón | Bouton | Yes |
| Icon Button | Botón de icono | Bouton d'icône | Yes |
| Badge | Insignia | Badge | Yes |
| Tag | Etiqueta | Étiquette | Yes |
| Chip | Chip | Chip | Yes — no standard equivalent |
| Filter Chip | Chip de filtro | Chip de filtre | Yes |
| Checkbox | Casilla de verificación | Case à cocher | Yes |
| Switch | Interruptor | Interrupteur | Yes |
| Text Field | Campo de texto | Champ de texte | Yes |
| Text Area | Área de texto | Zone de texte | Yes |
| Select | Selector | Sélecteur | Yes |
| Date Field | Campo de fecha | Champ de date | Yes |
| Divider | Divisor | Séparateur | Yes |
| Breadcrumbs | Migas de pan | Fil d'Ariane | Yes |
| Modal | Modal | Modale | Yes |
| Dialog | Diálogo | Dialogue | Yes |
| Popover | Popover | Popover | Yes — industry term |
| Callout | Llamada | Appel | Yes |
| Menu | Menú | Menu | Yes |
| Dropdown Menu | Menú desplegable | Menu déroulant | Yes |
| Panel | Panel | Panneau | Yes |
| Bottom Sheet | Panel inferior | Panneau inférieur | Yes |
| Snackbar | Barra de notificación | Barre de notification | Yes |
| Spinner | Indicador de carga | Indicateur de chargement | Yes |
| Spot Icon | Icono decorativo | Icône décorative | Yes |
| Progress Indicator | Indicador de progreso | Indicateur de progression | Yes |
| Progress Tracker | Seguidor de progreso | Suivi de progression | Yes |
| Tabs / Tab Navigation | Pestañas / Navegación por pestañas | Onglets / Navigation par onglets | Yes |
| Carousel | Carrusel | Carrousel | Yes |
| Accordion | Acordeón | Accordéon | Yes |
| Skeleton | Esqueleto | Squelette | Yes |
| Tooltip | Tooltip | Infobulle | Yes |
| Avatar | Avatar | Avatar | Yes — universal term |
| Rating | Calificación | Évaluation | Yes |
| Metric | Métrica | Métrique | Yes |
| Nudge | Aviso sutil | Suggestion | Yes |
| Alert | Alerta | Alerte | Yes |
| Content Message | Mensaje de contenido | Message de contenu | Yes |
| Form Group | Grupo de formulario | Groupe de formulaire | Yes |
| Magic Box | Caja mágica | Boîte magique | Yes |
| Card | Tarjeta | Carte | Yes |
| List | Lista | Liste | Yes |
| Link | Enlace | Lien | Yes |
| Link Button | Botón enlace | Bouton lien | Yes |
| Radio Button | Botón de radio | Bouton radio | Yes |
| Slider | Deslizador | Curseur | Yes |
| Toast | Notificación breve | Notification brève | Yes |
| Toggle | Alternador | Bascule | Yes |
| Scroll Area | Área de desplazamiento | Zone de défilement | Yes |
| Sheet | Panel lateral | Panneau latéral | Yes |
| Separator | Separador | Séparateur | Yes |

## Design Token Categories

| English | Español | Français | Notes |
|---------|---------|----------|-------|
| Design Tokens | Tokens de diseño | Jetons de design | |
| Color Tokens | Tokens de color | Jetons de couleur | |
| Spacing Tokens | Tokens de espaciado | Jetons d'espacement | |
| Typography Tokens | Tokens de tipografía | Jetons de typographie | |
| Border Radius Tokens | Tokens de borde redondeado | Jetons de rayon de bordure | |
| Text Tokens | Tokens de texto | Jetons de texte | |
| Space Tokens | Tokens de espacio | Jetons d'espacement | |

## Guideline & Documentation Headings

| English | Español | Français |
|---------|---------|----------|
| Overview | Descripción general | Vue d'ensemble |
| Guidelines | Directrices | Directives |
| Usage Guidelines | Directrices de uso | Directives d'utilisation |
| When to use | Cuándo usar | Quand utiliser |
| When not to use | Cuándo no usar | Quand ne pas utiliser |
| Accessibility | Accesibilidad | Accessibilité |
| Best Practices | Mejores prácticas | Meilleures pratiques |
| Props | Props | Props |
| Variants | Variantes | Variantes |
| Related Components | Componentes relacionados | Composants associés |
| Code Example | Ejemplo de código | Exemple de code |
| Preview | Vista previa | Aperçu |
| Properties | Propiedades | Propriétés |
| Design Principles | Principios de diseño | Principes de design |
| Component Usage | Uso de componentes | Utilisation des composants |
| Code Standards | Estándares de código | Standards de code |
| Token Usage | Uso de tokens | Utilisation des jetons |

## Navigation & Layout Terms

| English | Español | Français |
|---------|---------|----------|
| Home | Inicio | Accueil |
| Component Library | Biblioteca de componentes | Bibliothèque de composants |
| Getting Started | Primeros pasos | Mise en route |
| Component Sandbox | Sandbox de componentes | Bac à sable de composants |
| Themes & Design Tokens | Temas y tokens de diseño | Thèmes et jetons de design |
| Sidebar | Barra lateral | Barre latérale |
| Notifications | Notificaciones | Notifications |
| Help | Ayuda | Aide |
| Account | Cuenta | Compte |

## Form & Input Terms

| English | Español | Français |
|---------|---------|----------|
| Label | Etiqueta | Libellé |
| Placeholder | Texto provisional | Texte indicatif |
| Helper text | Texto de ayuda | Texte d'aide |
| Error message | Mensaje de error | Message d'erreur |
| Required | Obligatorio | Obligatoire |
| Optional | Opcional | Optionnel |
| Value | Valor | Valeur |
| Count | Cantidad | Nombre |

## Orientation & Layout

| English | Español | Français |
|---------|---------|----------|
| Horizontal | Horizontal | Horizontal |
| Vertical | Vertical | Vertical |
| Left | Izquierda | Gauche |
| Right | Derecha | Droite |
| Top | Superior | Haut |
| Bottom | Inferior | Bas |

---

## Terms That Stay in English (Do Not Translate)

The following terms are industry-standard technical terms or code identifiers. They should remain in English across all languages:

| Term | Reason |
|------|--------|
| `variant`, `size`, `color` (as prop names) | Code API — prop names are never translated |
| `primary`, `secondary`, `tertiary` (as prop values) | Code API — `variant="primary"` stays in English |
| `hover`, `focus`, `active` (as CSS states) | CSS pseudo-classes — `:hover`, `:focus`, `:active` |
| `aria-label`, `aria-selected`, `role` | ARIA attributes — W3C specification terms |
| `onClick`, `onChange`, `onClose` | JavaScript event handlers |
| `--ld-semantic-color-*` | CSS custom property names |
| `Popover`, `Tooltip` (in code) | Component import names — `import { Popover }` |
| `Ghost` (variant name) | No widely-accepted translation; industry convention |
| `Chip` (component name) | Material Design term with no standard equivalent |
| WCAG, ARIA, WAI | Accessibility standards — universal acronyms |

---

## How to Use This Document

1. **Designers**: Use the translated terms when creating specs, Figma annotations, or documentation for Spanish/French audiences.
2. **Developers**: Use these translations in locale JSON files (`client/locales/{lang}/common.json`). Never invent your own translation for a term listed here.
3. **New terms**: When introducing a new component or concept, add the official translation to this table before using it in code or documentation.
4. **Disagreements**: If a translation feels wrong in context, raise it with the team and update this document. Do not override locally.

---

Last updated: 2025-02-20
