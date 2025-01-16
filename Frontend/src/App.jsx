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
import AddMember from "./Pages/Members/AddMember";

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
      {
        path: "members",
        children: [
          {
            path: "",
            element: (
              <PrivateRouteUser>
                <h1>Members</h1>
              </PrivateRouteUser>
            ),
          },
          {
            path: "add",
            element: (
              <PrivateRouteUser>
                <AddMember />
              </PrivateRouteUser>
            ),
          },
          {
            path: ":memberId/edit",
            element: (
              <PrivateRouteUser>
                <h1>Edit Member</h1>
              </PrivateRouteUser>
            ),
          },
        ],
      },
      {
        path: "services",
        element: (
          <PrivateRouteUser>
            <h1>Services</h1>
          </PrivateRouteUser>
        ),
        children: [
          {
            path: "add",
            element: (
              <PrivateRouteUser>
                <h1>Add Service</h1>
              </PrivateRouteUser>
            ),
          },
          {
            path: ":serviceId/edit",
            element: (
              <PrivateRouteUser>
                <h1>Edit Service</h1>
              </PrivateRouteUser>
            ),
          },
          {
            path: ":serviceId/options",
            element: (
              <PrivateRouteUser>
                <h1>Service Options</h1>
              </PrivateRouteUser>
            ),
            children: [
              {
                path: "add",
                element: (
                  <PrivateRouteUser>
                    <h1>Add Service Option</h1>
                  </PrivateRouteUser>
                ),
              },
              {
                path: ":optionId/edit",
                element: (
                  <PrivateRouteUser>
                    <h1>Edit Service Option</h1>
                  </PrivateRouteUser>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "transactions",
        element: (
          <PrivateRouteUser>
            <h1>Transactions</h1>
          </PrivateRouteUser>
        ),
        children: [
          {
            path: "add",
            element: (
              <PrivateRouteUser>
                <h1>Add Transaction</h1>
              </PrivateRouteUser>
            ),
          },
          {
            path: "status",
            element: (
              <PrivateRouteUser>
                <h1>Transaction Status</h1>
              </PrivateRouteUser>
            ),
            children: [
              {
                path: "edit",
                element: (
                  <PrivateRouteUser>
                    <h1>Edit Transaction Status</h1>
                  </PrivateRouteUser>
                ),
              },
            ],
          },
          {
            path: ":transactionId/edit",
            element: (
              <PrivateRouteUser>
                <h1>Edit Transaction</h1>
              </PrivateRouteUser>
            ),
          },
        ],
      },
      {
        path: "reports",
        element: (
          <PrivateRouteUser>
            <h1>Reports</h1>
          </PrivateRouteUser>
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
