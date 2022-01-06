import React from 'react';
import FormPropsTextFields from "../common/Form";
export const AddEditModal = (props) => {
    <div 
    // style={modalStyle} 
    // className={classes.paper}
    >
      {/* <div><b>{props.title}</b></div> */}
      
     <button className={classes.button} type="button" onClick={props.handleModal}>
        <CloseIcon />
      </button>

      <button 
      className={classes.button} 
      // type="button"
      >
        <DoneIcon />
        Create
      </button>
     {/* <FormPropsTextFields 
     values={props.item.data}
     user={props.user}
     userList={props.userList}
     operation={props.operation}
     handleInputValues={props.handleInputValues}
     saveFunction={props.saveFunction}
     /> */}
     
    </div>
}