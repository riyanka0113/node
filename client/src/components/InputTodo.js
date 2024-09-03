import React, { useState } from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            // console.log(body);
            await fetch("http://localhost:3000/todos",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            window.location="/";

        } catch (err) {
            console.error(err.message);
        }
    }

  return (
    <>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5 justify-content-center" onSubmit={onSubmit}>
          <input type="text" className="form-control w-50" value={description} onChange={e => setDescription(e.target.value)} />
          <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
