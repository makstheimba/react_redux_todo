import React from 'react'
require('./style.scss')

function TodoForm(props) {
    var input;

    function addTodoAndClear(e, input) {
        e.preventDefault();
        if (input.value) {
            props.addTodo(input.value);
        }
        input.value = "";
    }
    
    return (
            <form onSubmit={e => {addTodoAndClear(e, input)}} className = "todoForm">
                <input autoFocus ref={val => {input = val}}/>
                <button type="submit">+</button>
            </form>
        )
}

class TodoList extends React.Component {
    constructor(){
        super();
        this.input;
        this.state = {editing: null};

        this.editEntry = this.editEntry.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }
    toggleEditing(todoID) {
        this.setState({editing: todoID});
    }
    editEntry(event, editData, input) {
        event.preventDefault();
        if (input.value) {
            editData(this.state.editing, input.value);
        }
        this.setState({editing: null});
    }
    
    renderOrEdit(todo, edit, remove) {
        if (this.state.editing === todo._id) {
            return (
                <form 
                    key = {this.state.editing} 
                    onSubmit={(e) => this.editEntry(e, this.props.editData, this.input)}
                    className = "todoForm"
                >
                    <input 
                        autoFocus 
                        ref={val => {this.input = val}} 
                        defaultValue={todo.text}
                    />
                    <button type="submit">ok</button>
                </form>
            )
        } else {
            return <Todo 
                        key={todo._id} 
                        todo={todo} 
                        toggleEditing={() => this.toggleEditing(todo._id)} 
                        remove={this.props.remove}
                    />
        }
    }
    render() {
        return (
            <ul className="todoList">
                {
                    this.props.todos.map(todo => this.renderOrEdit(todo, this.props.edit, this.props.remove))
                }
            </ul>
        )
    }
}

const Todo = ({todo, toggleEditing, remove}) => {
    return (
        <li 
            onClick={() => toggleEditing(todo._id)} 
            className = "todo"
        >
            <span>{todo.text}</span>
            <button onClick={() => remove(todo._id)}>X</button>
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
        this.editData = this.editData.bind(this);
    }
    addTodo(val) {
        this.state.data.push({text: val, _id: this.id++});
        this.setState({data: this.state.data});
    }
    remove(id) {
        this.setState({data: this.state.data.filter(item => item._id !== id)});
    }
    editData(id, newVal) {
        const entryID = this.state.data.findIndex(item => item._id === id);
        this.state.data[entryID].text = newVal;
        this.setState({data: this.state.data});
    }
    render() {
        return (
            <div className = "app">
                <h1>Todo List</h1>
                <TodoForm addTodo={this.addTodo} />
                <TodoList 
                    todos={this.state.data} 
                    editData={this.editData} 
                    remove={this.remove}
                />
            </div>
        )
    }
}
export default App