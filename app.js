import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Set static folder
app.use(express.static('public'));

// Serve HTMX from node_modules
app.use('/htmx', express.static(path.join(__dirname, 'node_modules', 'htmx.org', 'dist')));

// Function to load routes dynamically
async function loadRoutes() {
  const routesPath = path.join(__dirname, 'routes');
  const files = fs.readdirSync(routesPath);

  for (const file of files) {
    if (file.endsWith('.js')) {
      try {
        const { default: route } = await import(`./routes/${file}`);
        app.use(route);
      } catch (error) {
        console.error(`Error loading the ${file} route:`, error);
      }
    }
  }
}

// Initialize and start the server
async function startServer() {
  await loadRoutes(); // Ensure all routes are loaded
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
