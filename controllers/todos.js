import { Todo } from '../models/todo.js';

class todoController {
    constructor(){
        //hold todo objects in a array
        this.TODOS = []
    }
    
    createTodo(req, res){
        //get data from POST request
        const task = req.body.task
        //create new object via Todo model
        // model constructor uses uniq id and task name
        const newTodo = new Todo(Math.random().toString(), task)
        // add new todo to todos array
        this.TODOS.push(newTodo)
        //create a correct response
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    getTodos(req, res){
        res.json({tasks:this.TODOS})
    }

    updateTodo(req, res){
        //get id grom url params
        const todoId = req.params.id
        // get the updated task name from request body (like form data)
        const updatedTask = req.body.task
        // get the array e;ement index if todo id is equal with url params id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id == todoId)
        //if url params id is not correct - send error message
        if (todoIndex < 0) {
            throw new Error('Could not find todo!')
            res.json({
                message: 'Cound not find todo with such index'
            })
        }
        // if id is ok - update Todo
        // for update create element with same id and new task
        // and save it in the same array element by this index
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        // show updated info
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex]
        })
    }

    deleteTodo(req, res){
          // Get id from URL params
    const todoId = req.params.id;

    // Find index of the todo with the given id
    const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);

    // Check if todo with given id exists
    if (todoIndex === -1) {
        // If not found, send error message
        res.status(404).json({
            message: 'Todo not found'
        });
    } else {
        // If found, remove the todo at that index from the array
        this.TODOS.splice(todoIndex, 1);

        // Send success message
        res.json({
            message: 'Todo deleted successfully'
        });
    }
    }
}

export const TodoController = new todoController();