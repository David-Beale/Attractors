import { forwardRef } from "react";
import { Dialog, Zoom } from "@material-ui/core";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px;
  font-size: 1.2rem;
  color: crimson;
  font-weight: 700;
`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default function Error({ open, setOpen }) {
  const onClose = () => setOpen(false);

  return (
    <Dialog
      onClick={onClose}
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
    >
      <ErrorContainer>Error. Invalid Parameters</ErrorContainer>
    </Dialog>
  );
}
