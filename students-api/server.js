// Lab: Students API
// Written by: Gamal
// CRUD API on /students using an array in memory (no database yet)

const express = require("express");
const app = express();
const PORT = 3000;

// Lets Express read JSON sent in the request body
app.use(express.json());

// Our "database": an array in memory
let students = [
  { id: 1, name: "Ahmed", age: 21 },
  { id: 2, name: "Sara", age: 22 },
];
let nextId = 3;

// GET /students -> all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id -> one student, or 404
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST /students -> 201, or 400 if data is missing
app.post("/students", (req, res) => {
  const body = req.body || {};
  const name = body.name;
  const age = body.age;

  if (!name || age === undefined) {
    return res.status(400).json({ message: "name and age are required" });
  }

  const newStudent = { id: nextId, name: name, age: age };
  nextId++;
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT /students/:id -> 200, or 404
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const body = req.body || {};
  if (body.name !== undefined) {
    student.name = body.name;
  }
  if (body.age !== undefined) {
    student.age = body.age;
  }

  res.status(200).json(student);
});

// DELETE /students/:id -> 204, or 404
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});