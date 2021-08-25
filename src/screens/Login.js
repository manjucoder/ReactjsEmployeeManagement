import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ServerPath } from "../config/ServerPath";
import { useHistory } from "react-router";

export default function Login() {
  const [login, setLogin] = useState({
    username: "",
    pwd: "",
  });
  const history = useHistory();
  const ChangeHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const checkLogin = (type) => {
    fetch(ServerPath.Login, {
      method: "POST",
      body: JSON.stringify({
        type: type,
        username: login.username,
        pwd: login.pwd,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (type == "Manager") {
            history.push({
              pathname: `/${type}`,
            });
          } else if (type == "Employee") {
            history.push({
              pathname: `/${type}/${responseJson}`,
              id: responseJson,
            });
          }
        } else {
          alert("Login Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div class="container vertical-align">
        <div class="row justify-content-md-center">
          <div class="col-md-6">
            <div className="jumbotron">
              <h1 className="text-primary title  mb-4">LOGIN</h1>
              <form>
                <InputField
                  label="Username"
                  name="username"
                  onChange={(e) => ChangeHandler(e)}
                />
                <InputField
                  type="password"
                  label="Password"
                  name="pwd"
                  onChange={(e) => ChangeHandler(e)}
                />
                <div class="mt-5 ">
                  <div className="row">
                    <div className="col">
                      <SubmitButton
                        value="Employee Login"
                        onClick={() => checkLogin("Employee")}
                      />
                    </div>
                    <div className="col pull-right">
                      <SubmitButton
                        value="Manager Login"
                        onClick={() => checkLogin("Manager")}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
