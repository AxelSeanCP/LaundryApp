import PropType from "prop-types";
import { MemberContext } from "./MemberContext";
import {
  addMember as addMemberService,
  getMembers as getMembersService,
  getMemberById as getMemberByIdService,
  editMember as editMemberService,
} from "../../Services/memberService";

const MemberContextProvider = ({ children }) => {
  const addMember = async (credentials) => {
    await addMemberService(credentials);
  };

  const getMembers = async () => {
    const members = await getMembersService();
    return members;
  };

  const getMemberById = async (id) => {
    const member = await getMemberByIdService(id);
    return member;
  };

  const editMember = async (id, credentials) => {
    await editMemberService(id, credentials);
  };

  const contextValue = {
    addMember,
    getMembers,
    getMemberById,
    editMember,
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
