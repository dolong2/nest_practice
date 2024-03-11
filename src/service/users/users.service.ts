import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from 'src/controller/users/dto/request-users.dto';
import { User } from 'src/entity/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    async signup(createUserDto: CreateUserRequestDto) {
        if (User.existsByEmail(createUserDto.email))
            throw new HttpException('Already exists user email', 400);

        const encodedPassword = await bcrypt.hash(createUserDto.password, 32);
        
        User.saveEntity(createUserDto, encodedPassword);
    }
}
