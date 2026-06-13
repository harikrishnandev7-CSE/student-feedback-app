// ============================================================
// server.js — Main Entry Point for the Backend Server
// This file creates an Express server, defines API routes,
// and stores feedback in memory (no database needed).
// ============================================================

// Import the 'express' library to create a web server
const express = require('express');

// Import 'cors' to allow the React frontend (on a different port) to talk to this server
const cors = require('cors');

// Create an Express application instance
const app = express();

// Define the port the server will listen on
const PORT = 5000;

// ── Middleware ────────────────────────────────────────────────
// Enable CORS so the frontend (localhost:5173) can make requests here
app.use(cors());

// Parse incoming JSON request bodies automatically
// Without this, req.body would be undefined
app.use(express.json());

// ── In-Memory Storage ─────────────────────────────────────────
// This array stores all submitted feedback during the server's lifetime.
// It resets every time the server restarts (no persistence — no database used).
const feedbackList = [];

// ── Routes ───────────────────────────────────────────────────

// POST /feedback
// Receives a new feedback submission from the frontend
app.post('/feedback', (req, res) => {
  // Destructure the fields sent in the request body
  const { name, department, feedback } = req.body;

  // Basic validation — make sure all fields are present
  if (!name || !department || !feedback) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create a new feedback object and add a timestamp
  const newFeedback = {
    id: feedbackList.length + 1,   // simple auto-increment ID
    name,
    department,
    feedback,
    submittedAt: new Date().toISOString(), // record when it was submitted
  };

  // Push the new feedback into our in-memory array
  feedbackList.push(newFeedback);

  // Log it on the server console so you can see submissions in the terminal
  console.log('New feedback received:', newFeedback);

  // Send a success response back to the frontend
  res.status(201).json({ message: 'Feedback Submitted Successfully' });
});

// GET /feedback
// Returns all submitted feedback stored in memory
app.get('/feedback', (req, res) => {
  // Send the full feedbackList array as JSON
  res.status(200).json(feedbackList);
});

// ── Start Server ──────────────────────────────────────────────
// Tell the server to listen for incoming requests on PORT 5000
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
console.log("backend branch added");