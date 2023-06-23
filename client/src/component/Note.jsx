import React, { useEffect, useState, useMemo } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";

import { Modifier } from "draft-js";

import draftToHtml from "draftjs-to-html";
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

import { stateFromHTML } from "draft-js-import-html";

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

  useEffect(() => {
    // Solution 1
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    const x = EditorState.moveFocusToEnd(EditorState.createWithContent(state));
    setEditorState(x);
    // End Solution 1

    // Solution 2
    // const contentState = stateFromHTML(note.content);
    // const editorState = EditorState.moveFocusToEnd(
    //   EditorState.createWithContent(contentState)
    // );
    // setEditorState(editorState);
    //End Solution 2
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
    setEditorState(newEditorState);
    // const isSetRawHTML =
    //   editorState.getCurrentContent() !== newEditorState.getCurrentContent();

    if (
      editorState.getCurrentContent() !== newEditorState.getCurrentContent()
    ) {
      setRawHTML(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
    }
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      preserveWhitespace={true}
      placeholder="Write something!"
    />
  );
}
