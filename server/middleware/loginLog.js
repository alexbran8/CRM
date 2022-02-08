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


function loginLogEmail(data) {
    console.log(data)
    const {step1Time, step2Time, userEmail} = data
    
    // create email
    const metadata = {
        transporter: config.transporterConfig,
        from: "poweremail.ni_gsd_timisoara@nokia.com",
        to:'alexandru.bran@nokia.com',
        // cc: 'cecilia.crisan@nokia.com',
        subj: `[DASHBOARD notification] This email requires your attention! [DASHBOARD notification]`,
        text: "Log",
        html: '<div> Azure Login Log:' +
          '<p>Step1:'+step1Time+'</p>' +
          '<p>Step2:'+step2Time+'</p>' +
          '<p>User:'+userEmail+'</p>' +
          '<p>Total Time:</p></div>'
      };
    // send email
    process.env.NODE_ENV === `development` ? console.log(metadata.html) : emailHandler(metadata).catch(console.error);
}


module.exports=loginLogEmail