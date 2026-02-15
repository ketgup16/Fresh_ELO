// Backward compatibility layer: Re-export snackbar as toast
// This allows existing code using toast() to work with the new Snackbar component
import { useSnackbar, snackbar, dismissSnackbar } from "@/hooks/use-snackbar";

// Re-export with toast API naming for compatibility
export { useSnackbar as useToast, snackbar as toast, dismissSnackbar as dismissToast };
