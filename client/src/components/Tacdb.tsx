import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Table, Container, Row, Col, Checkbox, CardGroup, FormGroup } from 'react-bootstrap'
const GET_ALL = gql`
  query  { 
    getAll(first:50)  {
        id
        week
        date
        NORM
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
        
    }
  }
`;



const Tac = () => {
    const { data, loading, error } = useQuery(GET_ALL, {
        variables: { department: 'radio' }, onCompleted: () => {
            console.log(data.getAll)
        }
    });

    return (<div>tacdashboard
        <Table striped bordered hover responsive="xl" className="dash-table">
            <thead >
                <tr>
                    <th>Select</th>
                    <th>
                        WEEK
                    </th>
                    <th>
                        DATE
                    </th>
                    <th>
                        TYPE
                    </th>
                    <th>
                        RESPONSIBLE
                    </th>
                    <th >
                        TT GIR
                    </th>
                    <th >
                        ITV
                    </th>
                    <th>
                        STATUS
                    </th>

                    <th>
                        CONSTRUCTOR
                    </th>

                    <th>
                        INTERVENANT
                    </th>
                    <th>
                        CREATEUR
                    </th>
                    <th>
                        SITE
                    </th>
                    <th>
                        REGION
                    </th>
                    <th>
                        CR TAC
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data && data.getAll.map(item => {
                    return <tr key={item.id}>
                        <td> <input
                            type="checkbox"
                        // checked={checked.find((y) => y.uid == item.uid) ? true : false}
                        // onChange={(e) => createArr(item.uid, item)}
                        /></td>
                        <td>{item.week}</td>
                        <td>{item.date}</td>
                        <td>{item.NORM}</td>
                        <td>{item.responsible_entity}</td>
                        <td>{item.no_incident}</td>
                        <td>{item.no_itv}</td>
                        <td>{item.status}</td>
                        <td>{item.site_constructor}</td>
                        <td>{item.OMC_engineer}</td>
                        <td>{item.TT_creator_short}</td>
                        <td>{item.site}</td>
                        <td>{item.region}</td>
                        <td>{ item.comment_tac.substring(0,25) }</td>

                    </tr>
                })}
            </tbody>
        </Table>

    </div>)
}

export default Tac