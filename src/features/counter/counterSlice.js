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

export const hexToTailwindColor = (hexColor) => {
  const colorMap = {
    transparent: "#00000000",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
    },
    zinc: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0a0a0a",
    },
    stone: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
      950: "#0c0a09",
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006",
    },
    lime: {
      50: "#f7fee7",
      100: "#ecfccb",
      200: "#d9f99d",
      300: "#bef264",
      400: "#a3e635",
      500: "#84cc16",
      600: "#65a30d",
      700: "#4d7c0f",
      800: "#3f6212",
      900: "#365314",
      950: "#1a2e05",
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16",
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22",
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
      950: "#042f2e",
    },
    cyan: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
      950: "#083344",
    },
    sky: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49",
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b",
    },
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065",
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },
    fuchsia: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
      950: "#4a044e",
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
      950: "#500724",
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
      950: "#4c0519",
    },
  };

  // Function to calculate color difference
  function colorDifference(color1, color2) {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const diff = Math.sqrt(
      Math.pow(rgb2.r - rgb1.r, 2) +
        Math.pow(rgb2.g - rgb1.g, 2) +
        Math.pow(rgb2.b - rgb1.b, 2)
    );

    return diff;
  }

  // Find the nearest color
  let nearestColor = null;
  let minDifference = Number.MAX_SAFE_INTEGER;

  for (const key in colorMap) {
    let colorValue = colorMap[key];
    if (typeof colorValue !== "string") {
      for (const shade in colorValue) {
        const difference = colorDifference(hexColor, colorValue[shade]);
        if (difference < minDifference) {
          minDifference = difference;
          nearestColor = `${key}-${shade}`;
        }
      }
    } else {
      const difference = colorDifference(hexColor, colorValue);
      if (difference < minDifference) {
        minDifference = difference;
        nearestColor = key;
      }
    }
  }

  return nearestColor;
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

    const color = hexToTailwindColor(colorValue);

    targetNode.classList.add(`bg-${color}`);
    
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
} = counterSlice.actions;

export default counterSlice.reducer;
