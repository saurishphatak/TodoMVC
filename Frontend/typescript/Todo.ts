// Represents a Todo
export class Todo {
    // Parameterised Constructor
    public constructor(
        public id: number,
        public text: string,
        public completed: boolean
    ) { }
}