import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Button from './components/button';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex: 0 0 33%;
  max-width: 300px;
  height: 500px;
  padding: 20px;
  @media (max-width: 768px) {
    height: 450px;
  }
`;
const StyledBox = styled.div`
  align-items: center;
  justify-content: center;
`;
const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
const StyledImg = styled.img`
  border-radius: 20px;
  width: 300px;
  height: 250px;
  @media (max-width: 768px) {
    width: 250px;
    height: 200px;
  }
`;
const StyledText = styled.div`
  max-width: 100%;
`;
const StyledLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class MenuBox extends Component {
  handleClick = (evt) => {
    evt.preventDefault();
  };
  render() {
    return (
      <StyledWrapper>
        <StyledBox>
          <StyledImg src={this.props.game.img} />
        </StyledBox>
        <StyledTitle>{this.props.game.name}</StyledTitle>
        <StyledText>{this.props.game.desc}</StyledText>
        <StyledLink to={'/' + this.props.game.slug}>
          <Button
            color={'hsl(112deg 39% 45%)'}
            bg1={'112deg 39% 16%'}
            bg2={'112deg 39% 32%'}
            onClick={this.handleClick}
          >
            PLAY
          </Button>
        </StyledLink>
      </StyledWrapper>
    );
  }
}

export default withRouter(MenuBox);
