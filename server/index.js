const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newtodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING * ",
      [description]
    );

    res.json(newtodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

    if(todo.rowCount === 0){
      return res.status(400).json("Invalid id");
    }

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );

    if(updateTodo.rows.length === 0){
      return res.json("This todo not available");
    }

    res.json({message: "Todo was updated!", data: updateTodo.rows[0]});

  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo =  await pool.query("DELETE FROM todo WHERE id = $1", [id]);

        if(deleteTodo.rows.length === 0){
          return res.json("This todo not available");
        }

        res.json("todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
})


app.listen(3000, () => {
  console.log("server started on port 3000");
});
