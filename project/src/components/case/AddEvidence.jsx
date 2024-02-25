import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../config/firebase";
import { Button, Form, InputGroup } from "react-bootstrap";

const AddEvidence = () => {
  const [data, setData] = useState([]);
  const [evidence, setEvidence] = useState("");
  const [note, setNote] = useState("");
  const [point, setPoint] = useState("");
  const [suspect, setSuspect] = useState("");
  const [type, setType] = useState("");
  const location = useLocation();
  const id = location.state;

  const AddData = async () => {
    const caseCollection = collection(db, "case"); // gets the root collection
    const subCollectionRef = collection(db, `case/${id}/evidence`); //creates a sub collection

    await addDoc(subCollectionRef, {
      evidence: evidence,
      note: note,
      point: point,
      suspect: suspect,
      type: type,
    }); //Creates a document
  };

  const getSuspectList = async () => {
    const data = await getDocs(collection(db, "case", id, "suspect"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(filteredData);
    console.log(data);
  };

  console.log(type);

  useEffect(() => {
    getSuspectList();
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column gap-2"
        style={{ height: "90vh" }}
      >
        <h1>Add Evidence</h1>

        <div>
          <Form.Select
            name="case "
            onChange={(e) => setType(e.target.value)}
            id="case"
          >
            <option value="" selected disabled hidden>
              Select an option
            </option>
            <option value="Physical">Physical</option>
            <option value="Logical">Logical</option>
          </Form.Select>
        </div>

        <InputGroup className="w-25">
          <Form.Control
            type="text"
            value={evidence}
            placeholder="Evidence"
            onChange={(e) => setEvidence(e.target.value)}
          />
        </InputGroup>

        <div>
          <Form.Select
            name="case "
            defaultValue={suspect}
            onChange={(e) => setSuspect(e.target.value)}
            id="case"
          >
            <option value="none" selected disabled hidden>
              Select a suspect
            </option>
            {data.map((dt) => (
              <option key={dt.id} value={dt.name}>
                {dt.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <InputGroup className="w-25">
          <Form.Control
            type="text"
            placeholder="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="w-25">
          <Form.Control
            type="number"
            max="10"
            placeholder="Point out of 10"
            onChange={(e) => setPoint(e.target.value)}
          />
        </InputGroup>

        <Button onClick={AddData}>Add</Button>
      </div>
    </>
  );
};

export default AddEvidence;
