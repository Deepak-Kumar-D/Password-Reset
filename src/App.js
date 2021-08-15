import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="Main c-align">
      <header className="c-align">
        <h2>Password Reset App</h2>
        <img src="/favicon.ico" alt="icon" />
      </header>

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>

        <Route path="/resetpassword/:token">
          <ResetPassword />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
