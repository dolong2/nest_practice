import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';
import { UsersService } from './service/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authentication/local.strategy';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), PassportModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, LocalStrategy],
})
export class AppModule {}
