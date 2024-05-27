import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from 'src/dtos/CreateDepartment.dto';
import { UpdateDepartmentDto } from 'src/dtos/updateDepartment.dto';
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

    async getAllDepartments() {
        const departments = await this.departmentRepository.find();
        return departments;
    }
    
    async updateDepartment(id: string, department: UpdateDepartmentDto) {
        const existingDepartment = await this.departmentRepository.findOne({ where: { id }});
        if (!existingDepartment) {
            throw new NotFoundException(`Department #${id} not found`);
        }
        if (department.name) existingDepartment.name = department.name;
        if (department.address) existingDepartment.address = department.address;
        return this.departmentRepository.save(existingDepartment);
    }

}
