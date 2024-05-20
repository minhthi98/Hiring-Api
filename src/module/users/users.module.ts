import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Department } from 'src/typeorm/entities/Department';

@Module({
  imports:[TypeOrmModule.forFeature([User, Department])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
