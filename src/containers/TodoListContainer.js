import { connect } from 'react-redux'
import { remove, edit } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeTodo: (id) => {
      dispatch(remove(id))
    },
    editTodo: (text, id) => {
      dispatch(edit(text, id))
    }
  }
}

let TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer