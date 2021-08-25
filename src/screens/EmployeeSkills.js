import { useEffect, useState } from "react";
import ModalBox from "../components/ModalBox";
import ProgressBar from "../components/ProgressBar";
import SubmitButton from "../components/SubmitButton";
import { ServerPath } from "../config/ServerPath";
import { Link } from "react-router-dom";

export default function EmployeeSkills({ match }) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [id, setId] = useState({
    emp_id: 0,
    emp_name: "",
    role: "",
    sal: "",
    exp: "",
    username: "",
    pwd: "",
  });
  const [getskill, Setgetskill] = useState([]);
  const [skillid, Setskillid] = useState({
    id: "",
    emp_id: "",
    skill: "",
    per: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (value, skill) => {
    setModalData(value);
    Setskillid(skill);
    setShow(true);
  };

  useEffect(() => {
    setId({ ...id, emp_id: match.params.id });
    fetch(ServerPath.Skills, {
      method: "POST",
      body: JSON.stringify({
        type: "fetch_skill",
        emp_id: match.params.id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Setgetskill(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getskill]);

  return (
    <>
      <div className="container">
        <h1 className="title-clr">Our Skills</h1>
        <Link to="/Login">Logout</Link>
        <hr />
        <div className="jumbotron">
          <SubmitButton value="+" onClick={() => handleShow("new", getskill)} />
          <span className="sub-text">Add New </span>
          <div class="table-responsive mt-5 table-primary">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Skills</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {getskill.map((skill, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td scope="row" style={{ width: "15%" }}>
                        {skill.skill}
                      </td>
                      <td className="align-middle">
                        <ProgressBar per={skill.per} />
                      </td>
                      <td style={{ width: "15%" }}>
                        <SubmitButton
                          value="update"
                          color="btn-success"
                          onClick={() => handleShow("update", skill)}
                        />
                      </td>
                      <td style={{ width: "15%" }}>
                        <SubmitButton
                          value="Delete"
                          color="btn-danger"
                          onClick={() => handleShow("delete", skill)}
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
