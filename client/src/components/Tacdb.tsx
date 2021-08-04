import React, { useState } from "react";
import { Table, Container, Row, Col, Checkbox, CardGroup, FormGroup } from 'react-bootstrap'


const Tac = () => {

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
            </tbody>
        </Table>

    </div>)
}

export default Tac