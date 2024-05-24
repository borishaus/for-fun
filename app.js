import express from "express"; // Import the Express module
import fs from "fs"; // Import the file system module
import path from "path"; // Import the path module
import { fileURLToPath } from 'url'; // Import the function to convert file URL to path
import { dirname } from 'path'; // Import the function to get the directory name of a path

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module

const app = express(); // Create an Express application

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Parse JSON bodies (as sent by API clients)
app.use(express.json()); // Middleware to parse JSON data

// Set static folder
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve HTMX from node_modules
app.use('/htmx', express.static(path.join(__dirname, 'node_modules', 'htmx.org', 'dist'))); // Serve HTMX files from node_modules

// Function to load routes dynamically
async function loadRoutes() {
  const routesPath = path.join(__dirname, 'routes'); // Define the path to the routes directory
  const files = fs.readdirSync(routesPath); // Read the contents of the routes directory

  for (const file of files) { // Iterate over each file in the routes directory
    if (file.endsWith('.js')) { // Check if the file ends with '.js'
      try {
        const { default: route } = await import(`./routes/${file}`); // Dynamically import the route file
        app.use(route); // Use the route in the Express application
      } catch (error) {
        console.error(`Error loading the ${file} route:`, error); // Log any errors that occur during the import
      }
    }
  }
}

// Initialize and start the server
async function startServer() {
  await loadRoutes(); // Ensure all routes are loaded before starting the server
  const PORT = process.env.PORT || 3000; // Get the port from environment variables or default to 3000
  app.listen(PORT, () => { // Start the server and listen on the specified port
    console.log(`Server running on port ${PORT}`); // Log that the server is running
  });
}

startServer(); // Call the function to start the server