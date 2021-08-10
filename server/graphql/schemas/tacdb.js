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
  }
  type getDistinct {
    week: String
  }

  type Response {
    success: String!
    message: String!
  }

  input Norms {
    id: Int
    to_email: String
    date: String
    resource: String
    wbsCustomer: String
    task: String
    taskComments: String
    twc: String
    bh: String
	  rh: String
	  normOK: String
	  normNok:  String
	  status: String
    var: String
   }

extend  type Query  {
    getAll(first: Int week:String date:String no_itv: String status: String site: String responsible_entity: String): [tacdb]
    getDistinctWeeks:[getDistinct]
} 

extend type Mutation {
  sendNotifications (data: [Norms]):Response!
}

`;