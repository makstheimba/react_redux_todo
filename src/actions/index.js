let nextID = 0;
export const addTodo = (text) => {
    return {
        type: "ADD_TODO",
        id: nextID++,
        text
    }
}

export const remove = (id) => {
    return {
        type: "REMOVE_TODO",
        id
    }
}
export const edit = (id, text) => {
    return {
        type: "EDIT_TODO",
        text,
        id
    }
}
export const check = (id) => {
    return {
        type: "CHECK_TODO",
        id
    }
}
export const clear = () => {
    return {
        type: "CLEAR_CHECKED_TODO",
    }
}