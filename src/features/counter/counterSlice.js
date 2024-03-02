import { createSlice } from "@reduxjs/toolkit";
import { parse } from "node-html-parser";
import axios from "axios";
import beautify from "js-beautify";

const initialState = {
  value: ``, // HTML content
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
  currentOptionNumber: 0,
  currentFocus: "",
  currentFocusElement: "",
  elementAction: "",
  ListPages: [],
  IndexPages: null,
};

var root = parse(initialState.value);

export const SavePage = async (state, html) => {
  countElements(state);
  state.value = html;
  const ID = localStorage.getItem("ID");
  const ProjectID = localStorage.getItem("ProjectID");
  const token = localStorage.getItem("token");
  const page = state.ListPages[state.IndexPages];
  console.log("SavePage", page, "state.IndexPages", state.ListPages);
  const html_beautify = beautify.html;

  try {
    await axios.post(
      "http://127.0.0.1:8081/users/savepage",
      // "http://ceproject.thddns.net:3322/users/savepage",
      {
        id: ID,
        proid: ProjectID,
        pagename: page,
        content: html_beautify(html),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("SavePage Success");
  } catch (error) {
    console.log("Error:", error);
  }
};

const appendElement = (state, elementType, htmlTemplate) => {
  countElements(state);
  state[`current${elementType}Number`] += 1;
  if (state.currentFocus === "") {
    state.currentFocus = "#main";
    state.currentFocusElement = "div";
  }
  const element = parse(htmlTemplate);
  const targetNode =
    state.currentFocus === ""
      ? root.querySelector("#main")
      : root.querySelector(state.currentFocus);
  targetNode.appendChild(element);
  // state.value = root.toString();
  SavePage(state, root.toString());
  console.log(state.value);
};

const countElements = (state) => {
  const rowElements = root.querySelectorAll('[id^="row-"]');
  const colElements = root.querySelectorAll('[id^="col-"]');
  const textElements = root.querySelectorAll('[id^="text-"]');
  const linkElements = root.querySelectorAll('[id^="link-"]');
  const imageElements = root.querySelectorAll('[id^="image-"]');
  const embedElements = root.querySelectorAll('[id^="embed-"]');
  const formElements = root.querySelectorAll('[id^="form-"]');
  const labelElements = root.querySelectorAll('[id^="label-"]');
  const buttonElements = root.querySelectorAll('[id^="button-"]');
  const textareaElements = root.querySelectorAll('[id^="textarea-"]');
  const inputElements = root.querySelectorAll('[id^="input-"]');
  const selectElements = root.querySelectorAll('[id^="select-"]');
  const optionElements = root.querySelectorAll('[id^="option-"]');

  // สร้างตัวแปรเก็บค่า
  let maxRowId = 0;
  let maxColId = 0;
  let maxTextId = 0;
  let maxLinkId = 0;
  let maxImageId = 0;
  let maxEmbedId = 0;
  let maxFormId = 0;
  let maxLabelId = 0;
  let maxButtonId = 0;
  let maxTextareaId = 0;
  let maxInputId = 0;
  let maxSelectId = 0;
  let maxOptionId = 0;

  // ฟังก์ชันหาค่า id ที่มากที่สุด
  function findMaxId(elements, prefix, maxId) {
    elements.forEach((element) => {
      const id = parseInt(
        element.getAttribute("id").replace(`${prefix}`, ""),
        10
      );
      if (!isNaN(id) && id > maxId) {
        maxId = id;
      } else {
        maxId = id;
      }
    });
    return maxId;
  }

  // ใช้ฟังก์ชันเพื่อหาค่า id ที่มากที่สุด
  maxRowId = findMaxId(rowElements, "row-", maxRowId);
  maxColId = findMaxId(colElements, "col-", maxColId);
  maxTextId = findMaxId(textElements, "text-", maxTextId);
  maxLinkId = findMaxId(linkElements, "link-", maxLinkId);
  maxImageId = findMaxId(imageElements, "image-", maxImageId);
  maxEmbedId = findMaxId(embedElements, "embed-", maxEmbedId);
  maxFormId = findMaxId(formElements, "form-", maxFormId);
  maxLabelId = findMaxId(labelElements, "label-", maxLabelId);
  maxButtonId = findMaxId(buttonElements, "button-", maxButtonId);
  maxTextareaId = findMaxId(textareaElements, "textarea-", maxTextareaId);
  maxInputId = findMaxId(inputElements, "input-", maxInputId);
  maxSelectId = findMaxId(selectElements, "select-", maxSelectId);
  maxOptionId = findMaxId(optionElements, "option-", maxOptionId);

  state.currentRowNumber = maxRowId + 1;
  state.currentColNumber = maxColId + 1;
  state.currentTextNumber = maxTextId + 1;
  state.currentLinkNumber = maxLinkId + 1;
  state.currentImageNumber = maxImageId + 1;
  state.currentEmbedNumber = maxEmbedId + 1;
  state.currentFormNumber = maxFormId + 1;
  state.currentLabelNumber = maxLabelId + 1;
  state.currentButtonNumber = maxButtonId + 1;
  state.currentTextareaNumber = maxTextareaId + 1;
  state.currentInputNumber = maxInputId + 1;
  state.currentSelectNumber = maxSelectId + 1;
  state.currentOptionNumber = maxOptionId + 1;
};

export const removeSelectedElement = () => (dispatch, getState) => {
  const { currentFocus } = getState().counter;

  if (currentFocus !== "" && currentFocus !== "#main") {
    dispatch(removeElement());
    dispatch(focus("#main"));
    dispatch(focusElement("div"));
  }
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    focus: (state, action) => {
      countElements(state);
      state.currentFocus = action.payload;
      console.log(state.currentFocus);
    },
    focusElement: (state, action) => {
      countElements(state);
      state.currentFocusElement = action.payload;
      // console.log(state.currentFocusElement);
    },
    addElementAction: (state, action) => {
      countElements(state);
      state.elementAction = action.payload;
    },
    addRow: (state) => {
      appendElement(
        state,
        "Row",
        `<div id="row-${state.currentRowNumber}" class="flex flex-row flex-wrap p-1 w-full  max-h-full bg-slate-400" draggable="true"></div>`
      );
    },
    addCol: (state) => {
      appendElement(
        state,
        "Col",
        `<div id="col-${state.currentColNumber}" class="flex flex-col flex-wrap p-1 w-full  max-h-full bg-slate-200" draggable="true"></div>`
      );
    },
    addText: (state) => {
      appendElement(
        state,
        "Text",
        `<p id="text-${state.currentTextNumber}" class="text-black" draggable="true">Text</p>`
      );
    },
    addLink: (state) => {
      appendElement(
        state,
        "Link",
        `<a href="https://www.w3schools.com" id="link-${state.currentLinkNumber}" class="text-sky-600" onClick="return false"; draggable="true">Link</a>`
      );
    },
    addImage: (state) => {
      appendElement(
        state,
        "Image",
        `<img id="image-${state.currentImageNumber}" alt="image-${state.currentImageNumber}" src="https://via.placeholder.com/150" draggable="true">`
      );
    },
    addEmbed: (state) => {
      appendElement(
        state,
        "Embed",
        `<iframe id="embed-${state.currentEmbedNumber}" src="https://www.youtube.com/embed/tgbNymZ7vqY" draggable="true"></iframe>`
      );
    },
    addForm: (state) => {
      appendElement(
        state,
        "Form",
        `<form id="form-${state.currentFormNumber}" name="" class="flex flex-col flex-wrap p-1 w-full  max-h-full bg-slate-300" draggable="true"></form>`
      );
    },
    addLabel: (state) => {
      appendElement(
        state,
        "Label",
        `<label id="label-${state.currentLabelNumber}" draggable="true">Label</label>`
      );
    },
    addButton: (state) => {
      appendElement(
        state,
        "Button",
        `<button id="button-${state.currentButtonNumber}" class="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="button" draggable="true">Button</button>`
      );
    },
    addTextarea: (state) => {
      appendElement(
        state,
        "Textarea",
        `<textarea id="textarea-${state.currentTextareaNumber}" name="" placeholder="" draggable="true"></textarea>`
      );
    },
    addInput: (state) => {
      appendElement(
        state,
        "Input",
        `<input type="text" id="input-${state.currentInputNumber}" name="" placeholder="" draggable="true">`
      );
    },
    addSelect: (state) => {
      appendElement(
        state,
        "Select",
        `<select id="select-${state.currentSelectNumber}" draggable="true"><option id ="option-${state.currentOptionNumber}" value="null">null</option></select>`
      );
    },
    removeElement: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.remove();
      state.value = root.toString();
      SavePage(state, root.toString());
      countElements(state);
    },
    AlignHorizontalLeft: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-center");
      targetNode.classList.remove("justify-between");
      targetNode.classList.remove("justify-around");
      targetNode.classList.remove("justify-evenly");
      targetNode.classList.remove("justify-stretch");
      targetNode.classList.toggle("justify-start", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignHorizontalCenter: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-between");
      targetNode.classList.remove("justify-around");
      targetNode.classList.remove("justify-evenly");
      targetNode.classList.remove("justify-stretch");
      targetNode.classList.toggle("justify-center", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignHorizontalRight: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-center");
      targetNode.classList.remove("justify-between");
      targetNode.classList.remove("justify-around");
      targetNode.classList.remove("justify-evenly");
      targetNode.classList.remove("justify-stretch");
      targetNode.classList.toggle("justify-end", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignHorizontalSpaceBetween: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-center");
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-around");
      targetNode.classList.remove("justify-evenly");
      targetNode.classList.remove("justify-stretch");
      targetNode.classList.toggle("justify-between", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignHorizontalSpaceAround: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-center");
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-between");
      targetNode.classList.remove("justify-evenly");
      targetNode.classList.remove("justify-stretch");
      targetNode.classList.toggle("justify-around", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignHorizontalSpaceEvenly: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-center");
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-between");
      targetNode.classList.remove("justify-around");
      targetNode.classList.remove("justify-stretch");
      targetNode.classList.toggle("justify-evenly", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignHorizontalStretch: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("justify-start");
      targetNode.classList.remove("justify-center");
      targetNode.classList.remove("justify-end");
      targetNode.classList.remove("justify-between");
      targetNode.classList.remove("justify-around");
      targetNode.classList.remove("justify-evenly");
      targetNode.classList.toggle("justify-stretch", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignVerticalTop: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-end");
      targetNode.classList.remove("items-center");
      targetNode.classList.remove("items-baseline");
      targetNode.classList.remove("items-stretch");
      targetNode.classList.toggle("items-start", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignVerticalBottom: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-start");
      targetNode.classList.remove("items-center");
      targetNode.classList.remove("items-baseline");
      targetNode.classList.remove("items-stretch");
      targetNode.classList.toggle("items-end", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignVerticalCenter: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-start");
      targetNode.classList.remove("items-end");
      targetNode.classList.remove("items-baseline");
      targetNode.classList.remove("items-stretch");
      targetNode.classList.toggle("items-center", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignVerticalBaseline: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-start");
      targetNode.classList.remove("items-end");
      targetNode.classList.remove("items-center");
      targetNode.classList.remove("items-stretch");
      targetNode.classList.toggle("items-baseline", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AlignVerticalStretch: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.remove("items-start");
      targetNode.classList.remove("items-end");
      targetNode.classList.remove("items-center");
      targetNode.classList.remove("items-baseline");
      targetNode.classList.toggle("items-stretch", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    WidthInputChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const widthValue = action.payload;
      const WidthOptions = [
        { value: "w-auto", label: "auto" },
        { value: "w-0", label: "w-0" },
        { value: "w-px", label: "w-px" },
        { value: "w-0.5", label: "0.5" },
        { value: "w-1", label: "1" },
        { value: "w-1.5", label: "1.5" },
        { value: "w-2", label: "2" },
        { value: "w-2.5", label: "2.5" },
        { value: "w-3", label: "3" },
        { value: "w-3.5", label: "3.5" },
        { value: "w-4", label: "4" },
        { value: "w-5", label: "5" },
        { value: "w-6", label: "6" },
        { value: "w-7", label: "7" },
        { value: "w-8", label: "8" },
        { value: "w-9", label: "9" },
        { value: "w-10", label: "10" },
        { value: "w-11", label: "11" },
        { value: "w-12", label: "12" },
        { value: "w-14", label: "14" },
        { value: "w-16", label: "16" },
        { value: "w-20", label: "20" },
        { value: "w-24", label: "24" },
        { value: "w-28", label: "28" },
        { value: "w-32", label: "32" },
        { value: "w-36", label: "36" },
        { value: "w-40", label: "40" },
        { value: "w-44", label: "44" },
        { value: "w-48", label: "48" },
        { value: "w-52", label: "52" },
        { value: "w-56", label: "56" },
        { value: "w-60", label: "60" },
        { value: "w-64", label: "64" },
        { value: "w-72", label: "72" },
        { value: "w-80", label: "80" },
        { value: "w-96", label: "96" },
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
      SavePage(state, root.toString());
    },
    HeightInputChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const heightValue = action.payload;

      const HeightOptions = [
        { value: "h-auto", label: "auto" },
        { value: "h-0", label: "h-0" },
        { value: "h-px", label: "h-px" },
        { value: "h-0.5", label: "0.5" },
        { value: "h-1", label: "1" },
        { value: "h-1.5", label: "1.5" },
        { value: "h-2", label: "2" },
        { value: "h-2.5", label: "2.5" },
        { value: "h-3", label: "3" },
        { value: "h-3.5", label: "3.5" },
        { value: "h-4", label: "4" },
        { value: "h-5", label: "5" },
        { value: "h-6", label: "6" },
        { value: "h-7", label: "7" },
        { value: "h-8", label: "8" },
        { value: "h-9", label: "9" },
        { value: "h-10", label: "10" },
        { value: "h-11", label: "11" },
        { value: "h-12", label: "12" },
        { value: "h-14", label: "14" },
        { value: "h-16", label: "16" },
        { value: "h-20", label: "20" },
        { value: "h-24", label: "24" },
        { value: "h-28", label: "28" },
        { value: "h-32", label: "32" },
        { value: "h-36", label: "36" },
        { value: "h-40", label: "40" },
        { value: "h-44", label: "44" },
        { value: "h-48", label: "48" },
        { value: "h-52", label: "52" },
        { value: "h-56", label: "56" },
        { value: "h-60", label: "60" },
        { value: "h-64", label: "64" },
        { value: "h-72", label: "72" },
        { value: "h-80", label: "80" },
        { value: "h-96", label: "96" },
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
        { value: "h-screen", label: "screen" },
        { value: "h-min", label: "min" },
        { value: "h-max", label: "max" },
        { value: "h-fit", label: "fit" },
      ];

      // default remove , max-h-full
      targetNode.classList.remove("");
      targetNode.classList.remove("max-h-full");

      HeightOptions.forEach((option) => {
        targetNode.classList.remove(option.value);
      });

      if (state.currentFocus !== "#main") {
        targetNode.classList.add(`${heightValue}`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AspectRatioInputChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const aspectRatioValue = action.payload;

      const updateAspectRatio = (style, aspect) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("aspect-ratio:")))
          .concat(`aspect-ratio: ${aspect};`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateAspectRatio(currentStyle, aspectRatioValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `aspect-ratio: ${aspectRatioValue};`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    dndUpdate: (state, action) => {
      countElements(state);
      state.value = action.payload;
      root = parse(state.value);
      SavePage(state, root.toString());
    },
    updateValue: (state, action) => {
      countElements(state);
      state.value = action.payload;
      root = parse(state.value);
    },
    updatePageList: (state, action) => {
      countElements(state);
      state.ListPages = action.payload;
      console.log("updatePageList", state.ListPages);
    },
    updateActiveIndex: (state, action) => {
      countElements(state);
      state.IndexPages = action.payload;
      console.log("updateActiveIndex", state.IndexPages);
    },
    BackgroundColorChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const colorValue = action.payload;

      const updateBackgroundColor = (style, color) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter(
            (prop) => !(prop === "" || prop.startsWith("background-color:"))
          )
          .concat(`background-color: ${color};`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateBackgroundColor(currentStyle, colorValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `background-color: ${colorValue};`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    BackgroundColorOpacityChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      let opacityValue = action.payload;

      if (opacityValue <= 9) {
        opacityValue = "0" + opacityValue;
      }

      const opacity = (opacityValue / 100) * 255;
      const hexOpacity = opacity.toString(16).toUpperCase();
      const hexOpacity2 = hexOpacity.split(".")[0];

      // Function to update the background color opacity property in the style attribute
      const updateBackgroundOpacity = (style, opacity) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        let updatedStyleArray = [];

        for (let i = 0; i < styleArray.length; i++) {
          const prop = styleArray[i];
          if (prop.startsWith("background-color:")) {
            // If the style property is background-color, retain the first 6 characters and append new opacity
            const existingColor = prop.replace("background-color:", "").trim();
            const existingColorWithoutAlpha = existingColor.slice(0, 7);
            updatedStyleArray.push(
              `background-color: ${existingColorWithoutAlpha}${hexOpacity2}`
            );
          } else {
            updatedStyleArray.push(prop);
          }
        }

        return updatedStyleArray.join("; ");
      };

      // Check if the target node already has a style attribute
      if (targetNode.attributes.style) {
        // If style attribute exists, update the background opacity property
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateBackgroundOpacity(currentStyle, hexOpacity2);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        // If style attribute doesn't exist, add the background opacity property
        targetNode.setAttribute("style", `background-color: #${hexOpacity2};`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    FontFamilyChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const fontValue = action.payload;
      const fontOptions = [
        { value: "font-sans", label: "Sans" },
        { value: "font-serif", label: "Serif" },
        { value: "font-mono", label: "Mono" },
        { value: "font-roboto", label: "Roboto" },
        { value: "font-kanit", label: "Kanit" },
        { value: "font-prompt", label: "Prompt" },
        { value: "font-chakra-petch", label: "Chakra-Petch" },
        { value: "font-sarabun", label: "Sarabun" },
        { value: "font-noto-sans-thai", label: "Noto-Sans-Thai" },
        { value: "font-mitr", label: "Mitr" },
        { value: "font-taviraj", label: "Taviraj" },
        { value: "font-itim", label: "Itim" },
        { value: "font-pridi", label: "Pridi" },
        { value: "font-sriracha", label: "Sriracha" },
        { value: "font-bai-jamjuree", label: "Bai-Jamjuree" },
        { value: "font-krub", label: "Krub" },
        { value: "font-niramit", label: "Niramit" },
        { value: "font-mali", label: "Mali" },
        { value: "font-athiti", label: "Athiti" },
        { value: "font-charm", label: "Charm" },
        { value: "font-anuphan", label: "Anuphan" },
        { value: "font-k2d", label: "K2d" },
        { value: "font-pattaya", label: "Pattaya" },
        { value: "font-ibm-plex-sans-thai", label: "Ibm-Plex-Sans-Thai" },
        { value: "font-maitree", label: "Maitree" },
        { value: "font-chonburi", label: "Chonburi" },
        { value: "font-trirong", label: "Trirong" },
        { value: "font-thasadith", label: "Thasadith" },
        { value: "font-fahkwang", label: "Fahkwang" },
        { value: "font-koho", label: "Koho" },
        { value: "font-kodchasan", label: "Kodchasan" },
        { value: "font-noto-serif-thai", label: "Noto-Serif-Thai" },
        { value: "font-charmonman", label: "Charmonman" },
        {
          value: "font-ibm-plex-sans-thai-looped",
          label: "Ibm-Plex-Sans-Thai-Looped",
        },
        { value: "font-srisakdi", label: "Srisakdi" },
        {
          value: "font-noto-sans-thai-looped",
          label: "Noto-Sans-Thai-Looped",
        },
        { value: "font-Open-Sans", label: "Open-Sans" },
        { value: "font-Spectral", label: "Spectral" },
        { value: "font-Slabo-27px", label: "Slabo-27px" },
        { value: "font-Lato", label: "Lato" },
        { value: "font-Roboto-Condensed", label: "Roboto-Condensed" },
        { value: "font-Oswald", label: "Oswald" },
        { value: "font-Source-Sans-Pro", label: "Source-Sans-Pro" },
        { value: "font-Raleway", label: "Raleway" },
        { value: "font-Zilla-Slab", label: "Zilla-Slab" },
        { value: "font-Montserrat", label: "Montserrat" },
        { value: "font-PT-Sans", label: "PT-Sans" },
        { value: "font-Roboto-Slab", label: "Roboto-Slab" },
        { value: "font-Merriweather", label: "Merriweather" },
        { value: "font-Saira-Condensed", label: "Saira-Condensed" },
        { value: "font-Saira", label: "Saira" },
        { value: "font-Open-Sans-Condensed", label: "Open-Sans-Condensed" },
        { value: "font-Saira-Semi-Condensed", label: "Saira-Semi-Condensed" },
        { value: "font-Saira-Extra-Condensed", label: "Saira-Extra-Condensed" },
        { value: "font-Julee", label: "Julee" },
        { value: "font-Archivo", label: "Archivo" },
        { value: "font-Ubuntu", label: "Ubuntu" },
        { value: "font-Lora", label: "Lora" },
        { value: "font-Manuale", label: "Manuale" },
        { value: "font-Asap-Condensed", label: "Asap-Condensed" },
        { value: "font-Faustina", label: "Faustina" },
        { value: "font-Cairo", label: "Cairo" },
        { value: "font-Playfair-Display", label: "Playfair-Display" },
        { value: "font-Droid-Serif", label: "Droid-Serif" },
        { value: "font-Noto-Sans", label: "Noto-Sans" },
        { value: "font-PT-Serif", label: "PT-Serif" },
        { value: "font-Droid-Sans", label: "Droid-Sans" },
        { value: "font-Arimo", label: "Arimo" },
        { value: "font-Poppins", label: "Poppins" },
        { value: "font-Sedgwick-Ave-Display", label: "Sedgwick-Ave-Display" },
        { value: "font-Titillium-Web", label: "Titillium-Web" },
        { value: "font-Muli", label: "Muli" },
        { value: "font-Sedgwick-Ave", label: "Sedgwick-Ave" },
        { value: "font-Indie-Flower", label: "Indie-Flower" },
        { value: "font-Mada", label: "Mada" },
        { value: "font-PT-Sans-Narrow", label: "PT-Sans-Narrow" },
        { value: "font-Noto-Serif", label: "Noto-Serif" },
        { value: "font-Bitter", label: "Bitter" },
        { value: "font-Dosis", label: "Dosis" },
        { value: "font-Josefin-Sans", label: "Josefin-Sans" },
        { value: "font-Inconsolata", label: "Inconsolata" },
        { value: "font-Bowlby-One-SC", label: "Bowlby-One-SC" },
        { value: "font-Oxygen", label: "Oxygen" },
        { value: "font-Arvo", label: "Arvo" },
        { value: "font-Hind", label: "Hind" },
        { value: "font-Cabin", label: "Cabin" },
        { value: "font-Fjalla-One", label: "Fjalla-One" },
        { value: "font-Anton", label: "Anton" },
        { value: "font-Acme", label: "Acme" },
        { value: "font-Archivo-Narrow", label: "Archivo-Narrow" },
        { value: "font-Mukta-Vaani", label: "Mukta-Vaani" },
        { value: "font-Play", label: "Play" },
        { value: "font-Cuprum", label: "Cuprum" },
        { value: "font-Maven-Pro", label: "Maven-Pro" },
        { value: "font-EB-Garamond", label: "EB-Garamond" },
        { value: "font-Passion-One", label: "Passion-One" },
        { value: "font-Ropa-Sans", label: "Ropa-Sans" },
        { value: "font-Francois-One", label: "Francois-One" },
        { value: "font-Archivo-Black", label: "Archivo-Black" },
        { value: "font-Pathway-Gothic-One", label: "Pathway-Gothic-One" },
        { value: "font-Exo", label: "Exo" },
        { value: "font-Vollkorn", label: "Vollkorn" },
        { value: "font-Libre-Franklin", label: "Libre-Franklin" },
        { value: "font-Crete-Round", label: "Crete-Round" },
        { value: "font-Alegreya", label: "Alegreya" },
        { value: "font-PT-Sans-Caption", label: "PT-Sans-Caption" },
        { value: "font-Alegreya-Sans", label: "Alegreya-Sans" },
        { value: "font-Source-Code-Pro", label: "Source-Code-Pro" },
      ];

      fontOptions.forEach((option) => {
        targetNode.classList.remove(option.value);
      });

      if (state.currentFocus !== "#main") {
        targetNode.classList.add(`${fontValue}`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
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
      SavePage(state, root.toString());
    },
    TextColorChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const colorValue = action.payload;

      const updateTextColor = (style, color) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("color:")))
          .concat(`color: ${color};`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateTextColor(currentStyle, colorValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `color: ${colorValue};`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextStyleBold: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("font-bold", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextStyleItalic: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("italic", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextStyleUnderline: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("underline", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextStyleLineThrough: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("line-through", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextAlignLeft: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-left", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextAlignCenter: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-center", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextAlignRight: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-right", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    TextAlignJustify: (state) => {
      const targetNode = root.querySelector(state.currentFocus);
      targetNode.classList.toggle("text-justify", true);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    MaginTopChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updateMarginTop = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("margin-top:")))
          .concat(`margin-top: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateMarginTop(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `margin-top: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    MaginRightChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updateMarginRight = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("margin-right:")))
          .concat(`margin-right: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateMarginRight(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `margin-right: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    MaginBottomChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updateMarginBottom = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("margin-bottom:")))
          .concat(`margin-bottom: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateMarginBottom(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `margin-bottom: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    MaginLeftChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updateMarginLeft = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("margin-left:")))
          .concat(`margin-left: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateMarginLeft(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `margin-left: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    PaddingTopChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updatePaddingTop = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("padding-top:")))
          .concat(`padding-top: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingTop(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `padding-top: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    PaddingRightChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updatePaddingRight = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("padding-right:")))
          .concat(`padding-right: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingRight(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `padding-right: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    PaddingBottomChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updatePaddingBottom = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter(
            (prop) => !(prop === "" || prop.startsWith("padding-bottom:"))
          )
          .concat(`padding-bottom: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingBottom(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `padding-bottom: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    PaddingLeftChange: (state, action) => {
      const newValue = action.payload;
      const targetNode = root.querySelector(state.currentFocus);

      const updatePaddingLeft = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("padding-left:")))
          .concat(`padding-left: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingLeft(currentStyle, newValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `padding-left: ${newValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    BorderColorChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const colorValue = action.payload;

      const updateBorderColor = (style, color) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("border-color:")))
          .concat(`border-color: ${color};`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updateBorderColor(currentStyle, colorValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `border-color: ${colorValue};`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    BorderStyleChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const borderStyleValue = action.payload;

      const updatePaddingRight = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("border-style:")))
          .concat(`border-style: ${value};`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingRight(currentStyle, borderStyleValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `border-style: ${borderStyleValue};`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    BorderSizeChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const borderSizeValue = action.payload;

      const updatePaddingRight = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("border-width:")))
          .concat(`border-width: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingRight(currentStyle, borderSizeValue);
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute("style", `border-width: ${borderSizeValue}px;`);
      }

      state.value = root.toString();
      SavePage(state, root.toString());

      if (targetNode.getAttribute("style") === "border-width: px;") {
        console.log("remove border width");
        state.value = root.toString();
        SavePage(state, root.toString());
      }
    },
    BorderRadiusChange: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const borderRadiusValue = action.payload;

      const updatePaddingRight = (style, value) => {
        const styleArray = style.split(";").map((prop) => prop.trim());
        const updatedStyleArray = styleArray
          .filter((prop) => !(prop === "" || prop.startsWith("border-radius:")))
          .concat(`border-radius: ${value}px;`);
        return updatedStyleArray.join("; ");
      };

      if (targetNode.attributes.style) {
        const currentStyle = targetNode.attributes.style;
        const updatedStyle = updatePaddingRight(
          currentStyle,
          borderRadiusValue
        );
        targetNode.setAttribute("style", updatedStyle);
      } else {
        targetNode.setAttribute(
          "style",
          `border-radius: ${borderRadiusValue}px;`
        );
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditText: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newValue = action.payload;
      targetNode.set_content(newValue);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditSrc: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newSrc = action.payload;
      targetNode.setAttribute("src", newSrc);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditHref: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newHref = action.payload;
      targetNode.setAttribute("href", newHref);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditId: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newId = action.payload;
      targetNode.setAttribute("id", newId);
      targetNode.id = newId;
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditName: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newName = action.payload;
      targetNode.setAttribute("name", newName);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditPlaceholder: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newPlaceholder = action.payload;
      targetNode.setAttribute("placeholder", newPlaceholder);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    EditType: (state, action) => {
      const targetNode = root.querySelector(state.currentFocus);
      const newType = action.payload;
      targetNode.setAttribute("type", newType);
      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AddFunc: (state, action) => {
      const targetNode = root.querySelector(state.elementAction);
      const FuncValue = action.payload;
      console.log("AddFunc", FuncValue, targetNode, state.elementAction);

      const updateFunc = (onClickValue, newFunc) => {
        if (onClickValue) {
          const updatedOnClick = onClickValue.replace(/onClick={.*?}/, "");
          return `${updatedOnClick} onClick={${newFunc}}`;
        } else {
          return;
        }
      };

      if (targetNode.attributes.onClick) {
        const currentOnClick = targetNode.attributes.onClick;
        const updatedOnClick = updateFunc(currentOnClick, FuncValue);
        targetNode.setAttribute("onClick", updatedOnClick);
      } else {
        // targetNode.setAttribute("onClick", `${FuncValue}()`);
        targetNode.setAttribute(
          "onclick",
          `try{ ${FuncValue}(); }catch(e){ console.error('Error:', e); }`
        );
      }

      state.value = root.toString();
      SavePage(state, root.toString());
    },
    AddOptionsSelect: (state, action) => {
      countElements(state);
      const targetNode = root.querySelector(state.currentFocus);
      const optionValue = action.payload;
      console.log("AddOptionsSelect", optionValue, targetNode, state.currentFocus);

      const updateOptions = (targetNode, optionValue) => {
        if (targetNode.tagName === "SELECT") {
          targetNode.innerHTML += `<option id="option-${state.currentOptionNumber}" value="${optionValue}">${optionValue}</option>`;
        } else {
          console.error("Target element is not a SELECT");
        }
      };
      
      updateOptions(targetNode, optionValue);

      // Assuming root is a DOMParser instance
      state.value = root.toString();
      // Assuming SavePage is a function that handles saving the updated HTML content
      SavePage(state, root.toString());
    },
    deleteOption: (state, action) => {
      countElements(state);
      const targetNode = root.querySelector(state.currentFocus);
      const optionIdToDelete = action.payload;

      const deleteOption = (targetNode, optionIdToDelete) => {
        if (targetNode.tagName === "SELECT") {
          const optionToDelete = targetNode.querySelector(`#${optionIdToDelete}`);
          optionToDelete.remove();
        } else {
          console.error("Target element is not a SELECT");
        }
      };

      deleteOption(targetNode, optionIdToDelete);

      state.value = root.toString();
      SavePage(state, root.toString());
      countElements(state);
    },
    editOptionValue: (state, action) => {
      countElements(state);
      const targetNode = root.querySelector(state.currentFocus);
      const { optionIdToEdit, newOptionValue } = action.payload;
    
      const editOption = (targetNode, optionIdToEdit, newOptionValue) => {
        if (targetNode.tagName === "SELECT") {
          const optionToEdit = targetNode.querySelector(`#${optionIdToEdit}`);
          if (optionToEdit) {
            optionToEdit.setAttribute("value", newOptionValue);
          } else {
            console.error(`Option with id "${optionIdToEdit}" not found`);
          }
        } else {
          console.error("Target element is not a SELECT");
        }
      };
    
      editOption(targetNode, optionIdToEdit, newOptionValue);
    
      state.value = root.toString();
      SavePage(state, root.toString());
      countElements(state);
    },
    editOptionText: (state, action) => {
      countElements(state);
      const targetNode = root.querySelector(state.currentFocus);
      const { optionIdToEdit, newOptionText } = action.payload;
    
      const editOption = (targetNode, optionIdToEdit, newOptionText) => {
        if (targetNode.tagName === "SELECT") {
          const optionToEdit = targetNode.querySelector(`#${optionIdToEdit}`);
          if (optionToEdit) {
            optionToEdit.textContent = newOptionText;
          } else {
            console.error(`Option with id "${optionIdToEdit}" not found`);
          }
        } else {
          console.error("Target element is not a SELECT");
        }
      };
    
      editOption(targetNode, optionIdToEdit, newOptionText);
    
      state.value = root.toString();
      SavePage(state, root.toString());
      countElements(state);
    },
  },
});

export const {
  focus,
  focusElement,
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
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceEvenly,
  AlignHorizontalStretch,
  AlignVerticalTop,
  AlignVerticalBottom,
  AlignVerticalCenter,
  AlignVerticalBaseline,
  AlignVerticalStretch,
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
  MaginTopChange,
  MaginRightChange,
  MaginBottomChange,
  MaginLeftChange,
  PaddingTopChange,
  PaddingRightChange,
  PaddingBottomChange,
  PaddingLeftChange,
  BorderColorChange,
  BorderStyleChange,
  BorderSizeChange,
  BorderRadiusChange,
  updatePageList,
  updateActiveIndex,
  EditText,
  EditSrc,
  EditHref,
  EditId,
  EditName,
  EditPlaceholder,
  EditType,
  AspectRatioInputChange,
  AddFunc,
  addElementAction,
  dndUpdate,
  AddOptionsSelect,
  deleteOption,
  editOptionValue,
  editOptionText,
} = counterSlice.actions;

export default counterSlice.reducer;
