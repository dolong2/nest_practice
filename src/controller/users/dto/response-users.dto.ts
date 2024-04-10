import { PostResDto } from 'src/controller/posts/dto/response-posts.dto';

export class UserProfileResDto {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly posts: PostResDto[],
  ) {}
}
