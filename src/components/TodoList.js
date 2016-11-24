import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, removeTodo, editTodo }) => 
{
    return (
    <ul className="todoList">
        {todos.map(todo =>
        <Todo
            key={todo.id}
            {...todo}
            removeTodoID={removeTodo.bind(null, todo.id)}
            editTodoID={editTodo.bind(null, todo.id)}
        />
        )}
    </ul>
    )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
}

export default TodoList