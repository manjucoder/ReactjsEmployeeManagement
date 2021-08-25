import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import EmployeeAdd from "./screens/EmployeeAdd";
import EmployeeSkills from "./screens/EmployeeSkills";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/Login" component={Login} exact></Route>
          <Route path="/Manager" component={EmployeeAdd} exact></Route>
          <Route path="/Employee/:id" component={EmployeeSkills} exact></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
