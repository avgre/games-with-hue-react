import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './button.js';
import { connect } from 'react-redux';
import { ReactComponent as Check } from '../images/check.svg';
import { ReactComponent as Cross } from '../images/cross.svg';

function Info(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState('');
  const handleSubmit = (evt) => {
    console.log('Submitting User' + user);
    props.dispatch({
      type: 'SET_USER',
      payload: user,
    });
  };
  const chooseStep = (clicked, open) => {
    if (props.connected === true) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <Span>{props.user}</Span>
          <StatusFlex>
            <StyledCheck />
            <Status>Lights Connected</Status>
            <TipSpan> Tip: Copy/save token for next time</TipSpan>
          </StatusFlex>
        </>
      );
    } else if (clicked) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <Span>Press the bridge button then click Generate.</Span>
          <GenerateNew>
            <Button
              onClick={props.create}
              color={'hsl(112deg 39% 45%)'}
              bg1={'112deg 39% 16%'}
              bg2={'112deg 39% 32%'}
            >
              GENERATE
            </Button>
          </GenerateNew>
        </>
      );
    } else if (open) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <form onSubmit={handleSubmit}>
            <label>
              <Text
                type="text"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                name="Auth Token"
              />
            </label>
            <Connect>
              <Button
                onclick={handleSubmit}
                color={'hsl(112deg 39% 45%)'}
                bg1={'112deg 39% 16%'}
                bg2={'112deg 39% 32%'}
              >
                CONNECT
              </Button>
            </Connect>
          </form>
        </>
      );
    } else if (!clicked) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <Flex>
            <GenerateNew>
              <Button
                onClick={setIsClicked}
                color={'hsl(112deg 39% 45%)'}
                bg1={'112deg 39% 16%'}
                bg2={'112deg 39% 32%'}
              >
                GENERATE NEW TOKEN
              </Button>
            </GenerateNew>
            <GenerateExisting>
              <Existing onClick={setIsOpen}>Use existing token</Existing>
            </GenerateExisting>
          </Flex>
        </>
      );
    }
  };
  const chooseStatus = (ip) => {
    if (ip) {
      return (
        <StatusFlex>
          <StyledCheck />
          <Status>Bridge detected</Status>
        </StatusFlex>
      );
    } else {
      return (
        <StatusFlex>
          <StyledCross />
          <Status>No Bridge Found</Status>
        </StatusFlex>
      );
    }
  };

  return (
    <InfoFlex>
      <InfoIP>
        <Title>IP Address:</Title>
        <Span>{props.ip}</Span>
        {chooseStatus(props.ip)}
      </InfoIP>
      <InfoAuth>{chooseStep(isClicked, isOpen)}</InfoAuth>
    </InfoFlex>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.hubUsername,
    lights: state.lights,
    connected: state.connected,
  };
};

export default connect(mapStateToProps)(Info);

const InfoFlex = styled('div')`
  flex: 0 0 100%;
  margin-top: 40px;
  padding-bottom: 40px;
  height: auto;
  background: #322290;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  @media (max-width: 768px) {
    margin: 5%;
    flex: 0 0 90%;
    flex-direction: column;
  }
`;

const InfoIP = styled('div')`
  flex: 0 0 20%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const InfoAuth = styled('div')`
  flex: 0 0 65%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const GenerateNew = styled.div`
  width: auto;
  margin-top: 20px;
`;
const GenerateExisting = styled.div`
  width: auto;
  margin-left: 20px;
  align-self: center;
  margin-top: 20px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const StatusFlex = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
`;

const Existing = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
`;
const Span = styled.span`
  margin-top: 20px;
  font-weight: 500;
`;
const TipSpan = styled.span`
  margin-left: 20px;
  font-size: 0.8rem;
`;
const Status = styled.span`
  font-size: 0.8rem;
`;
const Title = styled.span`
  margin-top: 40px;
  font-size: 1.2rem;
`;

const StyledCheck = styled(Check)`
  margin-right: 5px;
`;
const StyledCross = styled(Cross)`
  margin-right: 5px;
`;
const Text = styled.input`
  border: 0.6px solid #ffffff;
  box-sizing: border-box;
  border-radius: 5px;
  background: none;
  width: 100%;
  height: 25px;
  margin-top: 20px;
`;
const Connect = styled.div`
  width: 200px;
  margin-top: 20px;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
