import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InputGroup } from 'react-bootstrap'; 
import { Form, Button } from 'react-bootstrap';

const Admin = () => {
  //State
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  //SignIn handler
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        console.log(user.user.email);
        navigate('/adminhome')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={signIn} className="d-flex justify-content-center align-items-center flex-column gap-2"
      style={{ height: "100vh" }}>
        <h2>Admin Sign in</h2>

        <InputGroup className="w-25">
          <Form.Control type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        </InputGroup>


        <InputGroup className="w-25">
          <Form.Control type="password" placeholder="password" onChange={(e) => setPass(e.target.value)} />
        </InputGroup>

        <Button variant="success" onClick={signIn}>Log in</Button>
        
      </form>
    </>
  );
};

export default Admin;
