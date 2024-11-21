// taskTracks_2.0/frontend/src/components/TaskForm/TaskForm.jsx
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { createTask } from "../../crud/createTask.js";
import "./TaskForm.css";

const TaskForm = ({ onTaskCreated }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!newTask.title) {
      setError("Task title is required.");
      return;
    }

    setIsSubmitting(true);
    createTask(newTask, localStorage.getItem("jwtToken"))
      .then((createdTask) => {
        onTaskCreated(createdTask); // Notify parent component
        setNewTask({ title: "", description: "" }); // Reset form
        setError(null); // Clear errors
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Error creating task:", err);
        setError("Failed to create task. Please try again later.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="task-form-container">
      <h3>Create New Task</h3>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task Title"
      />
      <textarea
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        placeholder="Task Description"
      ></textarea>
      <button onClick={handleSubmit} className="btn create-btn" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Add Task"}
      </button>
    </div>
  );
};

// Add PropTypes validation
TaskForm.propTypes = {
  onTaskCreated: PropTypes.func.isRequired, // Ensure onTaskCreated is a required function
};

export default TaskForm;