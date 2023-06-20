import { useState } from "react";
// import {
//   EditorState,
//   convertToRaw,
//   convertFromRaw,
//   ContentState,
//   convertFromHTML,
// } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

function App() {
  const [rawHTML, setRawHTML] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  console.log(rawHTML);

  const handleOnChange = (newEditorState) => {
    setEditorState(newEditorState);
    // console.log("editorState", editorState.getCurrentContent());
    // console.log("newEditorState", newEditorState.getCurrentContent());

    // console.log(
    //   editorState.getCurrentContent() == newEditorState.getCurrentContent()
    // );

    const x =
      editorState.getCurrentContent() != newEditorState.getCurrentContent();
    console.log(x);
    if (x) {
      setEditorState(newEditorState);
      setRawHTML(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
    }
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={handleOnChange}
        placeholder="Write something!"
      />
    </div>
  );
}

export default App;
