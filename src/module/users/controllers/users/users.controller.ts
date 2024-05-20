import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { Request } from 'express';
import { updateUserDto } from 'src/dtos/UpdateUser.dto';
import { updateUserAdDto } from 'src/dtos/UpdateUserAd.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}


    @Post('create')
    @UseGuards(JwtAuthGuard)
    newuser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        createUserDto.createBy = (req.user as any).userId;
        createUserDto.createAt = new Date();
        return this.userService.createUser(createUserDto);
    }

    @Post('update')
    @UseGuards(JwtAuthGuard)
    updateUser(@Body() UserDto: updateUserDto, @Req() req: Request) {
       const id = (req.user as any).userId;
        return this.userService.updateUser(id,UserDto);
    }
    @Post('updateAd')
    @UseGuards(JwtAuthGuard)
    updateUserAd(@Body() body, @Req() req: Request) {
        const { id, UserDto } = body;
        UserDto.updateBy = (req.user as any).userId;
        UserDto.updateAt = new Date();
        return this.userService.updateUserAdvanced(id,UserDto);
    }

}
