const jwt = require('jsonwebtoken')
const db = require("../../models");

module.exports = function (
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
  let shortId = 'abran'
  // let shortId = await db.sequelize.query(`Select nextval(pg_get_serial_sequence('tacdashboard_item', 'id')) as new_id where email =${userProfile.unique_name};`)
  
  // console.log(params)

  var user = {
    id: userProfile.aud,
    token: accessToken,
    groups: userProfile.groups,
    email: userProfile.unique_name,
    first_name: userProfile.given_name,
    last_name: userProfile.family_name,
    shortId: shortId,
    // check how to add multiple roles
    roles: userProfile.roles[0],
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
