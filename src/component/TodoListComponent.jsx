export default function TodoListComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());

    const listOfTodos = [
        {
            id: "1",
            description: "Full Stack Developer",
            targetFor: targetDate,
            isDone: "Incomplete"
        },
        {
            id: "2",
            description: "AWS Cloud Practitioner",
            targetFor: targetDate,
            isDone: "Complete"
        },
        {
            id: "3",
            description: "Ethical Hacking",
            targetFor: targetDate,
            isDone: "Incomplete"
        }
    ]

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
                        listOfTodos.map(
                            (todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetFor.toDateString()}</td>
                                    <td>{todo.isDone}</td>
                                    <td>
                                        <button className="btn btn-outline-secondary">Delete</button>
                                    </td>
                                </tr>
                            ))
                    }

                </tbody>
            </table>
        </div>
    )
}