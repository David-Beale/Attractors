import styled from "styled-components";
import { IconButton } from "@material-ui/core";

const topShadow = "#1c1d1f";
const bottomShadow = "#18838A";
const bottomShadowEnabled = "#1FB143";
const blue = "rgb(24, 235, 254)";

export const Container = styled.div`
  width: 400px;
  padding: 60px 25px 0 25px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${blue};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
export const TopContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 5px;
`;
export const SubContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px ${blue};
  height: 70px;
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ButtonsOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  padding: 0px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px ${blue};
  height: 315px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

export const StyledIconButton = styled(IconButton)`
  color: ${blue};
  font-size: 1.2rem;
  font-weight: 600;
  height: 50px;
  width: 50px;
  margin: 10px;
  box-shadow: ${(props) =>
    props.enabled
      ? `inset -4px -4px 8px ${bottomShadow}, inset 8px 8px 16px ${topShadow}`
      : `-6px -6px 10px ${bottomShadow}, 6px 6px 10px ${topShadow}`};
`;

export const StyledIconButtonTop = styled(IconButton)`
  margin: 0 10px;
  color: black;
  height: 45px;
  width: 45px;
  box-shadow: ${(props) =>
    props.enabled
      ? `inset -4px -4px 8px ${topShadow}, inset 8px 8px 16px ${bottomShadow}`
      : `-6px -6px 10px ${topShadow}, 6px 6px 10px ${bottomShadow}`};
`;
