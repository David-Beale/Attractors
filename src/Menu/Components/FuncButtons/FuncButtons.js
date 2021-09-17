import React from "react";
import Button from "./Buttons/Button";

import { SectionContainer, SectionSubContainer } from "../../MenuStyle";
import { functions } from "./functions";

export default function FuncButtons({ func, setFunc, transition }) {
  return (
    <SectionContainer>
      Attractors
      <SectionSubContainer>
        {functions.map((item) => {
          return (
            <Button
              key={item.tag}
              item={item}
              func={func}
              setFunc={setFunc}
              transition={transition}
            />
          );
        })}
      </SectionSubContainer>
    </SectionContainer>
  );
}
