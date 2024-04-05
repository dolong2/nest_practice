import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePostReqDto,
  UpdatePostReqDto,
} from 'src/controller/posts/dto/request-posts.dto';
import {
  PostListResDto,
  PostResDto,
} from 'src/controller/posts/dto/response-posts.dto';
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

  async getAllPost(): Promise<PostListResDto> {
    const allPosts = await this.postRepository.find();
    const list = allPosts.map(function (post) {
      return new PostResDto(post.id, post.title, post.content);
    });
    return new PostListResDto(list);
  }

  async deletePost(id: number, user: User) {
    const post = await this.postRepository.findOneBy({ id: id });
    if (post == null) throw new HttpException("Can't find this post", 404);

    if (post.writer != user) throw new HttpException("user isn't writer", 401);

    await this.postRepository.delete({ id: id });
  }

  async updatePost(id: number, user: User, updatePostReqDto: UpdatePostReqDto) {
    const post = await this.postRepository.findOneBy({ id: id });

    if (post == null) throw new HttpException("Can't find this post", 404);

    if (post.writer != user) throw new HttpException("user isn't writer", 401);

    this.postRepository.update({ id: id }, { ...updatePostReqDto });
  }
}
