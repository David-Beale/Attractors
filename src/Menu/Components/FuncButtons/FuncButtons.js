import React from "react";
import Button from "./Buttons/Button";

import { ButtonsOuterContainer, ButtonContainer } from "../../MenuStyle";
import { functions } from "./functions";

export default function FuncButtons({ func, setFunc, transition }) {
  return (
    <ButtonsOuterContainer>
      Attractors
      <ButtonContainer>
        {functions.map((item) => {
          return (
            <Button
              item={item}
              func={func}
              setFunc={setFunc}
              transition={transition}
            />
          );
        })}
      </ButtonContainer>
    </ButtonsOuterContainer>
  );
}
