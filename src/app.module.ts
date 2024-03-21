import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';
import { UsersService } from './service/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PasswordEncoder } from './util/password-encoder';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), PassportModule, JwtModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, PasswordEncoder],
})
export class AppModule {}
