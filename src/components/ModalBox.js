import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { ServerPath } from "../config/ServerPath";

export default function ModalBox(props) {
  const { modalData, show, handleClose, id, skill } = props;
  const [newEmployee, setnewEmployee] = useState({
    emp_id: 0,
    emp_name: "",
    role: "",
    sal: "",
    exp: "",
    username: "",
    pwd: "",
  });
  const [empskill, setEmpskill] = useState({
    id: 0,
    emp_id: "",
    skill: "",
    per: "",
  });
  const SkillChange = (e) => {
    setEmpskill({ ...empskill, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setnewEmployee({
      emp_id: id.emp_id,
      emp_name: id.emp_name,
      role: id.role,
      sal: id.salary,
      exp: id.exp,
      username: id.username,
      pwd: id.pwd,
    });
    setEmpskill({
      id: skill.id,
      skill: skill.skill,
      per: skill.per,
    });
  }, [show]);
  const ChangeEvent = (e) => {
    setnewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };
  const formData = (data) => {
    if (data == "new employee") {
      if (
        newEmployee.emp_name != "" &&
        newEmployee.role != "" &&
        newEmployee.sal != "" &&
        newEmployee.exp != "" &&
        newEmployee.username != "" &&
        newEmployee.pwd != ""
      ) {
        fetch(ServerPath.Employee, {
          method: "POST",
          body: JSON.stringify({
            emp_name: newEmployee.emp_name,
            role: newEmployee.role,
            sal: newEmployee.sal,
            exp: newEmployee.exp,
            username: newEmployee.username,
            pwd: newEmployee.pwd,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) {
              alert(
                `Successfully employee created. Employee Id is ${responseJson}`
              );
              handleClose();
            }
          })
          .catch((error) => {
            console.error(error + " errr");
          });
      } else {
        alert("Empty value found");
      }
    } else if (data == "emp_delete") {
      fetch(ServerPath.EmployeeFetch, {
        method: "POST",
        body: JSON.stringify({
          type: "del_emp",
          id: id.emp_id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          handleClose();
          console.log("successfully deleted");
        })
        .catch((error) => {
          console.error(error + " errr");
        });
    } else if (data == "emp_update") {
      fetch(ServerPath.EmployeeFetch, {
        method: "POST",
        body: JSON.stringify({
          type: "update_emp",
          emp_id: newEmployee.emp_id,
          emp_name: newEmployee.emp_name,
          role: newEmployee.role,
          sal: newEmployee.sal,
          exp: newEmployee.exp,
          username: newEmployee.username,
          pwd: newEmployee.pwd,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          handleClose();
          console.log("successfully Updated");
        })
        .catch((error) => {
          console.error(error + " errr");
        });
    } else if (data == "new") {
      if (empskill.skill != "" && empskill.per != "") {
        fetch(ServerPath.Skills, {
          method: "POST",
          body: JSON.stringify({
            type: "create_skill",
            emp_id: id.emp_id,
            skill: empskill.skill,
            per: empskill.per,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) {
              console.log("skill created");
              handleClose();
            }
          })
          .catch((error) => {
            console.error(error + " errr");
          });
      }
    } else if (data == "update") {
      fetch(ServerPath.Skills, {
        method: "POST",
        body: JSON.stringify({
          type: "update_skill",
          emp_id: id.emp_id,
          id: skill.id,
          skill: empskill.skill,
          per: empskill.per,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) {
            console.log("Updated");
            handleClose();
          }
        })
        .catch((error) => {
          console.error(error + " errr");
        });
    } else if (data == "delete") {
      fetch(ServerPath.Skills, {
        method: "POST",
        body: JSON.stringify({
          type: "delete_skill",
          emp_id: id.emp_id,
          id: skill.id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) {
            console.log(`Deleted.`);
            handleClose();
          }
        })
        .catch((error) => {
          console.error(error + " errr");
        });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {modalData == "new" && <>Add New Skills</>}
          {modalData == "update" && <>Update Skills</>}
          {modalData == "delete" && <>Remove Skills</>}
          {modalData == "new employee" && <>Create Employee</>}
          {modalData == "emp_delete" && <>Remove Employee</>}
          {modalData == "emp_update" && <>Update Employee</>}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {modalData == "new" && (
          <form>
            <InputField
              label="Skills"
              name="skill"
              onChange={(e) => SkillChange(e)}
            />
            <InputField
              label="Percentage(%)"
              name="per"
              onChange={(e) => SkillChange(e)}
            />
          </form>
        )}
        {modalData == "update" && (
          <form>
            <InputField
              label="Skills"
              name="skill"
              onChange={(e) => SkillChange(e)}
              value={empskill.skill}
            />
            <InputField
              label="Percentage(%)"
              name="per"
              onChange={(e) => SkillChange(e)}
              value={empskill.per}
            />
          </form>
        )}
        {modalData == "delete" && <div>Are you sure to remove this skill?</div>}
        {modalData == "new employee" && (
          <form>
            <InputField
              label="Emp Name"
              name="emp_name"
              onChange={(e) => ChangeEvent(e)}
            />
            <InputField
              label="Designation"
              name="role"
              onChange={(e) => ChangeEvent(e)}
            />
            <InputField
              label="Salary"
              name="sal"
              onChange={(e) => ChangeEvent(e)}
            />
            <InputField
              label="Experience"
              name="exp"
              onChange={(e) => ChangeEvent(e)}
            />
            <InputField
              label="UserName"
              name="username"
              onChange={(e) => ChangeEvent(e)}
            />
            <InputField
              type="password"
              label="Password"
              name="pwd"
              onChange={(e) => ChangeEvent(e)}
            />
          </form>
        )}
        {modalData == "emp_delete" && (
          <div>Are you sure to remove this Emp_id : {id.emp_id} employee?</div>
        )}
        {modalData == "emp_update" && newEmployee.id != 0 && (
          <form>
            <InputField
              label="Emp Name"
              name="emp_name"
              onChange={(e) => ChangeEvent(e)}
              value={newEmployee.emp_name}
            />
            <InputField
              label="Designation"
              name="role"
              onChange={(e) => ChangeEvent(e)}
              value={newEmployee.role}
            />
            <InputField
              label="Salary"
              name="sal"
              onChange={(e) => ChangeEvent(e)}
              value={newEmployee.sal}
            />
            <InputField
              label="Experience"
              name="exp"
              onChange={(e) => ChangeEvent(e)}
              value={newEmployee.exp}
            />
            <InputField
              label="UserName"
              name="username"
              onChange={(e) => ChangeEvent(e)}
              value={newEmployee.username}
            />
            <InputField
              type="password"
              label="Password"
              name="pwd"
              onChange={(e) => ChangeEvent(e)}
              value={newEmployee.pwd}
            />
          </form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => formData(modalData)}>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
