import { useEffect, useState } from "react";
import { getAllTodos, deleteTodoById } from "../restApis/TodoListComponentApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function TodoListComponent() {

    // const today = new Date();
    // const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());
    const [todos, setTodos] = useState([]);
    const navigateTo = useNavigate();
    const auth = useAuth();

    // const listOfTodos = [
    //     {
    //         id: "1",
    //         description: "Full Stack Developer",
    //         targetFor: targetDate,
    //         isDone: "Incomplete"
    //     },
    //     {
    //         id: "2",
    //         description: "AWS Cloud Practitioner",
    //         targetFor: targetDate,
    //         isDone: "Complete"
    //     },
    //     {
    //         id: "3",
    //         description: "Ethical Hacking",
    //         targetFor: targetDate,
    //         isDone: "Incomplete"
    //     }
    // ]


    //Tell react that below method needs to do something when this component renders:
    useEffect(
        () => getAllTodosHandler(), []
    )

    //Calling REST API, To get all Todos:
    function getAllTodosHandler() {
        getAllTodos()
            .then((res) => {
                // console.log(res.data);
                setTodos(res.data);
            })
            .catch(err => {
                auth.setResp("Error While retreving todos");
                console.error("Error While retreving todos :: ", err)
            });
    }

    //Calling REST API, to update a specific todo:
    function updateTodoHandler(id) {
        navigateTo(`/todos/${id}`);
    }


    //Calling REST API, to delete a specific todo:
    function deleteTodoByIdHandler(id) {
        deleteTodoById(id)
            .then(() => getAllTodosHandler())
            .catch(err => {
                auth.setResp("Error While deleting " + id + " todoId");
                console.error("Error While deleting " + id + " todoId :: ", err);
            });
    }

    //Calling REST API, to add new todo:
    function addTodoHandler() {
        navigateTo("/todos/-1");
        // <Navigate to={"/addTodos"} />
    }

    return (
        <div className="container">
            <div className="m-5 fs-5 bg-light">
                <b>My TODOs</b>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Targeted For</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        todos.map(
                            (todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetedDate.toString()}</td>
                                    <td>{todo.completed.toString() === "false" ? "Incomplete" : "Completed"}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => updateTodoHandler(todo.id)}>Update</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => deleteTodoByIdHandler(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                    }

                </tbody>
            </table>

            <div>
                <button className="btn btn-success w-25 mt-4" onClick={addTodoHandler}>Add Todo</button>
            </div>
        </div>
    )
}