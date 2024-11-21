// taskTracks_2.0/frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import Layout from "./components/Layout/Layout.jsx";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LoginPage />} />
        {/* Protected Routes */}
        <Route
          path="/tasks"
          element={
            <Layout>
              <TaskList />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;