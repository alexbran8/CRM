import React, { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { Table } from 'react-bootstrap'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import FileReader from "./FileReader";
import { useForm, Controller } from 'react-hook-form'
import SimpleModal from "../../components/common/Modal"
import GenericModal from "../../designSystems/Modal/Modal";
import { ExportToExcel } from "../../components/common/Export/ExportExcel"
import { ReportsModalBody } from "./../ReportsModal/ReportsModal";
import { checkCollumns } from "../../utils/checkCollumns"
import { AddEditModal } from "./../AddModal/AddEditModal";
import { apiclient } from "../..";

import { appelList } from "./types";

// import { config } from "../../config"

import "./TAC.scss"
import ExcelReader from "./../ExcelReader";

import { getWeek } from "./../common/Form";


import { GET_ALL_EXPORT } from "./queries.tsx"
// TODO: 1. check pre-check on upload (needs to be prise en compte)
// TODO: 2. pre-check => disabled
// TODO: 3. Supervision NE to SSNE => DONE!
// TODO: 4. task force disabled
// TODO: 5. add task type in filter instead of status => DONE!
// FIXME: 6. fix import => DONE!


const collumnsList = ['Constructor', 'Task', 'N° Incident', 'Détecté sur', "Service d'exploitation", 'Auteur', 'CR_DATE', 'Utilisateur']

const GET_RESPONSIBLES = gql`
query {
    getResponsibles {
        DISTINCT
    }
    
}
`;

const GET_ALL = gql`
  query ($first: Int $date: String, $responsible_entity:String, $site: String, $week:String, $no_incident: String, $status: String, $task: String) { 
    getAll(first:$first, date:$date, responsible_entity:$responsible_entity, week:$week, site:$site, no_incident:$no_incident, status:$status, task:$task)  {
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

const DELETE_ITEM = gql`
mutation ($uid: Int) {
    deleteItem (uid:$uid){
        success
        message
        uid
      }
    }

`;


const DELETE_ITEMS = gql`
mutation ($data: [idArray]) {
    deleteItems (data:$data){
        success
        message
      }
    }
`;

const SAVE_FILE = gql`
mutation ($data: [fileSchema]) {
    saveItems (data:$data){
        success
        message
      }
    }
`;

const ADD_ITEM = gql`
mutation ($data: itemSave) {
    addItem (data:$data){
        success
        message
        data {
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
    }

`;


const EDIT_ITEM = gql`
mutation ($data: itemSave) {
    editItem (data:$data){
        success
        message
        data {
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
    }
`;


const GET_DISTINCT = gql`
query {
    getDistinctWeeks {
        week
    }
}
`;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    palette: {
        //   primary: blue,
        secondary: "#ff7961",
    },

}));



const Tac = () => {
    const user = useSelector((state) => ({ auth: state.auth }));
    const [modalLoginShow, setModalLoginShow] = useState < boolean > (false);
    const classes = useStyles();
    const [checked, setChecked] = useState([])
    const [fileData, setFileData] = useState([])
    const [constructor, setConstructor] = useState < string > (null);
    const [disabledConfirm, setDisabledConfirm] = useState < boolean > (true)
    const [items, setItems] = useState([])
    const [selected, setSelected] = useState(0)
    const [weekList, setuWeeksList] = useState([]);
    const [itvList, setuitvList] = useState([]);
    const [status, setStatus] = useState();
    const [task, setTask] = useState < string > ('');
    const [showModal, setShowModal] = React.useState < boolean > (false);
    const [operation, setOperation] = useState < string > (null);
    const [selectedItem, setSelectedItem] = useState();
    const [no_incident, setIncident] = useState < string > (null);
    const [site, setSite] = useState < string > (null);
    const newDate = new Date();
    const [date, setDate] = useState(newDate);
    const [responsiblesList, setResponsiblesList] = useState([]);
    const [responsible, setResponsible] = useState < string > (user.auth.userName);
    const [operationStatus, setOperationStatus] = useState<boolean>(null)
    const [response, setResponse] = useState < string > (null);
    const [week, setWeek] = useState();
    // const [statusClear, setClearStatus] = useState < boolean > (false)
    const [item, setItem] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState < boolean > (false)
    const { watch, control, setValue } = useForm({});
    const { data, loading, error, refetch } = useQuery(GET_ALL, {
        variables: { first: 100, task: task, status: status, week: week, date: date, responsible_entity: responsible, no_incident: no_incident, site: site }, onCompleted: (
        ) => {
            setItems(data.getAll)

        }
    });

    // const [loadGreeting, { called, loading:isLoading, data:exportData}] = useLazyQuery(GET_ALL, {
    //     variables: { task: task, status: status, week: week, date: date, responsible_entity: responsible, no_incident: no_incident, site: site }, onCompleted: (
    //     ) => {
    //         console.log('x')

    //     }
    // });

    const { data: responsibleData, loading: loadingReponsibles, error: ErrorResponsibles, refetch: refetchResponsibles } = useQuery(GET_RESPONSIBLES, {
        // variables: { }, 
        onCompleted: (
        ) => {
            responsibleData && setResponsiblesList(responsibleData.getResponsibles)

        }
    });

    const [addItemMutation] = useMutation(ADD_ITEM, {
        onCompleted: (dataRes) => {
            if (dataRes.addItem.success === "true") {
            // update state
            console.log(dataRes)
            const newItems = [...items]
            const updatedItem = item
            // updatedItem.uid = dataRes.addItem.data.uid
            setItems(newItems => [...newItems,  dataRes.addItem.data]);
            console.log(dataRes)
            setShowModal(false)
        }
        else {
            console.error("Error creating a post"); alert("Error creating a post request; Please login / logout...")
        }

        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
    });

    const [saveFileMutation] = useMutation(SAVE_FILE, {
        onCompleted: (dataRes) => {
            setResponse(dataRes.saveItems.message)
            const allItems = [...fileData, ...items]
            setItems(allItems)
            // TODO: update import data so that corrective action and action are 'OUI'

            // update state
            // const newItems = [...items]
            // newItems.forEach((item) => {
            //     item.uid = item.uid + 1;
            // });
            // setItems(newItems => [...newItems, item]);
            // setShowModal(false)

        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
    });

    const [deleteItemMutation] = useMutation(DELETE_ITEM, {
        onCompleted: (dataRes) => {
            alert(dataRes.deleteItem.message);
            // update state after item is deleted from db
            let newItems = items.filter(function (el) { return el.uid != dataRes.deleteItem.uid; });
            setItems(newItems)
        },
        onError: (error) => { console.error("Error deleting item", error); alert("Error deleting item" + error.message) },
    });

    const [updateItemMutation] = useMutation(EDIT_ITEM, {
        onCompleted: (dataRes) => {
            // update state
            if (dataRes.editItem.success === "true") {

            const newItems = [...items]
            let index = newItems.findIndex((y) => y.uid === dataRes.editItem.data.uid)

            newItems[index] = dataRes.editItem.data

            setItems(newItems)
            dataRes && dataRes.edit && setOperationStatus(dataRes.edit.message)
            console.log(dataRes)
            setShowModal(false)
            }
            else {
                console.error("Error creating a post"); alert("Error creating a post request; ")
            }
        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
    });



    const updateItem = (data) => {
        let inputData = data
        console.log(data)
        inputData.duration = parseFloat(inputData.duration)
        inputData.createdBy = user.auth.email
        setItem(inputData)
        updateItemMutation({
            variables: {
                data: inputData
            }
        }
        )
    }

    const deleteItem = (uid) => {
        deleteItemMutation({
            variables: {
                uid: parseInt(uid)
            }
        }
        )
    }

    const addMoreItems = (data, index) => {
        let inputData = data

        inputData.duration = parseFloat(inputData.duration)
        inputData.createdBy = user.auth.email
        setItem((item) => ({
            ...item, ...inputData,
            uid: 0,

        }));
        // save to db

        addItemMutation({
            variables: {
                data: inputData
            }
        }
        )
    }



    const handleInputValues = (value, field, index) => {
        // if yes, add values to state
        setItem((item) => ({
            ...item,
            [field]: value,
            uid: index
        }));
    }

    const [deleteItemsMutation] = useMutation(DELETE_ITEMS, {
        onCompleted: (dataRes) => {
            alert(dataRes.deleteItems.message);

            checked.forEach(x => {
                // console.log(items.findIndex(function (i) {
                //     return i.uid === parseInt(x.uid);
                // }))
                items.splice(items.findIndex(function (i) {
                    return parseInt(i.uid) === parseInt(x.uid);
                }), 1);
            })
            setChecked([])
            setSelected(0)

        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
    });

    const deleteItems = () => {


        if (checked.length > 0) {
            if (
                window.confirm(`Are you sure you want to delete ${selected} items?
              `)
            ) {
                deleteItemsMutation({
                    variables: {
                        data: checked
                    }
                }
                )
            }
        }
        else { alert("please select some tasks...") }
    }

    function getConstructor(fileName) {
        let constructor = fileName.includes("HUAWEI") ? "HUAWEI" : fileName.includes("ERICSSON") ? "ERICSSON" : null
        return constructor
    }

    function getCollumns(inputArray, fileName) {

        return inputArray.map(item => {
            // let constructor = getConstructor(fileName)
            return {
                task: item["Task"],
                no_incident: item["N° Incident"],
                no_itv: item["ITV"],
                date: item["CR_DATE"],
                site_constructor: item["Constructor"],
                week: getWeek(item["CR_DATE"]),
                TT_creator: item["Auteur"],
                auteur: item["Auteur"],
                region: item["Service d'exploitation"],
                site: item["Détecté sur"],
                alarm_bagot: 'NON',
                responsible_entity: item["Utilisateur"],
                createdBy: user.auth.email
            }
        })
    }

    const sendData = (data, fileName) => {

        // check if mandaory collumns exist in the file..
        if (checkCollumns(data, collumnsList)) {
            const getData = getCollumns(data, fileName)
            setFileData(getData);
            saveFileMutation({ variables: { data: getData } });
        }
        else {
            setResponse("please check collumns in the file...")
        }

    }

    const { data: data2, loading: loading2, error: error2 } = useQuery(GET_DISTINCT, {
        onCompleted: () => {
            setuWeeksList(data2.getDistinctWeeks);
        }
    });

    const change = (event, values) => {
        console.log(event.target, values.status)
    }

    const createArr = (uid, item) => {
        if (checked.find((y) => y.uid == item.uid)) {
            // console.log(uid, item.uid)
            // checked.find((y) => checked.splice(y, 1))
            checked.splice(checked.findIndex(function (i) {
                return i.uid === parseInt(uid);
            }), 1);
            setSelected(checked.length)
            // console.log(checked)
        } else {

            checked.push({
                uid: parseInt(uid)
            })
            setSelected(checked.length)
            // console.log(checked)
        }
    }

    const handleModal = (selectedItem) => {
        setShowModal(!showModal)
        setSelectedItem(selectedItem)
    }


    useEffect(() => {
        setResponsible(user.auth.userName);
        refetchResponsibles();
    }, [])

    function getModalStyle() {
        return {
            width: '80%',
            maxWidth: '100vw',
            maxHeight: '100%',
            position: 'fixed',
            top: '50%',
            left: '10%',
            transform: 'translate(0, -50%)',
            overflowY: 'auto'
        };
    }



    const dateToString = d => `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${('00' + d.getDate()).slice(-2)}`
    const myDate = new Date()


    const getAllExport = async () => {

        let data = await apiclient.query({
            query: GET_ALL_EXPORT,
            variables: { first: null, task: task, status: status, week: week, responsible_entity: responsible, no_incident: no_incident, site: site, first: null }
        })
        return data.data
    }


    // FIXME: does not clear form filters values
    const clearFilters = () => {
        setDate();
        setTask();
        setWeek();
        setSite();
        setStatus();
        setIncident();
        setResponsible('');
        refetch();
    }


    return (<div className="tac-container">
        {/* reportsmodal */}
        {modalLoginShow ?
            <GenericModal
                open={modalLoginShow}
                getModalStyle={getModalStyle}
                title="Hours per tasks"
                //   handleModal={handleModal}
                handleClose={() => { setModalLoginShow(false) }}
            // body={<ReportsModalBody />}
            >
                <ReportsModalBody
                    data={items} />
            </GenericModal>
            : null
        }


        {showModal ? (
            <SimpleModal
                //formValidator={formCheck}
                // setShowModalOpen={showModal}
                item={selectedItem}
                user={user.auth.userName}
                upalu={user.auth.upalu}
                userList={responsiblesList}
                handleModal={handleModal}
                handleClose={handleModal}
                saveFunction={operation === 'add' ? addMoreItems : updateItem}
                handleInputValues={handleInputValues}
                operation={operation}
            />
        ) : null}

        <div className="filterContainer">

            <>

                <TextField
                    id="weekFilter"
                    type="text"
                    label="enter week no"
                    // value={"12-02-2021"}
                    // defaultValue={}
                    // defaultValue={dateToString(myDate)}
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e, v) => { setWeek(e.target.value); refetch() }}
                // InputLabelProps={{
                //     shrink: true,
                // }}
                />
            </>
            <>

                {/* TODO: fix no_itv vs no_incident */}
                <TextField
                    id="incidentFilter"
                    type="text"
                    label="enter incident no"
                    // value={"12-02-2021"}
                    // defaultValue={}
                    // defaultValue={dateToString(myDate)}
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e, v) => { setIncident(e.target.value); refetch() }}
                // InputLabelProps={{
                //     shrink: true,
                // }}
                />
            </>

            <>
                <TextField
                    id="dateFilter"
                    type="date"
                    // value={"12-02-2021"}
                    // defaultValue={}
                    defaultValue={dateToString(myDate)}
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e, v) => { setDate(e.target.value); refetch() }}
                // InputLabelProps={{
                //     shrink: true,
                // }}
                />
                <>
                    <Autocomplete
                        id="status"
                        options={[{ status: 'Problème résolu' }, { status: 'Problème résolu avec réserve' }, { status: 'Problème pas identifié' }, { status: 'Problème identifié' }]}
                        getOptionLabel={(option) => option.status}
                        style={{ width: 300 }}
                        className={classes.textField}
                        onInputChange={(event, newInputValue, reason) => {
                            if (reason === 'clear') {
                                setStatus(''); refetch()
                                return
                            } else {
                                setStatus(newInputValue); refetch()
                            }
                        }}
                        // onChange={(e, v) => { setStatus(v.status);alert(v.status); refetch() }}
                        renderInput={(params) => <TextField {...params} label="select status" variant="outlined" />}
                    />
                </>

                <>
                    <Autocomplete
                        id="task"
                        options={appelList}
                        // getOptionLabel={(option) => option.value}
                        style={{ width: 200 }}
                        className={classes.textField}
                        onInputChange={(event, newInputValue, reason) => {
                            if (reason === 'clear') {
                                setTask(''); refetch()
                                return
                            } else {
                                setTask(newInputValue); refetch()
                            }
                        }}
                        // onChange={(e, v) => { setStatus(v.status);alert(v.status); refetch() }}
                        renderInput={(params) => <TextField {...params} label="select tasktype" variant="outlined" />}
                    />
                </>

                <>
                    <TextField
                        id="siteFilter"
                        type="text"
                        label="enter site no"
                        // value={"12-02-2021"}
                        // defaultValue={}
                        // defaultValue={dateToString(myDate)}
                        variant="outlined"
                        className={classes.textField}
                        onChange={(e, v) => { setSite(e.target.value); refetch() }}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    />
                </>
                <>
                    {/* FIXME:  after first clear can reselect other responsible, but clear does not work again*/}
                    <Controller
                        control={control}
                        name="responsible"

                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Autocomplete
                                id="responsible"
                                // TODO: update to sort by options
                                options={responsiblesList}
                                defaultValue={{ 'DISTINCT': responsible || '' }}
                                getOptionLabel={(option) => option.DISTINCT}
                                style={{ width: 300 }}
                                className={classes.textField}
                                // onChange={(e, v) => { setResponsible(v.DISTINCT); refetch() }}

                                onInputChange={(event, newInputValue, reason) => {
                                    if (reason === 'clear') {
                                        setResponsible(null); refetch()
                                        return
                                    } else {
                                        setResponsible(newInputValue); refetch()
                                    }
                                }}
                                renderInput={(params) => <TextField {...params}
                                    label="select responsible"
                                    variant="outlined"

                                    defaultValue={responsible}
                                />}
                            />
                        )}
                    // rules={{ required: 'On sait traite is required' }}
                    />

                    <Button variant="contained" color="primary" onClick={() => { clearFilters() }}>CLEAR</Button>
                    {/* )} */}
                    {/* /> */}
                </>
            </>
            {/* </form> */}

        </div>

        <div className='buttonContainer'>
            <Button variant="contained" color="secondary" hidden={user.auth.role === 'L3' ? false : true} onClick={deleteItems}>Delete {selected}</Button>
            <Button variant="contained" color="primary" hidden={user.auth.role === 'L3' ? false : true} onClick={() => { setShowUploadModal(!showUploadModal); setResponse(null) }}>Upload</Button>
            <Button variant="contained" color="primary" onClick={() => { setModalLoginShow(true) }}>Reports</Button>
            <Button variant="contained" color="primary" onClick={() => { setOperation('add'); handleModal({ title: 'Add New Item', }) }}>Add</Button>
            <ExportToExcel
                getData={getAllExport()}
                fileName="export_tacdb"
                operationName="export all"
            />
        </div>

        <ExcelReader
            setShowModal={() => setShowUploadModal(!showUploadModal)}
            getData={sendData}
            response={response}
            disabledConfirm={disabledConfirm}
            showModal={showUploadModal} />

        <Table striped bordered hover className="dash-table">
            <thead >
                <tr>
                    <th></th>
                    {user.auth.role === 'L3' ? <th>Select</th> : null}
                    <th></th>
                    <th>
                        DATE
                    </th>
                    <th>
                        TYPE
                    </th>
                    <th>
                        NORM
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
                    <th></th>
                    {/* <th>
                    </th> */}
                </tr>
            </thead>
            <tbody>
                {items && items.map((item, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        {user.auth.role === 'L3' ? <td> <input
                            type="checkbox"
                            checked={checked.find((y) => y.uid == item.uid) ? true : false}
                            onChange={(e) => createArr(item.uid, item)}
                        />
                        </td> : null}
                        <td><Button variant="contained" color="primary"
                            onClick={(event) => {
                                // FIXME: should this check be happenning in the backend? (YES => move check to backend)
                                if (user.auth.userName === item.responsible_entity || user.auth.role === 'L3' || item.responsible_entity === null) {
                                    setOperation('edit'); setItem(item); handleModal({ title: 'Edit Item', data: item });
                                }
                                else { alert('You are not allowed to edit this item...') }
                            }}
                        >EDIT</Button></td>
                        <td>{item.date}</td>
                        <td>{item.task}</td>
                        <td>{item.NORM}</td>
                        <td>{item.responsible_entity}</td>
                        <td>{item.no_incident}</td>
                        <td>{item.no_itv}</td>
                        <td className={item.status == 'Problème résolu' ? 'green' : item.status == 'Problème résolu avec réserve' ? 'orange' : item.status == 'Problème pas identifié' ? 'red' : null}>{item.status}</td>
                        <td>{item.site_constructor}</td>
                        <td>{item.OMC_engineer}</td>
                        <td>{item.TT_creator_short}</td>
                        <td>{item.site}</td>
                        <td>{item.region}</td>
                        <td><span title={item.comment_tac}>{item.comment_tac ? item.comment_tac.substring(0, 25) : null}</span></td>
                        <td><Button variant="contained" color="secondary" disabled={user.auth.userName === item.responsible_entity || user.auth.role === 'L3' ? false : true}
                            onClick={() => {
                                if (user.auth.userName === item.responsible_entity || user.auth.role === 'L3') {
                                    if (
                                        window.confirm(`Are you sure you want to delete ${item.no_incident} items?
                                      `)
                                    ) {
                                        deleteItem(item.uid)
                                    }
                                }
                                else { alert('You are not allowed to delete this item...') }
                            }}
                        >Delete</Button></td>
                    </tr>
                })}
            </tbody>
        </Table>


    </div>)
}

export default Tac