// vite.config.js
// This file configures Vite, the build tool that powers our React app.
// We import the React plugin so Vite knows how to process .jsx files.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // enables React Fast Refresh (hot reloading) during development
});
