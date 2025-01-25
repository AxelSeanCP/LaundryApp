import PropType from "prop-types";
import { MemberContext } from "./MemberContext";
import {
  addMember as addMemberService,
  getMembers as getMembersService,
  getMemberById as getMemberByIdService,
  editMember as editMemberService,
  deleteMember as deleteMemberService,
} from "../../Services/memberService";

const MemberContextProvider = ({ children }) => {
  const addMember = async (credentials) => {
    return await addMemberService(credentials);
  };

  const getMembers = async (input) => {
    const members = await getMembersService(input);
    return members;
  };

  const getMemberById = async (id) => {
    const member = await getMemberByIdService(id);
    return member;
  };

  const editMember = async (id, credentials) => {
    await editMemberService(id, credentials);
  };

  const deleteMember = async (id) => {
    await deleteMemberService(id);
  };

  const contextValue = {
    addMember,
    getMembers,
    getMemberById,
    editMember,
    deleteMember,
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
