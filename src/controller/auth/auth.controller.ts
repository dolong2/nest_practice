import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import { SigninRequestDto } from './dto/request-auth.dto';
import { SigninResponseDto } from './dto/response-auth-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @HttpCode(200)
    async signin(@Body() signinRequestDto: SigninRequestDto): Promise<SigninResponseDto> {
        return this.usersService.signin(signinRequestDto);
    }
}
