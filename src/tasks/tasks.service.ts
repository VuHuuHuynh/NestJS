import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { constants } from 'buffer';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }

    getTaskByID(id: String):Task{
        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto){
        const {title, descreption} = createTaskDto
        const task:Task = {
            id: uuid(),
            title:title,
            description: descreption,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task)
        return task
    }
}
