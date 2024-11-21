// taskTracks_2.0/frontend/src/components/TaskList/TaskList.jsx
import { useEffect, useState } from "react";
import { readTasks } from "../../crud/readTasks.js";
import { updateTask } from "../../crud/updateTask.js";
import { deleteTask } from "../../crud/deleteTask.js";
import TaskForm from "../TaskForm/TaskForm.jsx";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(""); // For success or error messages
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(""); // Filter for completed/incomplete tasks

  useEffect(() => {
    setIsLoading(true);
    readTasks()
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setNotification("Task created successfully!"); // Success message
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveTask = (updatedTask) => {
    setIsLoading(true);
    updateTask(updatedTask._id, updatedTask, localStorage.getItem("jwtToken"))
      .then((data) => {
        setTasks((prev) =>
          prev.map((task) => (task._id === data._id ? data : task))
        );
        setEditingTask(null);
        setNotification("Task updated successfully!"); // Success message
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        setError("Failed to update task. Please try again later.");
        setIsLoading(false);
      });
  };

  const handleDeleteTask = (taskId) => {
    setIsLoading(true);
    deleteTask(taskId, localStorage.getItem("jwtToken"))
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        setNotification("Task deleted successfully!"); // Success message
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        setError("Failed to delete task. Please try again later.");
        setIsLoading(false);
      });
  };

  const handleSortTasks = () => {
    setTasks((prev) => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
    setNotification("Tasks sorted by title."); // Notification
  };

  const handleFilterTasks = (filterType) => {
    setFilter(filterType);
    setNotification(
      filterType === "completed"
        ? "Showing completed tasks."
        : filterType === "incomplete"
        ? "Showing incomplete tasks."
        : "Showing all tasks."
    );
  };

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      {notification && <p className="notification">{notification}</p>} {/* Feedback */}
      {error && <p className="error-message">{error}</p>}
      {isLoading && <p>Loading...</p>}

      <TaskForm onTaskCreated={handleTaskCreated} />

      {/* Sorting and Filtering Controls */}
      <div className="task-controls">
        <button className="btn sort-btn" onClick={handleSortTasks}>
          Sort Tasks
        </button>
        <button
          className="btn filter-btn"
          onClick={() => handleFilterTasks("completed")}
        >
          Show Completed
        </button>
        <button
          className="btn filter-btn"
          onClick={() => handleFilterTasks("incomplete")}
        >
          Show Incomplete
        </button>
        <button className="btn filter-btn" onClick={() => handleFilterTasks("")}>
          Show All
        </button>
      </div>

      {tasks.length === 0 && !error && !isLoading && (
        <p className="no-tasks">No tasks available. Add a task to get started!</p>
      )}

      <ul className="task-list">
        {tasks
          .filter((task) =>
            filter === "completed"
              ? task.completed
              : filter === "incomplete"
              ? !task.completed
              : true
          )
          .map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description || "No description provided."}</p>
              </div>
              <div className="task-actions">
                <button
                  className="btn edit-btn"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      {editingTask && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              placeholder="Title"
            />
            <textarea
              value={editingTask.description || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            ></textarea>
            <button
              className="btn save-btn"
              onClick={() => handleSaveTask(editingTask)}
            >
              Save
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;