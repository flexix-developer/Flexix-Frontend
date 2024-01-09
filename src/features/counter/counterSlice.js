import { createSlice } from "@reduxjs/toolkit";
import { parse } from "node-html-parser";

const initialState = {
  value:
    '<html><head><title>Document</title><script src="https://cdn.tailwindcss.com"></script></head><body><div id="main"></div></body></html>',
  currentRowNumber: 0,
  currentColNumber: 0,
  currentTextNumber: 0,
  currentLinkNumber: 0,
  currentImageNumber: 0,
  currentEmbedNumber: 0,
  currentFormNumber: 0,
  currentLabelNumber: 0,
  currentButtonNumber: 0,
  currentTextareaNumber: 0,
  currentInputNumber: 0,
  currentSelectNumber: 0,
  currentFocus: "",
};

var root = parse(initialState.value);

const appendElement = (state, elementType, htmlTemplate) => {
  state[`current${elementType}Number`] += 1;
  const element = parse(htmlTemplate);
  const targetNode = state.currentFocus === "" ? root.querySelector("#main") : root.querySelector(state.currentFocus);
  targetNode.appendChild(element);
  state.value = root.toString();
  console.log(state.value);
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    focus: (state, action) => {
      state.currentFocus = action.payload;
      console.log(state.currentFocus);
    },
    addRow: (state) => {
      appendElement(state, "Row", `<div id="row-${state.currentRowNumber}" class="flex flex-row flex-wrap m-auto p-1 w-full min-h-32 max-h-full bg-slate-300"></div>`);
    },
    addCol: (state) => {
      appendElement(state, "Col", `<div id="col-${state.currentColNumber}" class="flex flex-col flex-wrap m-auto p-1 w-full min-h-32 max-h-full bg-slate-400"></div>`);
    },
    addText: (state) => {
      appendElement(state, "Text", `<p id="text-${state.currentTextNumber}" class="text-black">Text</p>`);
    },
    addLink: (state) => {
      appendElement(state, "Link", `<a id="link-${state.currentLinkNumber}" class="text-sky-600">Link</a>`);
    },
    addImage: (state) => {
      appendElement(state, "Image", `<img id="image-${state.currentImageNumber}" src="https://via.placeholder.com/150">`);
    },
    addEmbed: (state) => {
      appendElement(state, "Embed", `<iframe id="embed-${state.currentEmbedNumber}" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>`);
    },
    addForm: (state) => {
      appendElement(state, "Form", `<form id="form-${state.currentFormNumber}"></form>`);
    },
    addLabel: (state) => {
      appendElement(state, "Label", `<label id="label-${state.currentLabelNumber}">Label</label>`);
    },
    addButton: (state) => {
      appendElement(state, "Button", `<button id="button-${state.currentButtonNumber}">Button</button>`);
    },
    addTextarea: (state) => {
      appendElement(state, "Textarea", `<textarea id="textarea-${state.currentTextareaNumber}"></textarea>`);
    },
    addInput: (state) => {
      appendElement(state, "Input", `<input type="text" id="input-${state.currentInputNumber}">`);
    },
    addSelect: (state) => {
      appendElement(state, "Select", `<select id="select-${state.currentSelectNumber}"></select>`);
    },
  },
});

export const {
  focus,
  addRow,
  addCol,
  addText,
  addLink,
  addImage,
  addEmbed,
  addForm,
  addLabel,
  addButton,
  addTextarea,
  addInput,
  addSelect,
} = counterSlice.actions;

export default counterSlice.reducer;