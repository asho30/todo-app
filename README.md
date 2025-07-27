# todo-app
 Todo List Web App by Ahmed Ashour
# Full-Stack Asho To-Do List Application
This repository contains a simple, full-stack Asho to-do list application built with a React frontend and a Node.js/Express backend. It is fully equipped with a suite of automated tests for the API and UI, integrated into a Continuous Integration (CI) pipeline with code coverage reporting.
# Features
User login (with a hardcoded user for simplicity).
Add, edit, and remove tasks.
Mark tasks as complete/incomplete.
In-memory data store that resets on server restart.
# Project Structure
todo-app/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD pipeline
├── backend/                # Node.js & Express API
│   ├── node_modules/
│   ├── package.json
│   └── server.js
├── frontend/               # React UI
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   └── package.json
├── cypress/                # Cypress E2E tests
│   ├── e2e/
│   ├── support/
│   └── cypress.config.js
├── coverage/               # Generated code coverage reports
├── node_modules/
├── package.json            # Root project scripts
└── README.md


## Getting Started
# Prerequisites
Before you begin, ensure you have the following installed on your machine:
Node.js (v16 or later recommended)
npm (comes with Node.js)
1. Installation
Clone the repository and install all necessary dependencies for the root, backend, and frontend projects.
# Clone the repository
git clone https://github.com/asho30/todo-app.git
cd todo-app

# Install root dependencies (Cypress, etc.)
npm install

# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend


2. Running the Web App Locally
To run the application, you need to start both the backend API and the frontend React server. A convenient script is provided in the root package.json to start both concurrently.
# From the root directory
npm start


The backend API will be running on http://localhost:5000.
The React frontend will be running on http://localhost:3000.
Wait for "webpack compiled successfully" (It takes minutes)
You can now open http://localhost:3000 in your browser to use the application.
Username: Asho
Password: P@sswo0d
## Testing
# API Testing with Postman
A Postman collection is provided to test the backend API endpoints directly. This is useful for verifying API logic in isolation.
Start the application (npm start).
Import the Collection: Open Postman and import the postman_collection_v2.json file.
# Run Requests:
First, execute the POST /api/login request to establish an authenticated session. Postman will automatically handle the session cookie.
You can then run other requests like GET /api/tasks or POST /api/tasks.
The collection is configured to automatically capture the id of a newly created task and use it in the "Edit" and "Delete" requests.
# End-to-End UI Testing with Cypress
Cypress is used to run automated tests that simulate real user interactions in a browser.
Start the application. For testing, it's best to use the instrumented version to collect code coverage data.
# From the root directory
npm run start:coverage


# Run Cypress Tests:
To open the interactive Test Runner:
npx cypress open

This will open the Cypress UI, where you can select and run individual test files (login.cy.js, todo_app_spec.cy.js) and see the browser interactions live.
To run all tests headlessly in the terminal:
npx cypress run

This is the command used by the CI pipeline. It will run all tests and output the results directly to your console.
CI/CD and Code Coverage
GitHub Actions Integration
This project is configured with a GitHub Actions workflow located at .github/workflows/ci.yml. This pipeline automates the testing process.
Trigger: The workflow runs automatically on every push or pull_request to the main branch.
# Process:
Checks out the repository code.
Installs all dependencies.
Starts the instrumented backend and frontend servers.
Runs the complete Cypress test suite headlessly.
Collects the combined code coverage report.
Uploads the report to Codecov.
Code Coverage Reporting
We measure code coverage for both the frontend and backend to ensure our tests are thorough.
Local Reports: After running the Cypress tests against the instrumented application (npm run start:coverage), a combined coverage report is generated in the coverage/ directory at the project root. You can view the detailed HTML report by opening coverage/lcov-report/index.html in your browser.
Codecov Integration: After the CI pipeline successfully completes, the coverage report is uploaded to Codecov. This provides visual reports and insights directly within GitHub pull requests, helping to maintain code quality and prevent untested code from being merged.
