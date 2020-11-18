import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto)
    }
    // @Get()
    // // Thay doi GetAll thanh Get de truy van tim kiem --Them filter
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTaskWithFilters(filterDto)
    //     }
    //     else{
    //         return this.tasksService.getAllTasks()
    //     }
    // }

    @Get('/:id')
    getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    @UsePipes(ValidationPipe)  //Su dung Pipe Validate mac dinh cua NestJS Pipe
    createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number):Promise<void>{
        return this.tasksService.deleteTask(id)
    }
    
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus // validate status bang Pipe
    ): Promise<Task>{
        return this.tasksService.updateStatusTask(id, status)
    }

}
