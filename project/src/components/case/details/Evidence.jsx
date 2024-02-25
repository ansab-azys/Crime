import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../../config/firebase";
import { Table } from "react-bootstrap";

const Evidence = () => {
  const [data, setData] = useState([]);
  const [suspect, setSuspect] = useState([]);
  const location = useLocation();
  const id = location.state;

  const getEvidenceList = async () => {
    const data = await getDocs(collection(db, "case", id, "evidence"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setData(filteredData);
  };

  const getSuspectList = async () => {
    try {
      const data = await getDocs(collection(db, "case", id, "suspect"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSuspect(filteredData);
    } catch (error) {
      console.log(error);
    }
  };


  console.log(data)


  useEffect(() => {
    getEvidenceList();
    getSuspectList();
  }, []);

  return (
    <>
    <div  className="d-flex mt-5 align-items-center flex-column gap-2"
      style={{ height: "90vh" }}>
      <Table striped bordered className="w-75 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Evidence</th>
            <th>type</th>
            <th>note</th>
            <th>Point</th>
          </tr>
        </thead>

        
        {data.map((dt) => (
            <tbody>
                <tr>
                    <td>{dt.suspect}</td>
                    <td>{dt.evidence}</td>
                    <td>{dt.type}</td>
                    <td>{dt.note}</td>
                    <td>{dt.point}</td>
                </tr>
            </tbody>
        ))}
            
      </Table>
      </div>
    </>
  );
};

export default Evidence;
