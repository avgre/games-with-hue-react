let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}
const fetch = require('isomorphic-fetch');

exports.handler = async (event) => {
let data = JSON.parse(event.body)
let authCodeUrl = data.url
try {
    const nonce = data.nonce;
    const realm = 'oauth2_client@api.meethue.com';
    const clientID = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_ID;
    
  // function getDigestResponse(realm, nonce, method, path) {
  
  //   let hashOne = crypto.createHash('md5').update(`${clientId}:${realm}:${clientSecret}`).digest('hex');
  //   let hashTwo = crypto.createHash('md5').update(`${method.toUpperCase()}:${path}`).digest('hex');
  //   let hash = crypto.createHash('md5').update(`${hashOne}:${nonce}:${hashTwo}`).digest('hex');
  //   console.log("HASH",hashOne,hashTwo, hash)

  //   if (!clientId) {
  //     console.log('clientId has not been provided, unable to build a digest response');
  //   }

  //   if (!clientSecret) {
  //     console.log('clientSecret has not been provided, unable to build a digest response');
  //   }

  //   return hash;
  // }

 

function hash(str, algorithm, outEncoding) {
    const hash = crypto.createHash(algorithm);
    hash.update(str);
    return hash.digest(outEncoding || 'base64');
}
function md5(str) {
  return hash(str, 'md5', 'hex');
}
const hash1 = md5(`${clientID}:${realm}:${clientSecret}`);
const hash2 = md5('POST:/oauth2/token')
const response = md5(`${hash1}:${nonce}:${hash2}`);
const authStr = `Digest username="${clientID}", realm="${realm}", nonce="${nonce}", uri="/oauth2/token", response="${response}"`;

  // function getAuthorizationHeaderDigest(realm, nonce, method, path) {
  //   const clientId = process.env.REACT_APP_CLIENT_ID;
  //   let response = getDigestResponse(realm, nonce, method, path);
  //   return `Digest username="${clientId}", realm="${realm}", nonce="${nonce}", uri="${path}", response="${response}"`;
  // }
  // let authHeader = getAuthorizationHeaderDigest(realm, nonce, method, path);


  console.log("HEADER: ", authHeader)
  const response = await fetch(authCodeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authStr
      },
    });
    const data2 = await response.json();
    console.log('RESPONSE: ', data2);
    return {
      statusCode: 200,
      body: JSON.stringify(data2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};




// let crypto;
// try {
//   crypto = require('crypto');
// } catch (err) {
//   console.log('crypto support is disabled!');
// }
// const fetch = require('isomorphic-fetch');

// exports.handler = async (event) => {
//   let authCodeUrl =
//     'https://api.meethue.com/v2/oauth2/token?grant_type=authorization_code&code=' +
//     JSON.stringify(event.body);
//   try {
//     const response = await fetch(authCodeUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });
//     const data = await response;
//     let wwwAuth = data.headers.get('www-authenticate');
//     let wwwAuthValues = {};
//     wwwAuth.split(',').map((part) => {
//       let match = part.match(/^\s?(.*)=\"(.*)\"/);
//       if (match !== null) {
//         wwwAuthValues[match[1]] = match[2];
//       }
//     });
//     const nonce = wwwAuthValues.nonce;
//     const realm = 'oauth2_client@api.meethue.com';
//     const path = '/oauth2/token';
//     const method = 'POST';
//     const clientIdentity = process.env.REACT_APP_CLIENT_ID;
//     const clientS =   process.env.REACT_APP_CLIENT_SECRET
  
  

//   function getDigestResponse(realm, nonce, method, path) {
//     const clientId = clientIdentity
//       , clientSecret = clientS
//       , hashOne = crypto.createHash('md5').update(`${clientId}:${realm}:${clientSecret}`).digest('hex')
//       , hashTwo = crypto.createHash('md5').update(`${method.toUpperCase()}:${path}`).digest('hex')
//       , hash = crypto.createHash('md5').update(`${hashOne}:${nonce}:${hashTwo}`).digest('hex');

//     if (!clientId) {
//       console.log('clientId has not been provided, unable to build a digest response');
//     }

//     if (!clientSecret) {
//       console.log('clientSecret has not been provided, unable to build a digest response');
//     }

//     return hash;
//   }

//   function getAuthorizationHeaderDigest(realm, nonce, method, path) {
//     const clientId = clientIdentity
//       , response = getDigestResponse(realm, nonce, method, path)
//     ;
//     return `Digest username="${clientId}", realm="${realm}", nonce="${nonce}", uri="${path}", response="${response}"`;
//   }
//   let authHeader = getAuthorizationHeaderDigest(realm, nonce, method, path);
//     const hash = crypto.createHash('md5');
    
//     hash
//       .update(
//         `${process.env.REACT_APP_CLIENT_ID}:${realm}:${process.env.REACT_APP_CLIENT_SECRET}`
//       )
//       .digest('hex');

//     const hash2 = crypto.createHash('md5');
//     hash2.update(`${method.toUpperCase()}:${path}`).digest('hex');
//     const authResponse = crypto
//       .createHash('md5')
//       .update(`${hash}:${nonce}:${hash2}`)
//       .digest('hex');
//     let authHeader = `Digest username="${process.env.REACT_APP_CLIENT_ID}", realm="${realm}", nonce="${nonce}", uri="${path}", response="${authResponse}"`;
//     console.log(authHeader);
//     const response2 = await fetch(authCodeUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': authHeader,
//       },
//     });
//     const data2 = await response2.json();
//     console.log('RESPONSE: ', data2);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(data2),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: error.message }),
//     };
//   }
// };
