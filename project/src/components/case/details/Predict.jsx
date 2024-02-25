import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

export const Predict = () => {
  const [data, setData] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [susid, setSusid] = useState("");
  const location = useLocation();
  const id = location.state;
  const [victim, setVictim] = useState([]);
  const navigate = useNavigate();

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

  const getEvidenceList = async () => {
    const data = await getDocs(collection(db, "case", id, "evidence"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setEvidence(filteredData);
  };

  useEffect(() => {
    getEvidenceList();
    getSuspectList();
  }, []);

  useEffect(() => {
    check();
  });

  const check = () => {
    const frequencyMap = new Map();
    for (const object of evidence) {
      const value = object.point;
      if (frequencyMap.has(value)) {
        frequencyMap.set(value, frequencyMap.get(value) + 1);
      } else {
        frequencyMap.set(value, 1);
      }
    }

    // Find the most repeated value
    let mostRepeatedValue;
    if (evidence.length) {
      mostRepeatedValue = Array.from(frequencyMap.entries()).reduce((a, b) => {
        return a[1] > b[1] ? a : b;
      })[0];
    }

    //   Find the highest point
    let highestPoint = "";
    if (evidence.length) {
      highestPoint = evidence.reduce((a, b) => {
        return Number(a.point) > Number(b.point) ? a : b;
      });
    }

    const nameFrequency = {};

    evidence.map((dt) => {
      if (!nameFrequency[dt.suspect]) {
        nameFrequency[dt.suspect] = 1;
      } else {
        nameFrequency[dt.suspect]++;
      }
    });

    // Find the name
    let mostFrequentName = "";
    let highestFrequency = 0;
    for (const name in nameFrequency) {
      if (nameFrequency[name] > highestFrequency) {
        mostFrequentName = name;
        highestFrequency = nameFrequency[name];
      }
    }


    if (highestPoint.point === "10") {
      setVictim(highestPoint.suspect);
    } else {
      setVictim(mostFrequentName);
    }

    data.map((dt) => {
      if(victim === dt.name) {
        setSusid(dt.id)
      }
    })
  };


  const AddData = async () => {
   

    data.map(async (dt) => {
      if(dt.name === victim) {
        const caseCollection = collection(db, "case"); // gets the root collection
        const subCollectionRef = collection(db, `case/${id}/guilty`); //creates a sub collection
    
        await addDoc(subCollectionRef, {
         name: dt.name,
         address: dt.address,
         phone: dt.phone,
         relation: dt.relation,
         area: dt.area
        }); //Creates a document
      }
    })
  };


 


  return (
    <>
      <div
        className="d-flex mt-5 align-items-center flex-column gap-5"
        style={{ height: "90vh" }}
      >
        <div className="text-center">
          <h1>
            Prediction shows <i className="text-danger">{victim}</i> is guilty{" "}
          </h1>
          <p className="alert alert-info">
            This prediction is based on points and repetetion of evidences.
            admin can change or add result if it is wrong!
          </p>
        </div>
        <Table striped bordered className="w-25  text-center">
          <thead>
            <tr>
              <th>Suspect</th>
              <th>Point</th>
            </tr>
          </thead>

          {evidence.map((dt) => (
            <tbody key={dt.id}>
              <tr>
                <td>{dt.suspect}</td>
                <td>{dt.point}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      
        <Button variant="success" onClick={() => {
          AddData();
          navigate("/addresult", {state: id})
          
        }}>Add result</Button>
      </div>
    </>
  );
};
