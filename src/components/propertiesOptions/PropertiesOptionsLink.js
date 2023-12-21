import PropertiesStyleTypography from "../propertiesStyle/PropertiesStyleTypography";

const PropertiesOptionsLink = () => {
  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex flex-row pl-2 pb-1 text-lg">
        <p>Text</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <textarea
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600 resize-none"
          placeholder="Enter some text ..."
          rows="6"
        ></textarea>
      </div>
      <div>
        <PropertiesStyleTypography />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
        <p>Link URL</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <input
          type="text"
          placeholder="e.g. https://www.google.com"
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
        />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
        <p>Set this to make this whole block link somewhere</p>
      </div>
    </div>
  );
};

export default PropertiesOptionsLink;
