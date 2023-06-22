import { NODE_SERVER } from "./contains";

export async function NoteLoader({ params }) {
  const url = `${NODE_SERVER}/api/note/${params.NoteListID}`;

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
  if (data?.message) {
    return data;
  }

  return data[0];
}

export const HandleNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  if (request.method === "PATCH") {
    const url = `${NODE_SERVER}/api/note/update`;
    const option = {
      method: "PATCH",
      body: JSON.stringify({
        noteID: formDataObj.noteID,
        content: formDataObj.content,
      }),
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
