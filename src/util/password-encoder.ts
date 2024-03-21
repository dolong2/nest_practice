import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncoder {
  async encode(rawPassword: string): Promise<string> {
    return await bcrypt.hash(rawPassword, 32);
  }

  async match(rawPassword: string, encodedPassword: string) {
    if (!(await bcrypt.compare(rawPassword, encodedPassword))) {
      throw new HttpException('Password is not matching', 400);
    }
  }
}
