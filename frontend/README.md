# Frontend — React + Vite

This is the frontend for the Student Feedback Application built with React and Vite.

## Files

| File / Folder | Purpose |
|--------------|---------|
| `index.html` | HTML shell — React mounts inside `<div id="root">` |
| `vite.config.js` | Vite configuration — enables React JSX support |
| `package.json` | Project metadata and dependencies |
| `src/main.jsx` | Entry point — connects React to the HTML |
| `src/App.jsx` | Root React component |
| `src/index.css` | Global CSS styles |
| `src/components/FeedbackForm.jsx` | The form component with all the logic |

## How to Run

```bash
cd frontend
npm install
npm run dev
```

App runs on: http://localhost:5173

> Make sure the backend is also running on port 5000!
