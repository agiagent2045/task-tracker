# task-tracker
Managing my tasks to make me an effective leader

## Frontend Setup

A React-based task tracker web application with a clean, responsive design using Tailwind CSS.

### Features

- **Login Page**: Simple authentication with email and password fields
- **Dashboard**: Kanban-style task board with three columns (To Do, In Progress, Done)
- **Analytics Panel**: Task metrics and statistics visualization
- **Responsive Design**: Built with Tailwind CSS utility classes

### Tech Stack

- React (with Vite)
- React Router DOM for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API calls

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── TaskCard.jsx
│   └── AnalyticsPanel.jsx
├── pages/           # Page components
│   ├── Login.jsx
│   └── Dashboard.jsx
├── services/        # API integration (placeholder)
│   └── api.js
├── utils/           # Helper functions and constants
│   └── helpers.js
├── App.jsx          # Main app with routing
├── index.css        # Tailwind directives
└── main.jsx         # React entry point
```

### Demo

Use any email and password to login and access the dashboard.
