import React, { useState, useCallback, useEffect } from 'react';
import type {
  AXRichSnackbarColor,
  AXRichSnackbarContentVariant,
} from '@/components/walmart/AXRichSnackbar';

export interface AXRichSnackbarState {
  id: string;
  open: boolean;
  color: AXRichSnackbarColor;
  contentVariant: AXRichSnackbarContentVariant;
  leadingSlot?: React.ReactNode;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface AXRichSnackbarOptions {
  color?: AXRichSnackbarColor;
  contentVariant?: AXRichSnackbarContentVariant;
  leadingSlot?: React.ReactNode;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

// Global singleton state
let state: AXRichSnackbarState | null = null;
let listeners: Array<(s: AXRichSnackbarState | null) => void> = [];

const generateId = () => Math.random().toString(36).substring(2, 9);

export const subscribeAXRichSnackbar = (
  listener: (s: AXRichSnackbarState | null) => void,
) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const notify = () => listeners.forEach((l) => l(state));

export const axRichSnackbar = (options: AXRichSnackbarOptions): string => {
  const id = generateId();
  state = {
    id,
    open: true,
    color: options.color ?? 'primary',
    contentVariant: options.contentVariant ?? 'left-regular',
    leadingSlot: options.leadingSlot,
    message: options.message,
    actionLabel: options.actionLabel,
    onAction: options.onAction,
    duration: options.duration ?? 4000,
    position: options.position ?? 'bottom-center',
  };
  notify();
  return id;
};

/** Alias for axRichSnackbar — use this name in product code. */
export const wcpRichSnackbar = axRichSnackbar;

export const dismissAXRichSnackbar = () => {
  if (state) {
    state = { ...state, open: false };
    notify();
    setTimeout(() => {
      state = null;
      notify();
    }, 200);
  }
};

export const useAXRichSnackbar = () => {
  const [current, setCurrent] = useState<AXRichSnackbarState | null>(state);

  useEffect(() => {
    const unsub = subscribeAXRichSnackbar(setCurrent);
    return unsub;
  }, []);

  const show = useCallback((options: AXRichSnackbarOptions) => {
    return axRichSnackbar(options);
  }, []);

  const dismiss = useCallback(() => {
    dismissAXRichSnackbar();
  }, []);

  return { snackbar: current, show, dismiss };
};
