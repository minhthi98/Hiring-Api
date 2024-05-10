import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    

    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '35.247.15.151',
    port: 3306,
    username: 'test',
    password: 'chieudabanh',
    database: '',
    entities: [],
    synchronize: true,
  }),
    

    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
