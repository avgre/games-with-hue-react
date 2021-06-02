import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MenuBox from '../components/menuBox.js';
import Data from '../gameData';

const StyledGameMenu = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 100%;
  width: 100%;
  height: auto;
  min-height: 92vh;
  background-image: radial-gradient(#322290 1.05px, #5133a6 1.05px);
  background-size: 21px 21px;
`;

class GameMenu extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'SET_GAMES',
      payload: Data,
    });
    console.log(Data);
  }
  render() {
    let games = this.props.games;
    return (
      <StyledGameMenu>
        {games.map((game) => (
          <MenuBox game={game} />
        ))}
      </StyledGameMenu>
    );
  }
}

const mapStateToProps = (state) => {
  return { games: state.games };
};

export default connect(mapStateToProps)(GameMenu);
