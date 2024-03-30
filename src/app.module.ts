import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PasswordEncoder } from './util/password-encoder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity/user/user.entity';
import { Post } from './entity/post/post.entity';
import { JwtStrategy } from './authentication/jwt/jwt.strategy';
import { PostsService } from './service/posts/posts.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV === 'prod' ? '.prod.env' : '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Post],
      synchronize: true,
    }),
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([User, Post]),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    PasswordEncoder,
    ConfigService,
    JwtStrategy,
    PostsService,
  ],
})
export class AppModule {}
