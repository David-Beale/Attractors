import styled from "styled-components";

export const ParameterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 5px;
  width: 105px;
`;

export const Input = styled.input`
  width: 80px;
  height: 40px;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 8px 15px;
  background-color: transparent;
  color: darkslategray;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
  font-weight: 700;
  font-size: 1rem;
  text-align: end;
`;
