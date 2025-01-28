import { OptionContext } from "../Context/Option/OptionContext";
import { useContext } from "react";

const useOption = () => useContext(OptionContext);

export default useOption;
