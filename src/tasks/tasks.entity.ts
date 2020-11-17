import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn() //Tu danh so va tang so -> thay the cho uuid
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: TaskStatus
}