import { TodoComponent } from "./TodoComponent"
import { TodoRESTService } from "./TodoRESTService"

document.addEventListener("DOMContentLoaded", event => {
    new TodoComponent(new TodoRESTService()).reloadTodo();
});