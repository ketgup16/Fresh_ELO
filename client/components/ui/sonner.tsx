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
        duration: 4000,
        closeButton: true,
        classNames: {
          toast:
            "group toast bg-[#3C3E42] text-white border-0 shadow-lg rounded-lg px-4 py-4 flex items-center gap-4",
          description: "group-[.toast]:text-white",
          icon: "group-[.toast]:flex group-[.toast]:items-center group-[.toast]:justify-center",
          actionButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white group-[.toast]:hover:bg-white/10",
          closeButton:
            "group-[.toast]:bg-transparent group-[.toast]:border-0 group-[.toast]:text-white group-[.toast]:hover:bg-white/10 group-[.toast]:static group-[.toast]:ml-auto group-[.toast]:flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:self-center group-[.toast]:h-5 group-[.toast]:w-5 group-[.toast]:p-0 group-[.toast]:m-0",
          success:
            "bg-[#3C3E42] text-white border-0",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
