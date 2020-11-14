import { TaskStatus } from '../tasks.model';

// Khai bao dto query staus va search
export class GetTaskFilterDto{
    status: TaskStatus
    search: string
}