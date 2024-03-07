import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        console.log(createUserDto);
    }
}
