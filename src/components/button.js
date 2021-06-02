import React, { Component } from 'react';
import styled from 'styled-components';

const Pushable = styled.button`
  font-family: 'Boogaloo', cursive;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  :hover {
    filter: brightness(110%);
    .front {
      transform: translateY(-6px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
    .shadow {
      transform: translateY(4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
  }
  :active {
    .front {
      transform: translateY(-2px);
      transition: transform 34ms;
    }
    .shadow {
      transform: translateY(1px);
      transition: transform 34ms;
    }
  }
  :focus:not(:focus-visible) {
    outline: none;
  }
`;
const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;
const Front = styled.span`
  display: block;
  position: relative;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1rem;
  color: white;
  background: var(--color);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;
const Edge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    hsl(var(--gradient1)) 0%,
    hsl(var(--gradient2)) 8%,
    hsl(var(--gradient2)) 92%,
    hsl(var(--gradient1)) 100%
  );
`;

class Button extends Component {
  render() {
    return (
      <Pushable onClick={this.props.onClick}>
        <Shadow className="shadow"></Shadow>
        <Edge
          style={{
            '--gradient1': this.props.bg1,
            '--gradient2': this.props.bg2,
          }}
          className="edge"
        ></Edge>
        <Front
          style={{
            '--color': this.props.color,
          }}
          className="front"
        >
          {this.props.children}
        </Front>
      </Pushable>
    );
  }
}
export default Button;

// inspired by Josh Comeau's blog here https://www.joshwcomeau.com/animation/3d-button/
