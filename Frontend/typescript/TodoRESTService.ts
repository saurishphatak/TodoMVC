import { ITodoService } from "./ITodoService";
import { Todo } from "./Todo";

export class TodoRESTService implements ITodoService {
    private url: string = "http://localhost:3000/todo";

    addTodo(text: string, completed: boolean): Promise<Response> {
        // Send POST Request to the server
        return fetch(this.url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, completed })
            });
    }

    getAllTodo(): Promise<Response> {
        // Send GET Request to the server
        return fetch(this.url);
    }

    toggleTodo(id: number): Promise<Response> {
        // Send PUT Request to the server
        return fetch(this.url + "/" + id, {
            method: "PUT",
        });
    }

    deleteTodo(id: number): Promise<Response> {
        // Send DELETE Request to the server
        return fetch(this.url + "/" + id, {
            method: "DELETE"
        });
    }
}