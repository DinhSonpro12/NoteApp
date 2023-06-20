import React, { useEffect, useState, useMemo } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";

import * as draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import {
  useLoaderData,
  useSubmit,
  useParams,
  useLocation,
} from "react-router-dom";

import { debounce } from "@mui/material";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Note() {
  const submit = useSubmit();
  const note = useLoaderData();
  const location = useLocation();
  const NoteID = useParams().NoteListID || null;
  const [rawHTML, setRawHTML] = useState(note.content);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  if (note.message == "Unauthorized") {
    getAuth().signOut();
    setMust(2);
    return <Navigate to={"/login"} />;
  }

  console.log("cc");
  useEffect(() => {
    // const blocksFromHTML = convertFromHTML(note.content);
    // const state = ContentState.createFromBlockArray(
    //   blocksFromHTML.contentBlocks,
    //   blocksFromHTML.entityMap
    // );
    // const x = EditorState.moveFocusToEnd(EditorState.createWithContent(state));

    // 11111111111111111111
    const lines = note.content.split("<p>").map((line) =>
      line
        .replace("</p>", "")
        .replace("\n", "")
        .replace(/&nbsp;/g, " ")
        .replace(";", "")
    );

    console.log("a", note.content);

    lines.shift();
    console.log("b", lines);

    const blockArray = lines.map((line, index) => ({
      key: String(index),
      text: line,
      type: "unstyled",
    }));

    console.log("c", blockArray);

    const rawContentState = {
      blocks: blockArray,
      entityMap: {},
    };
    console.log("d", rawContentState);

    const contentState = convertFromRaw(rawContentState);
    console.log("e", contentState);

    const x = EditorState.moveFocusToEnd(
      EditorState.createWithContent(contentState)
    );

    // is mind

    setEditorState(x);
  }, [NoteID]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note._id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  }, [rawHTML]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;
      // if (NoteID == false) return;
      // console.log("NoteID", NoteID);
      // console.log("note", note);

      submit(
        { noteID: note._id, content: rawHTML },
        {
          method: "patch",
          action: pathname,
        }
      );
    }, 1000);
  }, []);

  const handleOnChange = (newEditorState) => {
    const x =
      editorState.getCurrentContent() != newEditorState.getCurrentContent();
    // console.log(x);
    if (x) {
      setEditorState(newEditorState);
      setRawHTML(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
    }
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      preserveWhitespace={true}
      placeholder="Write something!"
      toolbar={{
        options: [
          "inline",
          "blockType",
          "list",
          "textAlign",
          "link",
          "emoji",
          "remove",
          "history",
        ],
        inline: {
          options: ["bold", "italic"],
        },
      }}
    />
  );
}
