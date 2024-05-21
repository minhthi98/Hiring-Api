import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { Request } from 'express';
import { updateUserDto } from 'src/dtos/UpdateUser.dto';
import { updateUserAdDto } from 'src/dtos/UpdateUserAd.dto';
import { changePasswordDto } from 'src/dtos/ChangePassword.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }


    @Post('create')
    @UseGuards(JwtAuthGuard)
    newuser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        createUserDto.createBy = (req.user as any).userId;
        createUserDto.createAt = new Date();
        return this.userService.createUser(createUserDto);
    }

    @Post('update')
    @UseGuards(JwtAuthGuard)
    updateUser(@Body() userDto: updateUserDto) {
        const id = userDto.id;

        return this.userService.updateUser(id, userDto);
    }
    @Post('updateAd')
    @UseGuards(JwtAuthGuard)
    updateUserAd(@Body() userDto: updateUserAdDto, @Req() req: Request) {
        const id = userDto.id;
        userDto.updateBy = (req.user as any).userId;
        userDto.updateAt = new Date();
        return this.userService.updateUserAdvanced(id, userDto);
    }
    @Get('showAll')
    @UseGuards(JwtAuthGuard)
    showAllUsers(@Body() body) {
        const { any, department, position, status } = body;
        return this.userService.showAllUsers(any, department, position, status);
    }
    @Post('changeStatus')
    @UseGuards(JwtAuthGuard)
    changeStatus(@Body() body) {
        const { id, status } = body;
        return this.userService.changeStatus(id, status);
    }
    @Post('changePassword')
    @UseGuards(JwtAuthGuard)
    changePassword(@Body() changePassword: changePasswordDto) {
        return this.userService.changePassword(changePassword);
    }
}
