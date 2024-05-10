import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepostitory: Repository<User>,
    ){}

    findUser(){
        return this.userRepostitory.find()
    }
    createUser(userDetails: CreateUserParams){
        const newUser = this.userRepostitory.create({
            ...userDetails,
            createAt: new Date(),
        });
        return this.userRepostitory.save(newUser);
    }
}
