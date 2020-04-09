export default function todos(
  state = [],
  action: { type: any; data: any; index: number }
) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          ...action.data,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}
