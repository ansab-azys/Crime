import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import Adminnav from "../navbar/Adminnav";
import CaseDetails from "./details/CaseDetails";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const ViewCase = () => {
  const [fir, setFir] = useState([]);
  const [id, setId] = useState('')
  const caseCollection = collection(db, "case");
  const navigate = useNavigate()

  const getCaseList = async () => {
    try {
      const data = await getDocs(caseCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFir(filteredData);
    } catch (error) {
      console.log(error);
    }
    console.log(fir);
  };


  useEffect(() => {
    getCaseList();
  }, []);


  return (
    <>
    <Adminnav />
    <div className="d-flex mt-5 align-items-center flex-column gap-2"
      style={{ height: "90vh" }}>
      <Table striped bordered className="w-75 text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Note</th>
          </tr>
        </thead>
        {fir.map((dt) => (
          <tbody key={dt.id}>
            <tr>
              <td>{dt.ID}</td>
              <td>{dt.Name}</td>
              <td>{dt.Note}</td>
              <td><Button variant="secondary" onClick={() => navigate("/addresult", {state: dt.id})}>Result</Button></td>
              <td><Button variant="secondary" onClick={() => {
                setId(id);
                navigate("/suspects", {state: dt.id})
              }}>view Suspects</Button></td>
              <td><Button variant="secondary" onClick={() => {
                navigate("/evidence", {state: dt.id})
              }}>view evidence</Button></td>
              <td><Button variant="secondary" onClick={()=> {
                navigate("/prediction", {state: dt.id})
              }}>view prediction</Button></td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
    </>
  );
};

export default ViewCase;
