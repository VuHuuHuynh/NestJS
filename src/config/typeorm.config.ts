import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'localhost', //localhost
    port: 3306,
    username: 'root',
    password: 'huynh123',
    database: 'nestjs',
    entities:[__dirname+ '/**/*.entity{.ts,.js}'],
    synchronize:true,
}