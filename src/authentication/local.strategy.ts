import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/entity/user/user.entity";
import { PasswordEncoder } from "src/util/password-encoder";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly passwordEncoder: PasswordEncoder) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await User.findByEmail(email);
        await this.passwordEncoder.match(password, user.password);
        user.password = undefined;
        return user;
    }
}