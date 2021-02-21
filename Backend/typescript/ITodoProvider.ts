// All Todo Providers must implement this interface
// for the sake of Dependency Injection
export interface ITodoProvider {
    addTodo(text: string, completed: number): number;
    getAllTodo(): any;
    updateTodo(id: number): any;
    deleteTodo(id: number): any;
}