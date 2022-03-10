require('dotenv').config({ path: '../.env' });

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

const database2 = new Sequelize(process.env.DB2, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize2 = database2;

// db.dailyTasks.model = require("./dailyTasks.model.js")(sequelize, Sequelize);
db.Tacdb = require("./tacdb.js")(sequelize, Sequelize);
// db.Pip = require("./pip.js")(sequelize, Sequelize);

// db.gallery = require("./gallery.js")(sequelize, Sequelize);
// db.cartItem = require("./cartItem.js")(sequelize, Sequelize);
// db.tags = require("./tags.js")(sequelize, Sequelize);
// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// db.comments = require("./comment.model.js")(sequelize, Sequelize);

// db.tutorials.hasMany(db.comments, { as: "comments" });
// db.comments.belongsTo(db.tutorials, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });

// db.gallery.hasMany(db.tags, { as: "tags" });
// db.tags.belongsTo(db.gallery, {
//   foreignKey: "item",
//   as: "item",
// });

module.exports = db;
