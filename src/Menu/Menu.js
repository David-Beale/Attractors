import React, { useState, memo } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton/MenuButton";

import { Container } from "./MenuStyle";
import FuncButtons from "./Components/FuncButtons/FuncButtons";

export default memo(function Menu({ func, setFunc, transition }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Drawer variant="persistent" anchor="left" open={menuOpen}>
        <Container>
          <FuncButtons func={func} setFunc={setFunc} transition={transition} />
        </Container>
      </Drawer>
    </>
  );
});
