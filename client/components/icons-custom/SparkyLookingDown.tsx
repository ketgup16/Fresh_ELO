import Lottie from "lottie-react";
import searchReadyAnimation from "@/components/icons/search_28px_ready.json";

export function SparkyLookingDown({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={searchReadyAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
