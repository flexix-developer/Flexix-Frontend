import PropertiesStyleTypography from "../propertiesStyle/PropertiesStyleTypography";

const PropertiesOptionsText = () => {

    return (
        <div className="flex flex-col w-full p-2">
            <div className="flex flex-row pl-2 pb-1 text-lg">
                <p>Text</p>
            </div>
            <div className="flex flex-row pl-2 pb-1">
                <textarea className="w-11/12 p-1 pl-2 bg-neutral-700 rounded border-2 border-neutral-600 resize-none" placeholder="Enter some text ..." rows="6"></textarea>
            </div>
            <div>
                <PropertiesStyleTypography />
            </div>
        </div>
        )
}

export default PropertiesOptionsText;