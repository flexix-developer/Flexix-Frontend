import React from "react";
import { useSelector } from "react-redux";

const DesignWorkspace = () => {
  const { counter } = useSelector((state) => ({ ...state }));

  const sanitizedHTML = counter.value; // Assume the HTML is already sanitized

  return (
    <div>
      {/* Use dangerouslySetInnerHTML to render sanitized HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        className="design-workspace"
      ></div>
    </div>
  );
};

export default DesignWorkspace;
