import React, { PropTypes } from 'react'

import AddTodo from '../containers/AddTodo'
import TodoListContainer from '../containers/TodoListContainer'
import Todo from './Todo'


require('../styles/style.scss')


export default class App extends React.PureComponent {
    render() {
        return (
            <div className="app">
                <h1>Todo List</h1>
                <AddTodo />
                <TodoListContainer />
            </div>
        )
    };
};