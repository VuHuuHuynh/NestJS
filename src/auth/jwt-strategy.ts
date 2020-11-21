import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { JwtPayload } from '../../dist/auth/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

// Mot dang Provider xu ly req, check info user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepositoy : UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'abc12',
        })
    }
    async validate(payload: JwtPayload): Promise<User>{
        const { username} = payload
        const user = await this.userRepositoy.findOne({ username })

        if(!user){
            throw new UnauthorizedException
        }
        return user
    }
}