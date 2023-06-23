import React, { useEffect, useState, useContext } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { Authcontext } from "../context/AuthProvider";
import moment from "moment";
import { useRef } from "react";

export default function NoteList() {
  const nav = useNavigate();
  const submit = useSubmit();
  const NoteLists = useLoaderData();

  const FolderID = useParams().FolderId || null;
  const NoteID = useParams().NoteListID || null;

  const [avtiveId, setActiveId] = useState();
  const { activeFolder, setActiveFolder } = useContext(Authcontext);

  const nameRef = useRef("");

  useEffect(() => {
    let isHaveNote = NoteLists.find((x) => {
      return x._id == NoteID;
    });

    if (NoteLists[0]) {
      if (NoteID) {
        if (isHaveNote) setActiveId(NoteID);
        else nav("/error url notelist");
      } else if (NoteLists[0]._id == avtiveId) {
        nav(`notelist/${avtiveId}`);
      } else {
        setActiveId(NoteLists[0]._id);
      }
    } else {
      setActiveId(0);
    }
  }, [NoteLists]);

  useEffect(() => {
    if (avtiveId) {
      nav(`notelist/${avtiveId}`);
    } else nav(`/Folder/${FolderID}`);
  }, [avtiveId]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId: FolderID,
      },
      { method: "post", action: `/folder/${FolderID}` }
    );
    setActiveFolder(FolderID);
  };

  function handleRemove(noteId) {
    submit(
      {
        noteId: noteId,
      },
      { method: "delete", action: `/folder/${FolderID}` }
    );

    setActiveFolder(FolderID);
  }

  return (
    <div className="flex h-[536px] pt-1 overflow-x-hidden">
      <div className=" flex relative h-[510px]  justify-start items-center flex-col bg-[#0c2d4e]  rounded-lg my-2 pt-2 ">
        <h1 className="text-[#cac46d] font-semibold my-5 select-none">
          NoteList
        </h1>
        <div className="border-b-2 w-[80%]"></div>

        {/* add new note */}
        <button
          className="absolute top-3 right-2 text-[#d1c630]  hover:text-[#ffee09] hover:scale-110  rounded-lg border-[#4b77a7] border-[1px] border-solid p-[2px] transition 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
          onClick={() => {
            handleAddNewNote();
            // setActiveId(null);
          }}
        >
          <NoteAddIcon />
        </button>

        {/* list NoteList */}
        <div className="overflow-hidden hover:overflow-y-auto w-[222px] mt-2">
          {NoteLists.map((NoteList, id) => {
            return (
              <div
                key={id}
                // to={`notelist/${NoteList._id}`}
                className={`group rounded-xl  w-[190px] h-[63px] m-4  mt-0 hover:cursor-pointer flex flex-col items-center justify-center relative  ${
                  NoteList._id === avtiveId ? `bg-orange-200` : `bg-white`
                }`}
                onClick={() => {
                  setActiveId(NoteList._id);
                }}
              >
                {console.log(
                  {
                    x: NoteList.content.split("</p>")[0] == "<p>",
                  },
                  NoteList.content.split("</p>")[0]
                )}
                {
                  <div
                    className="truncate w-full text-center select-none font-semibold"
                    // dangerouslySetInnerHTML={{
                    //   __html: `${
                    //     NoteList.content.split("</p>")[0].substring(0, 30) ||
                    //     "Empty"
                    //   }`,
                    // }}
                  >
                    {NoteList.content.split("</p>")[0].replace("<p>", "") == ""
                      ? "Empty"
                      : NoteList.content
                          .split("</p>")[0]
                          .substring(0, 30)
                          .replace("<p>", "")}
                  </div>
                }

                <p className="text-[11px] font-light text-[#000] select-none ">
                  {moment(NoteList.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>

                {/* delete icon */}
                <div
                  className="absolute top-0 left-0 w-5 h-5 opacity-0 hover:scale-110 group-hover:opacity-100 text-[#d13838] transition duration-300 ease-in-out "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(NoteList._id);
                    // setActiveId(null);
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white h-full pl-2 overflow-x-hidden overflow-scroll">
        {<Outlet />}
      </div>
    </div>
  );
}
