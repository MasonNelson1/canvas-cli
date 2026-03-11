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

    const res = await api.get("/api/v1/courses", {
      params: {
        enrollment_state: "active",
        per_page: 100
      }
    });

    return res.data.filter(c => c.name);

  } catch (err) {
    console.error("❌ Error fetching courses");
    process.exit(1);
  }
}


async function getAssignments(courseId) {
  try {

    const res = await api.get(`/api/v1/courses/${courseId}/assignments`, {
      params: {
        per_page: 100
      }
    });

    return res.data;

  } catch (err) {

    if (err.response && err.response.status === 403) {
      console.log(`⚠️ No permission for course ${courseId}`);
      return [];
    }

    console.error(`❌ Error fetching assignments for course ${courseId}`);
    return [];
  }
}


async function getAllAssignments() {

  const courses = await getCourses();
  let allAssignments = [];

  for (const course of courses) {

    try {

      const assignments = await getAssignments(course.id);

      const formatted = assignments.map(a => ({
        course: course.name,
        name: a.name,
        due: a.due_at
      }));

      allAssignments.push(...formatted);

    } catch (err) {
      continue;
    }
  }

  return allAssignments;
}


function printCourses(courses) {

  console.log(chalk.blue("\nYour Courses:\n"));

  courses.forEach(course => {
    console.log(`${course.id} - ${course.name}`);
  });

}


function printAssignments(assignments) {

  if (assignments.length === 0) {
    console.log("No assignments found.");
    return;
  }

  console.log(chalk.green("\nAssignments:\n"));

  assignments
    .sort((a, b) => new Date(a.due_at || 0) - new Date(b.due_at || 0))
    .forEach(a => {

      const dueText = a.due_at
        ? new Date(a.due_at).toLocaleString()
        : "No due date";

      console.log(chalk.white(`${a.name}`));
      console.log(`  Due: ${dueText}`);
      console.log("");
    });
}


function printAllAssignments(assignments) {

  if (assignments.length === 0) {
    console.log("No assignments found across courses.");
    return;
  }

  console.log(chalk.green("\nUpcoming Assignments\n"));

  assignments
    .sort((a, b) => new Date(a.due || 0) - new Date(b.due || 0))
    .forEach(a => {

      const due = a.due ? new Date(a.due) : null;
      const now = new Date();

      let color = chalk.white;

      if (due) {

        const days = Math.floor((due - now) / (1000 * 60 * 60 * 24));

        if (days <= 2) color = chalk.red;
        else if (days <= 5) color = chalk.yellow;
      }

      const dueText = due ? due.toLocaleString() : "No due date";

      console.log(color(`${a.name}`));
      console.log(`  Course: ${a.course}`);
      console.log(`  Due: ${dueText}`);
      console.log("");
    });
}


async function main() {

  const args = process.argv.slice(2);

  if (args.length === 0) {

    console.log("\nUsage:");
    console.log(" node index.js courses");
    console.log(" node index.js assignments <courseId>");
    console.log(" node index.js all\n");

    return;
  }


  if (args[0] === "courses") {

    const courses = await getCourses();
    printCourses(courses);
  }


  if (args[0] === "assignments") {

    const courseId = args[1];

    if (!courseId) {
      console.log("❌ Please provide a course ID");
      return;
    }

    const assignments = await getAssignments(courseId);
    printAssignments(assignments);
  }


  if (args[0] === "all") {

    const assignments = await getAllAssignments();
    printAllAssignments(assignments);
  }

}

main();
