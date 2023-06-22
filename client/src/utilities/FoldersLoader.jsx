import { NODE_SERVER } from "./contains";

export async function FoldersLoader() {
  const url = `${NODE_SERVER}/api/folder`;
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
    console.log(data);
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
    const url = `${NODE_SERVER}/api/folder/create`;
    const option = {
      method: "POST",
      body: JSON.stringify({
        name: formDataObj.name,
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
    const url = `${NODE_SERVER}/api/folder/${formDataObj.folderId}`;
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    let a = await fetch(url, option).then((res) => {
      console.log(res);
    });
    return null;
  } else if (request.method === "PATCH") {
    const url = `${NODE_SERVER}/api/folder/rename`;
    const option = {
      method: "PATCH",
      body: JSON.stringify({
        folderId: formDataObj.folderId,
        newName: formDataObj.newName,
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
