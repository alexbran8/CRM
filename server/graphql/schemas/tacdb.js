const { gql } = require("apollo-server");

module.exports = gql`
type tacdb {
    cr_date: String
    id: String
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
    alarme_active: String
    alarme_bagot: String
    operation_location: String
  }
  type getDistinct {
    week: String
  }

  type Response {
    success: String!
    message: String!
  }

  input idArray {
    id: Int!
   }

extend  type Query  {
    getAll(first: Int week:String date:String no_itv: String status: String site: String responsible_entity: String): [tacdb]
    getDistinctWeeks:[getDistinct]
} 

extend type Mutation {
  deleteItems (data: [idArray]):Response!
}

`;