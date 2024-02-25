import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../../config/firebase";
import "./app.css";
import { Table } from "react-bootstrap";
import Adminnav from "../../navbar/Adminnav";

const Suspects = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const id = location.state;

  const getSuspectList = async () => {
    try {
      const data = await getDocs(collection(db, "case", id, "suspect"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuspectList();
  }, []);

  data.map((dt) => {
    console.log(dt);
  });

  const myStyle = {
    border: "1px solid black",
  };

  return (
    <>
      <div
        className="d-flex mt-5 align-items-center flex-column gap-5"
        style={{ height: "90vh" }}
      >
        <div>
          <Link to={"/viewcase"}>ViewCase</Link>
        </div>
        <Table striped bordered hover className="w-75 text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relation</th>
              <th>Area</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {data.map((dt) => (
              <tr key={dt.id}>
                <td>{dt.name}</td>
                <td>{dt.relation}</td>
                <td>{dt.area}</td>
                <td>{dt.address}</td>
                <td>{dt.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Suspects;
