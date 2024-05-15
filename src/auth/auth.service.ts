import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'thanhhoa',
    password: '123',
  },
  {
    id: 2,
    username: 'trongnghia',
    password: '123',
  },
  {
    id: 3,
    username: 'minhthi',
    password: '123',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser || findUser.password !== password) return null;

    const { password: pwd, ...userWithoutPassword } = findUser;
    const payload = { username: userWithoutPassword.username, sub: userWithoutPassword.id };
    return {
      user: userWithoutPassword,
      access_token: this.jwtService.sign(payload),
    };
  }
}
