import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/typeorm/entities/Department';
import { User } from 'src/typeorm/entities/User';
import { updateUserDto } from 'src/dtos/UpdateUser.dto';
import { updateUserAdDto } from 'src/dtos/UpdateUserAd.dto';
import { CreateUserParams } from 'src/typeorm/utils/type';
import { Repository } from 'typeorm';
import { changePasswordDto } from 'src/dtos/ChangePassword.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
    ) { }


    async createUser(createUserParams: CreateUserParams) {
        try {
            if (!createUserParams.email) {
                throw new HttpException("Vui lý nhap email người dùng", HttpStatus.NOT_FOUND);
            }

            if (!createUserParams.phone_number) throw new HttpException("Vui lý nhap sdt người dùng", HttpStatus.NOT_FOUND);
            const checkPhone = await this.userRepository.findOne({ where: { phone_number: createUserParams.phone_number } });
            if (checkPhone) throw new HttpException("SDT đã được đăng ký", HttpStatus.NOT_FOUND);
            const checkEmail = await this.userRepository.findOne({ where: { email: createUserParams.email } });
            if (checkEmail) throw new HttpException("Email đã được đăng ký", HttpStatus.NOT_FOUND);

            if (!createUserParams.user_role) throw new HttpException("Vui lý nhap role người dùng", HttpStatus.NOT_FOUND);

            if (!createUserParams.name) throw new HttpException("Vui lý nhap ten người dùng", HttpStatus.NOT_FOUND);

            if (!createUserParams.position) throw new HttpException("Vui lý nhap chuc vu người dùng", HttpStatus.NOT_FOUND);

            if (!createUserParams.department) {
                createUserParams.department = { id: 1, name: "default", address: "Department not yet established..." };
            } else {
                const department = await this.departmentRepository.findOne({ where: { name: createUserParams.department } });
                if (!department) {
                    throw new NotFoundException(`Department with name ${createUserParams.department} not found`);
                }
                createUserParams.department = department;
            }
            if (!createUserParams.dob) throw new HttpException("Vui lý nhap ngày sinh người dùng", HttpStatus.NOT_FOUND);

            if (!createUserParams.join_date) throw new HttpException("Vui lý nhap ngày tham gia cong ty", HttpStatus.NOT_FOUND);

            if (!createUserParams.gender) throw new HttpException("Vui lý nhap gioi tinh người dùng", HttpStatus.NOT_FOUND);

            if (!createUserParams.address) throw new HttpException("Vui lý nhap dia chi người dùng", HttpStatus.NOT_FOUND);
            const user = this.userRepository.create(createUserParams);
            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: string, updateUserParams: updateUserDto) {
        if (!id) throw new HttpException("Vui lý nhap id người dùng", HttpStatus.NOT_FOUND);
        try {
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
            return { result: true, data: "đã sửa thanh cong", user: user };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserAdvanced(id: string, updateUserParams: updateUserAdDto) {
        if (!id) throw new HttpException("Vui lý nhap id người dùng", HttpStatus.NOT_FOUND);
        try {
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
            if (updateUserParams.position) user.position = updateUserParams.position;

            if (updateUserParams.team) user.team = updateUserParams.team;

            if (updateUserParams.user_role) user.user_role = updateUserParams.user_role;

            // Lưu các thay đổi vào cơ sở dữ liệu
            await this.userRepository.save(user);
            return { result: true, data: "đã sửa thanh cong", user: user };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async showAllUsers(any: string, department: string, position: string, status: boolean) {
        try {
            const query = this.userRepository.createQueryBuilder('user')
                .leftJoinAndSelect('user.department', 'department');
            if (any) {
                query.andWhere('user.name LIKE :any OR user.id LIKE :any', { any: `%${any}%` });
            }
            if (status) {
                query.andWhere('user.activate = :status', { status });
            }
            if (department) {
                query.andWhere('department.name = :department', { department });
            }
            if (position) {
                query.andWhere('user.position = :position', { position });
            }
            if (typeof status === 'boolean') {
                query.andWhere('user.activate = :status', { status });
            }

            const users = await query.getMany();
            return { result: true, data: users };
        } catch (error) {
            throw new HttpException('Error when getting all users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async changeStatus(id: string, status: boolean) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            user.activate = status;
            await this.userRepository.save(user);
            return { result: true, data: "đã sửa thay đổi trạng thái nhân viên", user: { user: user.name, status: user.activate } };
        } catch (error) {
            throw new HttpException('Error when changing status of user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changePassword(changePassword: changePasswordDto) {
        try {
            const id = changePassword.id;
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            if (!await bcrypt.compare(changePassword.password, user.password)) return "Incorrect phone number or password";
            else if(changePassword.newPassword!=changePassword.confirmPassword) return "Incorrect confirm password";
            else{
                user.password = await bcrypt.hash(changePassword.newPassword, 10);
                await this.userRepository.save(user);
                const { password: pwd, ...userWithoutPassword } = user;
                return { result: true, data: "đã sửa thay đổi mật khẩu thành công", user: userWithoutPassword };
            }
            
        }
        catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
