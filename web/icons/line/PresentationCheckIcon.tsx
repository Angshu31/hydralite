import * as React from "react";

function SvgComponent(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M10.29 11.71a1 1 0 001.42 0l4-4a1 1 0 10-1.42-1.42L11 9.59l-1.29-1.3a1 1 0 00-1.42 1.42zM21 14h-1V4h1a1 1 0 000-2H3a1 1 0 000 2h1v10H3a1 1 0 000 2h8v1.15l-4.55 3A1 1 0 007 22a.94.94 0 00.55-.17L11 19.55V21a1 1 0 002 0v-1.45l3.45 2.28A.94.94 0 0017 22a1 1 0 00.55-1.83l-4.55-3V16h8a1 1 0 000-2zm-3 0H6V4h12z" />
    </svg>
  );
}

export default SvgComponent;
