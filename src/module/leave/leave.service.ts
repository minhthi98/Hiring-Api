import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Leave } from "src/typeorm/entities/Leave";
import { Repository } from "typeorm";

@Injectable()
export class LeaveService {
    constructor(
        @InjectRepository(Leave) private leaveRepository: Repository<Leave>,) {}
}