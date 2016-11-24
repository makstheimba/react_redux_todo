import React from 'react'

const TodoForm = ({onSubmit}) => {
    var input;    

    function submitAndClear(e, input) {
        e.preventDefault();
        if (input.value) {
            onSubmit(input.value);
        }
        input.value = "";
    }
    
    return (
            <form onSubmit={e => {submitAndClear(e, input)}} className = "todoForm">
                <input autoFocus ref={val => {input = val}}/>
                <button type="submit">+</button>
            </form>
        )
}

export default TodoForm;