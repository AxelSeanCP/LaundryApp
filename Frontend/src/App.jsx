import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Private Routes */
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

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
import MemberView from "./Pages/Members/MemberView";
import MemberDetail from "./Pages/Members/MemberDetail";
import EditMember from "./Pages/Members/EditMember";
import SearchMember from "./Pages/Members/SearchMember";

import AddService from "./Pages/Services/AddService";
import ServiceView from "./Pages/Services/ServiceView";
import ServiceDetail from "./Pages/Services/ServiceDetail";
import EditService from "./Pages/Services/EditService";

import AddOption from "./Pages/Options/AddOption";
import EditOption from "./Pages/Options/EditOption";
import OptionDetail from "./Pages/Options/OptionDetail";

import ChooseService from "./Pages/Transaction/ChooseServices";
import AddTransaction from "./Pages/Transaction/AddTransaction";
import TransactionView from "./Pages/Transaction/TransactionView";
import TransactionDetail from "./Pages/Transaction/TransactionDetail";
import StatusView from "./Pages/Transaction/StatusView";

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
          <PrivateRoute>
            <OrganizationDashboard />
          </PrivateRoute>
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
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
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
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
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
              <PrivateRoute>
                <MemberView />
              </PrivateRoute>
            ),
          },
          {
            path: "add",
            element: (
              <PrivateRoute>
                <AddMember />
              </PrivateRoute>
            ),
          },
          {
            path: ":memberId",
            element: (
              <PrivateRoute>
                <MemberDetail />
              </PrivateRoute>
            ),
          },
          {
            path: ":memberId/edit",
            element: (
              <PrivateRoute>
                <EditMember />
              </PrivateRoute>
            ),
          },
          {
            path: "search",
            element: <SearchMember />,
          },
        ],
      },
      {
        path: "services",
        children: [
          {
            path: "",
            element: (
              <PrivateRoute>
                <ServiceView />
              </PrivateRoute>
            ),
          },
          {
            path: "add",
            element: (
              <PrivateRoute>
                <AddService />
              </PrivateRoute>
            ),
          },
          {
            path: ":serviceId",
            element: (
              <PrivateRoute>
                <ServiceDetail />
              </PrivateRoute>
            ),
          },
          {
            path: ":serviceId/edit",
            element: (
              <PrivateRoute>
                <EditService />
              </PrivateRoute>
            ),
          },
          {
            path: ":serviceId/options",
            children: [
              {
                path: "add",
                element: (
                  <PrivateRoute>
                    <AddOption />
                  </PrivateRoute>
                ),
              },
              {
                path: ":optionId",
                element: (
                  <PrivateRoute>
                    <OptionDetail />
                  </PrivateRoute>
                ),
              },
              {
                path: ":optionId/edit",
                element: (
                  <PrivateRoute>
                    <EditOption />
                  </PrivateRoute>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "transactions",
        children: [
          {
            path: "",
            element: (
              <PrivateRoute>
                <ChooseService />
              </PrivateRoute>
            ),
          },
          {
            path: "add",
            element: (
              <PrivateRoute>
                <AddTransaction />
              </PrivateRoute>
            ),
          },
          {
            path: "list",
            element: (
              <PrivateRoute>
                <TransactionView />
              </PrivateRoute>
            ),
          },
          {
            path: "status",
            children: [
              {
                path: "",
                element: (
                  <PrivateRoute>
                    <StatusView />
                  </PrivateRoute>
                ),
              },
              {
                path: ":transactionId",
                element: (
                  <PrivateRoute>
                    <h1>Edit Transaction Status</h1>
                  </PrivateRoute>
                ),
              },
            ],
          },
          {
            path: ":transactionId",
            element: (
              <PrivateRoute>
                <TransactionDetail />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "reports",
        element: (
          <PrivateRoute>
            <h1>Reports</h1>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-slate-200">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
