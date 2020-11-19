import { IsString, Matches, MinLength } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    username: string

    @IsString()
    @MinLength(8)
    @Matches(
        (/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
        { message:'password wrong' },
        )
    password: string
}