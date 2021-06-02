import React from 'react';
import styled from 'styled-components';

const Switch = ({ id, toggled, onChange, color }) => {
  const isOn = (status) => {
    if (status) {
      return 'On';
    } else return 'Off';
  };
  return (
    <Flex>
      <SwitchInput
        className="switch-checkbox"
        type="checkbox"
        key={id}
        id={id}
        checked={toggled}
        onChange={onChange}
      />
      <SwitchLabel
        style={{
          '--color': color,
        }}
        className="switch-label"
        htmlFor={id}
      >
        <SwitchButton className="switch-button" />
      </SwitchLabel>
      <Label>{isOn(toggled)}</Label>
    </Flex>
  );
};

export default Switch;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 55px;
  height: 33px;
  border-radius: 100px;
  border: 2px solid;
  border-color: var(--color);
  position: relative;
`;

const SwitchButton = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 25px;
  height: 25px;
  border-radius: 33px;
  transition: 0.2s;
  background: #2196f3;
  ${SwitchInput}:checked + ${SwitchLabel} & {
    background: #53a147;
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
  ${SwitchLabel}:active & {
    width: 40px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.span`
  margin-left: 10px;
`;
