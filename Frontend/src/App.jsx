import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Layouts */
import OrganizationLayout from "./Layouts/OrganizationLayout";
import UserLayout from "./Layouts/UserLayout";

/* Pages */
import LandingPage from "./Pages/LandingPage";
import OrganizationLogin from "./Pages/Organizations/Login";
import OrganizationRegister from "./Pages/Organizations/Register";
import OrganizationDashboard from "./Pages/Organizations/Dashboard";
import AddUser from "./Pages/Organizations/AddUser";
import UserLogin from "./Pages/Users/Login";
import UserDashboard from "./Pages/Users/Dashboard";

/* Private Routes */
import PrivateRouteOrganization from "./Components/PrivateRoute/PrivateRouteOrganization";
import PrivateRouteUser from "./Components/PrivateRoute/PrivateRouteUser";

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
            <OrganizationDashboard />
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
            <AddUser />
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
            <UserDashboard />
          </PrivateRouteUser>
        ),
      },
      {
        path: "login",
        element: <UserLogin />,
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
