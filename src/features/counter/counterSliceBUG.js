// import { createSlice } from "@reduxjs/toolkit";
// import { parse } from "node-html-parser";

// const initialState = {
//   value: `
//   <html>
//       <head>
//         <title>Document</title>
//         <script src="https://cdn.tailwindcss.com">
//         </script>
//       </head>
//       <body>
//         <div id="main">
//         </div>
//       </body>
//   </html>`,

//   currentRowNumber: 0,
//   currentColNumber: 0,
//   currentTextNumber: 0,
//   currentLinkNumber: 0,
//   currentImageNumber: 0,
//   currentEmbedNumber: 0,
//   currentFormNumber: 0,
//   currentLabelNumber: 0,
//   currentButtonNumber: 0,
//   currentTextareaNumber: 0,
//   currentInputNumber: 0,
//   currentSelectNumber: 0,
//   currentFocus: "",
// };

// var root = parse(initialState.value);

// const appendElement = (state, elementType, htmlTemplate) => {
//   state[`current${elementType}Number`] += 1;
//   const element = parse(htmlTemplate);
//   const targetNode =
//     state.currentFocus === ""
//       ? root.querySelector("#main")
//       : root.querySelector(state.currentFocus);
//   targetNode.appendChild(element);
//   state.value = root.toString();
//   console.log(state.value);
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     focus: (state, action) => {
//       state.currentFocus = action.payload;
//       console.log(state.currentFocus);
//     },
//     addRow: (state) => {
//       appendElement(
//         state,
//         "Row",
//         `<div id="row-${state.currentRowNumber}" class="flex flex-row flex-wrap m-auto p-1 w-full min-h-32 max-h-full bg-slate-400"></div>`
//       );
//     },
//     addCol: (state) => {
//       appendElement(
//         state,
//         "Col",
//         `<div id="col-${state.currentColNumber}" class="flex flex-col flex-wrap m-auto p-1 w-full min-h-32 max-h-full bg-slate-200"></div>`
//       );
//     },
//     addText: (state) => {
//       appendElement(
//         state,
//         "Text",
//         `<p id="text-${state.currentTextNumber}" class="text-black">Text</p>`
//       );
//     },
//     addLink: (state) => {
//       appendElement(
//         state,
//         "Link",
//         `<a id="link-${state.currentLinkNumber}" class="text-sky-600">Link</a>`
//       );
//     },
//     addImage: (state) => {
//       appendElement(
//         state,
//         "Image",
//         `<img id="image-${state.currentImageNumber}" src="https://via.placeholder.com/150">`
//       );
//     },
//     addEmbed: (state) => {
//       appendElement(
//         state,
//         "Embed",
//         `<iframe id="embed-${state.currentEmbedNumber}" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>`
//       );
//     },
//     addForm: (state) => {
//       appendElement(
//         state,
//         "Form",
//         `<form id="form-${state.currentFormNumber}"></form>`
//       );
//     },
//     addLabel: (state) => {
//       appendElement(
//         state,
//         "Label",
//         `<label id="label-${state.currentLabelNumber}">Label</label>`
//       );
//     },
//     addButton: (state) => {
//       appendElement(
//         state,
//         "Button",
//         `<button id="button-${state.currentButtonNumber}">Button</button>`
//       );
//     },
//     addTextarea: (state) => {
//       appendElement(
//         state,
//         "Textarea",
//         `<textarea id="textarea-${state.currentTextareaNumber}"></textarea>`
//       );
//     },
//     addInput: (state) => {
//       appendElement(
//         state,
//         "Input",
//         `<input type="text" id="input-${state.currentInputNumber}">`
//       );
//     },
//     addSelect: (state) => {
//       appendElement(
//         state,
//         "Select",
//         `<select id="select-${state.currentSelectNumber}"></select>`
//       );
//     },
//     AlignHorizontalLeft: (state) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       targetNode.classList.remove("justify-end");
//       targetNode.classList.remove("justify-center");
//       targetNode.classList.toggle("justify-start", true);
//       state.value = root.toString();
//     },
//     AlignHorizontalCenter: (state) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       targetNode.classList.remove("justify-start");
//       targetNode.classList.remove("justify-end");
//       targetNode.classList.toggle("justify-center", true);
//       state.value = root.toString();
//     },
//     AlignHorizontalRight: (state) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       targetNode.classList.remove("justify-start");
//       targetNode.classList.remove("justify-center");
//       targetNode.classList.toggle("justify-end", true);
//       state.value = root.toString();
//     },
//     AlignVerticalTop: (state) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       targetNode.classList.remove("items-end");
//       targetNode.classList.remove("items-center");
//       targetNode.classList.toggle("items-start", true);
//       state.value = root.toString();
//     },
//     AlignVerticalBottom: (state) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       targetNode.classList.remove("items-start");
//       targetNode.classList.remove("items-center");
//       targetNode.classList.toggle("items-end", true);
//       state.value = root.toString();
//     },
//     AlignVerticalCenter: (state) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       targetNode.classList.remove("items-start");
//       targetNode.classList.remove("items-end");
//       targetNode.classList.toggle("items-center", true);
//       state.value = root.toString();
//     },
//     WidthInputChange: (state, action) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       const width = action.payload;
    
//       // Remove existing width classes
//       targetNode.classList.remove('w-full');
//       for (let i = 0; i <= 5000; i++) {
//         targetNode.classList.remove(`w-[${i}px]`);
//       }

//       // Add the new width class
//       targetNode.classList.add(`w-[${width}px]`);
    
//       state.value = root.toString();
//     },
    
//     HeightInputChange: (state, action) => {
//       const targetNode = root.querySelector(state.currentFocus);
//       const height = action.payload;
    
//       // Remove existing height classes
//       targetNode.classList.remove('min-h-32');
//       targetNode.classList.remove('max-h-full');
//       targetNode.classList.remove('w-full');
//       for (let i = 1; i <= 5000; i++) {
//         targetNode.classList.remove(`h-[${i}px]`);
//       }
    
//       // Add the new height class
//       targetNode.classList.add(`h-[${height}px]`);
    
//       state.value = root.toString();
//     },
//     },
// });

// export const {
//   focus,
//   addRow,
//   addCol,
//   addText,
//   addLink,
//   addImage,
//   addEmbed,
//   addForm,
//   addLabel,
//   addButton,
//   addTextarea,
//   addInput,
//   addSelect,
//   AlignHorizontalLeft,
//   AlignHorizontalRight,
//   AlignHorizontalCenter,
//   AlignVerticalTop,
//   AlignVerticalBottom,
//   AlignVerticalCenter,
//   AlignHorizontalLeftRemove,
//   AlignHorizontalRightRemove,
//   AlignHorizontalCenterRemove,
//   AlignVerticalTopRemove,
//   AlignVerticalBottomRemove,
//   AlignVerticalCenterRemove,
//   WidthInputChange,
//   HeightInputChange,
// } = counterSlice.actions;

// export default counterSlice.reducer;
