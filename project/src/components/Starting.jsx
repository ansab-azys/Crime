import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

const Starting = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <h2>Are you admin or officer?</h2>
      <div className="d-flex gap-2">
        <Button type="primary"><Link to={"/admin"} className="text-white text-decoration-none">Admin</Link></Button>
        <Button type="primary"><Link to={"/signin"} className="text-white text-decoration-none">Officer</Link></Button>
        
        
      </div>
    </div>
  );
};



export default Starting;
