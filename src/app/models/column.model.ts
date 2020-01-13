import { Task } from './tasks.model';

export class Column {
    constructor(public name: string, public tasks: Task[]) {}
}