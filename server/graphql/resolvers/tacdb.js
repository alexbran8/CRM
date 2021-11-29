const e = require("cors");
const nodemailer = require("nodemailer");
const db = require("../../models");
const { Op } = require("sequelize");


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

module.exports = {
  Query: {
    async getAll(root, args, context) {
      console.log(args)
      let dateSearch = new Date(args.date)
      // TODO: implement date type in graphql
      let dateFilter = args.date ? { date: dateSearch  } : null
      let weekFilter = args.week ? { week: args.week } : null
      let itvFilter = args.no_itv ? { no_itv: args.no_itv } : null
      var statusFilter = args.status ? { status: args.status } : null
      // var statusFilter = args.status === 'null' ? { comment_tac: {[Op.eq]: null} } : null
      let siteFilter = args.site ? { site: args.site } : null
      let responsibleFilter = args.responsible_entity ? { responsible_entity: args.responsible_entity } : null
      
      let result = await db.Tacdb.findAll({
        where: { [Op.and]: [dateFilter, weekFilter, itvFilter, statusFilter, siteFilter, responsibleFilter] },
        limit: args.first
      });
      return result;

    },
      async getDistinctWeeks(root, args, context) {
        let result = await db.Tacdb.aggregate({attributes: ['week'], distinct: true})
        return result
      },

      async getResponsibles(root, args, context) {
        let result = await db.Tacdb.aggregate('responsible_entity', 'DISTINCT',{plain: false} )
        console.log(result)
        return result
      }
  },
  Mutation: {
    async addItem(root, data, context) {
      try {
        let new_id = await db.sequelize.query("Select nextval(pg_get_serial_sequence('tacdashboard_item', 'id')) as new_id;")
        data.data.uid=new_id[0][0].new_id
        console.log(data.data.id)      
        db.Tacdb.create(data.data)  
        const response = {message: 'Notifications have been successfully sent!', success: true}
        return  response  
      }
               
      catch (error) {
        console.log(error)
        const response = {message: error, success: false}
        return  response
      }
    },
    async editItem(root, data, context) {
      try {
        const { id, title, requirements, type, description,  coordinator } = data.data  
        const dataToUpdate = data.data
        let uid = dataToUpdate. uid
        console.log(uid)
        db.Tacdb.update(
            dataToUpdate ,
          { where: { id: uid  } }
        );
        const response = {message: 'Notifications have been successfully sent!', success: true}
        return  response  
      }
               
      catch (error) {
        console.log(error)
        const response = {message: error, success: false}
        return  response
      }
    },

    async deleteItem(root, data, context) {
      try {
      //   db.Tacdb.destroy({
      //     where: {  
      //        id: data.uid
      //     }
      // })
      const response = { message: 'Item hs been successfully deleted!', uid: data.uid, success: true }
        return response
      }
      catch (error) {
        console.log(error)
        const response = {message: error, success: false}
        return  response
      }
    },



    async deleteItems(root, data, context) {
      try {
        data.data.forEach((x) =>{
        db.Tacdb.destroy({
          where: {  
             id: x.uid
          }
      })
    })

        const response = { message: 'Items have been successfully deleted!', success: true }
        return response
      }

      catch (error) {
        console.log(error)
        const response = { message: error, success: false }
        return response
      }
    }
  }
}

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}