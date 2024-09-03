import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      const jsonData = await res.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

// delete todo
const deleteTodo = async(id) => {
    try {
        await fetch(`http://localhost:3000/todo/${id}`, {
            method: "DELETE"
        });
        
         setTodos(todos.filter((todo) => (todo.id !== id)));
    } catch (err) {
        console.error(err.message);
    }
}

  return (
    <table className="table text-center mt-5">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
            <tr key={todo.id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo}/></td>
                <td><button className="btn btn-danger" onClick={() => {deleteTodo(todo.id)}}>Delete</button></td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTodo;
