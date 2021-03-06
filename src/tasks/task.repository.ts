import { EntityRepository, Repository } from "typeorm";
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { Query } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const {status, search} = filterDto
        const query = this.createQueryBuilder('task')

        if(status){
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{search: `%${search}%`})
        }
        const tasks = await query.getMany();
        return tasks
    }

    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const {title, description} = createTaskDto

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}

//Note tam: Tai cau truc task: bo task.model de thay bang ket noi db sau nay
// - task status se duoc tao ra 1 file rieng, nhu mot module moi
// - Cac bien duoc khai bao trong model truoc kia se duoc khai bao trong Entity