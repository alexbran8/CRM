import data from "./data.json";
import "./Table.css"
import React, {useState, useEffect} from "react"

import Button from "@material-ui/core/Button";


const Table = () => {
    const [dataInput, setDataInput] = useState(data);
    const [collumns, setCollumns] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
      id: "",
      fullName: "",
      nameEvents: [],
    });
    function openModal(id, fullName, nameEvents) {
      setModalData({
        id: id,
        fullName: fullName,
        nameEvents: nameEvents,
      });
      setModalIsOpen(true);
    }
    useEffect(() => {
      addAtributes(data, "nameEvents");
    }, []);
    function getEvents(nameEvents) {
      return nameEvents.map((value) =>
        Object.values(value).map((items) => {
          let item = items;
          return item + " ";
        })
      );
    }
    function addAtributes(data, field) {
      let newData = data.map((obj) => ({
        ...obj,
        nrOfEvents: obj[field].length,
        events: getEvents(obj[field], "\n"),
      }));
      setDataInput(newData);
      getCollumns(newData, "nameEvents");
    }
    const getCollumns = (data, colToRemove) => {
      let array = [];
      for (let i in data) {
        let val = data[i];
        for (let j in val) {
          let sub_key = j;
          array.push(sub_key);
        }
      }
      const unique = [...new Set(array)];
  
      const index = unique.indexOf(colToRemove);
      if (index > -1) {
        unique.splice(index, 1);
      }
      setCollumns(unique);
    };
    return (
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              {collumns &&
                collumns.map((val, index) => <td key={index}>{val}</td>)}
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {dataInput.map((dataInfo, index) => {
              return (
                <tr key={index}>
                  {collumns &&
                    collumns.map((item) => {
                      return (
                        <td>
                          {typeof dataInfo[item] === "object"
                            ? dataInfo[item]
                            : dataInfo[item]}
                        </td>
                      );
                    })}
                  <td>
                    <Button
                      onClick={() =>
                        openModal(
                          dataInfo.id,
                          dataInfo.fullName,
                          dataInfo.nameEvents
                        )
                      }
                    >
                      <p> Open Timeline</p>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <ModalApp
          id={modalData.id}
          fullName={modalData.fullName}
          nameEvents={modalData.nameEvents}
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
        ></ModalApp> */}
      </div>

      
    );
  };
  
  export default Table