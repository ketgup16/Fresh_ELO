import { SVGProps } from 'react';

export const Sliders = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    {/* Top slider line */}
    <path
      d="M3 5H7M11 5H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Top slider knob */}
    <circle
      cx="9"
      cy="5"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Middle slider line */}
    <path
      d="M3 10H11M15 10H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Middle slider knob */}
    <circle
      cx="13"
      cy="10"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Bottom slider line */}
    <path
      d="M3 15H5M9 15H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Bottom slider knob */}
    <circle
      cx="7"
      cy="15"
      r="2"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
