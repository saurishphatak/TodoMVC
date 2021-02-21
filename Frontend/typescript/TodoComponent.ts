import { ITodoService } from "./ITodoService";
import { Logger } from "./Logger";
import { Todo } from "./Todo";
import { TodoRESTService } from "./TodoRESTService";

@Logger.log
export class TodoComponent {
    private todoULElement: HTMLUListElement;
    private todoInputElement: HTMLInputElement;
    private todoButton: HTMLButtonElement;

    // Parameterized Constructor
    public constructor(private service: ITodoService) {
        // Store the UL Element
        this.todoULElement = document.querySelector("#todoUL") as HTMLUListElement;

        // Store the input Element
        this.todoInputElement = document.querySelector("#todoInput") as HTMLInputElement;

        // Store the button Element
        this.todoButton = document.querySelector("#todoButton") as HTMLButtonElement;

        // Add event listener to the todoButton
        this.todoButton.addEventListener("click", event => {
            // Get the text from the todoInputElement and call addTodo() 
            this.addTodo(this.todoInputElement.value);
        });
    }

    // Adds a todo to the backend then calls renderTodo() to render it
    @Logger.call()
    public async addTodo(text: string) {
        // Call service's addTodo() with the given text
        const response = await this.service.addTodo(text, false);
        const result = await response.json();

        // Create a new Todo with the given text, completed and id
        if (-1 != result) {
            const todo: Todo = new Todo(result, text, false);

            // Call renderTodo() with the todo object
            this.renderTodo(todo);
        }
    }

    // Renders a todo on the webpage
    @Logger.call()
    public renderTodo(todoObject: Todo) {
        // HTML Template 
        const htmlTemplate: string = `
        <li id="todo-${todoObject.id}">
        <label class="todoLabel">${todoObject.text}</label>
        <button class="todoDelete" type="checkbox" ${todoObject.completed ? "checked" : ""}>X</button>
        </li>
        `;

        // Add the HTML Template to the todoULElement
        this.todoULElement.insertAdjacentHTML("beforeend", htmlTemplate);

        // Add event listeners to the elements
        const todoDeleteButton: HTMLButtonElement = this.todoULElement.querySelector(`#todo-${todoObject.id}`)?.querySelector(".todoDelete") as HTMLButtonElement;
        todoDeleteButton.addEventListener("click", async event => {
            // Call deleteTodo() of service with the todoObject's id
            const response = await this.service.deleteTodo(todoObject.id);
            const result = await response.json();

            Logger.info("TodoComponent::todoDeleteButton()", [result]);
            if (result) {
                // Remove the LI having todoObject's id from the DOM
                const todoLIElement: HTMLLIElement = this.todoULElement.querySelector(`#todo-${todoObject.id}`) as HTMLLIElement;
                this.todoULElement.removeChild(todoLIElement);
            }
        });
    }

    // Retrieves any existing todos and then renders them
    @Logger.call()
    public async reloadTodo() {
        // Call getAllTodo() of the service
        const response = await this.service.getAllTodo();
        const todoArray: Todo[] = await response.json();

        todoArray.forEach(todoObject => this.renderTodo(todoObject));
    }
}
