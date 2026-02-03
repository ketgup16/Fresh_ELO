---
title: Content Message
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Content Messages communicate **critical states** that block or significantly impact a user’s ability to proceed (for example: outages, permissions, or an error that prevents content from rendering). They reduce confusion by pairing clear, direct copy with suggested next actions in a consistent layout.

## Rules
- **MUST** use the Living Design Content Message component.
- **MUST** use Content Message for **critical** states that block or derail the primary experience (page, feature, or content area).
- **MUST** place the Content Message **where the impacted content would normally appear** when the issue is content-specific.
- **MUST** provide a clear way forward (an action or next step). No dead ends.
- **MUST NOT** use Content Message for inline, user-correctable form errors. Use [Alert](/components/alert) instead.
- **MUST NOT** use Content Message for issues that must remain continuously visible while the user continues working. Use [Banner](/components/banner) instead.
- **SHOULD** avoid “try again” loops when users cannot reasonably self-resolve within 1–2 attempts; provide an alternate action.

## Usage
Use Content Message to display critical messages to users, including:
- Error messages (content can’t load, critical feature unavailable)
- Success or confirmation messages (when presented as a standalone state)
- Information or instructions (when the message blocks progress until acknowledged)
- Permissions (missing access prevents moving forward)

Content Messages can be used on a **full page** or inside containers such as Card, Bottom Sheet, Modal, or Panel.

## Anatomy
1. Container
2. Media (optional)
3. Title
4. Text label / description
5. Action content (optional; buttons/links)

## Variants
Use documented variants only (names differ by implementation). Common intents:
- **Error**: Something failed; content or a feature can’t be used.
- **Success / Confirmation**: Operation completed; user can proceed.
- **Info / Instructions**: Guidance required before proceeding.
- **Permission**: Access is required; user must request/enable permission.

## States
- Default
- Focus-visible (for interactive actions)
- Disabled (if actions can be disabled)

## Placement
### Content-related errors
When the error is related to displaying content, place the Content Message **in the content area** where the content would normally render. This preserves context and user flow.

### Service-related errors
When the error relates to a service impacting one or more features but not tied to a specific UI element, the Content Message may be placed in a temporary overlay (e.g., Modal or Bottom Sheet) to communicate the issue without forcing navigation away from the user’s current step.

## Content strategy
Keep the message simple and direct. Use specifics and offer a path forward.

### Guidelines
- Use specifics whenever possible.
- Be extremely direct and to the point.
- Offer a way forward or action (no dead ends).
- Avoid apologizing.
  - Apologies are reserved for disappointment and bad news (e.g., delayed order or over-charge) and can read as insincere when overused.

### Copy details
- **Title**: State what just happened (specific if possible).
- **Text label**: State what the user can do next; keep it actionable.
- **Actions**: Make the action label describe the outcome.
  - Avoid vague actions like “Try again”.
  - People mostly scan the first 1–2 words—lead with the most important words.

## Accessibility
- Ensure the Content Message has a clear **accessible name** (typically the Title).
- If the Content Message is the primary content of a page/state, consider moving focus to the container or Title on render (implementation-specific) so screen reader users encounter it immediately.
- Actions must be keyboard reachable and have visible focus styling.
- Use semantic markup: Title as a heading (`h2`/`h3` as appropriate to page outline), description as text, actions as buttons/links.

## Token usage
- Prefer component defaults (Content Message should be token-wired for color, typography, spacing, radius).
- Only use tokens for layout around the Content Message (spacing/gaps), not for restyling its internals.

## React usage (example)
Update import path after wiring in `guidelines/components/overview-components.md`.

```tsx
import * as React from "react";
import { ContentMessage, Button } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

type Props = {
  state: "error" | "permission" | "info" | "success";
};

export function ContentMessageExample({ state }: Props) {
  if (state === "error") {
    return (
      <ContentMessage
        // Adapt prop names to your actual API:
        // intent="error"
        // title="We can’t load your orders"
        // description="Check your connection, then try again."
        intent="error"
        title="We can’t load your orders"
        description="Check your connection, then try again."
        actions={
          <>
            <Button onPress={() => window.location.reload()}>Reload page</Button>
            <Button variant="secondary" onPress={() => {}}>
              Contact support
            </Button>
          </>
        }
      />
    );
  }

  if (state === "permission") {
    return (
      <ContentMessage
        intent="permission"
        title="Camera access required"
        description="Enable camera access to scan your card."
        actions={
          <>
            <Button onPress={() => {}}>Open settings</Button>
            <Button variant="secondary" onPress={() => {}}>
              Choose another method
            </Button>
          </>
        }
      />
    );
  }

  return (
    <ContentMessage
      intent={state}
      title="All set"
      description="You can continue to the next step."
      actions={<Button onPress={() => {}}>Continue</Button>}
    />
  );
}
```

## Best practices
### Use when
- Use when an error prevents content from being displayed.
- Use when an error prevents the whole application, or a single feature, from working as expected.
- Use when a critical error or permission prevents the user from moving forward in their journey.

### Don’t use when
- Don’t use when an error is the result of a user action. Use an [Alert](/components/alert) instead.
- Don’t use when an issue needs to be constantly visible to the user. Use a [Banner](/components/banner) instead.

## Do / Don’t
### Do
- Do place the Content Message so users don’t have to scroll within a container to find the message and actions.
- Do remove optional media if space is constrained and you need to prioritize text and actions.
- Do provide an alternate path forward if “Try again” may not work quickly (e.g., “Contact support”, “Use a different method”, “Save and exit”).

### Don’t
- Don’t trap users in repeated “Try again” loops when they can’t self-resolve.
- Don’t use Content Message for inline validation errors or non-blocking feedback.

