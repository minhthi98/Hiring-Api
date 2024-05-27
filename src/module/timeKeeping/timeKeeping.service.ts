import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Timekeeping } from "src/typeorm/entities/Timekeeping";
import { User } from "src/typeorm/entities/User";
import { Between, Repository } from "typeorm";

export class TimekeepingService {
    constructor(
        @InjectRepository(Timekeeping) private timekeepingRepository: Repository<Timekeeping>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createTimekeeping(idUser: string) {
        const user = await this.userRepository.findOne({ where: { id: idUser } });
        if (!user) {
            throw new NotFoundException(`User with id ${idUser} not found`);
        }
        const timekeeping = new Timekeeping();
        timekeeping.user = user;
        timekeeping.checked_time = new Date();
        return this.timekeepingRepository.save(timekeeping);
    }

    async getTimekeepinginMonth(idUser: string, month: Date) {
        const user = await this.userRepository.findOne({ where: { id: idUser } });
        if (!user) {
            throw new NotFoundException(`User with id ${idUser} not found`);
        }
    
        // Xác định ngày đầu tiên của tháng
        const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        
        // Xác định ngày cuối cùng của tháng
        const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999);
    
        // Lấy tất cả các Timekeeping trong khoảng thời gian từ ngày đầu tiên đến ngày cuối cùng của tháng
        const timekeepingInMonth = await this.timekeepingRepository.find({
            where: {
                user: user,
                checked_time: Between(firstDayOfMonth, lastDayOfMonth)
            }
        });
    
        return timekeepingInMonth;
    }
}