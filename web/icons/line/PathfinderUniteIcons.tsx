import * as React from "react";

function SvgComponent(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M21 7.54h-4.54V3a1 1 0 00-1-1H3a1 1 0 00-1 1v12.46a1 1 0 001 1h4.54V21a1 1 0 001 1H21a1 1 0 001-1V8.54a1 1 0 00-1-1zM20 20H9.54v-4.54a1 1 0 00-1-1H4V4h10.46v4.54a1 1 0 001 1H20z" />
    </svg>
  );
}

export default SvgComponent;
