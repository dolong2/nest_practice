import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtType } from 'src/authentication/jwt/jwt.type';
import { SigninReqDto } from 'src/controller/auth/dto/request-auth.dto';
import {
  ReissueResDto,
  SigninResDto,
} from 'src/controller/auth/dto/response-auth-dto';
import { PostResDto } from 'src/controller/posts/dto/response-posts.dto';
import { CreateUserReqDto } from 'src/controller/users/dto/request-users.dto';
import { UserProfileResDto } from 'src/controller/users/dto/response-users.dto';
import { Post } from 'src/entity/post/post.entity';
import { User } from 'src/entity/user/user.entity';
import { PasswordEncoder } from 'src/util/password-encoder';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserReqDto) {
    if (await this.userRepository.existsBy({ email: createUserDto.email }))
      throw new HttpException('Already exists user email', 400);

    const encodedPassword = await this.passwordEncoder.encode(
      createUserDto.password,
    );

    await this.userRepository.save({
      email: createUserDto.email,
      name: createUserDto.name,
      password: encodedPassword,
    });
  }

  async signin(signinReqDto: SigninReqDto): Promise<SigninResDto> {
    const user = await this.userRepository.findOneBy({
      email: signinReqDto.email,
    });
    if (user === null) throw new HttpException('User Not Found', 404);

    await this.passwordEncoder.match(signinReqDto.password, user.password);

    const accessPayload = { email: user.email, type: JwtType.ACCESS };
    const accessOptions = {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('ACESS_EXPIRATION'),
    };
    const accessToken = await this.jwtService.signAsync(
      accessPayload,
      accessOptions,
    );

    const refreshPayload = { email: user.email, type: JwtType.REFRESH };
    const refreshOptions = {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_EXPIRATION'),
    };
    const refreshToken = await this.jwtService.signAsync(
      refreshPayload,
      refreshOptions,
    );

    return new SigninResDto(accessToken, refreshToken);
  }

  async reissue(refreshToken: string): Promise<ReissueResDto> {
    const decodedRefreshToken = await this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('REFRESH_SECRET'),
    });
    const email = decodedRefreshToken.email;

    const accessPayload = { email: email, type: JwtType.ACCESS };
    const accessOptions = {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('ACESS_EXPIRATION'),
    };
    const accessToken = await this.jwtService.signAsync(
      accessPayload,
      accessOptions,
    );

    const refreshPayload = { email: email, type: JwtType.REFRESH };
    const refreshOptions = {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_EXPIRATION'),
    };
    const newRefreshToken = await this.jwtService.signAsync(
      refreshPayload,
      refreshOptions,
    );

    return new ReissueResDto(accessToken, newRefreshToken);
  }

  async getProfile(user: User): Promise<UserProfileResDto> {
    const posts = user.posts.map((post: Post) => {
      return new PostResDto(post.id, post.title, post.content);
    });
    return new UserProfileResDto(user.id, user.name, posts);
  }
}
