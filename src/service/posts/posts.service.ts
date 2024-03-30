import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostReqDto } from 'src/controller/posts/dto/request-posts.dto';
import { Post } from 'src/entity/post/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(createPostReqDto: CreatePostReqDto) {
    this.postRepository.save({
      title: createPostReqDto.title,
      content: createPostReqDto.content,
    });
  }
}
