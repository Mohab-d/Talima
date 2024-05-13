import FolderIcon from "@mui/icons-material/Folder";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useState } from "react";

// Task folder is for feature update
const TaskFolder = (props: any) => {
  return (
    <div>
      <div className="flex flex-col pr-4 pl-4 bg-gray-800 rounded-lg shadow-lg size-48">
        <button
          className="flex grow justify-center items-center m-2 rounded-md hover:bg-gray-700"
          onClick={props.onFolderClick}
        >
          {props.content ? (
            <FolderIcon className="text-8xl text-cyan-600" />
          ) : (
            <FolderOutlinedIcon className="text-8xl text-cyan-600" />
          )}
        </button>
        <div className="flex p-3 justify-center items-center mb-0 w-full border-t-2 border-cyan-600">
          <label className="text-cyan-600 w-2/3 font-bold">{props.name}</label>
          <button
            onClick={props.onClick}
            className="text-gray-800 rounded-md text-lg w-1/3 bg-cyan-600 font-bold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFolder;
