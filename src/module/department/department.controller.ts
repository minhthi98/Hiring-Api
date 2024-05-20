import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DepartmentsService } from './department.service';
import { CreateDepartmentDto } from 'src/dtos/CreateDepartment.dto';
import { Request } from 'express';

@Controller('departments')
export class departmentsController {
    constructor(private departmentService: DepartmentsService){}
    @Post('create')
    @UseGuards(JwtAuthGuard)
    newDepartment(@Body()createDto: CreateDepartmentDto, @Req() req: Request){
        createDto.createBy = (req.user as any).userId;
        createDto.createAt = new Date();
    }

}