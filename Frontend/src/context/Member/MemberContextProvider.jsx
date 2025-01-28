import PropType from "prop-types";
import { MemberContext } from "./MemberContext";
import {
  add,
  getAll,
  getById,
  update,
  remove,
} from "../../Services/memberService";

const MemberContextProvider = ({ children }) => {
  const addMember = async (memberData) => {
    return await add(memberData);
  };

  const getMembers = async (input) => {
    const members = await getAll(input);
    return members;
  };

  const getMemberById = async (id) => {
    const member = await getById(id);
    return member;
  };

  const editMember = async (id, credentials) => {
    return await update(id, credentials);
  };

  const deleteMember = async (id) => {
    await remove(id);
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
