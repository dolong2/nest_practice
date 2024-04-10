import { Body, Controller, Headers, HttpCode, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { SigninReqDto } from './dto/request-auth.dto';
import { ReissueResponseDto, SigninResDto } from './dto/response-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  async signin(@Body() signinReqDto: SigninReqDto): Promise<SigninResDto> {
    return await this.usersService.signin(signinReqDto);
  }

  @Put('reissue')
  async reissue(
    @Headers('refresh_token') refreshToken: string,
  ): Promise<ReissueResponseDto> {
    return await this.usersService.reissue(refreshToken);
  }
}
