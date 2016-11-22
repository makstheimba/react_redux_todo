import React from 'react'
require('./style.scss')

function TodoForm(props) {
    var input;

    function addTodoAndClear(e, input) {
        e.preventDefault();
        props.addTodo(input.value);
        input.value = "";
    }
    
    return (
            <form onSubmit={(e) => {addTodoAndClear(e, input)}}>
                <input autoFocus ref={val => {input = val}}/>
                <button type="submit">+</button>
            </form>
        )
}

class TodoList extends React.Component {
    constructor(){
        super();
        this.state = {editing: null};
    }
    toggleEditing(todoID) {
        this.setState({editing: todoID});
    }
    renderOrEdit(todo, edit, remove) {
        if (this.state.editing === todo._id) {
            console.log("test editing" + todo._id);
             /////////////////////////
        } else {
            return <Todo key={todo._id} todo={todo} edit={this.toggleEditing.bind(this, todo._id)} remove={this.props.remove} />
        }
    }
    render() {
        return (
            <ul>
                {
                    this.props.todos.map(todo => this.renderOrEdit(todo, this.props.edit, this.props.remove))
                }
            </ul>
        )
    }
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
    constructor() {
        super();
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
    edit(id, newVal) {
        const entryID = this.state.data.findIndex(item => item._id === id);
        let newEntry = this.state.data(entryID);
        newEntry.text = newVal;
        this.setState({data: this.state.data.splice(entryID, 1, newEntry)});
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