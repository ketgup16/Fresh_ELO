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
    <path 
      d="M4 7H16M4 13H16" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <circle 
      cx="7" 
      cy="7" 
      r="2" 
      fill="currentColor"
    />
    <circle 
      cx="13" 
      cy="13" 
      r="2" 
      fill="currentColor"
    />
  </svg>
);
