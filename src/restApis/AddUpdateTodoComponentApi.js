// import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { todoApiClient } from "./CommonApiUtil";

export function addTodo(todo) {
  const authToken = localStorage.getItem("authToken");
  if (sessionTimeValidation(authToken)) {
    return todoApiClient.post("/todos", todo, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export function updateTodo(todo) {
  const authToken = localStorage.getItem("authToken");
  if (sessionTimeValidation(authToken)) {
    return todoApiClient.put("/todos", todo, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export function getTodoById(id) {
  const authToken = localStorage.getItem("authToken");
  if (sessionTimeValidation(authToken)) {
    return todoApiClient.get(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export async function authentication(username, password) {
  //Builder Authentication with Base 64 encoder, adding to the headers:
  const authHeader = {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  };
  return todoApiClient.post("/authentication", {}, authHeader);
}

export async function sessionTimeValidation(authToken) {
  if (authToken !== null && authToken !== undefined) {
    const decodedToken = jwtDecode(authToken);
    if (decodedToken.exp * 1000 > Date.now()) {
      return true;
    } else {
      console.error("UnAuthorized, Session token expired");
    }
  }
  console.error("UnAuthorized, Token not exist");
  return false;
}
