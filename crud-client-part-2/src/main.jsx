import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserDetail from "./components/UserDetail.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/user/:id",
    //params tar mardome amra url teke single data niye taki
    loader: ({ params }) => fetch(`http://localhost:3000/user/${params.id}`),
    Component: UserDetail,
  },
  {
    path: "/update/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/user/${params.id}`),
    Component: UpdateUser,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
);
