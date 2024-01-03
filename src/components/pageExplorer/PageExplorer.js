import { IoMdFolderOpen } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";

const PageExplorer = () => {

    return (
        <div className="flex flex-col text-white ">
            <div className="bg-black  p-1 pl-3 flex items-center">
                <IoSearchOutline  className="text-gray-500" size={25} color="white"/>
                <input
                    type="text"
                    placeholder="search..."
                    className="bg-black p-2 ml-2 rounded-md focus:outline-none focus:border-blue-500 w-full text-white h-0.5"
                />
            </div>
        </div>  
    )

}

export default PageExplorer;