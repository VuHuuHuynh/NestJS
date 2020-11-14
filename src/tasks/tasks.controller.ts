import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    // Thay doi GetAll thanh Get de truy van tim kiem --Them filter
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTaskWithFilters(filterDto)
        }
        else{
            return this.tasksService.getAllTasks()
        }
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task{
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    @UsePipes(ValidationPipe)  //Su dung Pipe Validate mac dinh cua NestJS Pipe
    createTask(@Body() createTaskDto: CreateTaskDto):Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string):void{
        this.tasksService.deleteTask(id)
    }
    
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task{
        return this.tasksService.updateStatusTask(id, status)
    }

}
