import { todoApiClient } from "./CommonApiUtil";

export function getAllTodos() {
    return todoApiClient.get("/todos");
}

export function deleteTodoById(id) {
    return todoApiClient.delete(`/todos/${id}`);
}