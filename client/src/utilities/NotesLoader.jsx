export async function NotesLoader({ params }) {
  const slug = params.FolderId;
  const url = `http://localhost:8008/api/folder/${slug}`;
  // sửa lại lệnh fetch
  const option = {
    method: "GET",
  };

  try {
    var data = await fetch(url);
    data = await data.json();
  } catch (error) {
    console.log(error);
  }

  return data;
}

export const addNewNote = async ({ params, request }) => {
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
  }

  return null;
};
