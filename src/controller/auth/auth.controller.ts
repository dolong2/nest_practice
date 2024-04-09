import { Body, Controller, Headers, HttpCode, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { SigninRequestDto } from './dto/request-auth.dto';
import { ReissueResponseDto, SigninResponseDto } from './dto/response-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  async signin(
    @Body() signinRequestDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    return await this.usersService.signin(signinRequestDto);
  }

  @Put('reissue')
  async reissue(
    @Headers('refresh_token') refreshToken: string,
  ): Promise<ReissueResponseDto> {
    return await this.usersService.reissue(refreshToken);
  }
}
