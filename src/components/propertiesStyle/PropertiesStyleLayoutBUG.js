// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   AlignHorizontalLeft,
//   AlignHorizontalCenter,
//   AlignHorizontalRight,
//   AlignVerticalBottom,
//   AlignVerticalCenter,
//   AlignVerticalTop,
//   WidthInputChange,
//   HeightInputChange,
// } from "../../features/counter/counterSlice";
// import { parse } from "node-html-parser";

// import {
//   MdAlignHorizontalLeft,
//   MdAlignHorizontalCenter,
//   MdAlignHorizontalRight,
//   MdAlignVerticalBottom,
//   MdAlignVerticalCenter,
//   MdAlignVerticalTop,
// } from "react-icons/md";

// const PropertiesStyleLayout = () => {
//   const dispatch = useDispatch();
//   const counterState = useSelector((state) => state.counter);

//   const root = parse(counterState.value);

//   const isJustifyStart = () => {
//     const targetNode = root.querySelector(counterState.currentFocus);
//     return targetNode && targetNode.classList.contains("justify-start");
//   };

//   const isJustifyEnd = () => {
//     const targetNode = root.querySelector(counterState.currentFocus);
//     return targetNode && targetNode.classList.contains("justify-end");
//   };

//   const isJustifyCenter = () => {
//     const targetNode = root.querySelector(counterState.currentFocus);
//     return targetNode && targetNode.classList.contains("justify-center");
//   };

//   const isItemsStart = () => {
//     const targetNode = root.querySelector(counterState.currentFocus);
//     return targetNode && targetNode.classList.contains("items-start");
//   };

//   const isItemsEnd = () => {
//     const targetNode = root.querySelector(counterState.currentFocus);
//     return targetNode && targetNode.classList.contains("items-end");
//   };

//   const isItemsCenter = () => {
//     const targetNode = root.querySelector(counterState.currentFocus);
//     return targetNode && targetNode.classList.contains("items-center");
//   };

//   const handleAlignHorizontalLeft = () => {
//     dispatch(AlignHorizontalLeft());
//   };

//   const handleAlignHorizontalCenter = () => {
//     dispatch(AlignHorizontalCenter());
//   };

//   const handleAlignHorizontalRight = () => {
//     dispatch(AlignHorizontalRight());
//   };

//   const handleAlignVerticalBottom = () => {
//     dispatch(AlignVerticalBottom());
//   };

//   const handleAlignVerticalCenter = () => {
//     dispatch(AlignVerticalCenter());
//   };

//   const handleAlignVerticalTop = () => {
//     dispatch(AlignVerticalTop());
//   };

//   const handleWidthInputChange = (event) => {
//     const widthValue = event.target.value;
//     dispatch(WidthInputChange(widthValue));
//   };

//   const handleHeightInputChange = (event) => {
//     const heightValue = event.target.value;
//     dispatch(HeightInputChange(heightValue));
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <div className="flex flex-row w-full justify-start p-2 items-center">
//         <div className="w-3/12 pl-2">
//           <p>Align</p>
//         </div>
//         <div className="w-9/12 flex flex-row">
//           <div
//             className="w-1/12 text-center mx-2 cursor-pointer"
//             onClick={handleAlignHorizontalLeft}
//           >
//             {isJustifyStart() ? (
//               <MdAlignHorizontalLeft color="skyblue" />
//             ) : (
//               <MdAlignHorizontalLeft />
//             )}
//           </div>
//           <div
//             className="w-1/12 text-center mx-1 cursor-pointer"
//             onClick={handleAlignHorizontalCenter}
//           >
//             {isJustifyCenter() ? <MdAlignHorizontalCenter color="skyblue" /> : <MdAlignHorizontalCenter />}
//           </div>
//           <div
//             className="w-1/12 text-center mx-2 cursor-pointer"
//             onClick={handleAlignHorizontalRight}
//           >
//             {isJustifyEnd() ? <MdAlignHorizontalRight color="skyblue" /> : <MdAlignHorizontalRight />}
//           </div>
//           <div
//             className="w-1/12 text-center mx-2 cursor-pointer"
//             onClick={handleAlignVerticalBottom}
//           >
//             {isItemsEnd() ? <MdAlignVerticalBottom color="skyblue" /> : <MdAlignVerticalBottom />}
//           </div>
//           <div
//             className="w-1/12 text-center mx-2 cursor-pointer"
//             onClick={handleAlignVerticalCenter}
//           >
//             {isItemsCenter() ? <MdAlignVerticalCenter color="skyblue" /> : <MdAlignVerticalCenter />}
//           </div>
//           <div
//             className="w-1/12 text-center mx-2 cursor-pointer"
//             onClick={handleAlignVerticalTop}
//           >
//             {isItemsStart() ? <MdAlignVerticalTop color="skyblue" /> : <MdAlignVerticalTop />}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row w-full justify-start p-2 items-center">
//         <div className="w-3/12 pl-2 mr-2">
//           <p>Width</p>
//         </div>
//         <div className="w-9/12 flex flex-row">
//           <div className="w-7/12 text-center">
//             <input
//               type="text"
//               className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
//               placeholder="auto"
//               onChange={handleWidthInputChange}
//             />
//           </div>
//           <div className="w-2/12 text-center ml-2 mr-2">
//             <p>px</p>
//           </div>
//         </div>
//         <div className="w-3/12 pl-2 mr-2">
//           <p>Height</p>
//         </div>
//         <div className="w-9/12 flex flex-row">
//           <div className="w-7/12 text-center">
//             <input
//               type="text"
//               className="w-full rounded border-2 border-neutral-600 bg-neutral-700 text-white text-center"
//               placeholder="auto"
//               onChange={handleHeightInputChange}
//             />
//           </div>
//           <div className="w-2/12 text-center ml-2 mr-2">
//             <p>px</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertiesStyleLayout;
