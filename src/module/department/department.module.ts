import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/typeorm/entities/Department';
import { departmentsController } from './department.controller';
import { DepartmentsService } from './department.service';

@Module({
  imports:[TypeOrmModule.forFeature([Department])],
  controllers: [departmentsController],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
