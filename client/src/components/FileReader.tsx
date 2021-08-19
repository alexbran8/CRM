import React from 'react'
import { Button, Modal, Container } from 'react-bootstrap'

const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function (x) { return "." + x; }).join(",");
  
  const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
    return o;
  };

  

const FileReader = (props) => {
    console.log(props)

    const handleModalShowHide = () => {
        this.setState({ showHide: !this.state.showHide })
      }
    
      const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
      };
    
     const  handleFile =() => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
    
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: false, cellDates: true });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {
            header: 0,
            defval: "",
            raw: false,
            dateNF: 'YYYY-MM-DD'
          }
    
          );
          let filteredData = data.filter(data => data.Etat == 'A réaliser')
          /* Update state */
          this.setState({ data: filteredData, cols: make_cols(ws['!ref']) }, () => {
            this.appendProjectName();
            this.sendData(this.state.data);
            //console.log(JSON.stringify(this.state.data, null, 2));
          });
    
        };
    
        if (rABS) {
          reader.readAsBinaryString(this.state.file);
        } else {
          reader.readAsArrayBuffer(this.state.file);
        };
      }

      

    return (<div>
        <Modal show={props.showModal} className="upload-modal">
            <Modal.Header >
                <Modal.Title>Upload Page</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShowModal()}>
                    Close
                </Button>
                <Button variant="primary"
                    onClick={() => { handleFile(); props.setShowModal(); }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal></div>)
}

export default FileReader