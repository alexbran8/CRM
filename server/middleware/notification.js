// const transporterConfig = require("../config/config")
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


function notificationEmail(data) {
    
    // get email body

    // create email
    const metadata = {
        // transporter: transporterConfig,
        from: "poweremail.ni_gsd_timisoara@nokia.com",
        to:'alexandru.bran@nokia.com',
        cc: 'cecilia.crisan@nokia.com',
        subj: `[NPT notification] This email requires your attention! [NPT notification]`,
        text: "Please review the following:",
        html: '<div> Dear ' + resource + ', <p> </p><p>Please review the following:</p> ' +
          table1 + table2 + table3 + 
          '<p> Regards,</p><p>Nokia Planning Tool, on behalf of ' + context.user + '  </p></div>'
      };
    // send email
    process.env.NODE_ENV === `development` ? console.log(metadata.html) : emailHandler(metadata).catch(console.error);
}


module.exports(notificationEmail)