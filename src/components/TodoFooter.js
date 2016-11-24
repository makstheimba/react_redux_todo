import React, { PropTypes } from 'react'

const TodoFooter = ({clearTodo}) => {
    return <button onClick={clearTodo} className="btnClear">Clear completed tasks</button>
}

TodoFooter.PropTypes = {
    clearTodo: PropTypes.func.isRequired,
}

export default TodoFooter