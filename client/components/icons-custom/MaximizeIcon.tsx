import { SVGProps } from 'react';

export const MaximizeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2 7.5V2h5.5v1.5H3.5V7.5H2ZM12.5 2H18v5.5h-1.5V3.5H12.5V2ZM2 12.5h1.5v4h4V18H2v-5.5ZM16.5 16.5h-4V18H18v-5.5h-1.5v4Z"
    />
  </svg>
);
