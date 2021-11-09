import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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

// import { FormControl } from '@mui/material';
// import Input from '@mui/material/Input';


const actionList = ["ITV terrain", "Action à distance", "Escalader le ticket", "Ticket déjà fermé/cloturé", "Ticket à fermer", "Analyser au N2/N3", "ITV + Action à distance", "TI Gelé"];
const appelList = ["SSNE", "CLA", "Assigné", "Appel", "LdR", "Pre-check", "Suivi", "Supervision NE", "Taskforce", "Taskforce RdP"]
const constructorList = ["ERICSSON","HUAWEI","NOKIA","NORTEL","OTHER"]
const incidentTypeList = ["Vigie","Radio","Transmission","Cœur","Performance QoS"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    primaryColor: {
      color: 'rgb(169,169,169)',
    },
    secondaryColor: {
      color: 'blue'
    },
    label: {
      backgroundColor: 'rgb(169,169,169)',
      width: 'auto',
      height: '56px',
      border: '1px groove black',
      display: 'flex',
      alignItems: 'center',
    },
    right: {
      float: 'right',
      display: 'flex',
      flexDirection: 'column',
      marginRight: '150px',
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
  const { register, handleSubmit, control } = useForm({});


  // const {register, handleSubmit} = useForm<Profile>()

  // const [state, setState] = useState({
  //   appel: '',
  //   data: '',
  //   abran: '',
  //   target: '',
  //   ericson: '',
  //   ttType: '',
  //   flag: '',
  //   upalu: '',
  //   language: '',
  //   si: '',
  //   problematique: '',
  //   tt: '',
  //   itv: '',
  //   onSaint: '',
  //   norm: '',
  //   mainCause: '',
  //   action: '',
  //   ttCreator: '',
  //   technician: '',
  //   collage: '',
  //   time: '',
  //   sousCause: '',
  //   corectiveAction: '',
  //   bagot: '',
  //   active: '',

  // });

  //   const changeState = (e:any) => {
  //     setForms({
  //       ...forms,
  //       appel: e.target.values,
  //       data: e.target.values,
  //       abran: e.target.values,
  //       target: e.target.values,
  //       ericson: e.target.values,
  //       ttType: e.target.values,
  //       flag: e.target.values,
  //       upalu: e.target.values,
  //       language: e.target.values,
  //       si: e.values,
  //       problematique: e.target.values,
  //       tt: e.target.values,
  //       itv: e.target.values,
  //       onSaint: e.target.values,
  //       norm: e.target.values,
  //       mainCause: e.target.values,
  //       action: e.target.values,
  //       ttCreator: e.target.values,
  //       technician: e.target.values,
  //       collage: e.target.values,
  //       time: e.target.values,
  //       sousCause: e.target.values,
  //       corectiveAction: e.target.values,
  //       bagot: e.target.values,
  //       active: e.target.values,

  //     })
  //   }

  // React.useEffect(() => {
  //   const json = localStorage.getItem("form");
  //   const loadedForm = JSON.parse(json);
  //   if (loadedForm) {
  //     setForms(loadedForm);
  //   }
  // }, []);


  // function deleteForm(id) {
  //   let updatedforms = [...forms].filter((forms) => form.id !== id);
  //   setForms(updatedForms);
  // }

  const {
    handleInputValue,
    handleFormSubmit,
    // formIsValid,
    errors
  } = useFormControls();

  console.log({ props })

  const onSubmit = (data: any) => { console.log(data); props.saveFunction(data) }

  return (
    <Grid container>
      <div className="add-from">
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <Typography className={classes.primaryColor} >
              Main Info
            </Typography>
            <Divider
              style={{ marginTop: 20 }}
            />
            <Grid container direction="row" className={classes.mainHeader}>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="task"
                  defaultValue={props.operation === 'edit' ? props.values.task : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="task"
                      options={appelList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="appel"
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
                      label="date"
                      
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  rules={{ required: 'Date is required' }}
                />
                <Controller
                  control={control}
                  name="responsible"
                  defaultValue={props.operation === 'edit' ? props.values.responsible_entity : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="responsible"
                      options={appelList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="responsible"
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
                      label="site"
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
                          label="constructor"
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
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="tt type"
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'incident type is required' }}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="task"
                  defaultValue={props.operation === 'edit' ? props.values.task : null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value}
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      id="task"
                      options={appelList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="appel"
                        />
                      )}
                    />
                  )}
                  rules={{ required: 'TT TYPE is required' }}
                />
                {/* <Controller
                control={control}
                name="action"
                defaultValue={props.operation === 'edit' ? props.values.type : null}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    id="action"
                    options={actionList}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="action"
                      />
                    )}
                  />
                )}
                rules={{ required: 'Action is required' }}
              />

              <TextField
                id="appel"
                select
                variant="outlined"
                // onInput={e => setAppel(e.target.value)}
                // {...register('appel')}
                onBlur={(e) => { handleInputValue(e, 'appel') }}
                onChange={(e) => { handleInputValue(e, 'appel') }}
                {...(errors["appel"] && { error: true, helperText: errors["appel"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <div className={classes.label}>
                        <ListIcon />
                      </div>
                      <label> Appel</label>

                    </InputAdornment>

                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                // {...register("flag")}
                onChange={(e) => { handleInputValue(e, 'flag') }}
                onBlur={(e) => { handleInputValue(e, 'flag') }}
                {...(errors["flag"] && { error: true, helperText: errors["flag"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label} >
                        <FlagIcon />
                      </div>
                      <label>------</label>
                    </InputAdornment>
                  )
                }}
              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="standard-basic"
                variant="outlined"
                // {...register("tt")}

                onBlur={(e) => { handleInputValue(e, 'tt') }}
                onChange={(e) => { handleInputValue(e, 'tt') }}
                {...(errors["tt"] && { error: true, helperText: errors["tt"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <label> TT  </label>
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                id="standard-basic"
                variant="outlined"
                // {...register("ttCreator")}
                onBlur={(e) => { handleInputValue(e, 'ttCreator') }}
                onChange={(e) => { handleInputValue(e, 'ttCreator') }}
                {...(errors["ttCreator"] && { error: true, helperText: errors["ttCreator"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>

                        <label > TT Creator </label>
                      </div>
                    </InputAdornment>
                  )
                }}
              />


              <TextField
                id="standard-select-currency"
                select
                variant="filled"
                onBlur={(e) => { handleInputValue(e, '#') }}
                onChange={(e) => { handleInputValue(e, '#') }}
                {...(errors["#"] && { error: true, helperText: errors["#"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <label> # </label>
                      </div>
                      <label>  ----- </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-multiline-static"
                label="TAC comment here!"
                multiline
                rows={14}
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'Chat') }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>

                        <ChatBubbleOutlineIcon />
                      </div>

                    </InputAdornment>
                  )
                }}
              />


              <TextField
                id="data"
                type="date"
                variant="outlined"
                onBlur={(e) => { handleInputValue(e, 'data') }}
                onChange={(e) => { handleInputValue(e, 'data') }}
                {...(errors["data"] && { error: true, helperText: errors["data"] })}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>

                        <CalendarTodayIcon />
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="data"
                type="date"
                variant="outlined"
                onBlur={(e) => { handleInputValue(e, 'data2') }}
                onChange={(e) => { handleInputValue(e, 'data') }}
                {...(errors["data2"] && { error: true, helperText: errors["data2"] })}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <div className={classes.label}>
                        <CalendarTodayIcon />
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                id="outlined-required"
                variant="outlined"
                onBlur={(e) => { handleInputValue(e, 'itv') }}
                onChange={(e) => { handleInputValue(e, 'itv') }}
                {...(errors["itv"] && { error: true, helperText: errors["itv"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <label> ITV </label>
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                id="outlined-required"
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'technician') }}
                onBlur={(e) => { handleInputValue(e, 'technician') }}
                {...(errors["technician"] && { error: true, helperText: errors["technician"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <label>Technician </label>
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                // onBlur={handleInputValue}
                onChange={(e) => { handleInputValue(e, 'abran') }}
                onBlur={(e) => { handleInputValue(e, 'abran') }}
                {...(errors["abran"] && { error: true, helperText: errors["abran"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <PersonIcon />
                      </div>
                      <label> abran</label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="outlined-required"
                placeholder="UPALU"
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'upalu') }}
                onBlur={(e) => { handleInputValue(e, 'upalu') }}
                {...(errors["upalu"] && { error: true, helperText: errors["upalu"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <AlternateEmailIcon />
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'onSait') }}
                onBlur={(e) => { handleInputValue(e, 'onSait') }}
                {...(errors["onSait"] && { error: true, helperText: errors["onSait"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <label>On sait traiter </label>
                      </div>
                      <label>Oui </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'collage') }}
                onBlur={(e) => { handleInputValue(e, 'collage') }}
                {...(errors["collage"] && { error: true, helperText: errors["collage"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span>Collage </span>
                      </div>
                      <label> NON </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>


              <TextField
                required
                id="outlined-required"
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'target') }}
                onBlur={(e) => { handleInputValue(e, 'target') }}
                {...(errors["target"] && { error: true, helperText: errors["target"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <GpsFixedIcon />
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'language') }}
                onBlur={(e) => { handleInputValue(e, 'language') }}
                {...(errors["language"] && { error: true, helperText: errors["language"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <LanguageIcon />
                      </div>
                      <label> ------ </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'norm') }}
                onBlur={(e) => { handleInputValue(e, 'norm') }}
                {...(errors["norm"] && { error: true, helperText: errors["norm"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> Norm</span>
                      </div>
                      <label> ------- </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="time"
                type="time"
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'time') }}
                onBlur={(e) => { handleInputValue(e, 'time') }}
                {...(errors["time"] && { error: true, helperText: errors["time"] })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 0, // 5 min
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <AccessTimeIcon />
                      </div>
                    </InputAdornment>
                  )
                }}
              />


              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'ericson') }}
                onBlur={(e) => { handleInputValue(e, 'ericson') }}
                {...(errors["ericson"] && { error: true, helperText: errors["ericson"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <PhoneIphoneIcon />
                      </div>
                      <label> ERICSSON </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="outlined-required"
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'si') }}
                onBlur={(e) => { handleInputValue(e, 'si') }}
                {...(errors["si"] && { error: true, helperText: errors["si"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> SI </span>
                      </div>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'mainCause') }}
                onBlur={(e) => { handleInputValue(e, 'mainCause') }}
                {...(errors["mainCause"] && { error: true, helperText: errors["mainCause"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> Main Cause </span>
                      </div>
                      <label> --------</label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'sousCause') }}
                onBlur={(e) => { handleInputValue(e, 'sousCause') }}
                {...(errors["sousCause"] && { error: true, helperText: errors["sousCause"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> Sous Cause</span>
                      </div>
                      <label> -------- </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>





              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'ttType') }}
                onBlur={(e) => { handleInputValue(e, 'ttType') }}
                {...(errors["ttType"] && { error: true, helperText: errors["ttType"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <div className={classes.label}>
                        <span >TT Type</span>
                      </div>
                      <label> -------</label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'problematique') }}
                onBlur={(e) => { handleInputValue(e, 'problematique') }}
                {...(errors["problematique"] && { error: true, helperText: errors["problematique"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <div className={classes.label}>
                        <span> Problematique </span>
                      </div>
                      <label> -------</label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'action') }}
                onBlur={(e) => { handleInputValue(e, 'action') }}
                {...(errors["action"] && { error: true, helperText: errors["action"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> Action</span>
                      </div>
                      <label>-------- </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'corectiveAction') }}
                onBlur={(e) => { handleInputValue(e, 'corectiveAction') }}
                {...(errors["corectiveAction"] && { error: true, helperText: errors["corectiveAction"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> Corective Action </span>
                      </div>
                      <label>------- </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="filled-required"
                variant="filled"
                onChange={(e) => { handleInputValue(e, 'processStatus') }}
                onBlur={(e) => { handleInputValue(e, 'processStatus') }}
                {...(errors["processStatus"] && { error: true, helperText: errors["processStatus"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <span> Process Status </span>
                      </div>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                required
                id="filled-required"
                variant="filled"
                onChange={(e) => { handleInputValue(e, 'inverted') }}
                onBlur={(e) => { handleInputValue(e, 'inverted') }}
                {...(errors["inverted"] && { error: true, helperText: errors["inverted"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <div className={classes.label}>
                        <span > Inverted by </span>
                      </div>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'bagot') }}
                onBlur={(e) => { handleInputValue(e, 'bagot') }}
                {...(errors["bagot"] && { error: true, helperText: errors["bagot"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className={classes.label}>
                        <NotificationsIcon />
                        <span>-Bagot</span>
                      </div>
                      <label> Non</label>
                    </InputAdornment>
                  )
                }}

              >

                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="standard-select-currency"
                select
                variant="outlined"
                onChange={(e) => { handleInputValue(e, 'active') }}
                onBlur={(e) => { handleInputValue(e, 'active') }}
                {...(errors["active"] && { error: true, helperText: errors["active"] })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <div className={classes.label}>
                        <NotificationsNoneIcon />
                        <span >-Active</span>
                      </div>
                      <label>OUI </label>
                    </InputAdornment>
                  )
                }}

              >
                {actionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>



          </Grid>

        </form>
      </div>
    </Grid>

  );
}
