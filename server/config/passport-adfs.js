const jwt = require('jsonwebtoken')
const db = require("../models");

module.exports = async function  (
  accessToken,
  refreshToken,
  params,
  profile,
  done
) {
  try {
  console.log(`**Passport ADFS strategy...`)
  console.log(params)
  const userProfile = jwt.decode(params.id_token, '', true)
  
  // New user
  // console.log(`**New ADFS user...`, userProfile)

  console.log(userProfile)

  // get usershortId
  var shortId = await db.sequelize.query(`SELECT username	FROM public.auth_user where email = '${userProfile.unique_name}'`);
  var upalu = await db.sequelize2.query(`SELECT upalu	FROM employees where email = '${userProfile.unique_name}'`);
  

  var user = {
    id: userProfile.aud,
    token: accessToken,
    upalu: upalu[0][0].upalu,
    groups: userProfile.groups,
    email: userProfile.unique_name,
    first_name: userProfile.given_name,
    last_name: userProfile.family_name,
    userName: shortId[0][0].username || "no username",
    // check how to add multiple roles
    roles: userProfile.roles[0] ,
    provider: 'adfs',
    exp: new Date(1000*userProfile.exp)
  }
  // console.log(userProfile)
  console.log(`**ADFS user added...`)
  return done(null, user)
}
catch {
  console.log('error on login');
  return done(null, null)
}
}
