import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { title } from 'process';
import { timeEnd, timeLog } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task{
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    createTasks(@Body() createTaskDto: CreateTaskDto):Task {
        // console.log('title', title)
        // console.log('descreption', descreption)
        return this.tasksService.createTask(createTaskDto)
    }

}
