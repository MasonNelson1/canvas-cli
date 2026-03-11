Canvas Assignment Tracker CLI

A command-line interface (CLI) tool that connects to the Canvas LMS REST API to help students quickly view their courses and upcoming assignments directly from the terminal.

This tool retrieves courses and assignments from Canvas and presents them in a readable, color-coded format that highlights upcoming deadlines. Instead of navigating multiple pages in the Canvas web interface, students can quickly see what assignments are due soon using simple terminal commands.

Demo

The GIF above demonstrates listing courses, viewing assignments for a course, and displaying all upcoming assignments across courses.

Setup Instructions

Follow these steps to install and run the CLI tool.

1. Clone the Repository
git clone https://github.com/MasonNelson1/canvas-cli
cd canvas-cli
2. Install Dependencies

This project uses Node.js and npm.

npm install
3. Generate a Canvas API Token

Log into Canvas.

Open Account Settings.

Scroll to Approved Integrations.

Click + New Access Token.

Enter a description (example: Canvas CLI Project).

Generate the token and copy it immediately.

4. Create Your .env File

Create a file named .env in the root directory.

Example:

CANVAS_API_TOKEN=your_canvas_token_here
CANVAS_BASE_URL=https://boisestatecanvas.instructure.com

Your .env file contains sensitive information and must never be committed to GitHub.

5. Run the CLI Tool

You can now run the application using Node.

Example:

node index.js courses
Example Commands
List your Canvas courses
node index.js courses

Example Output:

Your Courses:

27618 - Embedded Systems
8147 - Engineering Student Shop
13941 - COEN Undergrad Students
Show assignments for a specific course
node index.js assignments 27618

Example Output:

Assignments:

Lab 6
  Due: Mar 14, 11:59 PM

Homework 5
  Due: Mar 18, 11:59 PM
Show all assignments across all courses
node index.js all

Example Output:

Upcoming Assignments

Lab 6
  Course: Embedded Systems
  Due: Mar 14, 11:59 PM

Homework 5
  Course: Computer Networks
  Due: Mar 18, 11:59 PM

Assignments due soon are color-coded for urgency in the terminal.

API Endpoints Used

The CLI communicates with the Canvas LMS REST API using the following endpoints:

Endpoint	Description
/api/v1/courses	Retrieves a list of courses the user is enrolled in
/api/v1/courses/:id/assignments	Retrieves assignments for a specific course

These endpoints allow the CLI to fetch course information and assignment data, which is then formatted for display in the terminal.

Reflection

This project provided hands-on experience working with a real-world REST API and integrating it into a command-line application. One of the most important things I learned was how token-based authentication works when interacting with third-party APIs. By generating a Canvas API token and storing it in an environment variable, I was able to securely authenticate requests without exposing sensitive information in the code repository. I also gained experience making HTTP requests from Node.js and parsing JSON responses into a format that could be displayed in the terminal.

Another valuable aspect of this project was learning how to handle errors and unexpected data from an API. The Canvas API sometimes returns courses that do not have assignments or contain missing fields, so the CLI needed to handle those situations gracefully without crashing. I implemented filtering and fallback logic so that the program would still display useful information even if certain data fields were missing.

If I had more time to expand this tool, I would add additional features such as filtering assignments by due date, exporting assignment lists to a file, or integrating the Canvas TODO endpoint to display a combined task list. I would also consider adding more advanced CLI features such as argument parsing libraries or table-based output formatting to make the interface even more user-friendly.

Security

This project uses environment variables to protect sensitive information.

Files excluded from version control:

.env
node_modules

The repository includes a .env.example file to demonstrate the required configuration without exposing real tokens.

Technologies Used

Node.js

Axios

dotenv

Chalk

Author

Mason Nelson
Computer Engineering Student
