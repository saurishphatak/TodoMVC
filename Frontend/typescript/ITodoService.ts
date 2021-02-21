export interface ITodoService {
    addTodo(text: string, completed: boolean): Promise<Response>;
    getAllTodo(): Promise<Response>;
    toggleTodo(id: number): Promise<Response>;
    deleteTodo(id: number): Promise<Response>;
}