import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  focus,
  removeSelectedElement,
} from "../../features/counter/counterSlice";

const DesignWorkspace = () => {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;

  const handleClick = useCallback(
    (event) => {
      const clickedElementId = event.target.id;

      if (clickedElementId !== "") {
        const highlightedElement = document.querySelector(".highlighted");

        // Check if the clicked element is not the "main" ID
        if (clickedElementId !== "main") {
          // Remove the previous highlighting
          if (highlightedElement) {
            highlightedElement.classList.remove("highlighted");
          }

          const clickedElement = document.getElementById(clickedElementId);

          // Add highlighting to the clicked element
          if (clickedElement) {
            clickedElement.classList.add("highlighted");
          }
        } else {
          // Clicked element is "main" ID, remove the highlighting
          if (highlightedElement) {
            highlightedElement.classList.remove("highlighted");
          }
        }

        dispatch(focus("#" + clickedElementId));
        // Perform additional actions based on the clicked ID if needed
      }
    },
    [dispatch]
  );

  // Attach the click event listener to the document
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        dispatch(removeSelectedElement());
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      {/* Use dangerouslySetInnerHTML to render sanitized HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        style={{ padding: "2px", minHeight: "720px" }}
        id="main"
      ></div>
    </div>
  );
};

export default DesignWorkspace;
