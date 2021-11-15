const { gql } = require("apollo-server");

module.exports = gql`
type tacdb {
    cr_date: String
    uid: String
    week: String
    date: String
    NORM: String
    responsible_entity: String
    no_incident: String
    no_itv: String  
    status: String
    site_constructor: String
    region: String
    comment_tac: String
    OMC_engineer: String
    TT_creator_short: String
    site: String
    task: String
    incident_type: String
    hastagTac: String
    TT_creator: String
    technician: String
    collage: String
    action: String
    alarm_active: String
    alarm_bagot: String
    operation_location: String
    problem:String
    corrective_action: String
    main_cause:String
    root_cause:String
  }
  type getDistinct {
    week: String
  }

  type getResponsibles {
    DISTINCT: String
  }

  type Response {
    success: String!
    message: String!
  }

  input itemSave {
    cr_date: String
    uid: String
    id: String
    week: String
    date: String
    NORM: String
    duration: String
    responsible_entity: String
    no_incident: String
    no_itv: String  
    status: String
    site_constructor: String
    region: String
    comment_tac: String
    OMC_engineer: String
    TT_creator_short: String
    site: String
    task: String
    incident_type: String
    hastagTac: String
    TT_creator: String
    technician: String
    collage: String
    action: String
    alarm_active: String
    alarm_bagot: String
    operation_location: String
    corrective_action:String
    root_cause:String
    main_cause:String
    problem:String
  }

  input idArray {
    id: Int!
   }

extend  type Query  {
    getAll(first: Int week:String date:String no_itv: String status: String site: String responsible_entity: String): [tacdb]
    getDistinctWeeks:[getDistinct]
    getResponsibles:[getResponsibles]
} 

extend type Mutation {
  deleteItems (data: [idArray]):Response!
  addItem(data: itemSave):Response!
  editItem(data: itemSave):Response!
}

`;