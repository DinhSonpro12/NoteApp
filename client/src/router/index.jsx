import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../context/AuthProvider";
import Protected from "./Protected";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../component/NoteList";
import Note from "../component/Note";
import { FoldersLoader, addNewFolder } from "../utilities/foldersLoader";
import { NotesLoader, addNewNote } from "../utilities/NotesLoader";
import { NoteLoader, HandleNote } from "../utilities/NoteLoader";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <div id="container" className="font-sans">
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Protected />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: FoldersLoader,
            action: addNewFolder,
            children: [
              {
                children: [
                  {
                    element: <NoteList />,
                    path: "folder/:FolderId",
                    loader: NotesLoader,
                    action: addNewNote,
                    children: [
                      {
                        element: <Note />,
                        loader: NoteLoader,
                        action: HandleNote,
                        path: "noteList/:NoteListID",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
]);
