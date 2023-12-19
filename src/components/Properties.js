import PropertiesStyle from "./PropertiesStyle";

const Properties = () => {
    return (
        <div className="flex flex-col w-full h-full bg-neutral-700">
            <div className="flex flex-row justify-center rounded-2xl border-2 border-neutral-600 mx-8 my-2 bg-neutral-800 text-white w-12/12">
                <div className="flex flex-row w-4/12 justify-center p-1 cursor-pointer">
                    <p className="text-center">Options</p>
                </div>
                <div className="flex flex-row w-3/12 justify-center p-1 cursor-pointer">
                    <p className="text-center">Style</p>
                </div> 
                <div className="flex flex-row w-3/12 justify-center p-1 cursor-pointer">
                    <p className="text-center">Data</p>
                </div>
            </div>
            <div>
                <PropertiesStyle />
            </div>
        </div>
    );
};

export default Properties;
