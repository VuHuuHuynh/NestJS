import { EntityRepository, Repository } from "typeorm";
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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