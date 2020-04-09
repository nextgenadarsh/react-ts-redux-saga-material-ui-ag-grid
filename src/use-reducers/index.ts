import visibilityFilter from "./visibility-filter-reducer";
import todos from "./todos-reducer";

export const initialState = {
  visibilityFilter: "SHOW_ALL",
  todos: [
    {
      text: "Consider using Redux",
      completed: true
    },
    {
      text: "Keep all state in a single tree",
      completed: false
    }
  ]
};

export default function todoApp(state = initialState, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
