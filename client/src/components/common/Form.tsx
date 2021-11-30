import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, styled } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { InputAdornment } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


import ListIcon from '@material-ui/icons/List';
import FlagIcon from '@material-ui/icons/Flag';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LanguageIcon from '@material-ui/icons/Language';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';


import { useFormControls } from './Create';

import "./Form.scss"



const actionList = ["ITV terrain", "Action à distance", "Escalader le ticket", "Ticket déjà fermé/cloturé", "Ticket à fermer", "Analyser au N2/N3", "ITV + Action à distance", "TI Gelé"];
const appelList = ["SSNE", "CLA", "Assigné", "Appel", "LdR", "Pre-check", "Suivi", "Supervision NE", "Taskforce", "Taskforce RdP"]
const constructorList = ["ERICSSON", "HUAWEI", "NOKIA", "NORTEL", "OTHER"]
const incidentTypeList = ["Vigie", "Radio", "Transmission", "Cœur", "Performance QoS"]
const statusList = ['Problème résolu', 'Problème résolu avec réserve', 'Problème pas identifié']
const regionList = ["CTA", "MED", "NOE", "SWE", "WST", "IDF"]
const hashtagTacList = ["Déjà fermé", "Modifié plus", "Modifié", "Kill TT", "Conforme"]

const problemList = ["Alarme externe / Environnement", "Autres", "Licence",
  "Perte de supervision",
  "Perte de capacité",
  "Site entier HS",
  "Site entier en bagot",
  "Techno HS",
  "Techno en bagot",
  "Cellule(s) HS",
  "Cellule(s) en bagot",
  "Plusieurs sites HS",
  "Plusieurs sites en bagot",
  "RSSI/RTWP",
  "PIM",
  "VSWR",
  "X Feeder & X Secteur",
  "TEA",
  "TDC",
  "TEA/TDC",
  "Baisse du trafic",
  "Dégradation HO",
  "RET",
  "RET et TMA",
  "TMA"]

const mainCauseList = ["Logicielles - Outils / Bases des dates",
  "Voisinage",
  "Unité Radio (MRFU, RRU, RUS)",
  "Triplexeur",
  "TMA",
  "TRX",
  "SFP",
  "Serrages",
  "RET",
  "RET / TMA",
  "Quadriplexeur",
  "Huawei Châssis BBU",
  "ADM/XCA",
  "Aménagement",
  "Antenne",
  "ASC",
  "Atelier Energie / Disjoncteur",
  "alarme RET",
  "Huawei 4G - LMPT",
  "Huawei 4G - LBBP",
  "Boitier Hybride",
  "Bretelles",
  "Brouilleur externe",
  "Brouilleur interne",
  "Câblage",
  "Conf CEMV2",
  "Conf Cœur / BSC / RNC",
  "Huawei 3G / 4G - UBBP",
  "Ericsson 4G - Baseband",
  "Huawei 2G - GTMU",
  "Huawei 3G - WBBP",
  "Huawei 3G - WMPT",
  "Huawei 3G / 4G - UMPT",
  "FHT",
  "PTN",
  "Conf Radio",
  "Conf Trans",
  "Connecteurs",
  "Diplexeur",
  "Ericsson - SIU",
  "Ericsson 2G - DUG",
  "Ericsson 3G - DUW",
  "Ericsson 4G - DUS",
  "Ericsson 4G - XMU",
  "Fan Unit (FMU)",
  "Fibres",
  "DUS HS",
  "RRU HS",
  "connecteur SFP défectueux",
  "Tilt NOK"
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '26ch',
        // borderBottom: '1px solid rgb(215 50 50 / 70%)'
      },
      
    },
    mandatory: {
      borderBottom: '1px solid red'
    },
 
  }),
);


type Profile = {
  appel: string
  data: string
  data2: string
  abran: string
  target: string
  ericson: string
  ttType: string
  flag: string
  upalu: string
  language: string
  si: string
  problematique: string
  tt: string
  itv: string
  onSait: string
  norm: string
  mainCause: string
  action: string
  ttCreator: string
  technician: string
  collage: string
  time: string
  sousCause: string
  corectiveAction: string
  processStatus: string
  inverted: string
  bagot: string
  active: string
}



