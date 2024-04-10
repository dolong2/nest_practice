import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request-users.dto';
import { UsersService } from 'src/service/users/users.service';
import { UserProfileResDto } from './dto/response-users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signup(@Body() createUserDto: CreateUserRequestDto) {
    await this.usersService.signup(createUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req): Promise<UserProfileResDto> {
    return await this.usersService.getProfile(req.user);
  }
}
