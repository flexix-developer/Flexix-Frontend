import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
} from "../../features/counter/counterSlice";
import { parse } from "node-html-parser";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";

const PropertiesStyleTypography = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  const root = parse(counterState.value);

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

  const sizeOptions = [
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

  const getSelectedFontValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "font-sans";
    }

    const fontClasses = [
      "font-sans",
      "font-serif",
      "font-mono",
      "font-roboto",
      "font-kanit",
      "font-prompt",
      "font-chakra-petch",
      "font-sarabun",
      "font-noto-sans-thai",
      "font-mitr",
      "font-taviraj",
      "font-itim",
      "font-pridi",
      "font-sriracha",
      "font-bai-jamjuree",
      "font-krub",
      "font-niramit",
      "font-mali",
      "font-athiti",
      "font-charm",
      "font-anuphan",
      "font-k2d",
      "font-pattaya",
      "font-ibm-plex-sans-thai",
      "font-maitree",
      "font-chonburi",
      "font-trirong",
      "font-thasadith",
      "font-fahkwang",
      "font-koho",
      "font-kodchasan",
      "font-noto-serif-thai",
      "font-charmonman",
      "font-ibm-plex-sans-thai-looped",
      "font-srisakdi",
      "font-noto-sans-thai-looped",
      "font-Open-Sans",
      "font-Spectral",
      "font-Slabo-27px",
      "font-Lato",
      "font-Roboto-Condensed",
      "font-Oswald",
      "font-Source-Sans-Pro",
      "font-Raleway",
      "font-Zilla-Slab",
      "font-Montserrat",
      "font-PT-Sans",
      "font-Roboto-Slab",
      "font-Merriweather",
      "font-Saira-Condensed",
      "font-Saira",
      "font-Open-Sans-Condensed",
      "font-Saira-Semi-Condensed",
      "font-Saira-Extra-Condensed",
      "font-Julee",
      "font-Archivo",
      "font-Ubuntu",
      "font-Lora",
      "font-Manuale",
      "font-Asap-Condensed",
      "font-Faustina",
      "font-Cairo",
      "font-Playfair-Display",
      "font-Droid-Serif",
      "font-Noto-Sans",
      "font-PT-Serif",
      "font-Droid-Sans",
      "font-Arimo",
      "font-Poppins",
      "font-Sedgwick-Ave-Display",
      "font-Titillium-Web",
      "font-Muli",
      "font-Sedgwick-Ave",
      "font-Indie-Flower",
      "font-Mada",
      "font-PT-Sans-Narrow",
      "font-Noto-Serif",
      "font-Bitter",
      "font-Dosis",
      "font-Josefin-Sans",
      "font-Inconsolata",
      "font-Bowlby-One-SC",
      "font-Oxygen",
      "font-Arvo",
      "font-Hind",
      "font-Cabin",
      "font-Fjalla-One",
      "font-Anton",
      "font-Acme",
      "font-Archivo-Narrow",
      "font-Mukta-Vaani",
      "font-Play",
      "font-Cuprum",
      "font-Maven-Pro",
      "font-EB-Garamond",
      "font-Passion-One",
      "font-Ropa-Sans",
      "font-Francois-One",
      "font-Archivo-Black",
      "font-Pathway-Gothic-One",
      "font-Exo",
      "font-Vollkorn",
      "font-Libre-Franklin",
      "font-Crete-Round",
      "font-Alegreya",
      "font-PT-Sans-Caption",
      "font-Alegreya-Sans",
      "font-Source-Code-Pro",
    ];

    for (const fontClass of fontClasses) {
      if (targetNode.classList.contains(fontClass)) {
        return fontClass;
      }
    }

    return "";
  };

  const getSelectedFontSizeValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "text-base";
    }

    const fontSizeClasses = [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ];

    for (const fontSizeClass of fontSizeClasses) {
      if (targetNode.classList.contains(fontSizeClass)) {
        return fontSizeClass;
      }
    }

    return "";
  };

  const getSelectedTextColorValue = () => {
    const targetNode = root.querySelector(counterState.currentFocus);

    if (!targetNode) {
      return "#000000";
    }

    const targetNodeStyle = targetNode.getAttribute("style");

    if (!targetNodeStyle) {
      return "#000000";
    }

    const styleArray = targetNodeStyle.split(";");

    for (let i = 0; i < styleArray.length; i++) {
      const style = styleArray[i].split(":");

      if (style[0].trim() === "color") {
        return style[1].trim();
      }
    }

    return "#000000";
  };

  const handleFontChange = () => {
    let e = document.getElementsByClassName("FontInputChange")[0];
    const fontValue = e.value;
    dispatch(FontFamilyChange(fontValue));
  };

  const handleSizeChange = () => {
    let e = document.getElementsByClassName("SizeInputChange")[0];
    const sizeValue = e.value;
    dispatch(FontSizeChange(sizeValue));
  };

  const handleTextColorChange = (event) => {
    const textColor = event.target.value;
    dispatch(TextColorChange(textColor.toUpperCase()));
  };

  const isBold = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("font-bold");
  };

  const isItalic = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("italic");
  };

  const isUnderlined = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("underline");
  };

  const isStrikethrough = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("line-through");
  };

  const isTextAlignLeft = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-left");
  };

  const isTextAlignCenter = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-center");
  };

  const isTextAlignRight = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-right");
  };

  const isTextAlignJustify = () => {
    const targetNode = root.querySelector(counterState.currentFocus);
    return targetNode && targetNode.classList.contains("text-justify");
  };

  const handleTextStylesBold = () => {
    dispatch(TextStyleBold());
  };

  const handleTextStylesItalic = () => {
    dispatch(TextStyleItalic());
  };

  const handleTextStylesUnderline = () => {
    dispatch(TextStyleUnderline());
  };

  const handleTextStylesStrikethrough = () => {
    dispatch(TextStyleLineThrough());
  };

  const handleTextAlignLeft = () => {
    dispatch(TextAlignLeft());
  };

  const handleTextAlignCenter = () => {
    dispatch(TextAlignCenter());
  };

  const handleTextAlignRight = () => {
    dispatch(TextAlignRight());
  };

  const handleTextAlignJustify = () => {
    dispatch(TextAlignJustify());
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Font name</p>
        </div>
        <div className="w-7/12 text-black">
          <select
            className="FontInputChange"
            value={getSelectedFontValue()}
            onChange={handleFontChange}
          >
            {fontOptions
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((Option) => (
                <option key={Option.value} value={Option.value}>
                  {Option.label}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-5/12 pl-2">
          <p>Font size</p>
        </div>
        <div className="w-4/12 text-black">
          <select
            className="SizeInputChange"
            value={getSelectedFontSizeValue()}
            onChange={handleSizeChange}
          >
            {sizeOptions.map((Option) => (
              <option key={Option.value} value={Option.value}>
                {Option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start p-2 items-center">
        <div className="w-4/12 pl-2">
          <p>Text Color</p>
        </div>
        <div className="w-9/12 flex flex-row items-center ml-9">
          <div className="text-center mr-1 w-9 h-9">
            <input
              type="color"
              value={getSelectedTextColorValue().slice(0, 7)}
              onChange={handleTextColorChange}
              className="rounded-full border-1 border-neutral-600 bg-neutral-700 text-white text-center w-full h-full"
              placeholder="auto"
            />
          </div>
          <div className="w-/12 text-center ml-4 mr-4">
            <p
              contentEditable // Add contentEditable attribute
              onBlur={(e) => {
                const textColor = e.target.innerText.trim();
                dispatch(TextColorChange(textColor.toUpperCase()));
              }}
              style={{ color: "white" }}
              className="tooltip"
              title="Hex Color"
            >
              {getSelectedTextColorValue().slice(0, 7).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start pb-2 items-center">
        <div className="flex flex-row w-6/12 justify-between mx-2">
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextStylesBold}
            title="Bold"
          >
            {isBold() ? <MdFormatBold color="skyblue" /> : <MdFormatBold />}
          </div>
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextStylesItalic}
            title="Italic"
          >
            {isItalic() ? (
              <MdFormatItalic color="skyblue" />
            ) : (
              <MdFormatItalic />
            )}
          </div>
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextStylesUnderline}
            title="Underline"
          >
            {isUnderlined() ? (
              <MdFormatUnderlined color="skyblue" />
            ) : (
              <MdFormatUnderlined />
            )}
          </div>
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextStylesStrikethrough}
            title="Strikethrough"
          >
            {isStrikethrough() ? (
              <MdStrikethroughS color="skyblue" />
            ) : (
              <MdStrikethroughS />
            )}
          </div>
        </div>
        <div className="flex flex-row w-6/12 justify-between">
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextAlignLeft}
            title="Align Left"
          >
            {isTextAlignLeft() ? (
              <MdFormatAlignLeft color="skyblue" />
            ) : (
              <MdFormatAlignLeft />
            )}
          </div>
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextAlignCenter}
            title="Align Center"
          >
            {isTextAlignCenter() ? (
              <MdFormatAlignCenter color="skyblue" />
            ) : (
              <MdFormatAlignCenter />
            )}
          </div>
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextAlignRight}
            title="Align Right"
          >
            {isTextAlignRight() ? (
              <MdFormatAlignRight color="skyblue" />
            ) : (
              <MdFormatAlignRight />
            )}
          </div>
          <div
            className="rounded-sm border-2 border-neutral-600 bg-neutral-700 p-1 px-2 cursor-pointer tooltip"
            onClick={handleTextAlignJustify}
            title="Align Justify"
          >
            {isTextAlignJustify() ? (
              <MdFormatAlignJustify color="skyblue" />
            ) : (
              <MdFormatAlignJustify />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesStyleTypography;
