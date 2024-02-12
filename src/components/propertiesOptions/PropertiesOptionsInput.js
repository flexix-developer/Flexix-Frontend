const PropertiesOptionsInput = () => {

    const typeOptions = [
        { label: "Text", value: "text" },
        { label: "Password", value: "password" },
        { label: "Email", value: "email" },
        { label: "Number", value: "number" },
        { label: "Date", value: "date" },
        { label: "Time", value: "time" },
        { label: "URL", value: "url" },
        { label: "Search", value: "search" },
        { label: "Tel", value: "tel" },
    ];

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex flex-row w-full justify-start p-1 text-lg items-center">
        <div className="w-3/12 pl-1">
          <p>Type</p>
        </div>
        <div className="w-9/12 flex flex-row">
          <div className="w-12/12 text-black">
            <select
              className="typeInputChange"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
        <p>Name</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <input
          type="text"
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
        />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
        <p>Every input in a form needs a unique name describing what it get, e.g. “email”</p>
      </div>
      <div className="flex flex-row pl-2 pb-1 text-lg mt-2">
        <p>Placeholder</p>
      </div>
      <div className="flex flex-row pl-2 pb-1">
        <input
          type="text"
          className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
        />
      </div>
      <div className="flex flex-row pl-2 pb-1 text-xs w-full text-neutral-400">
        <p>Text to display when there is no value</p>
      </div>
    </div>
  );
};

export default PropertiesOptionsInput;
