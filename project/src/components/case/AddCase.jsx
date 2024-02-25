import React, { useEffect, useRef, useState } from "react";
import Adminnav from "../navbar/Adminnav";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { InputGroup, Form, Dropdown, Button } from 'react-bootstrap';

const AddCase = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [offcerId, setOfficerID] = useState([]);
  const [value, setValue] = useState("")
  const ref = useRef()


  const caseCollection = collection(db, "case");
  const officerCollection = collection(db, "officer");

  const submitHandler = async () => {
    try {
      await addDoc(caseCollection, {
        ID: id,
        Name: name,
        Note: note,
        OfficerId: value,
      });
      setId("")
      setName("")
      setNote("")
      setValue("")
      
    } catch (err) {
      console.log(err);
    }
    alert("Submitted");
  };

  const getOfficersList = async () => {
    try {
      const data = await getDocs(officerCollection);
      
      const filteredData = data.docs.map((dt) => ({
        ...dt.data(),
        id: dt.id,
      }));
      setOfficerID(filteredData)
      
      
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getOfficersList();
  }, []);

  
  console.log(value)

  return (
    <>
      <Adminnav />
      
      <div className="d-flex justify-content-center align-items-center flex-column gap-2"
      style={{ height: "90vh" }}>
      <h2>Add case</h2>

        <InputGroup className="w-25">
          <Form.Control type="number"  placeholder="case id"  value={id}
          onChange={(e) => setId(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control type="text" value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control type="text" value={note}
          placeholder="note"
          onChange={(e) => setNote(e.target.value)} />
        </InputGroup>

        
       <div>
        <Form.Select name="case " defaultValue={value} onChange={(e) => setValue(e.target.value)} id="case">
        <option value="" selected hidden>Select a officer</option>
        {offcerId.map((data) => (
            <option key={data.id} ref={ref} value={data.id}>{data.name}</option>
            
            ))}
        </Form.Select>
       </div>
      
       <Button variant="success" onClick={submitHandler}>Add</Button>
      </div>
    </>
  );
};

export default AddCase;
