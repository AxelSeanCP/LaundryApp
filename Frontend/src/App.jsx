import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "organizations",
    children: [
      {
        path: "login",
        element: <h1>Hello World</h1>,
      },
      {
        path: "register",
        element: <h1>Hello World</h1>,
      },
    ],
  },
  {
    path: "users",
    children: [
      {
        path: "login",
        element: <h1>Hello World</h1>,
      },
      {
        path: "register",
        element: <h1>Hello World</h1>,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Hello World</h1>,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
