import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/Auth/AuthContextProvider.jsx";
import UserContextProvider from "./Context/User/UserContextProvider.jsx";
import MemberContextProvider from "./Context/Member/MemberContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <UserContextProvider>
      <MemberContextProvider>
        <App />
      </MemberContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
