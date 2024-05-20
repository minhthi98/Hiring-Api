import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/typeorm/entities/Department';
import { User } from 'src/typeorm/entities/User';
import { updateUserDto } from 'src/dtos/UpdateUser.dto';
import { updateUserAdDto } from 'src/dtos/UpdateUserAd.dto';
import { CreateUserParams } from 'src/typeorm/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
    ) { }


    async createUser(createUserParams: CreateUserParams) {
        const checkPhone = await this.userRepository.findOne({ where: { phone_number: createUserParams.phone_number } });
        if (checkPhone) throw new HttpException("SDT đã được đăng ký", HttpStatus.NOT_FOUND);
        const checkEmail = await this.userRepository.findOne({ where: { email: createUserParams.email } });
        if (checkEmail) throw new HttpException("Email đã được đăng ký", HttpStatus.NOT_FOUND);

        if (!createUserParams.department) {
            createUserParams.department = { id: 1, name: "default", address: "Department not yet established..." } as Department;
        }

        const user = this.userRepository.create(createUserParams);
        return await this.userRepository.save(user);
    }

    async updateUser(id: string, updateUserParams: updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            // Nếu không tìm thấy người dùng, ném một ngoại lệ hoặc xử lý theo cách phù hợp
            throw new NotFoundException(`User with id ${id} not found`);
        }
        if (updateUserParams.name) user.name = updateUserParams.name;
        if (updateUserParams.address) user.address = updateUserParams.address;
        if (updateUserParams.gender) user.gender = updateUserParams.name;
        if (updateUserParams.dob) user.dob = updateUserParams.dob;

        // Lưu các thay đổi vào cơ sở dữ liệu
        await this.userRepository.save(user);
    }

    async updateUserAdvanced(id: string, updateUserParams: updateUserAdDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            // Nếu không tìm thấy người dùng, ném một ngoại lệ hoặc xử lý theo cách phù hợp
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const department = await this.departmentRepository.findOne({ where: { name: updateUserParams.department } });
        if (!department) {
            throw new NotFoundException(`Department with name ${updateUserParams.department} not found`);
        }
    
        // Gán phòng ban cho người dùng
        user.department = department;
        if(updateUserParams.position) user.position = updateUserParams.position;
        
        if (updateUserParams.team) user.team = updateUserParams.team;

        if (updateUserParams.user_role) user.user_role = updateUserParams.user_role;

        // Lưu các thay đổi vào cơ sở dữ liệu
        await this.userRepository.save(user);

    }

}
