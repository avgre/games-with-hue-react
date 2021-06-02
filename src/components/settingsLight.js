import React, { useState } from 'react';
import Toggle from './toggle.js';
import styled from 'styled-components';
import Button from './button.js';
import { connect } from 'react-redux';

function LightControl(props) {
  console.log(props.type);

  const [isClicked, setIsClicked] = useState(null);
  const handleChange = (event) => {
    props.onchange(event);
    props.dispatch({
      type: 'SET_PLAYLIGHT',
      payload: event,
    });
  };
  const chooseColor = (isOn) => {
    if (isOn) {
      return '#53a147';
    } else return '#2196f3';
  };
  const selectLight = (type, id, set) => {
    if (id === set) {
      return (
        <Button
          onClick={(e) => {
            setIsClicked(!isClicked);
            handleChange(props.id);
          }}
          color={'hsl(207deg 90% 54%)'}
          bg1={'207deg 100% 16%'}
          bg2={'207deg 100% 32%'}
        >
          CONNECTED
        </Button>
      );
    } else if (type === 'Extended color light' || type === 'Color light')
      return (
        <Button
          onClick={(e) => {
            setIsClicked(!isClicked);
            handleChange(props.id);
          }}
          color={'hsl(112deg 39% 45%)'}
          bg1={'112deg 39% 16%'}
          bg2={'112deg 39% 32%'}
        >
          CONNECT LIGHT
        </Button>
      );
    else return <span>Bulb not compatible</span>;
  };

  return (
    <Light>
      <Title>{props.name}</Title>
      {selectLight(props.type, props.id, props.setLight)}
      <ControlDiv>
        <StyledToggle>
          <Toggle
            id={'Switch' + props.id}
            toggled={props.isOn}
            onChange={(e) => {
              props.onToggleLight(props.id, props.isOn);
            }}
            color={chooseColor(props.isOn)}
          />
        </StyledToggle>
        <StyledInput>
          <Input
            id={'slider' + props.id}
            type="range"
            value={props.bri}
            min="0"
            max="256"
            step={10}
            onChange={(event) => {
              props.onBrightnessChanged(props.id, event.target.value);
            }}
          />
        </StyledInput>
      </ControlDiv>
    </Light>
  );
}
const mapStateToProps = (state) => {
  return {
    setLight: state.selectedLight,
  };
};

export default connect(mapStateToProps)(LightControl);

const Light = styled('div')`
  flex: 0 0 50%;
  max-width: 360px;
  height: 200px;
  background: #322290;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
  @media (max-width: 768px) {
    flex: 0 0 90%;
    margin: 5%;
  }
`;

const ControlDiv = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledInput = styled('div')`
  flex: 0 0 50%;
`;
const Input = styled('input')`
  margin-left: 0;
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(90deg, #c4c4c4 -0.41%, #ffc400 100%);
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  :-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
  :-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
`;
const StyledToggle = styled('div')`
  flex: 0 0 10%;
  height: 100%;
`;
const Title = styled.span`
  color: white;
  font-weight: 500;
`;
