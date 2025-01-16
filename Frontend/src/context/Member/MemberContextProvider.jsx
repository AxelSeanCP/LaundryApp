import PropType from "prop-types";
import { MemberContext } from "./MemberContext";
import { addMember as addMemberService } from "../../Services/memberService";

const MemberContextProvider = ({ children }) => {
  const addMember = async (credentials) => {
    await addMemberService(credentials);
  };

  const contextValue = {
    addMember,
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};

MemberContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default MemberContextProvider;
