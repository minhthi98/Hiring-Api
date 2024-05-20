import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from 'src/dtos/CreateDepartment.dto';
import { Department } from 'src/typeorm/entities/Department';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
    ) { }

    async createDepartment (department: CreateDepartmentDto){
        const newDepartment = await this.departmentRepository.create(department);
        return this.departmentRepository.save(newDepartment);
    }

}
