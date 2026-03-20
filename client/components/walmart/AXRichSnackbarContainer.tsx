import React, { useEffect, useState } from 'react';
import { AXRichSnackbar } from './AXRichSnackbar';
import {
  subscribeAXRichSnackbar,
  dismissAXRichSnackbar,
} from '@/hooks/use-ax-rich-snackbar';
import type { AXRichSnackbarState } from '@/hooks/use-ax-rich-snackbar';

export const AXRichSnackbarContainer: React.FC = () => {
  const [current, setCurrent] = useState<AXRichSnackbarState | null>(null);

  useEffect(() => {
    const unsub = subscribeAXRichSnackbar(setCurrent);
    return unsub;
  }, []);

  if (!current) return null;

  return (
    <AXRichSnackbar
      id={current.id}
      open={current.open}
      color={current.color}
      contentVariant={current.contentVariant}
      leadingSlot={current.leadingSlot}
      message={current.message}
      actionLabel={current.actionLabel}
      onAction={current.onAction}
      onClose={dismissAXRichSnackbar}
      duration={current.duration}
      position={current.position}
    />
  );
};

export default AXRichSnackbarContainer;
