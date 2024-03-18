import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  focus,
  focusElement,
  removeSelectedElement,
  dndUpdate,
  EditText,
  highlightElement,
} from "../../features/counter/counterSlice";
import { all } from "axios";

const DesignWorkspace = () => {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state);
  const { value: sanitizedHTML } = counter;
  const { highlightedElementId } = useSelector((state) => state.counter);

  const handleClick = useCallback(
    (event) => {
      try {
        const clickedElementId = event.target.id;
        const clickedElement = event.target;
        const elementType = clickedElement.tagName.toLowerCase();

        if (clickedElementId !== "") {
          const highlightedElement = document.querySelector(".highlighted");
          const highlightedElement2 =
            document.querySelector(".highlighted-text");

          // Check if the clicked element is not the "main" ID
          if (clickedElementId !== "main") {
            // Remove the previous highlighting
            if (highlightedElement) {
              highlightedElement.classList.remove("highlighted");
              highlightedElement.classList.remove("highlighted-text");
            }
            if (highlightedElement2) {
              highlightedElement2.classList.remove("highlighted");
              // highlightedElement2.classList.remove("highlighted-text");
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
              highlightedElement.classList.remove("highlighted-text");
            }
            if (highlightedElement2) {
              highlightedElement2.classList.remove("highlighted");
              // highlightedElement2.classList.remove("highlighted-text");
            }
          }

          dispatch(focusElement(elementType));
          dispatch(focus("#" + clickedElementId));
          if (clickedElementId !== "") {
            dispatch(highlightElement(clickedElementId));
          }
          // Perform additional actions based on the clicked ID if needed
        }
      } catch (error) {
        console.error("Error in handleClick:", error);
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

  // const handleInput = useCallback(
  //   (event) => {
  //     // Log the edited content to the console
  //     console.log("Content edited:", event.target.innerHTML);
  //     dispatch(EditText(event.target.innerHTML));
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   // Attach the input event listener to the contenteditable element
  //   document.addEventListener("input", handleInput);
  //   return () => {
  //     document.removeEventListener("input", handleInput);
  //   };
  // }, [handleInput]);

  var allElements = document.querySelectorAll("*");

  function draggableElement(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    document.getElementById(event.target.id).classList.add("highlighted-dnd");
  }

  allElements.forEach((element) => {
    element.addEventListener("dragstart", draggableElement);
    element.addEventListener("dragleave", function (event) {
      try {
        document
          .getElementById(event.target.id)
          .classList.remove("highlighted-dndover");
      } catch (error) {
        console.error("Error in dragleave event:", error);
      }
    });
    // เพิ่มการจัดการเหตุการณ์ dragend
    element.addEventListener("dragend", function (event) {
      try {
        document
          .getElementById(event.target.id)
          .classList.remove("highlighted-dnd");
      } catch (error) {
        console.error("Error in dragend event:", error);
      }
    });
  });

  function allowDrop(event) {
    try {
      event.preventDefault();
      document
        .getElementById(event.target.id)
        .classList.add("highlighted-dndover");
    } catch (error) {
      console.error("Error in allowDrop function:", error);
    }
  }

  function dropElement(event) {
    try {
      event.preventDefault(); // ยกเลิกการลาก

      var data = event.dataTransfer.getData("text/plain");
      var draggedElement = document.getElementById(data);

      if (draggedElement) {
        if (draggedElement.id === event.target.id) {
          document
            .getElementById(event.target.id)
            .classList.remove("highlighted-dndover");
          draggedElement.classList.remove("highlighted-dnd");
          console.log("Cannot drop onto the same element.");
          return;
        }

        const allowedContainers = ["div", "form"];
        if (
          !allowedContainers.includes(event.currentTarget.tagName.toLowerCase())
        ) {
          event.currentTarget.classList.remove("highlighted-dndover");
          draggedElement.classList.remove("highlighted-dnd");
          console.log("Cannot drop outside allowed containers.");
          return;
        }

        event.currentTarget.classList.remove("highlighted-dndover");
        draggedElement.classList.remove("highlighted-dnd");
        document.querySelectorAll(".highlighted-dndover").forEach((element) => {
          element.classList.remove("highlighted-dndover");
        });
        document.querySelectorAll(".highlighted-dnd").forEach((element) => {
          element.classList.remove("highlighted-dnd");
        });

        if (
          event.target.tagName.toLowerCase() === "div" ||
          event.target.tagName.toLowerCase() === "form"
        ) {
          event.target.appendChild(draggedElement);
        } else {
          const targetParent = event.target.parentNode;
          const draggedParent = draggedElement.parentNode;

          targetParent.insertBefore(draggedElement, event.target);
          draggedParent.insertBefore(event.target, draggedElement);
        }

        dispatch(dndUpdate(document.getElementById("main").innerHTML));
      }
    } catch (error) {
      console.error("Error in dropElement:", error);
      // ถ้าเกิดข้อผิดพลาดในการวาง ให้ยกเลิกการลากและจัดการ highlight
      event.preventDefault();
      document.querySelectorAll(".highlighted-dnd").forEach((element) => {
        element.classList.remove("highlighted-dnd");
      });
      document.querySelectorAll(".highlighted-dndover").forEach((element) => {
        element.classList.remove("highlighted-dndover");
      });
    }
  }

  return (
    <div className="flex flex-col overflow-auto">
      {/* Use dangerouslySetInnerHTML to render sanitized HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        style={{ padding: "2px", minHeight: "720px", zoom: 0.665 }}
        id="main"
        onDrop={dropElement}
        onDragOver={allowDrop}
      ></div>
    </div>
  );
};

export default DesignWorkspace;
