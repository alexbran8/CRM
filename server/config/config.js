
require('dotenv').config({ path: '../.env' });
/* 
 * create a `.env` file with environment variables in order to laod at runtime.
*/

const hostUrl = process.env.NODE_ENV === `development` ? "http://localhost:4000/auth/azure/redirect" :  'https://apps.gdceur.eecloud.dynamic.nsn-net.net/dashboard/auth/azure/redirect';
const baseLocation = process.env.NODE_ENV === `development` ? "" :  '/dashboard';



var config = {
  CLIENT_HOME_PAGE_URL: process.env.NODE_ENV === `development` ? "http://localhost:3000/#/" :  'https://apps.gdceur.eecloud.dynamic.nsn-net.net/dashboard/',
  CLIENT_ERROR_URL: process.env.NODE_ENV === `development` ? "http://localhost:3000/#/error" :  'https://apps.gdceur.eecloud.dynamic.nsn-net.net/dashboard/#/dashboard/error',
  azureApp: {
    // Azure Application details
    base: process.env.AAD_AUTH_URL,
    clientID: process.env.AAD_AUTH_CLIENTID,
    clientSecret: process.env.AAD_AUTH_CLIENTSECRET,
    callbackUri: hostUrl + '/auth/cbAdfs',
    resource: process.env.MS_GRAPH_URL,
    tenant: process.env.AAD_AUTH_TENANT
  },
  baseLocation: baseLocation,
  jwtSecret: process.env.APP_SESSION_SECRET || 'big Secret',
  cookieSettings: {
    maxAge: 360000
  },
  serverPort: process.env.PORT || 8080,
}

module.exports = config
