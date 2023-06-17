export async function FoldersLoader() {
  const url = "http://localhost:8008/api/folder";

  // cần query theo user id nữa

  // console.log("fetch GET ");

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

export const addNewFolder = async ({ params, request }) => {
  const newFolder = await request.formData();
  const formDataObj = {};
  newFolder.forEach((value, key) => (formDataObj[key] = value));

  if (request.method === "POST") {
    const url = "http://localhost:8008/api/folder/create";
    let a = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: formDataObj.name,
        authorId: formDataObj.authorId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return null;
  } else if (request.method === "DELETE") {
    console.log("DELETE");
    const url = `http://localhost:8008/api/folder/${formDataObj.folderId}`;
    let a = await fetch(url, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
    });
    return null;
  } else if (request.method === "PATCH") {
    const url = "http://localhost:8008/api/folder/rename";
    let a = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        folderId: formDataObj.folderId,
        newName: formDataObj.newName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return null;
  }

  return null;
};
