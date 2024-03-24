import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';
import { UsersService } from './service/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PasswordEncoder } from './util/password-encoder';
import { ConfigService } from '@nestjs/config';
import { User } from './entity/user/user.entity';
import { Post } from './entity/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([User, Post]),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, PasswordEncoder, ConfigService],
})
export class AppModule {}
