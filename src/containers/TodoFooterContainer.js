import TodoFooter from '../components/TodoFooter'

import { connect } from 'react-redux'
import { clear } from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    clearTodo: () => {
      dispatch(clear())
    } 
  }
}

let TodoFooterContainer = connect(null, mapDispatchToProps)(TodoFooter);

export default TodoFooterContainer;
