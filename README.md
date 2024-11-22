# TaskTracks

TaskTracks is a simple task management application that allows users to create, update, delete, and track their tasks. Designed with flexibility in mind, TaskTracks plans to supports both personal task management and team collaboration, with plans to expand functionality further.

## Features

### Current Features
- **CRUD Operations**: Create, Read, Update, and Delete tasks.


### Planned Features
- **Task Categorization**: Organize tasks based on categories or priorities.
- **User Authentication**: Basic user authentication to manage personal tasks.
- **Team Collaboration**: Share tasks and responsibilities with team members for larger projects.
- **Task History Tracking**: View task history statistics, including:
  - Tasks completed on time.
  - Tasks completed late.
  - Uncompleted tasks.
  - Postponed tasks.
  - Tasks canceled by the organizer (won't affect participant metrics).
- **Graphical Insights**:
  - Personal task metrics (individual performance).
  - Team task metrics (collaborative performance without overshadowing personal metrics).

## Tech Stack

- **M**ongoDB: The NoSQL database used to store and manage application data in a flexible, schema-less format.

- **E**xpress.js: The lightweight and robust Node.js framework, designed for building fast, scalable APIs and server-side logic.

- **R**eact: The powerful front-end JavaScript library used to create dynamic user interfaces and handle client-side interactions.

- **N**ode.js: The high-performance, event-driven runtime environment that powers the server and facilitates seamless JavaScript execution across the stack.



## Folder Structure

```bash
taskTracks_2.0/                       # Root of the project
│
├── backend/                          # Backend server files
│   ├── .env                          # Environment variables (ignored by .gitignore)
│   ├── index.js                      # Main entry point for the backend server
│   ├── package.json                  # Backend dependencies
│
├── frontend/                         # Frontend app files
│   ├── public/                       # Public assets for the frontend
│   │   ├── favicon.svg               # Website favicon
│   │   ├── logo.png                  # Logo for the app
│   │   ├── Toggle-Sidebar.svg        # Sidebar toggle icon
│   │   ├── stats.png                 # Stats image
│   │   ├── stats.svg                 # Stats SVG icon
│   │   ├── tasks.png                 # Tasks image
│   │   ├── tasks.svg                 # Tasks SVG icon
│   │   ├── team.png                  # Team image
│   │   └── team.svg                  # Team SVG icon
│   │
│   ├── src/                          # Source code for the frontend
│   │   ├── assets/                   # Static assets for the application
│   │   │   ├── favicon.svg           # Website favicon
│   │   │   ├── Home-Icon.png         # Home icon
│   │   │   └── Toggle-Sidebar.svg    # Sidebar toggle icon
│   │   │
│   │   ├── components/               # React components
│   │   │   ├── Layout/               # Layout wrapper components
│   │   │   │   ├── Layout.css        # Layout styles
│   │   │   │   └── Layout.jsx        # Layout component
│   │   │   ├── LoginPage/            # Login page components
│   │   │   │   ├── LoginPage.css     # Login page styles
│   │   │   │   └── LoginPage.jsx     # Login page component
│   │   │   ├── NavBar/               # Navigation bar components
│   │   │   │   ├── NavBar.css        # NavBar styles
│   │   │   │   └── NavBar.jsx        # NavBar component
│   │   │   ├── Sidebar/              # Sidebar components
│   │   │   │   ├── SideBar.css       # Sidebar styles
│   │   │   │   └── SideBar.jsx       # Sidebar component
│   │   │   ├── TaskForm/             # Task creation form components
│   │   │   │   ├── TaskForm.css      # TaskForm styles
│   │   │   │   └── TaskForm.jsx      # TaskForm component
│   │   │   ├── TaskItem/             # Task item components
│   │   │   │   ├── TaskItem.css      # TaskItem styles
│   │   │   │   └── TaskItem.jsx      # TaskItem component
│   │   │   ├── TaskList/             # Task list components
│   │   │   │   ├── TaskList.css      # TaskList styles
│   │   │   │   └── TaskList.jsx      # TaskList component
│   │   │
│   │   ├── App.css                   # Application-wide styles
│   │   ├── App.jsx                   # Main application component
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Application entry point
│   │
│   ├── .env                          # Environment variables (ignored by .gitignore)
│   ├── eslint.config.js              # ESLint configuration file
│   ├── index.html                    # HTML entry point for the app
│   ├── package.json                  # Frontend dependencies
│   └── vite.config.js                # Vite configuration file
│
├── .gitignore                        # Ignored files and folders
├── package.json                      # Root project dependencies
└── README.md                         # Project documentation

```

## Setup

1. Clone the repository and cd to the directory:
   ```bash
   git clone git@github.com:Alucardetat/tasksTracks_2.0.git
   cd taskTracks_2.0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the app in your browser at `http://localhost:3000`.

## Contributing
Feel free to submit issues or pull requests for bug fixes, features, or improvements.


Made with ❤️ by Alucardetat