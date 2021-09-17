import React from "react";
import { Input, ParameterContainer } from "./ParametersStyle";

export default function Param({ name, value, updateValue }) {
  const onChange = (e) => {
    const regex = /[^0-9.-]/gi;
    const newValue = e.target.value;
    if (newValue && regex.test(newValue)) {
      return;
    }
    updateValue(name, newValue);
  };

  return (
    <ParameterContainer>
      {name}
      <Input type="text" value={value} onChange={onChange} autoComplete="off" />
    </ParameterContainer>
  );
}
