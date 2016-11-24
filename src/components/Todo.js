import React, { PropTypes } from 'react'

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
    editEntry(event) {
        event.preventDefault();
        if (this.input.value) {
            this.props.editTodoID(this.input.value );
        }
        this.toggleEditing();
    }
    renderOrEdit() {
        if (this.state.editing) {
            return (
                <form 
                    className = "todoForm"
                    onSubmit={e => {this.editEntry(e)}}
                >
                    <input 
                        autoFocus 
                        ref={val => {this.input = val}} 
                        defaultValue={this.props.text}
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
                    <input
                        type="checkbox" 
                        defaultChecked={this.props.done} //try with ref
                        onClick={(e) => {
                            e.stopPropagation();
                            this.props.checkTodoID();
                        }}
                    />                    
                    <span>{this.props.text}</span>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        this.props.removeTodoID();
                    }}>X</button>
                </li>
            )
        }
    }

    render() {
        return this.renderOrEdit();
    }
}
Todo.propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    removeTodoID: PropTypes.func.isRequired,
    editTodoID: PropTypes.func.isRequired,
    checkTodoID: PropTypes.func.isRequired,
}

export default Todo