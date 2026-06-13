// FeedbackForm.jsx
// ============================================================
// This is the MAIN FORM component of the application.
// It contains:
//   - Three input fields: Student Name, Department, Feedback
//   - A Submit button
//   - A success message shown after successful submission
//   - An error message shown if something goes wrong
//
// How it works:
//   1. User fills in the form fields.
//   2. React tracks the values using useState hooks.
//   3. On submit, we send the data to the backend using fetch().
//   4. If successful, we show a green success message.
// ============================================================

import { useState } from 'react';

function FeedbackForm() {

  // ── State: Form Fields ────────────────────────────────────
  // useState holds the current value of each form field.
  // The second item (setter) updates the value when the user types.

  const [name, setName] = useState('');          // Student's name
  const [department, setDepartment] = useState(''); // Student's department
  const [feedback, setFeedback] = useState('');  // Student's feedback text

  // ── State: UI Feedback ────────────────────────────────────
  const [successMessage, setSuccessMessage] = useState(''); // shown on success
  const [errorMessage, setErrorMessage] = useState('');     // shown on error
  const [isLoading, setIsLoading] = useState(false);        // disables button while submitting

  // ── Handle Form Submission ────────────────────────────────
  const handleSubmit = async (e) => {
    // Prevent the browser from refreshing the page on form submit
    e.preventDefault();

    // Clear any previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Simple client-side validation
    if (!name.trim() || !department.trim() || !feedback.trim()) {
      setErrorMessage('⚠️ Please fill in all fields before submitting.');
      return;
    }

    // Show loading state so the button says "Submitting..."
    setIsLoading(true);

    try {
      // Send a POST request to the backend server
      // The backend is running on http://localhost:5000
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',                          // HTTP method
        headers: {
          'Content-Type': 'application/json',   // Tell the server we're sending JSON
        },
        // Convert the JS object to a JSON string for the request body
        body: JSON.stringify({ name, department, feedback }),
      });

      // Parse the JSON response from the server
      const data = await response.json();

      if (response.ok) {
        // ✅ Success: show the success message from the server
        setSuccessMessage(data.message);

        // Clear the form fields after successful submission
        setName('');
        setDepartment('');
        setFeedback('');
      } else {
        // ❌ Server returned an error (e.g., 400 Bad Request)
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }

    } catch (error) {
      // ❌ Network error (e.g., backend server is not running)
      console.error('Fetch error:', error);
      setErrorMessage('❌ Could not connect to the server. Make sure the backend is running on port 5000.');
    } finally {
      // Always turn off the loading state when done
      setIsLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="card">

      {/* ── Header ── */}
      <div className="card-header">
        <div className="header-icon">🎓</div>
        <h1 className="card-title">Student Feedback</h1>
        <p className="card-subtitle">Share your thoughts about our program</p>
      </div>

      {/* ── Success Message ── */}
      {/* This only appears when successMessage has a value */}
      {successMessage && (
        <div className="alert alert-success">
          ✅ {successMessage}
        </div>
      )}

      {/* ── Error Message ── */}
      {/* This only appears when errorMessage has a value */}
      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="feedback-form">

        {/* Student Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Student Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Hari Kumar"
            className="form-input"
            value={name}                            // controlled by useState
            onChange={(e) => setName(e.target.value)} // update state on every keystroke
          />
        </div>

        {/* Department Field */}
        <div className="form-group">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            id="department"
            type="text"
            placeholder="e.g. Computer Science (CSE)"
            className="form-input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        {/* Feedback Textarea */}
        <div className="form-group">
          <label htmlFor="feedback" className="form-label">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            rows={4}
            placeholder="Write your feedback here..."
            className="form-textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        {/* disabled while loading so user can't double-submit */}
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? '⏳ Submitting...' : '📨 Submit Feedback'}
        </button>

      </form>
    </div>
  );
}

export default FeedbackForm;
