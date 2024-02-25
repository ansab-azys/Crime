import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../config/firebase";
import { Button, Table } from "react-bootstrap";

export const AddResult = () => {
  const [data, setData] = useState([]);
  const [suspect, setSuspect] = useState([]);
  const [guilt, setGuilt] = useState([]);
  const location = useLocation();
  const id = location.state;

  const getSuspectList = async () => {
    try {
      const data = await getDocs(collection(db, "case", id, "suspect"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSuspect(filteredData);

      filteredData.map((dt) => {
        if (dt.name === id.guilt) {
          setData(dt);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getGuiltyList = async () => {
    try {
      const data = await getDocs(collection(db, "case", id, "guilty"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGuilt(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuiltyList();
    getSuspectList();
  }, []);


  


  if (guilt.length && suspect.length) {
    return (
      <div>
        <div
          className="d-flex mt-5 align-items-center flex-column gap-5"
          style={{ height: "20vh" }}
        >
          <h2>Guilty</h2>
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
              {guilt.map((dt) => (
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

        
      </div>
    );
  } else {
    return <div className="d-flex mt-5 justify-content-center align-items-center flex-column gap-5"
    style={{ height: "80vh" }}>
      <h1>No result</h1>
    </div>;
  }
};
