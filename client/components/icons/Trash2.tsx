import { SVGProps } from 'react';

export const Trash2 = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M3 5H17" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <path 
      d="M7 5V3C7 2.44772 7.44772 2 8 2H12C12.5523 2 13 2.44772 13 3V5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <path 
      d="M4 5L5 17C5 17.5523 5.44772 18 6 18H14C14.5523 18 15 17.5523 15 17L16 5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <path 
      d="M8 8V14M12 8V14" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
