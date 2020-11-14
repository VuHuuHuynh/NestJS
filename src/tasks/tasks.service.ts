import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }

    getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
        // Xu ly logic search get by filter
        const {status, search} = filterDto

        let tasks = this.getAllTasks()

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search)||
                task.description.includes(search))
        }
        return tasks
    }

    getTaskByID(id: String):Task{
        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto){
        const {title, description} = createTaskDto
        const task:Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task)
        return task
    }

    deleteTask(id: String): void{
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateStatusTask(id: string, status: TaskStatus): Task{
       const task = this.getTaskByID(id)
       task.status = status
       return task 
    }
}
