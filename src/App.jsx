import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addTodo, deleteTodo, editTodo, fetchTodos} from "./Redux/Slices/todoSlice.js";


function App() {
    const dispatch = useDispatch()
    const {todos, loading, errors} = useSelector((state) => state.todo)
    const [text, setText] = useState('')
    const [editId, setEditId] = useState(null)
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    const hendlReg = (e) => {
        e.preventDefault()

    }
    return (
        <div>


            <form
            onSubmit={e=>{
                e.preventDefault()
                !editId ?  dispatch(addTodo(text)) : dispatch(editTodo({id: editId, title: text}))
                setText('')
                setEditId(null)
            }}
            >
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    type="text"/>
                <button type={"submit"}>{editId ? 'Save' : 'Add'}</button>
            </form>
            <ul>
                {
                    loading ? <h1>Loading</h1> : errors ? <h1>{errors}</h1> : todos.length > 0 ?
                        todos.map((todo) => {
                            return <li key={todo.id}>
                                {todo.title}
                                <button onClick={() => {
                                    setEditId(todo.id)
                                    setText(todo.title)
                                }}>Edit</button>
                                <button onClick={() => dispatch(deleteTodo(todo.id))}>X</button>
                            </li>
                        }) : <h1>No todos</h1>
                }

            </ul>
            <form
            onSubmit={hendlReg}>
                <h1>registrations</h1>
                <input type="text"
                       value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <input type="text"
                       value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input type="text"
                       value={password}
                onChange={e => setPassword(e.target.value)}/>
                <button type={"submit"}>registr</button>
            </form>
        </div>
    )
}

export default App
