import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostReqDto } from 'src/controller/posts/dto/request-posts.dto';
import { PostResDto } from 'src/controller/posts/dto/response-posts.dto';
import { Post } from 'src/entity/post/post.entity';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(createPostReqDto: CreatePostReqDto, user: User) {
    this.postRepository.save({
      title: createPostReqDto.title,
      content: createPostReqDto.content,
      writer: user,
    });
  }

  async getOnePost(id: number): Promise<PostResDto> {
    const post = await this.postRepository.findOneBy({ id: id });
    if (post == null) throw new HttpException("Can't find this post", 404);

    return new PostResDto(post.id, post.title, post.content);
  }
}
