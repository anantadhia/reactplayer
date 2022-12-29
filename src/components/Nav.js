import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <NavContainer>
      <H1 libraryStatus={libraryStatus}>Tats Music Lib</H1>
      <Button onClick={() => setLibraryStatus(!libraryStatus)}>
        <span className="verticaltext">Library 山下 達郎 </span>
        {/* <FontAwesomeIcon icon={faMusic} /> */}
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
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
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
  &:active {
    background: #ba0000;
    color: white;
  }
  @media screen and (max-width: 768px) {
    position: fixed;
    margin-top: 250px;
    right: 30px;
  }
`;

export default Nav;
