interface SidekickLogoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SidekickLogoIcon({ width = 24, height = 24, className }: SidekickLogoIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g clipPath="url(#sidekick-clip)">
        <path
          d="M7.41376 22.9792C6.05479 21.6202 6.05479 19.4169 7.41376 18.0579L17.2564 8.21533L18.7327 9.69172C20.6353 11.5943 20.6353 14.679 18.7327 16.5815L12.3351 22.9792C10.9761 24.3382 8.77274 24.3382 7.41376 22.9792Z"
          fill="currentColor"
        />
        <path
          d="M5.26677 14.3067C3.3642 12.4042 3.3642 9.31949 5.26677 7.41692L11.6645 1.01923C13.0234 -0.339745 15.2268 -0.339744 16.5857 1.01923C17.9447 2.37821 17.9447 4.58155 16.5857 5.94053L6.74316 15.7831L5.26677 14.3067Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="sidekick-clip">
          <rect width="23.9992" height="23.9984" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
