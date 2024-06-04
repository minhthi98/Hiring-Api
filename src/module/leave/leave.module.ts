import { TypeOrmModule } from "@nestjs/typeorm";
import { Leave } from "src/typeorm/entities/Leave";
import { Module } from '@nestjs/common';
import { LeaveService } from "./leave.service";
import { LeaveController } from "./leave.controler";
import { User } from "src/typeorm/entities/User";

@Module({
    imports:[TypeOrmModule.forFeature([Leave, User])],
    controllers: [LeaveController],
    providers: [LeaveService]
  })
  export class LeaveModule {}