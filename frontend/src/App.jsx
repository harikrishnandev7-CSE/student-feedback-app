// App.jsx
// ============================================================
// This is the ROOT component of the application.
// It acts as the "container" that holds all other components.
// Currently it just renders the FeedbackForm component.
// In a larger app you would add routing here.
// ============================================================

import FeedbackForm from './components/FeedbackForm';

function App() {
  return (
    // The outer wrapper gives the page its background color and centering
    <div className="app-wrapper">
      <FeedbackForm />
    </div>
  );
}

export default App;
