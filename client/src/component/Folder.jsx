import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import { useParams } from "react-router-dom";
import Add from "./Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Authcontext } from "../context/AuthProvider";

export default function Folder({ Folders }) {
  // const path = location.pathname.substring(1);
  const FolderId = useParams().FolderId || null;
  // add
  const { activeFolder, setActiveFolder } = useContext(Authcontext);

  const submit = useSubmit();
  const [activeId, setActiveId] = useState(FolderId);
  const [activeAdd, setActiveAdd] = useState(0);
  const [activeRename, setactiveRename] = useState(0);
  const [newName, setNewName] = useState("");

  const nav = useNavigate();

  // useEffect(() => {
  //   // nếu id_folder là không tồn tại trong database
  //   if (
  //     slug &&
  //     !Folders.find((x) => {
  //       return x._id == slug;
  //     })
  //   ) {
  //     nav("/error-path");
  //   }
  // }, [slug]);

  useEffect(() => {
    if (FolderId) {
      setActiveId(FolderId);
    } else if (Folders[0]) {
      if (
        Folders.find((x) => {
          return x._id == activeFolder;
        })
      )
        setActiveId(activeFolder);
      else setActiveId(Folders[0]._id);
    }
  }, [Folders]);

  useEffect(() => {
    if (activeId) {
      nav(`folder/${activeId}`);
    }
  }, [activeId]);

  function ReNameFolder(newName, folderId) {
    submit(
      {
        newName: newName,
        folderId: folderId,
      },
      { method: "patch", action: `/` }
    );
  }

  function handleRemove(folderId) {
    submit(
      {
        folderId: folderId,
      },
      { method: "delete", action: `/` }
    );
  }

  return (
    <div className="relative h-[520px] box-border flex justify-start items-center flex-col bg-[#001e3c] rounded-lg m-2 pt-2">
      <h1 className="text-[#cac46d] font-semibold my-5 select-none">Folder</h1>
      <div className="border-b-2 w-[80%]"></div>

      <button
        className="absolute top-3 right-2 text-[#d1c630]  hover:text-[#ffee09] hover:scale-110 rounded-lg border-[#4b77a7] border-[1px] border-solid p-[2px] transition 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        onClick={() => {
          setActiveAdd(true);
        }}
      >
        <CreateNewFolderIcon />
      </button>

      {activeAdd ? (
        <Add
          closeF={() => {
            setActiveAdd(false);
          }}
          setActiveId={() => {
            setActiveFolder(activeId);
            setActiveId(0);
          }}
        />
      ) : null}

      {/* list Folder */}
      <div className="overflow-hidden hover:overflow-y-auto w-full mt-2">
        {Folders.map((folder, id) => {
          return (
            <div
              key={id}
              className={`group rounded-xl w-[182px] h-[70px] m-4 p-5 mt-0  hover:cursor-pointer flex items-center justify-center relative ${
                folder._id == activeId ? `bg-orange-200` : `bg-white`
              } `}
              onClick={() => {
                setActiveId(folder._id);
              }}
              onDoubleClick={() => {
                setactiveRename(true);
              }}
            >
              <p className="select-none truncate font-semibold">
                {folder.name}

                {/* input Rename */}
                {activeRename && folder._id == activeId ? (
                  <input
                    autoFocus
                    value={newName}
                    onFocus={() => {
                      setNewName(folder.name);
                    }}
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    onBlur={() => {
                      setactiveRename(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        ReNameFolder(newName, folder._id);
                        setactiveRename(false);
                        // setActiveFolder(activeId);
                        setActiveId(0);
                      } else if (e.key === "Escape") {
                        setactiveRename(false);
                      }
                    }}
                    className="absolute top-1/2 left-1/2 w-[130px] transform -translate-x-1/2 -translate-y-1/2 pl-1"
                  />
                ) : null}
              </p>

              {/* delete icon */}
              <div
                className="absolute top-0 left-0 w-5 h-5 opacity-0 text-[#d13838] hover:scale-110 group-hover:opacity-100 transition duration-300 ease-in-out "
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(folder._id);
                  setActiveFolder(activeId);
                  setActiveId(0);
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
