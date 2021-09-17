import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Container = styled.div`
  width: 400px;
  height: 100vh;
  padding: 40px 25px 0 25px;
  background-color: #ecf0f3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.1rem;
  font-weight: 600;
  color: darkslategray;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  padding-top: 5px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px slategray;
`;
export const SectionSubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 5px;
`;

export const StyledIconButton = styled(IconButton)`
  font-size: 1.2rem;
  color: darkslategray;
  font-weight: 600;
  height: 50px;
  width: 50px;
  margin: 8px;
  box-shadow: ${(props) =>
    props.enabled
      ? "inset -4px -4px 8px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(0, 0, 0, 0.2)"
      : "-6px -6px 10px rgba(255, 255, 255, 0.7), 6px 6px 10px rgba(0, 0, 0, 0.3)"};
`;

export const ParametersOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px slategray;
  height: 315px;
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 5px;
`;
