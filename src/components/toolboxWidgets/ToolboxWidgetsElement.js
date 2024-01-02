const ToolboxWidgetsElement = (props) => {
  return (
    <div className="flex flex-row w-12/12 h-12/12">
      <div className="flex flex-col items-center w-6/12 h-3/12 my-3">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={props.onClick1}
        >
          {props.ElementIcon1}
          <p className="text-lg mt-1">{props.ElementName1}</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-6/12 h-3/12 my-3">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={props.onClick2}
        >
          {props.ElementIcon2}
          <p className="text-lg mt-1">{props.ElementName2}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolboxWidgetsElement;
