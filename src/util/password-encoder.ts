import * as bcrypt from 'bcrypt';

export class PasswordEncoder {
    async encode(rawPassword: string): Promise<string> {
        return await bcrypt.hash(rawPassword, 32);
    }

    async match(rawPassword: string, encodedPassword: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, encodedPassword);
    }
}