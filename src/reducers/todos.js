const todos = (state = [{id: -1, text: "test", done: false}], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        case "REMOVE_TODO":
            return state.filter(todo => todo.id !== action.id)
        case "EDIT_TODO":
            return state.map(todo => todo.id === action.id ? Object.assign({}, todo, {text: action.text}) : todo)
        default:
            return state
    }
}

export default todos;