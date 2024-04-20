import { todoApiClient } from "./CommonApiUtil";

export function addTodo(todo) {
    return todoApiClient.post("/todos", todo);
}

export function updateTodo(todo) {
    return todoApiClient.put("/todos", todo);
}

export function getTodoById(id) {
    return todoApiClient.get(`/todos/${id}`);
}