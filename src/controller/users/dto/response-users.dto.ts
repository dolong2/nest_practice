import { PostResDto } from 'src/controller/posts/dto/response-posts.dto';

export class UserProfileResponseDto {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly posts: PostResDto[],
  ) {}
}
