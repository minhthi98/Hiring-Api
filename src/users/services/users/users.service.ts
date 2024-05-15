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


   async createUser(createUserParams: CreateUserParams) {
       const user = this.userRepostitory.create(createUserParams);
       return await this.userRepostitory.save(user);
   }

}
