import { NetworkStatus } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTodo } from "./customHooks/useCreateTodo";
import { useDeleteTodo } from "./customHooks/useDeleteTodo";
import { useGetTodos } from "./customHooks/useGetTodos";
import { useUpdateTodo } from "./customHooks/useUpdateTodo";

export default function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const inputRef = useRef(null);
  const inputUpdateRef = useRef(null);

  const data = useSelector((state) => state.todo.todos);

  const { networkStatus, handleRefetching, error, loading } = useGetTodos();
  const { handleUpdate } = useUpdateTodo({ ref: inputUpdateRef });
  const { handleCreate } = useCreateTodo();
  const { handleDelete } = useDeleteTodo();

  return (
    <div>
      <h1>status: {NetworkStatus[networkStatus]}</h1>
      <button onClick={handleRefetching}>Refetch</button>
      <br />
      {/* <button onClick={handleGetById}>Fetch By Id</button> */}
      <input type="text" ref={inputRef} placeholder="enter Id" />
      <br />
      <button onClick={handleCreate}>create</button>
      <br />
      <button onClick={(e) => handleUpdate(e, currentItem?.id)}>update</button>
      <input type="text" ref={inputUpdateRef} placeholder="enter new type" />
      <br />
      <button onClick={() => handleDelete(currentItem?.id)}>delete</button>

      {error && <pre>{error.message}</pre>}
      {loading && <div>Loading...</div>}
      {!loading && !error && (
        <>
          <h1>TODO List</h1>
          <ol>
            {data?.map((todo) => (
              <li key={todo.id} onClick={() => setCurrentItem(todo)}>
                <span>{todo.id}</span>
                {" | "}
                <span>{todo.type}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
