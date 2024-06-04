import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { LeaveService } from "./leave.service";
import { updateLeave } from "src/dtos/updateLeave.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Request } from 'express';
import { createLeave } from "src/dtos/createLeave.dto";

@Controller('leaves')
export class LeaveController {
    constructor(private leaveService: LeaveService) { }

    @Get('leave')
    @UseGuards(JwtAuthGuard)
    async getLeave(@Query("id") id) {  
        return await this.leaveService.getLeave(id);
    }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    async createLeave(@Body() leave:createLeave, @Req() req: Request) {
        leave.createBy = (req.user as any).userId;
        leave.createAt = new Date();
        return await this.leaveService.createLeave(leave);
    }   
     
    @Put("update")
    @UseGuards(JwtAuthGuard)
    async updateLeave(@Body() leave:updateLeave, @Req() req: Request) {
        const id = leave.id
        leave.updateAt = new Date();
        leave.updateBy = (req.user as any).userId;
        return await this.leaveService.updateLeave(id, leave);
    }
}