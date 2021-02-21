import { Logger } from "../../../../../../MyProjects/TSDebug/Logger";
import { ITodoProvider } from "./ITodoProvider";
const MySQL = require("sync-mysql");

// MySQL Provider class for Todo
@Logger.log
export class TodoMySQLProvider implements ITodoProvider {
    private readonly connectionString = {
        host: "localhost",
        user: "root",
        password: "saurish@pha19",
        database: "tododb"
    }

    // MySQL Connection itself
    private connection;

    // Constructor
    public constructor() {
        this.connection = new MySQL(this.connectionString);
    }

    @Logger.call()
    public addTodo(text: string, completed: number): number {
        const result = this.connection.query("INSERT INTO todo (text, completed) VALUES(?,?)", [text, completed]);

        return result.affectedRows == 1 ? result.insertId : -1;
    }

    @Logger.call()
    public getAllTodo() {
        const result = this.connection.query("SELECT * FROM todo");

        return result;
    }

    @Logger.call()
    public updateTodo(id: number) {
        const result = this.connection.query("UPDATE todo SET completed = !completed WHERE id=?", [id]);

        return (result.affectedRows == 1);
    }

    @Logger.call()
    public deleteTodo(id: number) {
        const result = this.connection.query("DELETE FROM todo WHERE id=?", [id]);

        return (result.affectedRows == 1);
    }

}