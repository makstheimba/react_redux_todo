import React, {PropTypes} from 'react'
require('./style.scss')

const TodoForm = ({addTodo}) => {
    var input;    

    function addTodoAndClear(e, input) {
        e.preventDefault();
        if (input.value) {
            addTodo(input.value);
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
class TodoList extends React.PureComponent {
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
                            toggleCheckID={this.props.toggleCheck.bind(this, todo._id)}
                        />
                    )
                }
            </ul>
        )
    }
}
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,        
    })).isRequired,
    remove: PropTypes.func.isRequired,
    editData: PropTypes.func.isRequired,
    toggleCheck: PropTypes.func.isRequired,
}
class Todo extends React.PureComponent {
    constructor() {
        super();
        this.input;
        this.state = {editing: false};

        this.toggleEditing = this.toggleEditing.bind(this);
        this.renderOrEdit = this.renderOrEdit.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    toggleEditing() {
        this.setState({editing: !this.state.editing});
    }
    editEntry(event, editDataID, input) {
        event.preventDefault();
        if (input.value) {
            editDataID( this.input.value);
        }
        this.toggleEditing();
    }
    renderOrEdit() {
        if (this.state.editing) {
            return (
                <form 
                    className = "todoForm"
                    onSubmit={e => {this.editEntry(e, this.props.editDataID, this.input)}}
                >
                    <input 
                        autoFocus 
                        ref={val => {this.input = val}} 
                        defaultValue={this.props.todo.text}
                    />
                    <button type="submit">ok</button>
                </form>
            )
        } else {
            return (
                <li 
                    className="todo"
                    onDoubleClick={this.toggleEditing}
                >
                    <input
                        type="checkbox" 
                        defaultChecked={this.props.todo.done} //try with ref
                        onChange={this.props.toggleCheckID}
                    />                    
                    <span>{this.props.todo.text}</span>
                    <button onClick={() => this.props.remove(this.props.todo._id)}>X</button>
                </li>
            )
        }
    }

    render() {
        return this.renderOrEdit();
    }
}
Todo.propTypes = {
    todo: PropTypes.shape({        
        _id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,       
    }),
    editDataID: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    toggleCheckID: PropTypes.func.isRequired,
}
export default class App extends React.PureComponent {
    constructor() {
        super();
        this.state = {data: JSON.parse(localStorage.getItem("data")) || []};
        this.id = this.state.data.length ? this.state.data[this.state.data.length - 1]._id + 1 : 0;

        this.addTodo = this.addTodo.bind(this);
        this.remove = this.remove.bind(this);
        this.editData = this.editData.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);
        this.clearChecked = this.clearChecked.bind(this);
    }
    addTodo(text) {
        this.setState({data: [...this.state.data, {text, _id: this.id++, done: false}]});
    }
    remove(id) {
        this.setState({data: this.state.data.filter(item => item._id !== id)});
    }
    editData(id, newVal) {  
        const dataID = this.state.data.findIndex(item => item._id === id);
        this.state.data[dataID].text = newVal;
        this.setState({data: this.state.data});
    }
    toggleCheck(id) {        
        const dataID = this.state.data.findIndex(item => item._id === id);
        this.state.data[dataID].done = !this.state.data[dataID].done;
        this.setState({data: this.state.data});

        //Explicitly update localstorage here because componentDidUpdate not firing in this case
        localStorage.setItem("data", JSON.stringify(this.state.data));
    }
    clearChecked() {
        this.setState({data: this.state.data.filter(item => !item.done)});
    }
    componentDidUpdate() {
        localStorage.setItem("data", JSON.stringify(this.state.data));
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
                    toggleCheck={this.toggleCheck}
                />
                <button 
                    onClick={this.clearChecked}
                    className="btnClear"
                >Clear completed tasks</button>
            </div>
        )
    };
};