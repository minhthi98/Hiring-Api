import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timekeeping } from 'src/typeorm/entities/Timekeeping';
import { TimekeepingService } from './timeKeeping.service';
import { TimeKeepingController } from './timeKeeping.controler';
import { User } from 'src/typeorm/entities/User';
@Module({
    imports:[TypeOrmModule.forFeature([Timekeeping, User])],
    controllers: [TimeKeepingController],
    providers: [TimekeepingService]
  })
  export class TimeKeepingModule {}