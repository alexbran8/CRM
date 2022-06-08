
require('dotenv').config({ path: '../.env' });
const nodemailer = require("nodemailer");
/* 
 * create a `.env` file with environment variables in order to laod at runtime.
add all url in env. :)
*/

const hostUrl = process.env.NODE_ENV === `development` ? "http://localhost:4000/auth/azure/redirect" :  process.env.HOST_URL;
const baseLocation = process.env.NODE_ENV === `development` ? "" :  '/dashboard';
var config = {
  CLIENT_HOME_PAGE_URL: process.env.NODE_ENV === `development` ? "http://localhost:3000/#/" :  process.env.HOST_URL,
  CLIENT_ERROR_URL: process.env.NODE_ENV === `development` ? "http://localhost:3000/#/error" :  process.env.HOST_URL + '/#/error',
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
 transporterConfig: nodemailer.createTransport({
    service: "SMTP",
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      //   user: "I_GDC_EUR_TM_IS@internal.nsn.com", // generated ethereal user
      user: "poweremail.ni_gsd_timisoara@nokia.com",
      pass: "WSrd9d79ZL359W", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
}


module.exports = config
