# Canvas Assignment Tracker CLI

A command-line interface (CLI) tool that connects to the Canvas LMS API to help students quickly view their courses and upcoming assignments directly from the terminal.

This tool retrieves courses and assignments from Canvas and displays them in a simple, readable format. Instead of navigating through multiple pages in the Canvas web interface, users can quickly check their assignments and deadlines from the command line.

---

## Demo

![Demo](assets/demo.gif)

The demo above shows listing courses, viewing assignments for a course, and displaying assignments across all courses.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MasonNelson1/canvas-cli
cd canvas-cli
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate a Canvas API Token

1. Log into Canvas.
2. Go to **Account Settings**.
3. Scroll to **Approved Integrations**.
4. Click **+ New Access Token**.
5. Give it a name like `Canvas CLI`.
6. Generate the token and copy it.

### 4. Create a `.env` File

Create a file called `.env` in the root directory.

Example:

```
CANVAS_API_TOKEN=your_canvas_api_token_here
CANVAS_BASE_URL=https://boisestatecanvas.instructure.com
```

The `.env` file stores your secret token and **should never be pushed to GitHub**.

---

## Usage

### List Your Canvas Courses

```bash
node index.js courses
```

Example Output:

```
Your Courses:

27618 - Embedded Systems
8147 - Engineering Student Shop
13941 - COEN Undergrad Students
```

---

### View Assignments for a Course

```bash
node index.js assignments <course_id>
```

Example:

```bash
node index.js assignments 27618
```

Example Output:

```
Assignments:

Lab 6
Due: Mar 14, 11:59 PM

Homework 5
Due: Mar 18, 11:59 PM
```

---

### View Assignments Across All Courses

```bash
node index.js all
```

Example Output:

```
Upcoming Assignments

Lab 6
Course: Embedded Systems
Due: Mar 14, 11:59 PM

Homework 5
Course: Computer Networks
Due: Mar 18, 11:59 PM
```

Assignments due soon may appear highlighted in the terminal.

---

## API Endpoints Used

The application uses the Canvas REST API.

| Endpoint | Purpose |
|--------|--------|
| `/api/v1/courses` | Retrieves courses the user is enrolled in |
| `/api/v1/courses/:id/assignments` | Retrieves assignments for a specific course |

These endpoints allow the CLI to gather course and assignment information from Canvas and present it in the terminal.

---

## Reflection

This project gave me practical experience working with a real-world REST API and building a command-line application using Node.js. One important concept I learned was how APIs use authentication tokens to securely access user data. By generating a Canvas API token and storing it in an environment variable, the program can authenticate requests without exposing sensitive credentials in the source code.

Another key learning experience involved handling inconsistent API data. Some courses returned by the Canvas API may not contain assignments or may include incomplete fields. Because of this, the program needed error handling and fallback logic to prevent crashes and still display useful information to the user.

If I continued developing this project, I would add features such as filtering assignments by due date, displaying assignments due within a certain number of days, and exporting assignments to a file. I would also improve the CLI interface with more advanced command parsing and better formatting for terminal output.

---

## Security

Sensitive data is stored in environment variables.

The following files are ignored by Git:

```
.env
node_modules
```

The repository includes a `.env.example` file to show the required environment variables without exposing real tokens.

---

## Technologies Used

- Node.js  
- Axios  
- dotenv  
- Chalk  

---

## Author

Mason Nelson  
Computer Engineering Student  

---
