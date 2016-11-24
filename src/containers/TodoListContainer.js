import TodoList from '../components/TodoList'

import { connect } from 'react-redux'
import { remove, edit, check } from '../actions'

const mapStateToProps = (state) => ({todos: state.todos});

const mapDispatchToProps = (dispatch) => {
  return {
    removeTodo: (id) => {
      dispatch(remove(id))
    },
    editTodo: (text, id) => {
      dispatch(edit(text, id))
    },
    checkTodo: (id) => {
      dispatch(check(id))
    }
  }
}

let TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer