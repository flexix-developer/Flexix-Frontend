import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focus } from "../../features/counter/counterSlice";

const DesignWorkspace = () => {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;

  const handleClick = useCallback((event) => {
    const clickedElementId = event.target.id;
    if (clickedElementId !== "") {
      dispatch(focus("#" + clickedElementId));
      // Perform additional actions based on the clicked ID if needed
    }
  }, [dispatch]);

  // Attach the click event listener to the document
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <div className="flex flex-col justify-center">
      {/* Use dangerouslySetInnerHTML to render sanitized HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        style={{ padding: "4px", minHeight: "720px" }}
        id = "main"
      ></div>
    </div>
  );
};

export default DesignWorkspace;