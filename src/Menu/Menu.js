import React, { memo } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton/MenuButton";

import { Container, WaitContainer } from "./MenuStyle";
import FuncButtons from "./Components/FuncButtons/FuncButtons";
import Parameters from "./Components/Parameters/Parameters";

export default memo(function Menu({
  menuOpen,
  setMenuOpen,
  func,
  setFunc,
  parameters,
  onUpdateParameters,
  onResetParameters,
  waiting,
  setWaiting,
}) {
  return (
    <>
      <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Drawer variant="persistent" anchor="right" open={menuOpen}>
        <Container>
          <FuncButtons func={func} setFunc={setFunc} setWaiting={setWaiting} />
          {parameters && (
            <Parameters
              setWaiting={setWaiting}
              parameters={parameters}
              onUpdateParameters={onUpdateParameters}
              onResetParameters={onResetParameters}
            />
          )}
        </Container>
        {waiting && <WaitContainer />}
      </Drawer>
    </>
  );
});
