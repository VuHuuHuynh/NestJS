import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService { //Se duoc chinh sua va thay the bang Entity
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
    ){}

    async getTasks(filterDto: GetTaskFilterDto):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto)
    }

    // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
    //     // Xu ly logic search get by filter
    //     const {status, search} = filterDto

    //     let tasks = this.getAllTasks()

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(task => `
    //             task.title.includes(search)||
    //             task.description.includes(search))
    //     }
    //     return tasks
    // }

    async getTaskByID(id: number):Promise<Task>{
        const found = await this.taskRepository.findOne(id)

        if(!found){
            throw new NotFoundException(`Task with ID '${id}'not found`)
        }
        return found
    }

    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void>{
        const result = await this.taskRepository.delete(id)

        if (result.affected===0){
            throw new NotFoundException(`Task with ID '${id}'not found`)
        }
    }
    // deleteTask(id: String): void{
    //     const found = this.getTaskByID(id) //Error handle: Dieu kien deletask,dung chung Pipe IsNotEmpty
    //     this.tasks = this.tasks.filter(task => task.id !== found.id) 
    // }

    async updateStatusTask(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskByID(id)
        task.status = status
        await task.save()
        return task
    }
    // updateStatusTask(id: string, status: TaskStatus): Task{
    //    const task = this.getTaskByID(id)
    //    task.status = status
    //    return task 
    // }
}
