// taskTracks_2.0/frontend/src/components/SideBar/SideBar.jsx
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <ul className="sidebar-menu">
      <li>
        <a href="/tasks">
          <i className="fas fa-tasks"></i> Tasks
        </a>
      </li>
      <li>
        <a href="/teams">
          <i className="fas fa-users"></i> Teams
        </a>
      </li>
      <li>
        <a href="/stats">
          <i className="fas fa-chart-bar"></i> Stats
        </a>
      </li>
    </ul>
  );
};

export default Sidebar;