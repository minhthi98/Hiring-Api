import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DepartmentsService } from './department.service';
import { CreateDepartmentDto } from 'src/dtos/CreateDepartment.dto';
import { Request } from 'express';
import { UpdateDepartmentDto } from 'src/dtos/updateDepartment.dto';


@Controller('departments')
export class departmentsController {
    constructor(private departmentService: DepartmentsService){}
    @Post('create')
    @UseGuards(JwtAuthGuard)
    newDepartment(@Body()createDto: CreateDepartmentDto, @Req() req: Request){
        createDto.createBy = (req.user as any).userId;
        createDto.createAt = new Date();
        return this.departmentService.createDepartment(createDto);
    }
    
    @Get("all")
    @UseGuards(JwtAuthGuard)
    getDepartments(){
        return this.departmentService.getAllDepartments();
    }

    @Post("update")
    @UseGuards(JwtAuthGuard)
    updateDepartment(@Body()department: UpdateDepartmentDto, @Req() req: Request){
        const id = department.id;
        department.updateBy = (req.user as any).userId;
        department.updateAt = new Date();
        return this.departmentService.updateDepartment(id, department);
    }
}