export default function FormPropsTextFields(props: any) {
  const classes = useStyles();
  const { handleSubmit, control, setValue, watch } = useForm({});
  const [weekGet, setWeek] = useState()
  const [dateValue, setDateValue] = useState()


  function getWeek(date) {
    const currentdate = new Date(date);
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    var finalResult = result + '-' + currentdate.getFullYear().toString().substr(-2);
    return finalResult
  }

  const getDurartion = (norm, taskType) => {

    switch (true) {
      case norm === "T0" && taskType === "Assigné":
        return 0.28
        setFieldLock(true)
        // code block
        break;
      case norm === "T0" && taskType !== "Assigné":
        return 0.00
        // code block
        break;
      case norm === "T1":
        return 0.30
        // code block
        break;
      // case "T1" && "Appel":
      //   return 0.30
      //   // code block
      //   break;
      case norm === "T2" && taskType !== "Suivi":
        return 0.60
        // code block
        break;
      case norm === "T2" && taskType === "Suivi":
        return 0.50
        // code block
        break;
      default:
        return 0
    }
  }

  const {
    handleInputValue,
    handleFormSubmit,
    // formIsValid,
    errors
  } = useFormControls();

  console.log({ props })

  watch("norm")
  const onSubmit = (data: any) => { props.saveFunction(data) }

  return (
    <Grid container>
      <div className="add-from">
        <form
          className={classes.root}
          autoComplete="on"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            item
          // xs={12}
          >
            <Typography className={classes.primaryColor} >
              Main Info
            </Typography>
            <Divider
              style={{ marginTop: 20 }}
            />
            <Grid container direction="row" className={classes.mainHeader}>
              <Grid item xs={2}>
                <Controller
                  name="uid"
                  defaultValue={props.operation === 'edit' ? props.values.uid : null}
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      value={value}
                      id="uid"
                      type="text"
                      label="uid"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                // rules={{ required: 'uid is required' }}
                />
                <Controller
                  control={control}
                  name="task"
                  defaultValue={props.operation === 'edit' ? props.values.task : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                        setValue("duration", getDurartion(watch("NORM"), item))
                      }}
                      id="task"
                      options={appelList}
                      
                      renderInput={(params) => (
                        <TextField
                          {...params }
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="appel*"
                          className={`mandatory ${classes.textField}`}
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}

                    />
                  )}
                  rules={{ required: 'Appel is required' }}

                />
                <Controller
                  name="date"
                  control={control}
                  defaultValue={props.operation === 'edit' ? props.values.date : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="date"
                      type="date"
                      label="date*"

                      value={value}
                      className={classes.textField}
                      onChange={(event) => {
                        onChange(event.target.value);
                        setValue('week', getWeek(event.target.value))
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ borderBottom: '1px solid red' }}
                    />
                  )}
                  rules={{ required: 'Date is required' }}
                />
                <Controller
                  control={control}
                  name="responsible_entity"
                  defaultValue={props.operation === 'edit' ? props.values.responsible_entity : 'abran'}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="responsible_entity"
                      options={appelList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="responsible*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Responsible is required' }}
                />
                <Controller
                  control={control}
                  name="site"
                  defaultValue={props.operation === 'edit' ? props.values.site : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="site"
                      type="text"
                      label="site*"
                      value={value}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ borderBottom: '1px solid red' }}
                    />
                  )}
                  rules={{ required: 'Site is required' }}
                />
                <Controller
                  control={control}
                  name="site_constructor"
                  defaultValue={props.operation === 'edit' ? props.values.site_constructor : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="site_constructor"
                      options={constructorList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="constructor*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Constructor is required' }}
                />
                <Controller
                  control={control}
                  name="incident_type"
                  defaultValue={props.operation === 'edit' ? props.values.incident_type : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="task"
                      options={incidentTypeList}
                      renderInput={(params) => (
                        <TextField
                          // InputProps={{
                          //   className: classes.mandatory,
                          // }}
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="tt type*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'incident type is required' }}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  control={control}
                  name="status"
                  defaultValue={props.operation === 'edit' ? props.values.status : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="status"
                      options={statusList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="status*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'status required' }}
                />
                <Controller
                  name="week"
                  control={control}
                  defaultValue={props.operation === 'edit' ? props.values.week : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="week"
                      type="text"
                      className={classes.textField}
                      label="week"
                      disabled={true}
                      // style = {{width: 150}}
                      // defaultValue="2021-05-24"
                      // variant="filled"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="OMC_engineer"
                  defaultValue={props.operation === 'edit' ? props.values.OMC_engineer : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="OMC_engineer"
                      type="text"
                      label="upalu"
                      value={value}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="region"
                  defaultValue={props.operation === 'edit' ? props.values.region : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="region"
                      options={regionList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="region*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'region is required' }}
                />
                <Controller
                  control={control}
                  name="problem"
                  defaultValue={props.operation === 'edit' ? props.values.problem : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="problem"
                      options={problemList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="problematique*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'problematique is required' }}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  control={control}
                  name="no_incident"
                  defaultValue={props.operation === 'edit' ? props.values.no_incident : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="no_incident"
                      type="text"
                      label="TT GIR*"
                      value={value}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ borderBottom: '1px solid red' }}
                    />
                  )}
                  rules={{ required: 'TT is required' }}
                />
                <Controller
                  control={control}
                  name="no_itv"

                  defaultValue={props.operation === 'edit' ? props.values.no_itv : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="no_itv"
                      type="text"

                      label="ITV"
                      value={value}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="operation_location"
                  defaultValue={props.operation === 'edit' ? props.values.operation_location : 'OUI'}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="operation_location"
                      options={['Oui', 'Non', 'Pas complétement']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="On sait trate*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'On sait traite is required' }}
                />
                <Controller
                  control={control}
                  name="NORM"
                  defaultValue={props.operation === 'edit' ? props.values.NORM : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                        setValue("duration", getDurartion(item, watch("task")))
                      }}
                      id="NORM"
                      disabled={!watch("task")}
                      options={['T0', 'T1', 'T2', 'T3']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Norm*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Norm is required' }}
                />
                <Controller
                  control={control}
                  name="main_cause"
                  defaultValue={props.operation === 'edit' ? props.values.main_cause : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="main_cause"
                      options={mainCauseList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Main Cause*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Main Cause is required' }}
                />
                <Controller
                  control={control}
                  name="action"
                  defaultValue={props.operation === 'edit' ? props.values.action : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="action"
                      options={['OUI', 'NON']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Action*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Action is required' }}
                />
                <Controller
                  control={control}
                  name="alarm_bagot"
                  defaultValue={props.operation === 'edit' ? props.values.alarm_bagot : 'NON'}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      
                      id="alarm_bagot"
                      options={['OUI', 'NON']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Alarm Bagot*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Alarm bagot is required' }}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  control={control}
                  name="TT_creator_short"
                  defaultValue={props.operation === 'edit' ? props.values.TT_creator_short : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="TT_creator_short"
                      type="text"
                      label="TT Creator"
                      value={value}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                {/* TODO: make it mandatory when type of task is "Appel" */}
                <Controller
                  control={control}
                  name="technician"
                  defaultValue={props.operation === 'edit' ? props.values.technician : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="technician"
                      type="text"
                      label="technician (telephone)*"
                      value={value}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      style={{ borderBottom: '1px solid red' }}
                    />
                  )}
                  rules={{ required: watch('task') === 'Appel' }}
                />
                <Controller
                  control={control}
                  name="collage"
                  defaultValue={props.operation === 'edit' ? props.values.collage : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="collage"
                      options={['OUI', 'NON']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="collage*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />

                  )}
                  rules={{ required: 'collage is required' }}
                // InputProps={{
                //   className: classes.mandatory,
                // }}

                />
                <Controller
                  control={control}
                  name="duration"

                  defaultValue={props.operation === 'edit' ? props.values.duration : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="duration"
                      type="text"
                      label="duration"
                      value={value}
                      disabled={watch("NORM") !== 'T3' || props.values.norm !== 'T3'}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="root_cause"
                  defaultValue={props.operation === 'edit' ? props.values.root_cause : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="root_cause"
                      options={["Physique", "Logique", "Logique & Physique"]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Sous Cause*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Sous Cause is required' }}
                />
                <Controller
                  control={control}
                  name="corrective_action"
                  defaultValue={props.operation === 'edit' ? props.values.corrective_action : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="corrective_action"
                      options={['OUI', 'NON']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Corrective Action*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'Corrective Action is required' }}
                />
                <Controller
                  control={control}
                  name="alarm_active"
                  defaultValue={props.operation === 'edit' ? props.values.alarm_active : 'NON'}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="alarm_active"
                      options={['OUI', 'NON']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="alarme_active*"
                          style={{ borderBottom: '1px solid red' }}
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'alarm_active is required' }}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  control={control}
                  name="hastagTac"
                  defaultValue={props.operation === 'edit' ? props.values.hastagTac : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="hastagTac"
                      options={hashtagTacList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="#"
                        />
                      )}
                    />
                  )}
                // rules={{ required: '# is required' }}
                />
                <Controller
                  control={control}
                  name="comment_tac"
                  defaultValue={props.operation === 'edit' ? props.values.comment_tac : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      // className={classes.notchedOutline}
                      id="comment_tac"
                      style={{ borderColor: 'orange' }}
                      type="text"
                      label="comment_tac"
                      value={value}
                      multiline
                      rows={20}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
              {props.operation}
            </Button>



          </Grid>

        </form>
      </div>
    </Grid>

  );
}
