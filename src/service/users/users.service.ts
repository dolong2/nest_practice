import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from 'src/controller/users/dto/request-users.dto';
import { User } from 'src/entity/user/user.entity';

@Injectable()
export class UsersService {
    async signup(createUserDto: CreateUserRequestDto) {
        if (User.existsByEmail(createUserDto.email))
            throw new HttpException('Already exists user email', 400);
        
        User.saveEntity(createUserDto)
    }
}
