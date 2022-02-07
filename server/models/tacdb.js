// const { db } = require("../config/configProvider")();

module.exports = (sequelize, type) => {
  const Tacdb = sequelize.define(
    "tacdashboard_item",
    {
      uid: {
        type: type.INTEGER,
        // primaryKey: true
        field: 'id'
      },
      week: { type: type.STRING },
      date: {
        type: type.DATE(),
        required: true,
      },
      duration: {
        type: type.STRING,
        required: true,
      },
      hastagTac: {
        type: type.STRING,
        required: true,
      },
      responsible_entity: {
        type: type.STRING,
      },
      comment_tac: {
        type: type.STRING,
      },
      problem: {
        type: type.STRING,
      },
      action: {
        type: type.STRING
      },
      operation_location: {
        type: type.STRING
      },
      collage: {
        type: type.STRING,
      },
      alarm_bagot: { type: type.STRING },
      createdBy: { type: type.STRING },
      cr_date: { type: 'TIMESTAMP', },
      alarm_active: { type: type.STRING },
      incident_type: { type: type.STRING },
      NORM: { type: type.STRING },
      status: { type: type.STRING },
      process_status: { type: type.STRING },
      TT_creator_short: { type: type.STRING },
      task: { type: type.STRING },
      site_constructor: { type: type.STRING, field: 'constructor' },
      OMC_engineer: { type: type.STRING },
      insert_entity: { type: type.STRING },
      insert_date: { type: type.STRING },
      responsible_entity: { type: type.STRING },
      site: { type: type.STRING },
      region: { type: type.STRING },
      no_incident: { type: type.STRING },
      no_itv: { type: type.STRING },
      main_cause: { type: type.STRING },
      root_cause: { type: type.STRING },
      alarm_bagot: { type: type.STRING },
      alarm_active: { type: type.STRING },
      corrective_action: { type: type.STRING },
      outil_utilise: { type: type.STRING },
      process_status: { type: type.STRING },
    },

    { timestamps: false, freezeTableName: true, tableName: 'tacdashboard_item' },
    // {
    //   freezeTableName: true
    // },
    {}
  );
  return Tacdb;
};
