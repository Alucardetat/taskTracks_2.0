// taskTracks_2.0/frontend/src/components/NavBar/NavBar.jsx
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <h1 className="nav-title">Task Manager</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;