import React from "react";

import { StyledIconButton } from "../../../MenuStyle";
import { Tooltip } from "@material-ui/core";

export default function Button({ item, func, setFunc, setWaiting }) {
  const onClick = () => {
    setFunc(item.id);
    setWaiting(true);
  };
  return (
    <Tooltip title={item.name}>
      <StyledIconButton enabled={func === item.id ? 1 : 0} onClick={onClick}>
        {item.tag}
      </StyledIconButton>
    </Tooltip>
  );
}
