import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { keyframes } from 'styled-components';
import { ReactComponent as Hub } from '../images/hub.svg';
import BulbOff from '../images/animation/bulbie-off.svg';
import BulbOn from '../images/animation/bulbie-on.svg';
// import LightControl from '../components/settingsLight.js';
import SettingsInfo from '../components/settingsInfo.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.requestFailed = false;
    this.state = {
      show: false,
      setLight: 1,
    };
    this.onToggleLight = this.onToggleLight.bind(this);
    this.onBrightnessChanged = this.onBrightnessChanged.bind(this);
    // this.fetchLights = this.fetchLights.bind(this);
  }
  chooseAnimation = () => {
    if (this.props.connected) {
      return (
        <AnimationDiv>
          <BulbieOn />
          <Hub />
        </AnimationDiv>
      );
    } else {
      return (
        <AnimationDiv>
          <BulbieOff />
          <Hub />
        </AnimationDiv>
      );
    }
  };
  getQueryStringParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
            let [key, value] = param.split('=');
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, ' '))
              : '';
            return params;
          }, {})
      : {};
  };
  componentDidMount() {
    // this.fetchIP();
    const code = this.getQueryStringParams(this.props.location.search);
    if (code.code){this.getNonce(code.code)}
    
  }

  getNonce = (data) => {
    if (data) {
      fetch('/.netlify/functions/getNonce', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
         this.getToken(json.nonce, json.authCodeUrl)
        });
      return;
    }
  };
  getToken = (nonce, url) => {
      fetch('/.netlify/functions/getToken', {
        method: 'POST',
        body: JSON.stringify({nonce,url}),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
      return;
  };

  // sendIP = (data) => {
  //   fetch('/.netlify/functions/create', {
  //     method: 'POST',
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json[0].error) {
  //         let error = json[0].error.description;
  //         console.log(error);
  //       } else if (json[0].success) {
  //         let username = json[0].success.username;
  //         console.log(username);
  //         this.props.dispatch({
  //           type: 'SET_USER',
  //           payload: username,
  //         });
  //         this.props.dispatch({
  //           type: 'SET_CONNECTED',
  //           payload: true,
  //         });
  //       } else console.log('error has occured');
  //     });
  // };

  authUser = () => {
    fetch('/.netlify/functions/serverlessFetch')
      .then((res) => res.json())
      .then((json) => {
        window.location.href = json;
      });
    return;
  };
  // fetchLights = async (ip) => {
  //   let response = await fetch(
  //     'https://' + ip + '/api/' + this.props.user + '/lights'
  //   );
  //   if (!response.ok) {
  //     throw new Error('Network request failed');
  //   } else if (response.ok) {
  //     let bridgeLights = await response.json();
  //     this.props.dispatch({
  //       type: 'SET_LIGHTS',
  //       payload: bridgeLights,
  //     });
  //     this.props.dispatch({
  //       type: 'SET_CONNECTED',
  //       payload: true,
  //     });
  //     this.setState({ newData: new Date() });
  //     this.requestFailed = false;
  //   } else console.log('light fetch error', response);
  // };

  // fetchIP = async () => {
  //   const response = await fetch('https://discovery.meethue.com/');
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   } else {
  //     const bridgeIP = await response.json();
  //     this.props.dispatch({
  //       type: 'SET_BRIDGE_IP',
  //       payload: bridgeIP[0].internalipaddress,
  //     });
  //     // this.fetchLights(bridgeIP[0].internalipaddress);
  //   }
  // };

  createUser = () => {
    // const hub = this.props.hubIp;
    // this.sendIP(hub);
    // this.fetchLights(this.props.hubIp);
    // this.setState({ newData: new Date() });
    // this.requestFailed = false;
  };

  changeLight = (id, bodyData) => {
    const url =
      'https://' +
      this.props.hubIp +
      '/api/' +
      this.props.user +
      '/lights/' +
      id +
      '/state';

    fetch(url, { method: 'PUT', body: bodyData })
      .then((response) => {
        console.log('changestate');
        if (!response.ok) {
          throw Error('Network request failed');
        }
        return response;
      })
      .then(
        (d) => {
          this.requestFailed = false;
          this.fetchLights(this.props.hubIp);
        },
        () => {
          this.requestFailed = true;
        }
      );
  };

  onToggleLight(id, isOn) {
    const body = '{"on":' + !isOn + '}';
    this.changeLight(id, body);
  }

  onBrightnessChanged(id, newValue) {
    const body = '{"bri":' + newValue + '}';
    this.changeLight(id, body);
  }
  showSpan = (connected) => {
    if (connected) {
      return <InfoSpan>Select a light to connect to the game</InfoSpan>;
    } else {
      return;
    }
  };
  render() {
    // const animation = this.chooseAnimation();
    // const toggleHandler = this.onToggleLight;
    // const brightnessHandler = this.onBrightnessChanged;
    // const onchange = (data) => {
    //   this.setState({ setLight: data });
    // };
    // const data = this.props.lights;
    // const lights = [];
    // if (this.props.lights.length === 1) {
    //   this.props.dispatch({
    //     type: 'SET_CONNECTED',
    //     payload: false,
    //   });
    // } else {
    //   Object.keys(data).forEach(function (id, index) {
    //     const item = data[id];
    //     const light = (
    //       <LightControl
    //         onchange={(e) => {
    //           onchange(e);
    //         }}
    //         key={id}
    //         id={id}
    //         name={data[id].name}
    //         isOn={item.state.on}
    //         bri={item.state.bri}
    //         onToggleLight={toggleHandler}
    //         onBrightnessChanged={brightnessHandler}
    //         type={item.type}
    //       />
    //     );
    //     lights.push(light);
    //   });
    // }
    const onPress = () => {
      this.getToken(this.state.nonce,this.state.authUrl);
    };
    return (
      <StyledSettings>
        <button onClick={onPress}>CLICK</button>
        {/* {animation} */}
        <SettingsFlex>
          <SettingsInfo
            user={this.props.user}
            ip={this.props.hubIp}
            step={this.state.step}
            create={this.authUser}
          />
          {/* {this.showSpan(this.props.connected)}
          <LightsFlex>{lights}</LightsFlex> */}
        </SettingsFlex>
      </StyledSettings>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hubIp: state.hubAddress,
    user: state.hubUsername,
    lights: state.lights,
    setLight: state.selectLight,
    connected: state.connected,
    authCode: state.authCode,
  };
};

export default connect(mapStateToProps)(Settings);

const jump = keyframes`
  from { background-position: 0px; }
  to { background-position: 800px; }
`;
const on = keyframes`
  from { background-position: 0px; }
  to { background-position: 500px; }
`;
const BulbieOff = styled('div')`
  z-index: 2;
  width: 100px;
  height: 160px;
  background-image: url(${BulbOff});
  animation: ${jump} 1.5s steps(8) infinite;
  position: absolute;
  left: 33%;
  bottom: 60%;
`;
const BulbieOn = styled('div')`
  z-index: 2;
  width: 100px;
  height: 160px;
  background-image: url(${BulbOn});
  animation: ${on} 1s steps(5) infinite;
  position: absolute;
  left: 33%;
  bottom: 60%;
`;

const AnimationDiv = styled('div')`
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  @media (max-width: 768px) {
    margin-top: 60px;
    transform: scale(0.75);
  }
`;

const StyledSettings = styled('div')`
  background: #512da8ff;
  z-index: 1;
  max-width: 100%;
  height: auto;
  min-height: 92vh;
  background-image: radial-gradient(#322290 1.05px, #5138a4 1.05px);
  background-size: 21px 21px;
  padding: 2vw calc((100vw - 800px) / 2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  color: white;
  box-sizing: border-box;
`;

const SettingsFlex = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
// const LightsFlex = styled('div')`
//   flex: 0 0 100%;
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   @media (max-width: 768px) {
//     justify-content: center;
//   }
// `;

const InfoSpan = styled.span`
  margin-top: 40px;
  flex: 0 0 100%;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    flex: 0 0 90%;
    margin: 5%auto;
  }
`;
