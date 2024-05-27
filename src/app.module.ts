import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './module/users/users.module';
import { Leave } from './typeorm/entities/Leave';
import { Timekeeping } from './typeorm/entities/Timekeeping';
import { Department } from './typeorm/entities/Department';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './module/department/department.module';
import { LeaveModule } from './module/leave/leave.module';
import { TimeKeepingModule } from './module/timeKeeping/timeKeeping.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hiring_db',
    entities: [User, Leave, Timekeeping, Department],
    synchronize: true,
  }),
  // modules
    UsersModule,
    DepartmentsModule,
    LeaveModule,
    TimeKeepingModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
