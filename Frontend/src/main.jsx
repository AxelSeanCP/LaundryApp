import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/Auth/AuthContextProvider.jsx";
import UserContextProvider from "./Context/User/UserContextProvider.jsx";
import MemberContextProvider from "./Context/Member/MemberContextProvider.jsx";
import ServiceContextProvider from "./Context/Service/ServiceContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <UserContextProvider>
      <MemberContextProvider>
        <ServiceContextProvider>
          <App />
        </ServiceContextProvider>
      </MemberContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
