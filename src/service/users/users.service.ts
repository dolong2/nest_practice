import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from 'src/controller/users/dto/request-users.dto';
import { User } from 'src/entity/user/user.entity';
import { PasswordEncoder } from 'src/util/password-encoder';

@Injectable()
export class UsersService {
    constructor(readonly passwordEncoder = new PasswordEncoder()) {}

    async signup(createUserDto: CreateUserRequestDto) {
        if (User.existsByEmail(createUserDto.email))
            throw new HttpException('Already exists user email', 400);

        const encodedPassword = await this.passwordEncoder.encode(createUserDto.password);
        
        User.saveEntity(createUserDto, encodedPassword);
    }
}
