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

    // TEST
    // const convertRawHTMLToDraftData = (rawHTML) => {
    //   const parser = new DOMParser();
    //   const parsedHTML = parser.parseFromString(rawHTML, "text/html");
    //   // console.log("parsedHTML", parsedHTML);

    //   const blocks = Array.from(parsedHTML.body.childNodes).map((node) => {
    //     let text = node.textContent;

    //     // Xử lý đặc biệt cho kí tự &nbsp;
    //     text = text.replace(/\&nbsp/g, " ");

    //     return {
    //       type: "unstyled",
    //       text,
    //       entityRanges: [],
    //       inlineStyleRanges: [],
    //     };
    //   });

    //   return {
    //     blocks,
    //     entityMap: {},
    //   };
    // };

    // // Chuyển đổi raw HTML thành dữ liệu Draft.js
    // const draftData = convertRawHTMLToDraftData(note.content);

    // const x = EditorState.moveFocusToEnd(
    //   EditorState.createWithContent(convertFromRaw(draftData))
    // );
    // TEST

    // console.log("ne: ", state);
    const x = EditorState.moveFocusToEnd(EditorState.createWithContent(state));
    setEditorState(x);
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
      if (note.content == false) return;

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
    console.log(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));

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
