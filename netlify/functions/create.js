const fetch = require('isomorphic-fetch');
exports.handler = async (event) => {
  console.log('http://' + event.body + '/api/');
  try {
    const response = await fetch('http://' + event.body + '/api/', {
      method: 'POST',
      body: '{"devicetype":"games_with_hue#browser"}',
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    if (data[0].error) {
      console.log('NO CONNECTION', data);
      return {
        statusCode: 201,
        body: JSON.stringify(data),
      };
    }
    console.log('CONNECTED', data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
