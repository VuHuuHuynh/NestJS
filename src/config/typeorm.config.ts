import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: '127.0.0.1', //localhost
    port: 3306,
    username: 'root',
    password: 'Userpa$$w0rd123',
    database: 'nestjs',
    entities:[__dirname+ '/**/*.entity{.ts,.js}'],
    synchronize:true,
}