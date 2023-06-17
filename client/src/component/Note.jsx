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

export default function Note() {
  const submit = useSubmit();
  const note = useLoaderData();
  const location = useLocation();
  const NoteID = useParams().NoteListID || null;

  const [rawHTML, setRawHTML] = useState(note.content);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    console.log("ne: ", state);
    setEditorState(
      EditorState.moveFocusToEnd(EditorState.createWithContent(state))
    );
    // }, [note]);
  }, [NoteID]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note._id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  }, [rawHTML, location.pathname]);

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
    setRawHTML(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      preserveWhitespace={true}
    />
  );
}
