import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Button from '@material-ui/core/Button';

export const ExportToExcel = ({ getData, fileName, operationName }) => {



  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {

    getData.then((data) => {
      const ws = XLSX.utils.json_to_sheet(data.getAll);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data2 = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data2, fileName + fileExtension);
    })
  };

  return (
    <Button variant="contained" color="primary" onClick={(e) =>
      exportToCSV({}, fileName)
    }>{operationName}</Button>
  );
};