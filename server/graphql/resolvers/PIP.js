const e = require("cors");
const nodemailer = require("nodemailer");
const db = require("../../models");
const { Op } = require("sequelize");

const notificationEmail = require("../../middleware/notification")

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
    async getAllPipItems(root, args, context) {
      console.log(args)
      let dateSearch = new Date(args.date)
      // TODO: implement date type in graphql
      let dateFilter = args.date ? { date: dateSearch } : null
      let weekFilter = args.week ? { week: args.week } : null
      let incidentFilter = args.no_incident ? { no_incident: args.no_incident } : null
      var statusFilter = args.status ? { status: args.status } : null
      var taskFilter = args.task ? { task: args.task } : null
      let siteFilter = args.site ? { site: args.site } : null
      let responsibleFilter = args.responsible_entity ? { responsible_entity: args.responsible_entity } : null
      let firstFilter = args.first > 0 ? args.first : null
      console.log(args.task, taskFilter)
      let result = await db.Pip.findAll({
        // where: { [Op.and]: [dateFilter, weekFilter, incidentFilter, statusFilter, siteFilter, responsibleFilter, taskFilter] },
        // limit: firstFilter,
        order: [
          ['date', 'DESC'],
          
        ]
      });
      return result;

    },
    async getDistinctWeeks(root, args, context) {
      let result = await db.Tacdb.aggregate({ attributes: ['week'], distinct: true })
      return result
    },

    async getResponsibles(root, args, context) {
      let result = await db.Tacdb.aggregate('responsible_entity', 'DISTINCT', { plain: false })
      console.log(result)
      return result
    }
  },
  Mutation: {
    async addItemPIP(root, data, context) {
      try {
        let new_id = await db.sequelize.query("Select nextval(pg_get_serial_sequence('tacdashboard_item', 'id')) as new_id;")
        data.data.uid = new_id[0][0].new_id
        console.log(data.data.id)
        db.Tacdb.create(data.data)
        const response = { message: 'Notifications have been successfully sent!', success: true }
        return response
      }

      catch (error) {
        console.log(error)
        const response = { message: error, success: false }
        return response
      }
    },
    async editItemPIP(root, data, context) {
      try {
        const { id, title, requirements, type, description, coordinator } = data.data
        const dataToUpdate = data.data
        let uid = dataToUpdate.uid
        console.log(uid)
        db.Tacdb.update(
          dataToUpdate,
          { where: { id: uid } }
        );
        const response = { message: 'Notifications have been successfully sent!', success: true }
        return response
      }

      catch (error) {
        console.log(error)
        const response = { message: error, success: false }
        return response
      }
    },

    async deleteItem(root, data, context) {
      try {
        db.Tacdb.destroy({
          where: {
            id: data.uid
          }
        })
        const response = { message: 'Item hs been successfully deleted!', uid: data.uid, success: true }
        return response
      }
      catch (error) {
        console.log(error)
        const response = { message: error, success: false }
        return response
      }
    },

    async saveItems(root, data, context) {
      console.log(context)
      try {
        console.log(data)
        let project = [];
        let existingEntries = [];

        for (var i = 0; i < data.data.length; i++) {

          // check if entry allready exists in datbase
          // let check = await db.query(
          //   `SELECT id, task, tt FROM "dailyTasks" 
          //   WHERE task = '${data[i]["Nom Activite"]}' and tt = '${data[i]["Num Instance"]}'
          //   `
          // );
          let newId = await db.sequelize.query("Select nextval(pg_get_serial_sequence('tacdashboard_item', 'id')) as new_id;")

          const row = {
            id: newId[0][0].new_id,
            date:data.data[i].date,
            task: data.data[i].task,
            no_incident: data.data[i].no_incident,
            no_itv: data.data[i].no_itv,
            week: data.data[i].week,
            constructor:data.data[i].site_constructor,
            TT_creator: data.data[i]["TT_creator"],
            alarm_bagot: data.data[i]["alarm_bagot"],
            TT_creator_short: data.data[i].auteur,
            region: data.data[i].region,
            site: data.data[i].site,
            responsible_entity: data.data[i].responsible_entity,
            createdBy: data.data[i]["createdBy"],
            cr_date: new Date(),
          }

          // if (check[0].length == 0 ) {
          project.push(row)
          //   }
          //   else {
          //     existingEntries.push(row)
          //   }
        }


        db.Tacdb.bulkCreate(project)

        // send notification
        notificationEmail(project, context.user)


        const response = { message: 'Items have been successfully imported!', success: true }
        return response
      }
      catch (error) {
        console.log(error)
        const response = { message: error, success: false }
        return response
      }
    },


    async deleteItems(root, data, context) {
      try {
        data.data.forEach((x) => {
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