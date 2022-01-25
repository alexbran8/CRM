import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

import "./Modal.scss"



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      float: 'right',
      backgroundcolor: 'red',
    },
  }),
);

export default function GenericModal(props: any) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(props.getModalStyle);

  return (
    <div>
      <Modal
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "md" }}
        className="generic-modal"
        // setShowModalOpen={open}
        // body={props.body}
        open={props.open}
        onClose={props.handleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div><b>{props.title}</b>
            <button className={classes.button} type="button" onClick={props.handleClose}>
              <CloseIcon />
            </button></div>
          {props.children}
          <div>{props.body}</div>
        </div>
      </Modal>
    </div>

  );
}
