import { IoMdFolderOpen } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";

const PageExplorer = ({ pages, projectName }) => {
  console.log(pages);

  return (
    <div className="flex flex-col text-white ">
      <div className="bg-black  p-1 pl-3 flex items-center">
        <IoSearchOutline className="text-gray-500" size={25} color="white" />
        <input
          type="text"
          placeholder="search..."
          className="bg-black p-2 ml-2 rounded-md focus:outline-none focus:border-blue-500 w-full text-white h-0.5"
        />
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row ml-11 mt-2">
          <IoMdFolderOpen size={29} />
          <p className="pl-2 text-center text-xl">{projectName}</p>
        </div>
        {pages && pages.length > 0 ? (
          pages.map((page, index) => (
            <div key={index} className="flex flex-row ml-20 mt-2">
              <GrDocumentText size={22} />
              <p className="pl-2 text-center text-xl">{page}</p>
            </div>
          ))
        ) : (
          <p>No pages available</p>
        )}
      </div>
    </div>
  );
};

export default PageExplorer;
