const db = require("../models/index");


exports.create = async (req, res) => {
  try {
    console.log(req.body.data)
    // Validate request
    // if (req.body.data[0]["Element Conf"]) {
    //   console.log("promo upload")
    // }
    // else {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
    let project = [];
    let existingEntries = [];

    for (var i = 0; i < req.body.data.length; i++) {

      // check if entry allready exists in datbase
      // let check = await db.query(
      //   `SELECT id, task, tt FROM "dailyTasks" 
      //   WHERE task = '${req.body.data[i]["Nom Activite"]}' and tt = '${req.body.data[i]["Num Instance"]}'
      //   `
      // );
      let newId = await db.sequelize.query("Select nextval(pg_get_serial_sequence('tacdashboard_item', 'id')) as new_id;")


      console.log(newId[0][0].new_id)
      const row = {
        id: newId[0][0].new_id,
        task: req.body.data[i].Task,
        no_incident: req.body.data[i]["N° Incident"],
        no_itv:req.body.data[i]["ITV"],
        week: "",
        TT_creatorL:req.body.data[i]["Auteur"],
        auteur: req.body.data[i]["Auteur"],
        region: req.body.data[i]["Service d'exploitation"],
        site: req.body.data[i]["Détecté sur"],
        task: req.body.data[i]["Nom Activite"],
        responsible_entity: req.body.data[i]["Utilisateur"],
        createdBy: req.user.email,
        cr_date: new Date(),
      }
      
      // if (check[0].length == 0 ) {
        project.push(row)
    //   }
    //   else {
    //     existingEntries.push(row)
    //   }
    }


    console.log(project)

    db.Tacdb.bulkCreate(project)
      .then(data => {
        res.status(200).send({
          message: "Import successfull!",
          imported: project.length,
          existing: existingEntries.length
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Project."
        });
      });

  } catch (err) {
    console.error(err)
  }
}

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  const projectName = req.query.projectName;
  var condition = projectName ? { projectName: { [Op.like]: `%${projectName}%` } } : null;

  Project.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    })
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log(req.body)
  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

exports.selfassign = (req, res) => {
  const id = req.body.id;
  console.log(id)
  console.log(req.body)
  let data = {
    // createdBy:
    type: 'TASK',
    nokiaid: req.body.resourceNokiaID,
    bgColor: '#154360',
    title: req.body.data.task + ':' + req.body.data.site,
    status: 'L3',
    start: req.body.date,
    end: req.body.date,
    task_admin: false,
    task_operational: true
  }
  Schedule.create(data).then(data => {
    // Project.destroy({ where: { id } });
    res.status(200).send({
      message: "Import successfull!"
    });
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Projects were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Projects."
      });
    });
};

exports.transfer = async () => {
  await db.query(`call task_transfer()`);
}
