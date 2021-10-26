import "./App.css";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/home/:id?" component={Home} />
          <Route path="/login">
            {currentUser ? <Redirect to="/home" /> : <Signup />}
          </Route>
          <Route path="/">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
