const PropertiesOptionsTextarea = () => {
    return (
        <div className="flex flex-col w-full p-2">
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
            <p>Default value</p>
          </div>
          <div className="flex flex-row pl-2 pb-1">
            <input
              type="text"
              className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600"
            />
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
}

export default PropertiesOptionsTextarea;