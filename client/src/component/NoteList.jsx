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

export default function NoteList() {
  const nav = useNavigate();
  const submit = useSubmit();
  const NoteLists = useLoaderData();
  // console.log("NoteLists", NoteLists);

  const FolderID = useParams().FolderId || null;
  const NoteID = useParams().NoteListID || null;

  const [avtiveId, setActiveId] = useState();
  const { activeFolder, setActiveFolder } = useContext(Authcontext);

  useEffect(() => {
    if (NoteLists[0]) {
      if (NoteID) {
        if (
          NoteLists.find((x) => {
            return x._id == NoteID;
          })
        ) {
          if (NoteLists[0]) {
            setActiveId(NoteID);
          }
        } else nav("/error url notelist");
      } else if (NoteLists[0]._id == avtiveId) {
        nav(`notelist/${avtiveId}`);
      } else {
        setActiveId(NoteLists[0]._id);
      }
    } else {
      console.log("active", avtiveId);
      setActiveId(0);
      // nav(`/Folder/${FolderID}`);
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
    <div className="flex h-[536px] overflow-x-hidden">
      <div className=" flex h-[520px] justify-start items-center flex-col bg-[#ccc] rounded-lg my-2 pt-2 ">
        <h1>NoteList</h1>

        {/* add new note */}
        <button
          onClick={() => {
            handleAddNewNote();
            // setActiveId(null);
          }}
        >
          <NoteAddIcon />
        </button>

        {/* list NoteList */}
        <div className="overflow-hidden hover:overflow-y-auto w-[200px] mt-2">
          {NoteLists.map((NoteList, id) => {
            return (
              <div
                key={id}
                // to={`notelist/${NoteList._id}`}
                className={`rounded-xl h-[70px] w-[168px] m-4 p-5 mt-0 hover:cursor-pointer flex items-center justify-center relative  ${
                  NoteList._id === avtiveId ? `bg-orange-200` : `bg-white`
                }`}
                onClick={() => {
                  setActiveId(NoteList._id);
                }}
              >
                <p className="truncate">
                  {NoteList.content.split("</p>")[0].split("<p>")[1] ||
                    "No content"}
                </p>

                {/* delete icon */}
                <div
                  className="absolute top-0 left-0 w-5 h-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(NoteList._id);
                    // setActiveId(null);
                    console.log("333");
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
