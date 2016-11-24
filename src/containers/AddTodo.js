import TodoForm from '../components/TodoForm'

import {connect} from 'react-redux'
import {addTodo} from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (text) => {
      dispatch(addTodo(text))
    }
  }
}

let AddTodo = connect(null, mapDispatchToProps)(TodoForm);

export default AddTodo;