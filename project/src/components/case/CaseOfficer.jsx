import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import Adminnav from "../navbar/Adminnav";
import { addDoc, collection } from "firebase/firestore";
import { Button, Form, InputGroup } from "react-bootstrap";

function CaseOfficer() {
  //State
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [area, setArea] = useState("");
  const [data, setData] = useState();

  const caseCollection = collection(db, "officer");

  //SignUp handler
  const signUp = async (e) => {
    e.preventDefault();

    //Add user to firestore
    try {
      const ref = await addDoc(caseCollection, {
        name: name,
        email: email,
        phone: phone,
        address: addr,
        area: area,
      });

      createUserWithEmailAndPassword(auth, email, pass)
      .then(async (data) => {
        const user = data.user;
        await updateProfile(user, {
          displayName: ref.id,
        });
      })
      setAddr("")
      setArea("")
      setEmail("")
      setName("")
      setPass("")
      setPhone("")

    } catch (error) {
      console.log(error);
    }


    setEmail("");
    setName("");
    setPass("");
  };

  return (
    <>
      <Adminnav />
      <form onSubmit={signUp} className="d-flex justify-content-center align-items-center flex-column gap-2"
      style={{ height: "90vh" }}>
        <h1>Add officer</h1>

        <InputGroup className="w-25">
          <Form.Control type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control  type="password"
          value={pass}
          placeholder="password"
          onChange={(e) => setPass(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control  type="text"
          value={phone}
          placeholder="phone number"
          onChange={(e) => setPhone(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control type="text"
          value={addr}
          placeholder="address"
          onChange={(e) => setAddr(e.target.value)} />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control type="text"
          value={area}
          placeholder="area"
          onChange={(e) => setArea(e.target.value)} />
        </InputGroup>

        <Button value="success" type="submit">Add</Button>
      </form>
    </>
  );
}

export default CaseOfficer;
