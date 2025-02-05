import { useLocation } from "react-router-dom";
import { useState } from "react";

const AddTransaction = () => {
  const { state } = useLocation();
  const { memberId, options } = state;
  return (
    <div>
      <h1>{memberId}</h1>
      {options.map((option) => (
        <div key={option.serviceId}>
          <h1>{option.optionId}</h1>
          <h1>{option.qty}</h1>
        </div>
      ))}
    </div>
  );
};

export default AddTransaction;
