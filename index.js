require("dotenv").config();
const axios = require("axios");
const chalk = require("chalk");

const BASE_URL = process.env.CANVAS_BASE_URL;
const TOKEN = process.env.CANVAS_API_TOKEN;

if (!TOKEN || !BASE_URL) {
  console.error("❌ Missing CANVAS_API_TOKEN or CANVAS_BASE_URL in .env");
  process.exit(1);
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

async function getCourses() {
  try {
    const res = await api.get("/api/v1/courses");
    return res.data;
  } catch (err) {
    console.error("Error fetching courses:", err.message);
    process.exit(1);
  }
}

async function getAssignments(courseId) {
  try {
    const res = await api.get(`/api/v1/courses/${courseId}/assignments`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching assignments for course ${courseId}:`, err.message);
    process.exit(1);
  }
}

function printCourses(courses) {
  console.log(chalk.blue("\nYour Courses:\n"));

  courses
    .filter(c => c.name || c.course_code)
    .forEach(course => {

      const name = course.name || course.course_code || "Unnamed Course";

      console.log(`${course.id} - ${name}`);
    });
}

function printAssignments(assignments) {

  console.log(chalk.green("\nAssignments:\n"));

  assignments
    .filter(a => a.due_at)
    .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
    .forEach(a => {

      const due = new Date(a.due_at);
      const now = new Date();

      const days = Math.floor((due - now) / (1000 * 60 * 60 * 24));

      let color = chalk.white;

      if (days <= 2) color = chalk.red;
      else if (days <= 5) color = chalk.yellow;

      console.log(color(`${a.name}`));
      console.log(`  Due: ${due.toLocaleString()}`);
      console.log("");
    });
}

async function main() {

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log(" node index.js courses");
    console.log(" node index.js assignments <courseId>");
    return;
  }

  if (args[0] === "courses") {
    const courses = await getCourses();
    printCourses(courses);
  }

  if (args[0] === "assignments") {

    const courseId = args[1];

    if (!courseId) {
      console.log("Error: Missing course ID. Usage: node index.js assignments <courseId>");
      return;
    }

    const assignments = await getAssignments(courseId);
    printAssignments(assignments);
  }
}

main();
