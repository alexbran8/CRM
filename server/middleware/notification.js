const config = require("../config/config")
const errorHandler = (err, req, res, next) => {
    const { code, desc = err.message } = err;
    res.status(code || 500).json({ data: null, error: desc });
  };
  
  const emailHandler = async (metadata) => {
    await metadata.transporter.sendMail({
      from: metadata.from,
      to: metadata.to,
      cc: metadata.cc,
      subject: metadata.subj,
      text: metadata.text,
      html: metadata.html
    });
  };


function notificationEmail(data, user) {
    
    // create email
    const metadata = {
        transporter: config.transporterConfig,
        from: "poweremail.ni_gsd_timisoara@nokia.com",
        to:'alexandru.bran@nokia.com',
        // cc: 'cecilia.crisan@nokia.com',
        subj: `[TACDB notification] This email requires your attention! [TACDB notification]`,
        text: "The following have been imported into web application:",
        html: '<div> TACDB planning update:' +
          '<p>ERICSSSON:'+data.filter(item=> item.constructor == 'ERICSSSON').length +'</p>' +
          '<p>HUAWEI:'+data.filter(item=> item.constructor == 'HUAWEI').length +'</p>' +
          '<p> Regards,</p><p>TACDB, on behalf of ' + user + '  </p></div>'
      };
    // send email
    process.env.NODE_ENV === `development` ? console.log(metadata.html) : emailHandler(metadata).catch(console.error);
}


module.exports=notificationEmail