import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Button, Table } from "react-bootstrap";

const OfficerHome = () => {
  const [profile, setProfile] = useState([]);
  const [cases, setCases] = useState([]);
  const currentUserId = auth.currentUser.displayName;

  const navigate = useNavigate();
  const userCollection = collection(db, "officer");
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Log out succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProfileList = async () => {
    try {
      const data = await getDocs(userCollection);
      const filteretdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfile(filteretdData);
    } catch (error) {}
  };

  const getCaseList = async () => {
    const data = await getDocs(collection(db, "case"));
    const filteretdData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setCases(filteretdData);
  };

  console.log(currentUserId);

  useEffect(() => {
    getProfileList();
    getCaseList();
  }, []);

  const addSuspect = (id) => {
    navigate("/addsuspect", { state: id });
  };

  return (
    <div className="d-flex flex-column justify-content-center gap-5  mx-auto w-75 mt-3">
      <div className="d-flex justify-content-between">
        <h3>Cases</h3>
        <Button variant="danger" onClick={() => logOut()}>Log out</Button>
      </div>
      <div>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Note</th>
            </tr>
          </thead>
          {cases.map((dt) => {
            if (currentUserId === dt.OfficerId) {
              return (
                <tbody key={dt.id}>
                  <tr>
                    <td>{dt.ID}</td>
                    <td>{dt.Name}</td>
                    <td>{dt.Note}</td>
                    <td> 
                      <Button variant="secondary" onClick={() => addSuspect(dt.id)}>
                        add suspect
                      </Button>
                      </td>
                      <td>
                      <Button variant="secondary"
                        onClick={() => {
                          navigate("/addevidence", { state: dt.id });
                        }}
                      >
                        add evidence
                      </Button>
                    </td>
                      <td>
                      <Button variant="secondary"
                        onClick={() => {
                          navigate("/addresult", { state: dt.id });
                        }}
                      >
                        result
                      </Button>
                    </td>
                      <td>
                      <Button variant="secondary"
                        onClick={() => {
                          navigate("/evidence", { state: dt.id });
                        }}
                      >
                        View evidence
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
        </Table>
      </div>
    </div>
  );
};

export default OfficerHome;
