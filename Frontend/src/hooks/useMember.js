import { useContext } from "react";
import { MemberContext } from "../Context/Member/MemberContext";

const useMember = () => useContext(MemberContext);

export default useMember;
