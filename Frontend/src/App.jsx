import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PropType from "prop-types";

import OrganizationLogin from "./pages/Organizations/Login";
import OrganizationRegister from "./pages/Organizations/Register";

const PrivateRouteOrganization = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={"/organizations/login"} />;
};

PrivateRouteOrganization.propTypes = {
  children: PropType.node.isRequired,
};

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
        element: <OrganizationLogin />,
      },
      {
        path: "register",
        element: <OrganizationRegister />,
      },
      {
        path: "addUser",
        element: (
          <PrivateRouteOrganization>
            <h1>add user here</h1>
          </PrivateRouteOrganization>
        ),
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
        element: (
          <PrivateRouteOrganization>
            <h1>Hello World</h1>
          </PrivateRouteOrganization>
        ),
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
