import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';
import { UsersService } from './service/users/users.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
