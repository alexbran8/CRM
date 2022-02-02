import { gql } from "@apollo/client";

export const GET_ALL_EXPORT = gql`
  query ($first: Int $date: String, $responsible_entity:String, $site: String, $week:String, $no_incident: String, $status: String, $task: String) { 
    getAll(first:$first, date:$date, responsible_entity:$responsible_entity, week:$week, site:$site, no_incident:$no_incident, status:$status, task:$task)  {
        no_incident
        date
        week
        task
        site_constructor
        status
        NORM
        main_cause
        root_cause
        problem
        corrective_action
        responsible_entity
        site
        region
        comment_tac
    }
  }
`;