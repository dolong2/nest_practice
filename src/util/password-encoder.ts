import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncoder {
  async encode(rawPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
  }

  async match(rawPassword: string, encodedPassword: string) {
    if (!(await bcrypt.compare(rawPassword, encodedPassword))) {
      throw new HttpException('Password is not matching', 400);
    }
  }
}
