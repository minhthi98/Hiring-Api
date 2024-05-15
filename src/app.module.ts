import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Leave } from './typeorm/entities/Leave';
import { Timekeeping } from './typeorm/entities/Timekeeping';
import { Department } from './typeorm/entities/Department';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    

    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '34.168.75.19',
    port: 3306,
    username: 'intern',
    password: 'intern',
    database: 'hiring_db',
    entities: [User, Leave, Timekeeping, Department],
    synchronize: true,
  }),
    

    UsersModule,
    

    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
