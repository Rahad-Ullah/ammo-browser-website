import React from "react";

const ListSvg = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="28"
      viewBox="0 0 32 28"
      fill="none"
    >
      <rect width="22" height="22" fill="#1F1F1F" />
      <rect x="10" y="6" width="22" height="22" fill="#2E2E2E" />
    </svg>
  );
};

export default ListSvg;
