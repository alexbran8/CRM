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
    async deleteItems(root, data, context) {
      try {
        data.data.forEach((x) =>{
        db.Tacdb.destroy({
          where: {  
             id: x.id
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