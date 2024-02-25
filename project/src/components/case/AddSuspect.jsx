import React, { useState } from "react";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";

const AddSuspect = () => {
  const [relation, setRelation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [area, setArea] = useState("");
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const migrateData = async () => {
    const usersCollectionRef = collection(db, "case"); //gets the root collection
    // const { id } = await addDoc(usersCollectionRef, {}); // Creates a new document in the root collection

    const usersSubCollectionGeneralRef = collection(db, `case/${id}/suspect`); //Creates a sub collection in the just created document

    const { idGeneral } = await addDoc(usersSubCollectionGeneralRef, {
      name: name,
      relation: relation,
      phone: phone,
      address: addr,
      area: area,
    }); //Creates a document in the newly created collection

    setAddr("")
    setArea("")
    setName("")
    setPhone("")
    setRelation("")
  };

  return (
    <div  className="d-flex justify-content-center align-items-center flex-column gap-2"
    style={{ height: "90vh" }}>
      <h2>Add suspect</h2>
      <InputGroup className="w-25">
        <Form.Control
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="w-25">
        <Form.Control
          type="text"
          value={relation}
          placeholder="relation"
          onChange={(e) => setRelation(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="w-25">
        <Form.Control
        type="text"
        value={phone}
        placeholder="phone number"
        onChange={(e) => setPhone(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="w-25">
        <Form.Control
         type="text"
         value={addr}
         placeholder="address"
         onChange={(e) => setAddr(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="w-25">
        <Form.Control
          type="text"
          value={area}
          placeholder="area"
          onChange={(e) => setArea(e.target.value)}
        />
      </InputGroup>
      <Button onClick={migrateData}>Add</Button>
    </div>
  );
};

export default AddSuspect;
