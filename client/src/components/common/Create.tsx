
import { useState } from "react";
import FormPropsTextFields from "./Form";

import regeneratorRuntime from "regenerator-runtime";

  const initialFormValues = {
      appel: '',
      data: '',
      data2: '',
      abran: '',
      target: '',
      ericson: '',
      ttType: '',
      flag: '',
      upalu: '',
      language: '',
      si: '',
      problematique: '',
      tt: '',
      itv: '',
      onSait: '',
      norm: '',
      mainCause: '',
      action: '',
      ttCreator: '',
      technician: '',
      collage: '',
      time: '',
      sousCause: '',
      corectiveAction: '',
      processStatus: '',
      inverted: '',
      bagot: '',
      active: '',
      formSubmitted: false,
      success: false,
      id: '',
    }


    
  
  export const useFormControls = () => {
    // We'll update "values" as the form updates
    const [values, setValues] = useState(initialFormValues);
    // "errors" is used to check the form for errors
    const [errors, setErrors] = useState({} as any);

    const validate: any = (fieldValues = values) => {
      let temp: any = { ...errors }
  
      if ("appel" in fieldValues)
        temp.appel = fieldValues.appel ? "" : "This field is required."

      if ("flag" in fieldValues)
        temp.flag = fieldValues.flag ? "" : "This field is required."

        if ("tt" in fieldValues)
        temp.tt = fieldValues.tt ? "" : "This field is required."

        if ("ttCreator" in fieldValues)
        temp.ttCreator = fieldValues.ttCreator ? "" : "This field is required."

        if ("data" in fieldValues)
        temp.data = fieldValues.data ? "" : "This field is required."

        if ("data2" in fieldValues)
        temp.data2 = fieldValues.data2 ? "" : "This field is required."
        
        // if ("data" in fieldValues) {
        //   temp.data = fieldValues ? "" : "This field is required."
        //   if (fieldValues.data)
        //     temp.data =fieldValues.data
        //       ? ""
        //       : "Date is not valid."
        //}

        if ("time" in fieldValues)
        temp.time = fieldValues.time ? "" : "This field is required."

        if ("itv" in fieldValues)
        temp.itv = fieldValues.itv ? "" : "This field is required."

        if ("technician" in fieldValues)
        temp.technician = fieldValues.technician ? "" : "This field is required."

        if ("abran" in fieldValues)
        temp.abran = fieldValues.abran ? "" : "This field is required."

        if ("upalu" in fieldValues)
        temp.upalu = fieldValues.upalu ? "" : "This field is required."

        if ("onSait" in fieldValues)
        temp.onSait = fieldValues.onSait ? "" : "This field is required."

        if ("collage" in fieldValues)
        temp.collage = fieldValues.collage ? "" : "This field is required."

        
        if ("target" in fieldValues)
        temp.target = fieldValues.target ? "" : "This field is required."

        
        if ("language" in fieldValues)
        temp.language = fieldValues.language ? "" : "This field is required."

        if ("norm" in fieldValues)
        temp.norm = fieldValues.norm  ? "" : "This field is required."

        if ("ericson" in fieldValues)
        temp.ericson = fieldValues.ericson  ? "" : "This field is required."

        if ("si" in fieldValues)
        temp.si = fieldValues.si  ? "" : "This field is required."

        if ("mainCause" in fieldValues)
        temp.mainCause = fieldValues.mainCause  ? "" : "This field is required."

        if ("sousCause" in fieldValues)
        temp.sousCause = fieldValues.sousCause  ? "" : "This field is required."

        if ("ttType" in fieldValues)
        temp.ttType = fieldValues.ttType ? "" : "This field is required."

        if ("problematique" in fieldValues)
        temp.problematique = fieldValues.problematique  ? "" : "This field is required."
  
        if ("action" in fieldValues)
        temp.action = fieldValues.action ? "" : "This field is required."

        if ("corectiveAction" in fieldValues)
        temp.corectiveAction = fieldValues.corectiveAction  ? "" : "This field is required."

        if ("processStatus" in fieldValues)
        temp.processStatus = fieldValues.processStatus  ? "" : "This field is required."

        if ("inverted" in fieldValues)
        temp.inverted = fieldValues.inverted ? "" : "This field is required."

        if ("bagot" in fieldValues)
        temp.bagot = fieldValues.bagot ? "" : "This field is required."

        if ("active" in fieldValues)
        temp.active = fieldValues.active ? "" : "This field is required."

      setErrors({
        ...temp
      });
    }
    const handleInputValue = (e: any, name:string) => {
      setValues({
        ...values,

        [name]: e.target.value
      });
      validate({ [name]: e.target.value });
      console.log(name);
      console.log(e.target.value);
     // console.log(e.target);
      console.log(values);
    };
    const handleFormSubmit = async (e: any) => {
      e.preventDefault();
      // if (formIsValid()) {
        
        await FormPropsTextFields(values);
        alert(JSON.stringify(e));
      //   alert("You've posted your form!");
        
        
      
      
    };
    const formIsValid = (fieldValues = values) => {
      const isValid =
        fieldValues.appel &&
        fieldValues.abran &&
        fieldValues.flag &&
        fieldValues.tt &&
        fieldValues.ttCreator &&
        Object.values(errors).every((x) => x === "");
  
      return isValid;
    };
   return {
      handleInputValue,
      handleFormSubmit,
      formIsValid,
      errors
    };
  }
