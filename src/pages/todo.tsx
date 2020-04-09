import React, { useState, useReducer } from "react";
import todoApp, { initialState } from "../use-reducers";

const TodoPage = props => {
  const [text, setText] = useState("");
  const [state, dispatch] = useReducer(todoApp, initialState);

  const addTodoHandler = e => {
    dispatch({
      type: "ADD_TODO",
      data: {
        text: text
      }
    });
    setText("");
  };

  const onCompletedHandler = todoIndex => {
    dispatch({
      type: "TOGGLE_TODO",
      index: todoIndex
    });
  };

  const visibilityFilterHandler = e => {
    dispatch({
      type: "SET_VISIBILITY_FILTER",
      filter: e.target.checked ? "SHOW_ALL" : "HIDE_COMPLETED"
    });
  };

  const visibleTodos =
    state.visibilityFilter === "SHOW_ALL"
      ? state.todos
      : state.todos.filter(todo => !todo.completed);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Todo Page</h2>
      <div className="form-group row">
        <label htmlFor="todoDescription">Todo Description:</label>
        <input
          type="text"
          className="form-control"
          id="todoDescription"
          aria-describedby="todoDescriptionHelp"
          placeholder="Enter todo description"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <small id="todoDescriptionHelp" className="form-text text-muted">
          Use verbs to create task description
        </small>
      </div>
      <button className="btn btn-primary" onClick={addTodoHandler}>
        Add Todo
      </button>

      <hr />
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="visibilityFilter"
          checked={state.visibilityFilter === "SHOW_ALL"}
          onChange={visibilityFilterHandler}
        />
        <label className="form-check-label" htmlFor="visibilityFilter">
          Show completed todos?
        </label>
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <tbody>
          {visibleTodos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onCompletedHandler(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoPage;
