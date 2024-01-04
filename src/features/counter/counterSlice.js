import { createSlice } from "@reduxjs/toolkit";
import { parse } from "node-html-parser";

const initialState = {
  value:
    '<html><head><title>Document</title></head><body><div class="main"></div></body></html>',
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
};

var root = parse(initialState.value);

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addRow: (state) => {
      state.currentRowNumber += 1;
      const row = parse(`<div class="row-${state.currentRowNumber}"></div>`);
      root.querySelector(".main").appendChild(row);
      state.value = root.toString();
    },
    addCol: (state) => {
      state.currentColNumber += 1;
      const col = parse(`<div class="col-${state.currentColNumber}"></div>`);
      root.querySelector(".main").appendChild(col);
      state.value = root.toString();
    },
    addText: (state) => {
      state.currentTextNumber += 1;
      const text = parse(`<p class="text-${state.currentTextNumber}">Text</p>`);
      root.querySelector(".main").appendChild(text);
      state.value = root.toString();
    },
    addLink: (state) => {
      state.currentLinkNumber += 1;
      const link = parse(`<a class="link-${state.currentLinkNumber}">Link</a>`);
      root.querySelector(".main").appendChild(link);
      state.value = root.toString();
    },
    addImage: (state) => {
      state.currentImageNumber += 1;
      const image = parse(
        `<img class="image-${state.currentImageNumber}" src="https://via.placeholder.com/150">`
      );
      root.querySelector(".main").appendChild(image);
      state.value = root.toString();
    },
    addEmbed: (state) => {
      state.currentEmbedNumber += 1;
      const embed = parse(
        `<iframe class="embed-${state.currentEmbedNumber}" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>`
      );
      root.querySelector(".main").appendChild(embed);
      state.value = root.toString();
    },
    addForm: (state) => {
      state.currentFormNumber += 1;
      const form = parse(
        `<form class="form-${state.currentFormNumber}"></form>`
      );
      root.querySelector(".main").appendChild(form);
      state.value = root.toString();
    },
    addLabel: (state) => {
      state.currentLabelNumber += 1;
      const label = parse(
        `<label class="label-${state.currentLabelNumber}">Label</label>`
      );
      root.querySelector(".main").appendChild(label);
      state.value = root.toString();
    },
    addButton: (state) => {
      state.currentButtonNumber += 1;
      const button = parse(
        `<button class="button-${state.currentButtonNumber}">Button</button>`
      );
      root.querySelector(".main").appendChild(button);
      state.value = root.toString();
    },
    addTextarea: (state) => {
      state.currentTextareaNumber += 1;
      const textarea = parse(
        `<textarea class="textarea-${state.currentTextareaNumber}"></textarea>`
      );
      root.querySelector(".main").appendChild(textarea);
      state.value = root.toString();
    },
    addInput: (state) => {
      state.currentInputNumber += 1;
      const input = parse(
        `<input type="text" class="input-${state.currentInputNumber}">`
      );
      root.querySelector(".main").appendChild(input);
      state.value = root.toString();
    },
    addSelect: (state) => {
      state.currentSelectNumber += 1;
      const select = parse(
        `<select class="select-${state.currentSelectNumber}"></select>`
      );
      root.querySelector(".main").appendChild(select);
      state.value = root.toString();
    },
  },
});

export const {
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
