## ✅ Completed Tasks

### 🗂 Board View Page
- [x] Ability to create a new board
- [x] Display all available boards in a table with necessary information
- [x] Clicking on a board navigates to its detail view

### 📋 Board Detail Page
- [x] Create columns (e.g., "To Do", "In Progress", "Done")
- [x] Display columns horizontally
- [x] Create cards (tasks) inside each column
- [x] Display cards stacked vertically within columns
- [x] Assign tasks to team members
- [x] Add priority to tasks (high, medium, low)
- [x] Move cards from one column to another
- [x] Reorder cards within the same column
- [x] Edit and delete columns
- [x] Edit and delete cards

### 📝 Task Details (Card Content)
- [x] Title
- [x] Description
- [x] Name of the user who created it
- [x] Priority tag (high, medium, low)
- [x] Due date
- [x] Name of the assigned user

---

## 🌟 Bonus Features (Optional)
- [x] Drag-and-drop support for reordering/moving tasks
- [x] Markdown support in task descriptions
- [x] Search functionality for boards or tasks (for board only)
- [x] User authentication (sign-in only)
- [x] Implement a backend (e.g., Node.js, Express) to persist data

---

## 🌐 Live Links

- **Client:** [https://taskboard-sigma.vercel.app/](https://taskboard-sigma.vercel.app/)
- **Server:** [https://task-board-3rli.onrender.com/](https://task-board-3rli.onrender.com/)

---

# 🛠 Local Setup

## Client

- **GitHub:** [https://github.com/bikaxh01/Task-Board](https://github.com/bikaxh01/Task-Board)

```sh
cd client # go to client directory
npm i     # install dependencies
```

- Replace `.env.example` with `.env`

```sh
npm run dev
```

## Server

```sh
cd server
npm i
```

- Replace `.env.example` with `.env` and add your DB URL (see mail attachment)

```sh
npm run dev
```

