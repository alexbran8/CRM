import React, { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { Table, Container, Row, Col, Checkbox, CardGroup, FormGroup } from 'react-bootstrap'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import FileReader from "./FileReader";

import SimpleModal from "../components/common/Modal"

import { config } from "../config"

import "./Tacdb.scss"
import ExcelReader from "./ExcelReader";


const GET_RESPONSIBLES = gql`
query {
    getResponsibles {
        DISTINCT
    }
    
}
    

`;

const GET_ALL = gql`
  query ($date: String, $responsible_entity:String, $site: String, $week:String, $no_itv: String, $status: String) { 
    getAll(first:50, date:$date, responsible_entity:$responsible_entity, week:$week, site:$site, no_itv:$no_itv, status:$status)  {
        uid
        action
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

const ADD_ITEM = gql`
mutation ($data: itemSave) {
    addItem (data:$data){
        success
        message
      }
    }

`;


const EDIT_ITEM = gql`
mutation ($data: itemSave) {
    editItem (data:$data){
        success
        message
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
    const classes = useStyles();
    const [checked, setChecked] = useState([])
    const [items, setItems] = useState([])
    const [selected, setSelected] = useState(0)
    const [weekList, setuWeeksList] = useState([]);
    const [itvList, setuitvList] = useState([]);
    const [status, setStatus] = useState();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [operation, setOperation] = useState<string>();
    const [selectedItem, setSelectedItem] = useState();
    const [itv, setItv] = useState();
    const [site, setSite] = useState();
    const [date, setDate] = useState();
    const [responsiblesList, setResponsiblesList] = useState([]);
    const [responsible, setResponsible] = useState<string>(null);
    const [week, setWeek] = useState();
    const [statusClear, setClearStatus] = useState<boolean>(false)
    const [item, setItem] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
    const { data, loading, error, refetch } = useQuery(GET_ALL, {
        variables: { status: status, week: week, date: date, responsible_entity: responsible }, onCompleted: (
        ) => {
            setItems(data.getAll)

        }
    });

    const { data:responsibleData, loading:loadingReponsibles, error:ErrorResponsibles, refetch: refetchResponsibles } = useQuery(GET_RESPONSIBLES, {
        // variables: { }, 
        onCompleted: (
        ) => {
            setResponsiblesList(responsibleData.getResponsibles)

        }
    });

    const [addItemMutation] = useMutation(ADD_ITEM, {
        onCompleted: (dataRes) => {
          // update state
          const newItems = [...items]
          newItems.forEach((item) => {
            item.uid = item.uid + 1;
          });
          setItems(newItems => [...newItems, item]);
          setShowModal(false)
    
        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
      });
    
      const [deleteItemMutation] = useMutation(DELETE_ITEM, {
        onCompleted: (dataRes) => {
          // update state after item is deleted from db
          let newProjects = projects.filter(function (el) { return el.uid != dataRes.deleteItem.uid; });
          setProjects(newProjects)
        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
      });
    
      const [updateItemMutation] = useMutation(EDIT_ITEM, {
        onCompleted: (dataRes) => {
          // update state
          const newItems = [...items]
          let index = newItems.findIndex((y) => y.uid === item.uid)
    
          newItems[index] = item
    
          setItems(newItems)
          setShowModal(false)
        },
        onError: (error) => { console.error("Error creating a post", error); alert("Error creating a post request " + error.message) },
      });

      const updateItem = (data) => {
        let inputData = data
        setItem(inputData)
        updateItemMutation({
          variables: {
            data: inputData
          }
        }
        )
      }

      const addMoreItems = (data, index) => {
        let inputData = data
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
        // console.log({value})
        // check if values are valid
        console.log('before', item)
        // if yes, add values to state
        setItem((item) => ({
          ...item,
          [field]: value,
          uid: index
        }));
      }

    //   useEffect( () => {
    //       console.log(user.auth.userName)
    //       setResponsible(user.auth.userName)
    //   },[user, responsible])

    const [deleteItemsMutation] = useMutation(DELETE_ITEMS, {
        onCompleted: (dataRes) => {
            alert(dataRes.deleteItems.message);
            console.log({items})    
            checked.forEach(x => {
                console.log(items.findIndex(function (i) {
                    return i.uid === parseInt(x.uid);
                }))
                items.splice(items.findIndex(function (i) {
                    return parseInt(i.uid) === parseInt(x.uid);
                }), 1);
            })
            setChecked([])
            console.log(items.length)

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



    const newDate = new Date()

    // FIXME: select does not work

    const sendData = (data) => {
        var that = this;
        axios.post(config.baseURL + config.baseLOCATION + '/dailyTasks', {
            data: data
        })
            .then(function (response) {
                // alert(response.data.message + ' => imported: ' + response.data.imported + '; existing: ' + response.data.existing );
                console.log(response.data)
                that.setState({ messageData: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })

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
            console.log(uid, item.uid)
            // checked.find((y) => checked.splice(y, 1))
            checked.splice(checked.findIndex(function (i) {
                return i.uid === parseInt(uid);
            }), 1);
            setSelected(checked.length)
            console.log(checked)
        } else {

            checked.push({
                uid: parseInt(uid)
            })
            setSelected(checked.length)
            console.log(checked)
        }
    }

    const handleModal = (selectedItem) => {
        setShowModal(!showModal)
        setSelectedItem(selectedItem)
      }
    


    // const onSaveInformation = (id, name) => updateUser({ variables: { id, name })

    return (<div>
        <div className="filterContainer">

            <>
                <Autocomplete
                    id="combo-box-demo"
                    options={weekList}
                    disabled={true}
                    getOptionLabel={(option) => option.week}
                    style={{ width: 300 }}
                    onChange={(e, v) => { setWeek(v); refetch() }}
                    className={classes.textField}
                    renderInput={(params) => <TextField {...params} label="select week" variant="outlined" />}
                />
            </>
            <>
                <Autocomplete
                    id="combo-box-demo"
                    options={itvList}
                    disabled={true}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    className={classes.textField}
                    onChange={(e, v) => setItv(v)}
                    renderInput={(params) => <TextField {...params} label="select ITV" variant="outlined" />}
                />
            </>
            <>
                <TextField
                    id="date"
                    type="date"
                    defaultValue={newDate.getDate()}
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e, v) => { setDate(e.target.value); console.log(e.target.value); refetch() }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <>
                    <Autocomplete
                        id="status"
                        options={[ { status: 'Problème résolu' }, { status: 'Problème résolu avec réserve' }, { status: 'Problème pas identifié' }, { status: 'Problème identifié' }]}
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
                        id="combo-box-demo"
                        options={weekList}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        disabled={true}
                        className={classes.textField}
                        onChange={(e, v) => setStite(v)}
                        renderInput={(params) => <TextField {...params} label="select site" variant="outlined" />}
                    />
                </>
                <>
                    <Autocomplete
                        id="combo-box-demo"
                        options={responsiblesList}
                        getOptionLabel={(option) => option.DISTINCT}
                        style={{ width: 300 }}
                        className={classes.textField}
                        // inputValue='abran'
                        // onChange={(e, v) => { setResponsible(v.DISTINCT); refetch() }}
                        onInputChange={(event, newInputValue, reason) => {
                            if (reason === 'clear') {
                                setResponsible(''); refetch()
                              return
                            } else {
                                setResponsible(newInputValue); refetch()
                            }
                          }}
                        renderInput={(params) => <TextField {...params} label="select responsible" variant="outlined" />}
                    />
                </>
            </>

            {/* </form> */}
        </div>
        {user.auth.role === 'L3' ?
            <div className='buttonContainer'>
                <Button variant="contained" color="secondary" onClick={deleteItems}>Delete {selected}</Button>
                <Button variant="contained" color="primary" onClick={() => setShowUploadModal(!showUploadModal)}>Upload</Button>
                <Button variant="contained" color="primary" disabled={true} onClick={deleteItems}>Notify</Button>
                <Button variant="contained" color="primary" onClick={() => { setOperation('add'); handleModal({ title: 'Add New Item', }) }}>Add</Button>
            </div>
            : null}
        <ExcelReader
            setShowModal={() => setShowUploadModal(!showUploadModal)}
            getData={sendData}
            showModal={showUploadModal} />

        <Table striped bordered hover  className="dash-table">
            <thead >
                <tr>
                    <th>Select</th>
                    <th></th>
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
                    <th></th>
                    {/* <th>
                    </th> */}
                </tr>
            </thead>
            <tbody>
                {items &&  items.map((item, index) => {
                    return <tr key={index}>
                        <td> <input
                            type="checkbox"
                            checked={checked.find((y) => y.uid == item.uid) ? true : false}
                            onChange={(e) => createArr(item.uid, item)}
                        />
                        </td>
                        <td><Button variant="contained" color="primary" 
                         onClick={(event) => {
                             if (user.auth.userName === item.responsible_entity || user.auth.role === 'L3' ) {
                            setOperation('edit'); setItem(item); handleModal({ title: 'Edit Item', data: item });
                             }
                             else {alert ('You are not allowed to edit this item...')}
                          }}
                        >EDIT</Button></td>
                        <td>{item.week}</td>
                        <td>{item.date}</td>
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
                        <td><Button variant="contained" color="secondary" disabled={true} onClick={() => { alert('delete') }}>Delete</Button></td>
                    </tr>
                })}
            </tbody>
        </Table>
        {showModal ? (
        <SimpleModal
          //formValidator={formCheck}
          // setShowModalOpen={showModal}
          item={selectedItem}
          handleModal={handleModal}
          handleClose={handleModal}
          saveFunction={operation === 'add' ? addMoreItems : updateItem}
          handleInputValues={handleInputValues}
          operation={operation}
        />
      ) : null}

    </div>)
}

export default Tac