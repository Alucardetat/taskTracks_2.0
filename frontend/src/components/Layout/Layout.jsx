// taskTracks_2.0/frontend/src/components/Layout/Layout.jsx
import PropTypes from "prop-types";
import NavBar from "../NavBar/NavBar.jsx"; // Import NavBar component
import Sidebar from "../Sidebar/Sidebar.jsx"; // Import Sidebar component
import "./Layout.css";

const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="layout-container">
      {/* Navigation Bar */}
      <NavBar />

      <div className="layout-main">
        {/* Conditionally Render Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Main Content Section */}
        <main className="layout-content">
          {children || (
            <div className="placeholder-content">
              <p>No content available. Select an option from the sidebar.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired, // Validate that 'children' is provided
  showSidebar: PropTypes.bool, // Allow controlling sidebar visibility
};

export default Layout;