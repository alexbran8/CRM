const jwt = require('jsonwebtoken')
const db = require("../models");
function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

module.exports = async function  (
  accessToken,
  refreshToken,
  params,
  profile,
  done
) {
  try {
  console.log(`**Step 1: Passport ADFS strategy...`)

  // console.log(new Date(1000*params.expires_on))
  // // console.log(msToTime(params.ext_expires_in))
  // console.log(new Date())
  
  // console.log(params)
  const userProfile = jwt.decode(params.id_token, '', true)
  // console.log(userProfile)
  
  // New user
  // console.log(`**New ADFS user...`, userProfile)

  // console.log(userProfile)

  // get usershortId
  var shortId = await db.sequelize.query(`SELECT username	FROM public.auth_user where email = '${userProfile.unique_name}'`);
  // var upalu = await db.sequelize2.query(`SELECT upalu	FROM employees where email = '${userProfile.unique_name}'`);
  var upalu = null

  var user = {
    id: userProfile.aud,
    token: accessToken,
    // upalu: upalu[0][0] ? upalu[0][0].upalu : "no upalu",
    groups: userProfile.groups,
    email: userProfile.unique_name,
    first_name: userProfile.given_name,
    last_name: userProfile.family_name,
    userName: shortId[0][0] ? shortId[0][0].username : "no username",
    // check how to add multiple roles
    roles: userProfile.roles[0],
    provider: 'adfs',
    exp: new Date(1000*params.expires_on),
    token_refresh: params.expires_on
  }

  let userEmail =  userProfile.unique_name
  // console.log('step2', `${end - step1} milliseconds`)

  // send email with results
  // console.log(new Date(1000*params.expires_on) - new Date())
  console.log(`**ADFS user added...`)
  user.userEmail = userEmail
  
  return done(null, user)
}
catch (error) {
  console.log('error on login');
  console.log(error)

  return done(null, null)
}
}
