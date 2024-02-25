import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Adminnav = () => {
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Log out successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <Link to={'/addcase'}>Add Case</Link>
      <Link to={'/caseofficer'}>Add Case officer</Link>
      <Link to={'/viewcase'}>View cases</Link>
      <button onClick={() => logOut()}>Logout</button> */}

      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Crime</Navbar.Brand>
          <Nav className="mx-auto d-flex gap-3">
            <Link to={"/addcase"}>Add Case</Link>
            <Link to={"/caseofficer"}>Add Case officer</Link>
            <Link to={"/viewcase"}>View cases</Link>
          </Nav>
          
          <Button variant="danger" onClick={() => logOut()}>Logout</Button>
        </Container>
      </Navbar>
    </>
  );
};

export default Adminnav;
