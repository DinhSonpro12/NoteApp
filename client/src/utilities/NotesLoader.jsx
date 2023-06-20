export async function NotesLoader({ params }) {
  const slug = params.FolderId;
  const url = `http://localhost:8008/api/folder/${slug}`;
  // sửa lại lệnh fetch
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  try {
    var data = await fetch(url, option);
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
    const option = {
      method: "POST",
      body: JSON.stringify({
        content: formDataObj.content,
        folderId: formDataObj.folderId,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    let a = await fetch(url, option);
    return null;
  } else if (request.method === "DELETE") {
    console.log("DELETE");
    const url = `http://localhost:8008/api/note/${formDataObj.noteId}`;
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    let a = await fetch(url, option);
    return null;
  }

  return null;
};
