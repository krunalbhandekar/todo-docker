const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      return res.status(500).json({ status: "error", error: err.message });
    }
    res.status(200).json({ status: "success", todos: result });
  });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO todos (title) VALUES (?)", [title], (err) => {
    if (err) {
      return res.status(500).json({ status: "error", error: err.message });
    }
    res.status(200).json({ status: "success" });
  });
});

app.delete("/todos/:id", (req, res) => {
  db.query("DELETE FROM todos WHERE ID = ?", [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ status: "error", error: err.message });
    }
    res.status(200).json({ status: "success" });
  });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
