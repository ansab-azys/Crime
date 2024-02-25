import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../../config/firebase";

const CaseDetails = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const getDetails = async () => {
    const docRef = doc(db, "case", id);
    console.log(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData([...data,  docSnap.data()]);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  console.log(data);

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <>
     <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Note</th>
          </tr>
        </thead>
        {data.map((dt) => (
          <tbody key={id}>
            <tr>
              <td>{dt.ID}</td>
              <td>{dt.Name}</td>
              <td>{dt.Note}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
    </>
  );
};

export default CaseDetails;
