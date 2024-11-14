import { useEffect, useState } from "react";
import { readTasks } from "../crud/readTasks"; // Import readTasks function

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Get tasks when the component mounts
		readTasks()
			.then((data) => setTasks(data))
			.catch((error) => setError("Failed to fetch tasks", error));
	}, []);

	return (
		<div>
			<h1>Your Tasks</h1>
			{error && <p>{error}</p>}
			{tasks.length === 0 && !error && <p>No tasks available.</p>}
			<ul>
				{tasks.map((task) => (
					<li key={task._id}>{task.title}</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;