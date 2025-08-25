import * as React from "react";

// Updated LeetCode SVG icon (2024+ style, with gradient)
export const LeetCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="leetcode-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA116" />
        <stop offset="1" stopColor="#FF6A00" />
      </linearGradient>
    </defs>
    <path d="M17.5 40.5c-4.5-3.5-7.5-8.5-7.5-14.5C10 15.5 18.5 7 28.5 7c4.5 0 8.5 1.5 12 4.5l-2.5 2.5C34.5 11 31.5 10 28.5 10c-8 0-14.5 6.5-14.5 14.5 0 4.5 2 8.5 5.5 11.5l-2.5 2.5z" fill="url(#leetcode-gradient)"/>
    <path d="M40.5 30.5c-2.5 4-7 6.5-12 6.5-3 0-6-1-8.5-3l2.5-2.5c1.5 1 3.5 2 6 2 6 0 11-4.5 11-10.5 0-2.5-1-4.5-2.5-6l2.5-2.5c2.5 2.5 4 6 4 9.5 0 2.5-0.5 4.5-1.5 6.5z" fill="#292D3D"/>
    <circle cx="28.5" cy="24.5" r="3.5" fill="#FFA116"/>
  </svg>
);
