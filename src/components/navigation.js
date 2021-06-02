import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Navigation() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <StyledNavbar>
      <StyledTitle>GAMES WITH HUE</StyledTitle>
      <Toggle
        navbarOpen={navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {navbarOpen ? <StyledBurger open /> : <StyledBurger />}
      </Toggle>
      {navbarOpen ? (
        <Navbox>
          <StyledLink to={'/'}>HOME</StyledLink>
          <StyledLink to={'/'}>SETTINGS</StyledLink>
          <StyledLink to={'/'}>ABOUT</StyledLink>
        </Navbox>
      ) : (
        <Navbox open>
          <StyledLink to={'/'}>HOME</StyledLink>
          <StyledLink to={'/'}>SETTINGS</StyledLink>
          <StyledLink to={'/'}>ABOUT</StyledLink>
        </Navbox>
      )}
    </StyledNavbar>
  );
}

export default Navigation;

const StyledLink = styled(Link)`
  font-size: 1.25rem;
  padding: 10px;
  text-decoration: none;
  color: white;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StyledTitle = styled('span')`
  font-weight: 500;
  font-size: 2rem;
  padding: 10px;
  margin-left: 20px;
  white-space: nowrap;
`;
const StyledNavbar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  width: 100%;
  font-family: 'Boogaloo', cursive;
`;

const Navbox = styled.div`
  z-index: 5;
  display: flex;
  flex: 0 0 30%;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 92vh;
    top: 8vh;
    position: fixed;
    width: 100%;
    justify-content: flex-start;
    padding-top: 20px;
    background-image: radial-gradient(#5133a6 1.05px, #322290 1.05px);
    background-size: 21px 21px;
    transition: all 0.3s ease-in;
    left: ${(props) => (props.open ? '-100%' : '0')};
  }
`;

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 3vw;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const StyledBurger = styled.div`
  background-color: white;
  width: 30px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'inherit')};
  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #5133a6;
    content: '';
    position: absolute;
    transition: all 0.3s linear;
  }
  ::before {
    transform: ${(props) =>
      props.open ? 'rotate(-90deg) translate(-10px, 0px)' : 'rotate(0deg)'};
    top: -10px;
  }
  ::after {
    opacity: ${(props) => (props.open ? '0' : '1')};
    transform: ${(props) => (props.open ? 'rotate(90deg) ' : 'rotate(0deg)')};
    top: 10px;
  }
`;
