const Sequelize = require("sequelize");
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
    base: process.env.AAD_AUTH_URL || 'https://login.microsoftonline.com/',
    clientID: process.env.AAD_AUTH_CLIENTID || 'b654041a-e6b7-4e06-952c-9ff44a6bec1a',
    clientSecret: process.env.AAD_AUTH_CLIENTSECRET || 'xq~yzhdkK_a9SJwEJM~ZR..~2ar4-gPy29',
    callbackUri: hostUrl + '/auth/cbAdfs',
    resource: process.env.MS_GRAPH_URL || 'https://graph.microsoft.com/',
    tenant: process.env.AAD_AUTH_TENANT || '5d471751-9675-428d-917b-70f44f9630b0'
  },
  baseLocation: baseLocation,
  jwtSecret: process.env.APP_SESSION_SECRET || 'big Secret',
  cookieSettings: {
    maxAge: 360000
  },
  serverPort: process.env.PORT || 8080,
  db: new Sequelize("npt", "postgres", "fJdyP2Dyj@&6v!5hMM#VD", {
    host: "10.129.210.150",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }),
}

module.exports = config
