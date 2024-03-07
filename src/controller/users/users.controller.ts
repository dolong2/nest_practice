import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request-users.dto';

@Controller('users')
export class UsersController {
    @Post()
    async createUser(@Body() createUserDto: CreateUserRequestDto): Promise<void> {
        console.log(createUserDto);
    }
}
