import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request-users.dto';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async signup(@Body() createUserDto: CreateUserRequestDto): Promise<void> {
        this.usersService.signup(createUserDto);
    }
}
