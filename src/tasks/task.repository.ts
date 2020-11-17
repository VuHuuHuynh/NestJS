import { EntityRepository, Repository } from "typeorm";
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}

//Note tam: Tai cau truc task: bo task.model de thay bang ket noi db sau nay
// - task status se duoc tao ra 1 file rieng, nhu mot module moi
// - Cac bien duoc khai bao trong model truoc kia se duoc khai bao trong Entity