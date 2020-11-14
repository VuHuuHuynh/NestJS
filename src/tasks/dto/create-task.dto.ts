import {IsNotEmpty} from 'class-validator'
export class CreateTaskDto{
    @IsNotEmpty() //Validate use Pipe (github: class-validator)
    title: string

    @IsNotEmpty()
    description: string
}