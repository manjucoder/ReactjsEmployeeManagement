import ModalBox from "../components/ModalBox";
import SubmitButton from "../components/SubmitButton";
import { useEffect, useState } from "react";
import { ServerPath } from "../config/ServerPath";
import { Link } from "react-router-dom";

export default function EmployeeAdd() {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [serverData, setserverData] = useState([]);
  const [id, setId] = useState(0);
  const [skillid, Setskillid] = useState({
    id: "",
    emp_id: "",
    skill: "",
    per: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (value, id) => {
    setModalData(value);
    setShow(true);
    setId(id);
  };
  useEffect(() => {
    fetch(ServerPath.EmployeeFetch, {
      method: "POST",
      body: JSON.stringify({
        type: "fetch_emp",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setserverData(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [serverData]);
  return (
    <>
      <div className="container">
        <h1 className="title-clr">Employee Details</h1>
        <Link to="/Login">Logout</Link>
        <hr />
        <div className="jumbotron">
          <SubmitButton
            value="+"
            onClick={() => handleShow("new employee", 0)}
          />
          <span className="sub-text">Add New </span>
          <div class="table-responsive mt-5 table-primary">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Emp Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Exp</th>
                  <th scope="col">Change</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {serverData.map((data, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <th>{data.emp_id}</th>
                      <td>{data.emp_name}</td>
                      <td>{data.role}</td>
                      <td>{data.salary}</td>
                      <td>{data.exp}</td>
                      <td>
                        <SubmitButton
                          value="update"
                          color="btn-success"
                          onClick={() => handleShow("emp_update", data)}
                        />
                      </td>
                      <td>
                        {" "}
                        <SubmitButton
                          value="Delete"
                          color="btn-danger"
                          onClick={() => handleShow("emp_delete", data)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ModalBox
            handleClose={() => handleClose()}
            show={show}
            modalData={modalData}
            id={id}
            skill={skillid}
          />
        </div>
      </div>
    </>
  );
}
