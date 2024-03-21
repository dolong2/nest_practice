import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtType } from 'src/authentication/jwt/jwt.type';
import { SigninRequestDto } from 'src/controller/auth/dto/request-auth.dto';
import { SigninResponseDto } from 'src/controller/auth/dto/response-auth-dto';
import { CreateUserRequestDto } from 'src/controller/users/dto/request-users.dto';
import { User } from 'src/entity/user/user.entity';
import { PasswordEncoder } from 'src/util/password-encoder';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserRequestDto) {
    if (User.existsByEmail(createUserDto.email))
      throw new HttpException('Already exists user email', 400);

    const encodedPassword = await this.passwordEncoder.encode(
      createUserDto.password,
    );

    User.saveEntity(createUserDto, encodedPassword);
  }

  async signin(signinRequestDto: SigninRequestDto): Promise<SigninResponseDto> {
    const user = await User.findByEmail({ email: signinRequestDto.email });
    if (user == null) throw new HttpException('User Not Found', 404);

    await this.passwordEncoder.match(signinRequestDto.password, user.password);

    const accessPayload = { email: user.email, type: JwtType.ACCESS };
    const accessOptions = {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expressIn: this.configService.get<string>('JWT_ACESS_EXPIRATION'),
    };
    const accessToken = await this.jwtService.signAsync(
      accessPayload,
      accessOptions,
    );

    const refreshPayload = { email: user.email, type: JwtType.REFRESH };
    const refreshOptions = {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expressIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    };
    const refreshToken = await this.jwtService.signAsync(
      refreshPayload,
      refreshOptions,
    );

    return new SigninResponseDto(accessToken, refreshToken);
  }
}
