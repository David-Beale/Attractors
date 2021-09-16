import styled from "styled-components";

export const Icon = styled.div`
  width: 30px;
  height: 20px;
  position: fixed;
  top: 15px;
  right: 25px;
  z-index: 1201;
  cursor: pointer;

  span {
    background: ${({ open }) => (open ? "black" : "white")};
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: ${({ open }) => (open ? "8px" : "0px")};
    -webkit-transform: ${({ open }) => (open ? "rotate(135deg)" : "initial")};
    -moz-transform: ${({ open }) => (open ? "rotate(135deg)" : "initial")};
    -o-transform: ${({ open }) => (open ? "rotate(135deg)" : "initial")};
    transform: ${({ open }) => (open ? "rotate(135deg)" : "initial")};
  }

  span:nth-child(2) {
    top: 8px;
    opacity: ${({ open }) => (open ? "0" : "initial")};
    left: ${({ open }) => (open ? "-60px" : "0")};
  }

  span:nth-child(3) {
    top: ${({ open }) => (open ? "8px" : "16px")};
    -webkit-transform: ${({ open }) => (open ? "rotate(-135deg)" : "initial")};
    -moz-transform: ${({ open }) => (open ? "rotate(-135deg)" : "initial")};
    -o-transform: ${({ open }) => (open ? "rotate(-135deg)" : "initial")};
    transform: ${({ open }) => (open ? "rotate(-135deg)" : "initial")};
  }
`;
