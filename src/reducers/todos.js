const todos = (state = [], action) => {
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
        case "CHECK_TODO":
            return state.map(todo => todo.id === action.id ? Object.assign({}, todo, {done: !todo.done}) : todo)
        case "CLEAR_CHECKED_TODO":
            return state.filter(todo => !todo.done)
        default:
            return state
    }
}

export default todos;