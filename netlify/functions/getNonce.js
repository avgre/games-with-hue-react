
const fetch = require('isomorphic-fetch');

exports.handler = async (event) => {
  console.log(event.body)
  let authCodeUrl =
  `https://api.meethue.com/oauth2/token?grant_type=authorization_code&code=${event.body}`
  try {
    const response = await fetch(authCodeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response;
    let wwwAuth = data.headers.get('www-authenticate');
    let wwwAuthValues = {};
    wwwAuth.split(',').map((part) => {
      let match = part.match(/^\s?(.*)=\"(.*)\"/);
      if (match !== null) {
        wwwAuthValues[match[1]] = match[2];
      }
    });
    
    const nonce = wwwAuthValues.nonce;
    console.log("NONCE: ",nonce)
   return {
      statusCode: 200,
      body: JSON.stringify({nonce, authCodeUrl}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
