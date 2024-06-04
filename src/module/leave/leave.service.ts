import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AsyncSubject } from "rxjs";
import { createLeave } from "src/dtos/createLeave.dto";
import { updateLeave } from "src/dtos/updateLeave.dto";
import { Leave } from "src/typeorm/entities/Leave";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";

@Injectable()
export class LeaveService {
    constructor(
        @InjectRepository(Leave) private leaveRepository: Repository<Leave>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createLeave(leave: createLeave) {
        const user = await this.userRepository.findOne({ where: { id: leave.user } });
        if (user) {
            leave.user = user.id;
        }
        const newLeave = this.leaveRepository.create(leave);
        return await this.leaveRepository.save(newLeave);
    }
    async updateLeave(id: string, leave: updateLeave) {
        const user = await this.leaveRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`leave with id ${id} not found`);
        }
        return await this.leaveRepository.save(leave);
    }   
    async getLeave(id: string) {
        const user = await this.leaveRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`leave with id ${id} not found`);
        }
        return user;    
    }
        
}