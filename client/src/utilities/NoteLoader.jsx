export async function NoteLoader({ params }) {
  const url = `http://localhost:8008/api/note/${params.NoteListID}`;

  const option = {
    method: "GET",
  };

  try {
    var data = await fetch(url);
    data = await data.json();
  } catch (error) {
    console.log(error);
  }

  return data[0];
}

export const HandleNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  if (request.method === "POST") {
    const url = "http://localhost:8008/api/note/create";
    let a = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        content: formDataObj.content,
        folderId: formDataObj.folderId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return null;
  } else if (request.method === "DELETE") {
    console.log("DELETE");
    const url = `http://localhost:8008/api/note/${formDataObj.noteId}`;
    let a = await fetch(url, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
    });
    return null;
  } else if (request.method === "PATCH") {
    const url = "http://localhost:8008/api/note/update";
    // console.log("ne", JSON.stringify(formDataObj.content));
    let a = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        noteID: formDataObj.noteID,
        content: formDataObj.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return null;
  }

  return null;
};
