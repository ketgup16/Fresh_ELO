import { SVGProps } from 'react';

export const Users = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    {/* Center person */}
    <circle cx="16" cy="11" r="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M9 25v-1a7 7 0 0 1 14 0v1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Left person */}
    <circle cx="6" cy="13" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M2 25v-1a4 4 0 0 1 4-4h1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Right person */}
    <circle cx="26" cy="13" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M30 25v-1a4 4 0 0 0-4-4h-1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
