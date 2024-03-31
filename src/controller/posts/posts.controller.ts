import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from 'src/service/posts/posts.service';
import { CreatePostReqDto } from './dto/request-posts.dto';
import { PostResDto } from './dto/response-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Body() createPostReqDto: CreatePostReqDto, @Req() req) {
    await this.postsService.createPost(createPostReqDto, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOnePost(@Param('id') id: number): Promise<PostResDto> {
    return await this.postsService.getOnePost(id);
  }
}
