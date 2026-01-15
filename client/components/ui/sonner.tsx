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
      offset={24}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            "group toast",
          description: "group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white group-[.toast]:hover:bg-white/10",
          closeButton:
            "group-[.toast]:bg-transparent group-[.toast]:border-0 group-[.toast]:text-white group-[.toast]:hover:bg-white/10",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
