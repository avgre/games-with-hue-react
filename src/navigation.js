import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FlexLink = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 30%;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
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
`;

const StyledTitle = styled('div')`
  font-weight: 500;
  font-size: 30px;
  padding: 10px;
  margin-left: 20px;
`;
const StyledNavbar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  width: 100%;
  font-family: 'Boogaloo', cursive;
`;

function Navigation() {
  return (
    <StyledNavbar>
      <StyledTitle>GAMES WITH HUE</StyledTitle>
      <FlexLink>
        <StyledLink to={'/'}>HOME</StyledLink>
        <StyledLink to={'/'}>SETTINGS</StyledLink>
        <StyledLink to={'/'}>ABOUT</StyledLink>
      </FlexLink>
    </StyledNavbar>
  );
}

export default Navigation;
