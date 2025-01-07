import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import PropType from "prop-types";

/* Layouts */
import OrganizationLayout from "./Layouts/OrganizationLayout";
import UserLayout from "./Layouts/UserLayout";

/* Pages */
import LandingPage from "./Pages/LandingPage";
import OrganizationLogin from "./Pages/Organizations/Login";
import OrganizationRegister from "./Pages/Organizations/Register";
import UserLogin from "./Pages/Users/Login";
import UserRegister from "./Pages/Users/Register";

const PrivateRouteOrganization = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={"/organizations/login"} />;
};

PrivateRouteOrganization.propTypes = {
  children: PropType.node.isRequired,
};

const PrivateRouteUser = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={"/users/login"} />;
};

PrivateRouteUser.propTypes = {
  children: PropType.node.isRequired,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "organizations",
    element: <OrganizationLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRouteOrganization>
            <h1>Hello World</h1>
          </PrivateRouteOrganization>
        ),
      },
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
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRouteUser>
            <h1>Hello World</h1>
          </PrivateRouteUser>
        ),
      },
      {
        path: "login",
        element: <UserLogin />,
      },
      {
        path: "register",
        element: <UserRegister />,
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
