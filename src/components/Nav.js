import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <NavContainer>
      <H1 libraryStatus={libraryStatus}>Tats Music Lib</H1>
      <Button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </Button>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const H1 = styled.h1`
  transition: all 0.5s ease;

  @media screen and (max-width: 768px) {
    visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
    opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
    transition: all 0.5s ease;
  }
`;

const Button = styled.button`
  font-size: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background: transparent;
  border-radius: 10px;
  border: none;
  color: #4500ff;
  cursor: pointer;
  border: 2px solid #4500ff;
  padding: 0.6rem;
  transition: all 0.3s ease;
  &:hover {
    background: #4500ff;
    color: white;
  }
  @media screen and (max-width: 768px) {
    position: fixed;
    margin-top: 90px;
    right: -9px;
  }
`;

export default Nav;
