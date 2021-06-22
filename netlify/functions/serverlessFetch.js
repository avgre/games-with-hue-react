const fetch = require('isomorphic-fetch');

const handler = async (request, response) => {
  try {
    const response = await fetch(
      'https://api.meethue.com/v2/oauth2/authorize?client_id='+process.env.REACT_APP_CLIENT_ID+'&response_type=code&state=1209fwefwi33-1293r203rwe8h&appid=games_with_hue&deviceid=game_browser&devicename=GameBrowser'
    );
    let data = response.url;
    console.log("authurl = ", data)
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};

module.exports = { handler };

