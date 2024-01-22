import { createSlice } from "@reduxjs/toolkit";
import { parse } from "node-html-parser";

const initialState = {
  value: `
  <html>
      <head>
        <title>Document</title>
        <script src="https://cdn.tailwindcss.com">
        </script>
      </head>
      <body>
        <div id="main">
        </div>
      </body>
  </html>`,

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
  const targetNode =
    state.currentFocus === ""
      ? root.querySelector("#main")
      : root.querySelector(state.currentFocus);
  targetNode.appendChild(element);
  state.value = root.toString();
  console.log(state.value);
};

export const removeSelectedElement = () => (dispatch, getState) => {
  const { currentFocus } = getState().counter;

  if (currentFocus !== "" && currentFocus !== "#main") {
    dispatch(removeElement());
    dispatch(focus(""));
  }
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
      appendElement(
        state,
        "Row",
        `<div id="row-${state.currentRowNumber}" class="flex flex-row flex-wrap p-1 w-full min-h-32 max-h-full bg-slate-400"></div>`
      );
    },
    addCol: (state) => {
      appendElement(
        state,
        "Col",
        `<div id="col-${state.currentColNumber}" class="flex flex-col flex-wrap p-1 w-full min-h-32 max-h-full bg-slate-200"></div>`
      );
    },
    addText: (state) => {
      appendElement(
        state,
        "Text",
        `<p id="text-${state.currentTextNumber}" class="text-black">Text</p>`
      );
    },
    addLink: (state) => {
      appendElement(
        state,
        "Link",
        `<a id="link-${state.currentLinkNumber}" class="text-sky-600">Link</a>`
      );
    },
    addImage: (state) => {
      appendElement(
        state,
        "Image",
        `<img id="image-${state.currentImageNumber}" src="https://via.placeholder.com/150">`
      );
    },
    addEmbed: (state) => {
      appendElement(
        state,
        "Embed",
        `<iframe id="embed-${state.currentEmbedNumber}" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>`
      );
    },
    addForm: (state) => {
      appendElement(
        state,
        "Form",
        `<form id="form-${state.currentFormNumber}" class="flex flex-col flex-wrap p-1 w-full min-h-32 max-h-full bg-slate-300"></form>`
      );
    },
    addLabel: (state) => {
      appendElement(
        state,
        "Label",
        `<label id="label-${state.currentLabelNumber}">Label</label>`
      );
    },
    addButton: (state) => {
      appendElement(
        state,
        "Button",
        `<button id="button-${state.currentButtonNumber}" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Button</button>`
      );
    },
    addTextarea: (state) => {
      appendElement(
        state,
        "Textarea",
        `<textarea id="textarea-${state.currentTextareaNumber}"></textarea>`
      );
    },
    addInput: (state) => {
      appendElement(
        state,
        "Input",
        `<input type="text" id="input-${state.currentInputNumber}">`
      );
    },
    addSelect: (state) => {
      appendElement(
        state,
        "Select",
        `<select id="select-${state.currentSelectNumber}"></select>`
      );
    },
    removeElement: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.remove();
      state.value = root.toString();
    },
    AlignHorizontalLeft: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-center");
      targetNode.classList.toggle("justify-start", true);
      state.value = root.toString();
    },
    AlignHorizontalCenter: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-end");
      targetNode.classList.toggle("justify-center", true);
      state.value = root.toString();
    },
    AlignHorizontalRight: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-center");
      targetNode.classList.toggle("justify-end", true);
      state.value = root.toString();
    },
    AlignVerticalTop: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-end");
      targetNode.classList.remove("items-center");
      targetNode.classList.toggle("items-start", true);
      state.value = root.toString();
    },
    AlignVerticalBottom: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-start");
      targetNode.classList.remove("items-center");
      targetNode.classList.toggle("items-end", true);
      state.value = root.toString();
    },
    AlignVerticalCenter: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-start");
      targetNode.classList.remove("items-end");
      targetNode.classList.toggle("items-center", true);
      state.value = root.toString();
    },
    WidthInputChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const widthValue = action.payload;
      const WidthOptions = [
        { value: "w-auto", label: "auto" },
        { value: "w-full", label: "full" },
        { value: "w-1/2", label: "1/2" },
        { value: "w-1/3", label: "1/3" },
        { value: "w-2/3", label: "2/3" },
        { value: "w-1/4", label: "1/4" },
        { value: "w-2/4", label: "2/4" },
        { value: "w-3/4", label: "3/4" },
        { value: "w-1/5", label: "1/5" },
        { value: "w-2/5", label: "2/5" },
        { value: "w-3/5", label: "3/5" },
        { value: "w-4/5", label: "4/5" },
        { value: "w-1/6", label: "1/6" },
        { value: "w-2/6", label: "2/6" },
        { value: "w-3/6", label: "3/6" },
        { value: "w-4/6", label: "4/6" },
        { value: "w-5/6", label: "5/6" },
        { value: "w-1/12", label: "1/12" },
        { value: "w-2/12", label: "2/12" },
        { value: "w-3/12", label: "3/12" },
        { value: "w-4/12", label: "4/12" },
        { value: "w-5/12", label: "5/12" },
        { value: "w-6/12", label: "6/12" },
        { value: "w-7/12", label: "7/12" },
        { value: "w-8/12", label: "8/12" },
        { value: "w-9/12", label: "9/12" },
        { value: "w-10/12", label: "10/12" },
        { value: "w-11/12", label: "11/12" },
        { value: "w-screen", label: "screen" },
        { value: "w-min", label: "min" },
        { value: "w-max", label: "max" },
        { value: "w-fit", label: "fit" },
      ];

      WidthOptions.forEach((option) => {
        targetNode.classList.remove(option.value);
      });

      if (state.currentFocus !== "#main") {
        targetNode.classList.add(`${widthValue}`);
      }

      state.value = root.toString();
    },
    HeightInputChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const heightValue = action.payload;

      const HeightOptions = [
        { value: "h-auto", label: "auto" },
        { value: "h-full", label: "full" },
        { value: "h-1/2", label: "1/2" },
        { value: "h-1/3", label: "1/3" },
        { value: "h-2/3", label: "2/3" },
        { value: "h-1/4", label: "1/4" },
        { value: "h-2/4", label: "2/4" },
        { value: "h-3/4", label: "3/4" },
        { value: "h-1/5", label: "1/5" },
        { value: "h-2/5", label: "2/5" },
        { value: "h-3/5", label: "3/5" },
        { value: "h-4/5", label: "4/5" },
        { value: "h-1/6", label: "1/6" },
        { value: "h-2/6", label: "2/6" },
        { value: "h-3/6", label: "3/6" },
        { value: "h-4/6", label: "4/6" },
        { value: "h-5/6", label: "5/6" },
        { value: "h-1/12", label: "1/12" },
        { value: "h-2/12", label: "2/12" },
        { value: "h-3/12", label: "3/12" },
        { value: "h-4/12", label: "4/12" },
        { value: "h-5/12", label: "5/12" },
        { value: "h-6/12", label: "6/12" },
        { value: "h-7/12", label: "7/12" },
        { value: "h-8/12", label: "8/12" },
        { value: "h-9/12", label: "9/12" },
        { value: "h-10/12", label: "10/12" },
        { value: "h-11/12", label: "11/12" },
        { value: "h-screen", label: "screen" },
        { value: "h-min", label: "min" },
        { value: "h-max", label: "max" },
        { value: "h-fit", label: "fit" },
      ];

      // default remove min-h-32, max-h-full
      targetNode.classList.remove("min-h-32");
      targetNode.classList.remove("max-h-full");

      HeightOptions.forEach((option) => {
        targetNode.classList.remove(option.value);
      });

      if (state.currentFocus !== "#main") {
        targetNode.classList.add(`${heightValue}`);
      }

      state.value = root.toString();
    },
    updateValue: (state, action) => {
      state.value = action.payload;
      root = parse(state.value);
    },
    BackgroundColorChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const colorValue = action.payload;
  
      const updateBackgroundColor = (style, color) => {
          const styleArray = style.split(';').map(prop => prop.trim());
          const updatedStyleArray = styleArray
              .filter(prop => !(prop === '' || prop.startsWith('background-color:')))
              .concat(`background-color: ${color};`);
          return updatedStyleArray.join('; ');
      };
  
      if (targetNode.attributes.style) {
          const currentStyle = targetNode.attributes.style;
          const updatedStyle = updateBackgroundColor(currentStyle, colorValue);
          targetNode.setAttribute('style', updatedStyle);
      } else {
          targetNode.setAttribute('style', `background-color: ${colorValue};`);
      }
  
      state.value = root.toString();
    },
    BackgroundColorOpacityChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      let opacityValue = action.payload;

      if (opacityValue <= 9) {
          opacityValue = "0"+opacityValue;
      }

      const opacity = opacityValue / 100 * 255;
      const hexOpacity = opacity.toString(16).toUpperCase();
      const hexOpacity2 = hexOpacity.split(".")[0];

      // Function to update the background color opacity property in the style attribute
      const updateBackgroundOpacity = (style, opacity) => {
        const styleArray = style.split(';').map(prop => prop.trim());
        let updatedStyleArray = [];

        for (let i = 0; i < styleArray.length; i++) {
          const prop = styleArray[i];
          if (prop.startsWith('background-color:')) {
            // If the style property is background-color, retain the first 6 characters and append new opacity
            const existingColor = prop.replace('background-color:', '').trim();
            const existingColorWithoutAlpha = existingColor.slice(0, 7);
            updatedStyleArray.push(`background-color: ${existingColorWithoutAlpha}${hexOpacity2}`);
          } else {
            updatedStyleArray.push(prop);
          }
        }

        return updatedStyleArray.join('; ');
      };

      // Check if the target node already has a style attribute
      if (targetNode.attributes.style) {
        // If style attribute exists, update the background opacity property
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateBackgroundOpacity(currentStyle, hexOpacity2);
        targetNode.setAttribute('style', updatedStyle);
      } else {
        // If style attribute doesn't exist, add the background opacity property
        targetNode.setAttribute('style', `background-color: #${hexOpacity2};`);
      }

      state.value = root.toString();
    },
    FontFamilyChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const fontValue = action.payload;
      const fontOptions = [
        { value: "font-sans", label: "font-sans" },
        { value: "font-serif", label: "font-serif" },
        { value: "font-mono", label: "font-mono" },
      ];

      fontOptions.forEach((option) => {
        targetNode.classList.remove(option.value);
      });

      if (state.currentFocus !== "#main") {
        targetNode.classList.add(`${fontValue}`);
      }

      state.value = root.toString();
   },
    FontSizeChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const fontSizeValue = action.payload;
      const fontSizeOptions = [
        { value: "text-xs", label: "text-xs" },
        { value: "text-sm", label: "text-sm" },
        { value: "text-base", label: "text-base" },
        { value: "text-lg", label: "text-lg" },
        { value: "text-xl", label: "text-xl" },
        { value: "text-2xl", label: "text-2xl" },
        { value: "text-3xl", label: "text-3xl" },
        { value: "text-4xl", label: "text-4xl" },
        { value: "text-5xl", label: "text-5xl" },
        { value: "text-6xl", label: "text-6xl" },
        { value: "text-7xl", label: "text-7xl" },
        { value: "text-8xl", label: "text-8xl" },
        { value: "text-9xl", label: "text-9xl" },
      ];

      fontSizeOptions.forEach((option) => {
        targetNode.classList.remove(option.value);
      });

      if (state.currentFocus !== "#main") {
        targetNode.classList.add(`${fontSizeValue}`);
      }

      state.value = root.toString();
    },
    TextColorChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const colorValue = action.payload;

      const updateTextColor = (style, color) => {
        const styleArray = style.split(';').map(prop => prop.trim());
        const updatedStyleArray = styleArray
            .filter(prop => !(prop === '' || prop.startsWith('color:')))
            .concat(`color: ${color};`);
        return updatedStyleArray.join('; ');
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateTextColor(currentStyle, colorValue);
        targetNode.setAttribute('style', updatedStyle);
      } else {
        targetNode.setAttribute('style', `color: ${colorValue};`);
      }

      state.value = root.toString();
    },
    TextStyleBold: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("font-bold", true);
      state.value = root.toString();
    },
    TextStyleItalic: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("italic", true);
      state.value = root.toString();
    },
    TextStyleUnderline: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("underline", true);
      state.value = root.toString();
    },
    TextStyleLineThrough: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("line-through", true);
      state.value = root.toString();
    },
    TextAlignLeft: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-left", true);
      state.value = root.toString();
    },
    TextAlignCenter: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-center", true);
      state.value = root.toString();
    },
    TextAlignRight: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-right", true);
      state.value = root.toString();
    },
    TextAlignJustify: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-justify", true);
      state.value = root.toString();
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
  updateValue,
  removeElement,
  AlignHorizontalLeft,
  AlignHorizontalRight,
  AlignHorizontalCenter,
  AlignVerticalTop,
  AlignVerticalBottom,
  AlignVerticalCenter,
  AlignHorizontalLeftRemove,
  AlignHorizontalRightRemove,
  AlignHorizontalCenterRemove,
  AlignVerticalTopRemove,
  AlignVerticalBottomRemove,
  AlignVerticalCenterRemove,
  WidthInputChange,
  HeightInputChange,
  BackgroundColorChange,
  BackgroundColorOpacityChange,
  FontFamilyChange,
  FontSizeChange,
  TextColorChange,
  TextStyleBold,
  TextStyleItalic,
  TextStyleUnderline,
  TextStyleLineThrough,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
} = counterSlice.actions;

export default counterSlice.reducer;
