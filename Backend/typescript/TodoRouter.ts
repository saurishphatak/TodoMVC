import express, { Response, Request } from "express";
import bodyParser from "body-parser";
const MySql = require("sync-mysql");
import { Logger } from "../../../../../../MyProjects/TSDebug/Logger";
import { ITodoProvider } from "./ITodoProvider";
import { TodoMySQLProvider } from "./TodoMySQLProvider";
import cors from "cors";

// Rest App Class
@Logger.log
class TodoRouter {
    // The app itself
    private app: express.Application;

    // The port number on which the app runs
    private port: number = 3000;

    // Connection String
    private connection = new MySql({
        host: "localhost",
        user: "root",
        password: "saurish@pha19",
        database: "tododb"
    });

    // Constructor
    public constructor(private provider: ITodoProvider) {
        this.app = express();
        this.app.use(cors());

        // Load the app middleware
        this.loadAppMiddleware();

        // Load the router middleware
        this.loadRouterMiddleware();

        // Start the server
        this.app.listen(this.port, () => { console.log(`Server started on port : ${this.port}...`) });
    }

    // Loads the app middleware
    @Logger.call()
    private loadAppMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    // Invokes the get method of the provider
    @Logger.call()
    private get(request: Request, response: Response) {

        const result = this.provider.getAllTodo();

        response.send(JSON.stringify(result));
    }

    // Invokes the add method of the provider
    @Logger.call()
    private add(request: Request, response: Response) {
        // Parse the body of the request
        const result = this.provider.addTodo(request.body.text ?? "", request.body.completed ?? 0);

        response.send(JSON.stringify(result));
    }

    // Invokes the update method the provider
    @Logger.call()
    private update(request: Request, response: Response) {
        const id: number = Number(request.params.id);

        const result = this.provider.updateTodo(id);

        Logger.info("TodoRouter::update() result : ", [result]);
        result ?
            response.status(200).send(`Toggled todo with id : ${request.params.id}`) :
            response.status(400).send(`Could not find id : ${request.params.id}`);
    }

    // Invokes the delete method of the provider
    @Logger.call()
    private delete(request: Request, response: Response) {
        const id: number = Number(request.params.id);

        const result = this.provider.deleteTodo(id);

        Logger.info("TodoRouter::delete() result : ", [result]);

        result ?
            response.status(200).send(JSON.stringify(result)) :
            response.status(400).send(JSON.stringify(result));
    }

    // Loads the router middleware
    @Logger.call()
    private loadRouterMiddleware() {
        // Add CRUD routes
        // R -> Read
        this.app.get("/todo", this.get.bind(this));

        // C -> C
        this.app.post("/todo", this.add.bind(this));

        // U -> Update
        this.app.put("/todo/:id", this.update.bind(this));

        // D -> Delete
        this.app.delete("/todo/:id", this.delete.bind(this));
    }
}

new TodoRouter(new TodoMySQLProvider());