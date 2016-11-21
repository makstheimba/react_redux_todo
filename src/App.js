import React from 'react'
require('./style.scss')

function TodoForm(props) {
    const addTodo = props.addTodo;
    let input;
    return (
            <div>
                <input ref={val => {input = val}} />
                <button onClick={() => {
                    addTodo(input.value); 
                    input.value = ""}
                }>+</button>
            </div>
        )
}

const TodoList = ({todos, edit, remove}) => {
    todos = todos.map(todo => <Todo key={todo._id} todo={todo} edit={edit} remove={remove} />);
    return <ul>{todos}</ul>;
}

const Todo = ({todo, edit, remove}) => {
    return (
        <li onDoubleClick={() => remove(todo._id)}>
            {todo.text}
            <button onClick={() => edit(todo._id)}>Edit</button>
        </li>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.id = 0;
        this.state = {data: []}

        this.addTodo = this.addTodo.bind(this);
        this.remove = this.remove.bind(this);
        this.edit = this.edit.bind(this);
    }
    addTodo(val) {
        this.state.data.push({text: val, _id: this.id++});
        this.setState({data: this.state.data});
    }
    remove(id) {
        this.setState({data: this.state.data.filter(item => item._id !== id)});
    }
    edit(id) {
        const entry = this.state.data.find(item => item._id === id);
        console.log(entry.text);
    }
    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <TodoForm addTodo={this.addTodo} />
                <TodoList todos={this.state.data} edit={this.edit} remove={this.remove} />
            </div>
        )
    }
}
export default App