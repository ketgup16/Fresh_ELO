import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#2E2F32] group-[.toaster]:text-white group-[.toaster]:border-0 group-[.toaster]:rounded group-[.toaster]:min-h-[52px] group-[.toaster]:items-center",
          description: "group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white group-[.toast]:hover:bg-white/10",
          closeButton:
            "group-[.toast]:bg-transparent group-[.toast]:border-0 group-[.toast]:text-white group-[.toast]:hover:bg-white/10",
        },
        style: {
          background: '#2E2F32',
          color: 'white',
          border: 'none',
          boxShadow: '0 -1px 4px 0 rgba(0, 0, 0, 0.10), 0 5px 10px 3px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif',
          padding: '8px',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
