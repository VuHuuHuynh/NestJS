import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

// Khai bao dto query staus va search
export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.ON_PROGRESS,TaskStatus.DONE])
    status: TaskStatus
    
    @IsOptional()
    @IsNotEmpty()
    search: string
}