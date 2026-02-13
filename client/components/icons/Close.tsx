import { SVGProps } from 'react';

export const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m25.414 7.731-8.293 8.293 8.293 8.293L24 25.731l-8.293-8.293-8.293 8.293L6 24.317l8.293-8.293L6 7.731l1.414-1.414 8.293 8.292L24 6.317l1.414 1.414Z"/>
  </svg>
);
