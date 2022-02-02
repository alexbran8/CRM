const { gql } = require("apollo-server");

// pip schema

module.exports = gql`
type pip {
    cr_date: String
    duration: Float
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
    outil_utilise:String
  }
  type getDistinctPipWeeks {
    week: String
  }

  type getPipResponsibles {
    DISTINCT: String
  }

  type pipResponse {
    success: String!
    message: String!
    uid: Int
  }

  input pipItemSave {
    cr_date: String
    uid: String
    week: String
    date: String
    NORM: String
    duration: Float
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
    action: String
    alarm_active: String
    alarm_bagot: String
    operation_location: String
    corrective_action:String
    root_cause:String
    main_cause:String
    problem:String
    outil_utilise:String
  }

  input pipIdArray {
    uid: Int!
   }

   input pipFileSchema {
    no_incident:String
    no_itv:String
    TT_creator:String
    auteur:String
    region:String
    site:String
    responsible_entity:String
    createdBy:String
    week: String
    task: String
    date: String
    site_constructor: String
    alarm_bagot:String

   }

extend  type Query  {
    getAllPipItems(first: Int week:String date:String no_incident: String status: String site: String responsible_entity: String task:String): [tacdb]
    getDistinctPipWeeks:[getDistinct]
    getPipResponsibles:[getPipResponsibles]
} 

extend type Mutation {
  deletePipItems (data: [idArray]):Response!
  addPipItem(data: itemSave):Response!
  editPipItem(data: itemSave):Response!
  deletePipItem(uid: Int):Response!
  savePipItems(data: [pipFileSchema]):Response!
}

`;