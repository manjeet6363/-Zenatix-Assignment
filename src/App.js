import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <div >
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
