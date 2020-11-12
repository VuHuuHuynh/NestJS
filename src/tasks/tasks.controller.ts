import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { title } from 'process';
import { timeEnd, timeLog } from 'console';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks()
    }

    @Post()
    createTasks(
        @Body('title') title: string,
        @Body('descreption') descreption: string
        ):Task {
        // console.log('title', title)
        // console.log('descreption', descreption)
        return this.tasksService.createTask(title, descreption)
    }

}
