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
    render() {
        return (
            <ul className="todoList">
                {
                    this.props.todos.map(todo => 
                        <Todo
                            key={todo._id}
                            todo={todo}
                            remove={this.props.remove}
                            editDataID={this.props.editData.bind(this, todo._id)} //curry this to todo._id
                        />
                    )
                }
            </ul>
        )
    }
}
class Todo extends React.Component {
    constructor() {
        super();
        this.input;
        this.state = {editing: false};

        this.toggleEditing = this.toggleEditing.bind(this);
        this.renderOrEdit = this.renderOrEdit.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    toggleEditing() {
        this.setState({editing: true});
    }
    editEntry(event, editDataID, input) {
        event.preventDefault();
        if (input.value) {
            editDataID( this.input.value);
        }
        this.setState({editing: false});
    }
    renderOrEdit(todo, editDataID, remove) {
        if (this.state.editing) {
            return (
                <form 
                    className = "todoForm"
                    onSubmit={(e) => this.editEntry(e, editDataID, this.input)}
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
            return (
                <li 
                    className="todo"
                    onClick={this.toggleEditing}  
                >
                    {todo.text}
                    <button onClick={() => remove(todo._id)}>X</button>
                </li>
            )
        }
    }

    render() {
        return this.renderOrEdit(this.props.todo, this.props.editDataID, this.props.remove);
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.id = 0;
        this.state = {data: []};
        
        this.addTodo = this.addTodo.bind(this);
        this.remove = this.remove.bind(this);
        this.editData = this.editData.bind(this);
    }
    addTodo(text) {
        this.setState({data: [...this.state.data, {text, _id: this.id++}]});
    }
    remove(id) {
        this.setState({data: this.state.data.filter(item => item._id !== id)});
    }
    editData(id, newVal) {  
        const dataID = this.state.data.findIndex(item => item._id === id);
        this.state.data[dataID].text = newVal;
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