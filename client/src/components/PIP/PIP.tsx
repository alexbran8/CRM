import React, {useState} from "react"
import Table from "../../designSystems/Table/Table"
import { useMutation, useQuery, gql } from "@apollo/client";

const GET_ALL = gql`
  query ($date: String, $responsible_entity:String, $site: String, $week:String, $no_incident: String, $status: String) { 
    getAll(first:50, date:$date, responsible_entity:$responsible_entity, week:$week, site:$site, no_incident:$no_incident, status:$status)  {
        uid
        action
        duration
        week
        date
        NORM
        operation_location
        responsible_entity
        no_incident
        no_itv
        status
        site_constructor
        TT_creator_short
        OMC_engineer
        site
        region
        comment_tac
        task
        incident_type
        hastagTac
        TT_creator
        technician
        collage
        problem
        main_cause
        root_cause
        alarm_active
        alarm_bagot
        corrective_action
        hastagTac
        outil_utilise
    }
  }
`;

const PIP = () => {

    const [items, setItems] = useState<PipItem>([])

    const { data, loading, error, refetch } = useQuery(GET_ALL, {
        variables: { 
            // task: task, status: status, week: week, date: date, responsible_entity: responsible, no_incident: no_incident, site: site
        }, onCompleted: (
        ) => {
            setItems(data.getAll)

        }
    });


    // getTableData


    return (
        <><h1>PIP Prod Indus Planning</h1>
            <Table />
        </>
    )
}

export default PIP;