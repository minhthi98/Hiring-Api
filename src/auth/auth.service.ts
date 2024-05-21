import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser({ phoneNumber, password }: AuthPayloadDto) {
    const findUser = await this.userRepository.findOne({ where: { phone_number: phoneNumber } });
    if (!findUser) return "User not found";
    else if (!await bcrypt.compare(password, findUser.password)) return "Incorrect phone number or password";

    const { password: pwd, ...userWithoutPassword } = findUser;
    const payload = { phoneNumber: userWithoutPassword.phone_number, sub: userWithoutPassword.id };
    return {
      user: userWithoutPassword,
      access_token: this.jwtService.sign(payload),
    };
  }
}


