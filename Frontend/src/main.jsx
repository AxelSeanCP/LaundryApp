import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./Context/Auth/AuthContextProvider.jsx";
import UserContextProvider from "./Context/User/UserContextProvider.jsx";
import MemberContextProvider from "./Context/Member/MemberContextProvider.jsx";
import ServiceContextProvider from "./Context/Service/ServiceContextProvider.jsx";
import OptionContextProvider from "./Context/Option/OptionContextProvider.jsx";
import TransactionContextProvider from "./Context/Transaction/TransactionContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <UserContextProvider>
      <MemberContextProvider>
        <ServiceContextProvider>
          <OptionContextProvider>
            <TransactionContextProvider>
              <App />
            </TransactionContextProvider>
          </OptionContextProvider>
        </ServiceContextProvider>
      </MemberContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
