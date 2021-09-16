import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100vh;
  width: ${({ menuOpen }) => (menuOpen ? "calc(100vw - 400px) " : "100vw")};
  background-color: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
